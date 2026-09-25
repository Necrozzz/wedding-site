/**
 * Gohar & Roman — wedding RSVP endpoint
 *
 * Receives POSTs from gohar-and-roman.netlify.app, appends a row to the
 * "Wedding RSVPs" sheet and emails the guest a confirmation.
 *
 * Sheet columns (must match the appendRow order below):
 *   A Timestamp | B Full Name | C Email | D Attending | E Total Guests
 *   F Staying at DiliJazz | G Side | H Message
 */

const SHEET_NAME = 'Sheet1';
// wishes left on the site itself land here, apart from the RSVP rows
const WISH_SHEET = 'Wishes';
const SITE_URL = 'https://gohar-and-roman.netlify.app/';

/* Run this once from the editor, after pressing Start on the bot. It reads
 * the chat the bot can see and remembers it. Logs what it found. */
function setupTelegram() {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty('TELEGRAM_TOKEN');
  if (!token) {
    Logger.log('No TELEGRAM_TOKEN in Script properties yet.');
    return;
  }
  const res = UrlFetchApp.fetch(
    'https://api.telegram.org/bot' + token + '/getUpdates',
    { muteHttpExceptions: true });
  const data = JSON.parse(res.getContentText());
  if (!data.ok || !data.result || !data.result.length) {
    Logger.log('No messages seen. Open the bot in Telegram, press Start, ' +
               'send it any message, then run this again.');
    return;
  }
  const last = data.result[data.result.length - 1];
  const chat = (last.message && last.message.chat) ||
               (last.channel_post && last.channel_post.chat);
  if (!chat) {
    Logger.log('Could not read a chat id from the last update.');
    return;
  }
  props.setProperty('TELEGRAM_CHAT_ID', String(chat.id));
  Logger.log('Saved chat id ' + chat.id + ' (' + (chat.username || chat.title || chat.first_name) + ')');
  notifyTelegram('Wedding site alerts are on. You will get a message here on ' +
                 'every registration and every wish.');
}

function doPost(e) {
  try {
    const params = e.parameter;

    // a wish from the hero ticker, not an RSVP: different shape, own sheet
    if (String(params.type || '') === 'wish') return saveWish(params);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    sheet.appendRow([
      new Date(),
      params.fullName || '',
      params.email || '',
      params.attending || '',
      params.totalGuests || '',
      params.hotelStay || '',
      params.side || '',
      params.message || ''
    ]);

    try {
      sendConfirmationEmail(params);
    } catch (mailErr) {
      // Non-fatal: the RSVP is already saved even if email delivery fails.
    }

    // the total has changed, so the cached copy is wrong now
    try { CacheService.getScriptCache().remove('counts'); } catch (err) {}

    try {
      const coming = String(params.attending || '') === 'Yes';
      notifyTelegram(
        (coming ? '\u2705 <b>New registration</b>' : '\u274c <b>Not coming</b>') + '\n' +
        tgEscape(params.fullName) + ' \u2014 ' + tgEscape(params.totalGuests) + ' guest(s)\n' +
        'Side: ' + tgEscape(params.side) + '\n' +
        'Staying at DiliJazz: ' + tgEscape(params.hotelStay) +
        (params.message ? '\n\n\u201c' + tgEscape(params.message) + '\u201d' : ''));
    } catch (tgErr) {
      // Non-fatal: never let a notification cost us the RSVP.
    }

    return jsonOut({ result: 'success' });
  } catch (err) {
    return jsonOut({ result: 'error', error: err.message });
  }
}


/* ------------------------------------------------------------ Telegram -- */

/* Alerts for Roman when someone registers or leaves a wish.
 *
 * Two values live in Project Settings > Script properties, never in this file
 * and never in the repository:
 *   TELEGRAM_TOKEN    - from @BotFather
 *   TELEGRAM_CHAT_ID  - filled in by running setupTelegram() once
 *
 * A bot cannot message a person by @username; it can only reply inside a chat
 * that person has started. So: press Start on the bot, then run setupTelegram.
 */
function notifyTelegram(text) {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty('TELEGRAM_TOKEN');
  const chat = props.getProperty('TELEGRAM_CHAT_ID');
  if (!token || !chat) return;   // not configured yet: stay quiet

  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
    method: 'post',
    payload: {
      chat_id: chat,
      text: text,
      parse_mode: 'HTML',
      disable_web_page_preview: 'true'
    },
    muteHttpExceptions: true
  });
}


