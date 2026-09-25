/* Guest count, served from Netlify's CDN instead of Google.
 *
 * Apps Script is slow to wake: measured from the live site at 1.3-1.7s on a
 * good call and 10.5s on a bad one, and the banner tile cannot appear until it
 * answers. This sits in front of it, so guests hit an edge node a few
 * milliseconds away and Google is asked at most once a minute.
 *
 * Two things cross this boundary and nothing else: the number, and the notes
 * guests chose to write - a message, and a first name only when the wish came
 * from the page's own form. The upstream sends
 * no email, no attendance and no party size, and this re-builds the payload
 * field by field rather than forwarding whatever arrives.
 *
 * Registrations do NOT go through here: the form still posts straight to Apps
 * Script, because a write should not be cached or proxied.
 */

const UPSTREAM =
  'https://script.google.com/macros/s/AKfycbz0f8-QdNc8HUF-Ply9pbPBXBPtxtwnbP39FELdrRScphZ9UjC-AQAmOPfD5N-P1iZhgg/exec';

/* How long the CDN may serve a stored answer, and how long it may keep serving
   a stale one while it fetches a fresh one behind the request.

   The stale window was ten minutes, which meant that after any quiet spell
   there was nothing left to serve and the next visitor waited on Apps Script
   waking up - measured at 6s, and the ticker stayed empty until it answered.
   A day-long stale window means only the very first request ever blocks;
   everyone after that is served instantly and the copy is refreshed behind
   them, so it is never more than a minute behind in practice. */
const CDN_CACHE = 'public, s-maxage=60, stale-while-revalidate=86400';

function json(body, headers) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: Object.assign(
      { 'content-type': 'application/json; charset=utf-8' },
      headers
    ),
  });
}

export default async function guests() {
  try {
    // Don't let a sleeping script hold the edge request open. 10s was too
    // tight - a cold Apps Script call was measured at 10.5s and tripped it.
    const abort = new AbortController();
    const timer = setTimeout(() => abort.abort(), 18000);

    let data;
    try {
      const res = await fetch(UPSTREAM, {
        headers: { accept: 'application/json' },
        signal: abort.signal,
      });
      if (!res.ok) throw new Error('upstream ' + res.status);
      data = await res.json();
    } finally {
      clearTimeout(timer);
    }

    if (data.status !== 'ok' || typeof data.guests !== 'number') {
      throw new Error('unexpected payload');
    }

    // rebuilt field by field: whatever else upstream might ever add, only
    // these three values can reach the page
    const notes = Array.isArray(data.notes)
      ? data.notes
          .slice(0, 60)
          .map((n) => ({
            name: String((n && n.name) || '').slice(0, 24),
            text: String((n && n.text) || '').slice(0, 200),
          }))
          .filter((n) => n.text)
      : [];

    return json(
      { status: 'ok', guests: data.guests, notes },
      {
        'cache-control': 'public, max-age=30',
        'netlify-cdn-cache-control': CDN_CACHE,
      }
    );
  } catch (err) {
    // Stay a 200 with an error body: the page keeps the figure it already has
    // and falls back to Apps Script directly, rather than treating this as a
    // broken request. Never cached - pinning a failure at the edge would hand
    // it to everyone who arrives in the next few seconds, and this site does
    // not have the traffic for a stampede to matter.
    return json(
      { status: 'error' },
      {
        'cache-control': 'no-store',
        'netlify-cdn-cache-control': 'no-store',
      }
    );
  }
}

export const config = { path: '/api/guests' };
