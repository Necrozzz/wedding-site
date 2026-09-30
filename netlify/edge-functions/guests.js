/* Guest count and wishes, answered from the edge instead of from Google.
 *
 * Apps Script is slow and erratic: measured from the live site at 1.1s on a
 * good call and 18s on a bad one - 18s being this function's own ceiling, so
 * the real figure is worse. The banner cannot show a total until it answers.
 *
 * The CDN was supposed to absorb that. It does not: measured with the browser
 * cache bypassed, every request reached the origin and no response carried an
 * `age` header, so Netlify-CDN-Cache-Control was buying nothing here. The fast
 * readings that hid this were the browser's own cache.
 *
 * So the copy is kept here instead, in the isolate. It survives between
 * requests, so in practice almost every visitor is answered from memory:
 *
 *   under 30s old  -> answered straight away
 *   under 10min    -> answered straight away, refreshed behind the request
 *   older, or none -> the one unlucky request waits for Google
 *
 * A refresh that fails leaves the old copy in place rather than replacing it
 * with an error, so one bad minute upstream cannot empty the banner.
 *
 * Two things cross this boundary and nothing else: the number, and the notes
 * guests chose to write - a message, and a first name only when the wish came
 * from the page's own form. The payload is rebuilt field by field rather than
 * forwarded, so nothing else can ever leak through.
 *
 * Registrations do NOT go through here: the form still posts straight to Apps
 * Script, because a write should not be cached or proxied.
 */

import { getStore } from '@netlify/blobs';

const UPSTREAM =
  'https://script.google.com/macros/s/AKfycbz0f8-QdNc8HUF-Ply9pbPBXBPtxtwnbP39FELdrRScphZ9UjC-AQAmOPfD5N-P1iZhgg/exec';

const FRESH_MS = 30 * 1000;
/* Ten minutes was far too generous. This runs on many isolates, each with its
   own memory, so after a registration some held the old total and some the new
   one - five consecutive calls returned 32, 34, 34, 32, 32 when the answer was
   34. A stale copy may now be served for two minutes at most, and every stale
   answer kicks off a refresh behind it. */
const STALE_MS = 2 * 60 * 1000;
/* 12s was turning a slow answer into no answer: three cold calls in a row
   timed out at 12s and returned an error, when the request would have
   completed. Nothing is lost by waiting - there is nothing else to serve. */
const UPSTREAM_TIMEOUT_MS = 25 * 1000;

const BLOB_STORE = 'wedding';   // site-wide: survives deploys
const BLOB_KEY = 'guests';   // shared across isolates and across deploys

// kept between requests on the same isolate; empty after a cold start
let cached = null;        // { payload, at }
let inFlight = null;      // so a burst of arrivals makes one upstream call

/* The shared copy. Memory alone was not enough: this function runs on many
   isolates, each starting empty, so at this site's traffic a visitor regularly
   landed on a cold one and waited on Apps Script - measured at 6.4s, 10.8s and
   worse. A blob is shared by every isolate and survives between them, so a
   cold isolate still answers in milliseconds.

   Loaded lazily and defensively. If the module cannot be resolved at all, this
   returns null for ever after and the function behaves exactly as it did
   before: memory, then upstream. A missing shared copy must never be worse
   than not having had one. */
function getBlobs() {
  try {
    return getStore(BLOB_STORE);
  } catch (err) {
    return null;            // no site context, or the store is unavailable
  }
}

async function readShared() {
  const store = getBlobs();
  if (!store) return null;
  try {
    const saved = await store.get(BLOB_KEY, { type: 'json' });
    if (!saved || typeof saved.at !== 'number') return null;
    if (!saved.payload || typeof saved.payload.guests !== 'number') return null;
    return saved;
  } catch (err) { return null; }
}

async function writeShared(payload) {
  const store = getBlobs();
  if (!store) return;
  try {
    await store.setJSON(BLOB_KEY, { payload: payload, at: Date.now() });
  } catch (err) { /* the answer still went out; the copy just was not kept */ }
}

function json(body, extraHeaders) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: Object.assign(
      {
        'content-type': 'application/json; charset=utf-8',
        // a short browser cache still helps a guest who reloads twice
        'cache-control': 'public, max-age=20',
        'netlify-cdn-cache-control': 'public, s-maxage=30, stale-while-revalidate=300',
      },
      extraHeaders
    ),
  });
}

/** Only these three values can ever reach the page. */
function shape(data) {
  const notes = Array.isArray(data.notes)
    ? data.notes
        .slice(0, 60)
        .map((n) => ({
          name: String((n && n.name) || '').slice(0, 24),
          text: String((n && n.text) || '').slice(0, 200),
        }))
        .filter((n) => n.text)
    : [];
  return { status: 'ok', guests: data.guests, notes };
}

async function fetchUpstream() {
  const abort = new AbortController();
  const timer = setTimeout(() => abort.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    const res = await fetch(UPSTREAM, {
      headers: { accept: 'application/json' },
      signal: abort.signal,
    });
    if (!res.ok) throw new Error('upstream ' + res.status);
    const data = await res.json();
    if (data.status !== 'ok' || typeof data.guests !== 'number') {
      throw new Error('unexpected payload');
    }
    return shape(data);
  } finally {
    clearTimeout(timer);
  }
}

/** One upstream call at a time; a failure leaves the old copy alone. */
function refresh() {
  if (inFlight) return inFlight;
  inFlight = fetchUpstream()
    .then((payload) => {
      cached = { payload, at: Date.now() };
      writeShared(payload);        // deliberately not awaited
      return payload;
    })
    .catch(() => null)
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
}

export default async function guests(request) {
  const now = Date.now();

  /* The page appends ?fresh= after a registration, to get past the caches and
     see the guest it has just added. That has to mean something here: without
     this the request was answered from the same memory as any other, and the
     new figure could not arrive until the copy expired on its own. */
  let forced = false;
  try {
    forced = new URL(request.url).searchParams.has('fresh');
  } catch (e) { /* malformed url: treat as a normal read */ }

  if (forced) {
    const fresh = await refresh();
    if (fresh) return json(fresh, { 'x-cache': 'forced' });
    if (cached) return json(cached.payload, { 'x-cache': 'forced-fallback' });
  }

  if (cached && now - cached.at < FRESH_MS) {
    return json(cached.payload, { 'x-cache': 'fresh' });
  }

  if (cached && now - cached.at < STALE_MS) {
    refresh();                                  // deliberately not awaited
    return json(cached.payload, { 'x-cache': 'stale' });
  }

  /* Nothing usable in this isolate. Before making anyone wait on Apps Script,
     look at the copy every isolate shares. */
  const shared = await readShared();
  if (shared) {
    cached = { payload: shared.payload, at: shared.at };
    const age = Date.now() - shared.at;
    if (age < FRESH_MS) return json(shared.payload, { 'x-cache': 'shared' });
    refresh();                                  // deliberately not awaited
    return json(shared.payload, { 'x-cache': 'shared-stale' });
  }

  const payload = await refresh();
  if (payload) return json(payload, { 'x-cache': 'miss' });

  const lastResort = await readShared();
  if (lastResort) return json(lastResort.payload, { 'x-cache': 'shared-fallback' });

  // upstream is down and there is nothing worth serving: the page keeps
  // whatever it has and tries again. Never cached.
  return json(
    { status: 'error' },
    {
      'cache-control': 'no-store',
      'netlify-cdn-cache-control': 'no-store',
      'x-cache': 'error',
    }
  );
}

export const config = { path: '/api/guests' };