/** Telegram's HTML mode needs these three escaped. */
function tgEscape(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Store a wish left on the site. Only a first name is kept - the form never
 * asks for anything else, and the ticker shows nothing else.
 */
function saveWish(params) {
  const wish = String(params.wish || '').trim().slice(0, 200);
  if (!wish) return jsonOut({ result: 'error', error: 'empty wish' });

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(WISH_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(WISH_SHEET);
    sheet.appendRow(['Timestamp', 'Name', 'Wish']);
  }
  sheet.appendRow([new Date(), firstNameOf(params.name), wish]);

  // the ticker should pick it up on the next read, not a minute later
  try { CacheService.getScriptCache().remove('counts'); } catch (err) {}

  try {
    const who = firstNameOf(params.name);
    notifyTelegram('\ud83d\udc8c <b>New wish</b>' + (who ? ' from ' + tgEscape(who) : '') +
                   '\n\n\u201c' + tgEscape(wish) + '\u201d');
  } catch (tgErr) {
    // Non-fatal: the wish is already saved.
  }

  return jsonOut({ result: 'success' });
}

/* Asides like "Boooo" or "Ku-ku" were written to us in the registration
   form, not as wishes for the page. One short word alone is the tell. Wishes
   left through the page's own form are never filtered. */
function isSubstantial(text) {
  const t = String(text || '').trim();
  if (!t) return false;
  return t.length >= 12 || t.split(/\s+/).length >= 3;
}

/** Everything before the first space, comma, slash or ampersand. */
function firstNameOf(full) {
  const s = String(full || '').trim();
  if (!s) return '';
  return s.split(/[\s,&\/]+/)[0].slice(0, 24);
}

/**
 * The notes to show on the hero: what guests wrote when they registered, plus
 * wishes left on the site.
 *
 * Registration notes travel WITHOUT a name. They were written to us in a
 * private form, so they appear on the page unattributed. Only a wish left
 * through the page's own form is signed, and then only with a first name.
 * Never an email, an attendance or a party size.
 */
function collectNotes(ss) {
  const out = [];

  const sheet = ss.getSheetByName(SHEET_NAME);
  const values = sheet.getDataRange().getValues();
  if (values.length > 2) {
    const headers = values[0].map(function (h) { return String(h).trim().toLowerCase(); });
    const nameCol = headers.indexOf('full name');
    const msgCol = headers.indexOf('message');
    const tsCol = headers.indexOf('timestamp');
    if (nameCol !== -1 && msgCol !== -1) {
      // row 1 is the headers and row 2 carries the totals, so data starts at 3
      for (var r = 2; r < values.length; r++) {
        const text = String(values[r][msgCol] || '').trim();
        if (isSubstantial(text)) {
          out.push({ name: '', text: text.slice(0, 200), at: values[r][tsCol] });
        }
      }
    }
  }

  const wishes = ss.getSheetByName(WISH_SHEET);
  if (wishes) {
    const rows = wishes.getDataRange().getValues();
    for (var w = 1; w < rows.length; w++) {
      const text = String(rows[w][2] || '').trim();
      if (text) {
        out.push({ name: firstNameOf(rows[w][1]), text: text.slice(0, 200), at: rows[w][0] });
      }
    }
  }

  // newest first, and capped: the ticker is a taste, not an archive
  out.sort(function (a, b) { return new Date(b.at) - new Date(a.at); });
  return out.slice(0, 60).map(function (n) { return { name: n.name || '', text: n.text }; });
}

/**
 * Public read: the guest total, taken from the sheet's own Grand Total column
 * so the site and the spreadsheet can never disagree.
 *
 * Alongside it travel the notes guests chose to write: first name and message
 * only. No emails, no attendance, no party sizes.
 * Cached for a minute so the site can call it on every page load.
 */
function doGet(e) {
  try {
    const cache = CacheService.getScriptCache();
    const hit = cache.get('counts');
    if (hit) return jsonOut(JSON.parse(hit));

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const values = sheet.getDataRange().getValues();

    // find the column by its header rather than a fixed letter, so the
    // total survives someone rearranging the sheet
    var guests = 0;
    if (values.length > 1) {
      const headers = values[0].map(function (h) {
        return String(h).trim().toLowerCase();
      });
      const col = headers.indexOf('grand total');
      if (col !== -1) {
        const n = parseInt(values[1][col], 10);
        if (!isNaN(n) && n > 0) guests = n;
      }
    }

    const payload = { status: 'ok', guests: guests, notes: collectNotes(SpreadsheetApp.getActiveSpreadsheet()) };
    cache.put('counts', JSON.stringify(payload), 60);
    return jsonOut(payload);
  } catch (err) {
    return jsonOut({ status: 'error', error: err.message });
  }
}

function jsonOut(obj) {
  const out = ContentService.createTextOutput(JSON.stringify(obj));
  out.setMimeType(ContentService.MimeType.JSON);
  return out;
}

/* ------------------------------------------------------------------ mail */

function sendConfirmationEmail(params) {
  const coming = params.attending === 'Yes';
  const name = params.fullName || 'there';

  let subject;
  let body = 'Hi ' + name + ',\n\n';

  if (coming) {
    subject = "We got it — see you at Gohar & Roman's wedding!";
    body += "Thank you for registering for Gohar & Roman's wedding! We can't wait to celebrate with you.\n\n";
    body += 'Here is a copy of your RSVP:\n\n';
    body += 'Name: ' + name + '\n';
    body += 'Attending: Yes\n';
    body += 'Total guests: ' + (params.totalGuests || '') + '\n';
    body += 'Team: ' + (params.side || '') + '\n';
    body += 'Staying at DiliJazz: ' + (params.hotelStay || '') + '\n';
    if (params.message) {
      body += 'Your note: ' + params.message + '\n';
    }
    body += '\nThe big day: Saturday, October 24, 2026 — DiliJazz Hotel, Dilijan, Armenia.\n';
    body += 'We have attached a calendar invite so you can save the date.\n\n';
    body += 'All the details \u2014 the schedule, how to book your room and what to wear:\n';
    body += SITE_URL + '\n\n';
    body += 'See you there!\n';
    body += 'Gohar & Roman\n';
  } else {
    subject = "Thank you for letting us know — Gohar & Roman";
    body += "Thank you for letting us know that you can't make it. We will miss you!\n\n";
    if (params.message) {
      body += 'Your note: ' + params.message + '\n\n';
    }
    body += 'If anything changes, the details are here:\n';
    body += SITE_URL + '\n\n';
    body += 'With love,\n';
    body += 'Gohar & Roman\n';
  }

  const options = {};
  if (coming) {
    const icsContent = buildWeddingIcs();
    const icsBlob = Utilities.newBlob(icsContent, 'text/calendar', 'Gohar-Roman-Wedding.ics');
    options.attachments = [icsBlob];
  }

  MailApp.sendEmail(params.email, subject, body, options);
}

/* ------------------------------------------------------------------- ics */

function buildWeddingIcs() {
  const uid = Utilities.getUuid() + '@gohar-and-roman.netlify.app';
  const now = new Date();
  const dtstamp = Utilities.formatDate(now, 'UTC', "yyyyMMdd'T'HHmmss'Z'");
  const lines = [];
  lines.push('BEGIN:VCALENDAR');
  lines.push('VERSION:2.0');
  lines.push('PRODID:-//Gohar and Roman Wedding//EN');
  lines.push('CALSCALE:GREGORIAN');
  lines.push('BEGIN:VEVENT');
  lines.push('UID:' + uid);
  lines.push('DTSTAMP:' + dtstamp);
  lines.push('DTSTART;VALUE=DATE:20261024');
  lines.push('DTEND;VALUE=DATE:20261025');
  lines.push('SUMMARY:Gohar & Roman Wedding');
  // RFC 5545 requires commas escaped inside TEXT values, or a strict
  // parser truncates the address at the first one
  lines.push('LOCATION:DiliJazz Hotel\, Dilijan\, Armenia');
  lines.push('URL:' + SITE_URL);
  lines.push('DESCRIPTION:We would love for you to join us on our special day! '
             + 'All the details: ' + SITE_URL);
  lines.push('END:VEVENT');
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}
