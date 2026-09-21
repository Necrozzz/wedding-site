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
const SITE_URL = 'https://gohar-and-roman.netlify.app/';

function doPost(e) {
  try {
    const params = e.parameter;
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

    return jsonOut({ result: 'success' });
  } catch (err) {
    return jsonOut({ result: 'error', error: err.message });
  }
}

function doGet(e) {
  return jsonOut({ status: 'Gohar & Roman RSVP endpoint is live' });
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
