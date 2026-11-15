/**
 * Contact form backend for the portfolio site.
 *
 * Receives submissions from the site, verifies the reCAPTCHA v3 token with Google,
 * and appends each message to a "Messages" sheet. Optionally emails you on each message.
 *
 * SETUP
 * 1. Create a Google Sheet, then open Extensions → Apps Script and replace Code.gs with this file.
 * 2. Project Settings (gear icon) → Script Properties → add:
 *      RECAPTCHA_SECRET   your reCAPTCHA v3 *secret* key (from the reCAPTCHA admin console,
 *                         the pair of the site key used in src/App.tsx)
 *      NOTIFY_EMAIL       (optional) address to email when a message arrives
 * 3. Deploy → New deployment → type "Web app":
 *      Execute as:      Me
 *      Who has access:  Anyone
 *    Authorize when prompted, then copy the Web app URL (ends in /exec).
 * 4. Paste that URL into `contactEndpoint` in src/game/content.ts and redeploy the site.
 *
 * After editing this script, use Deploy → Manage deployments → Edit → "New version"
 * so the same /exec URL serves the new code.
 */

const SHEET_NAME = 'Messages';
const EXPECTED_ACTION = 'contact_form'; // must match RECAPTCHA_ACTION in src/game/Panel.tsx
const MIN_SCORE = 0.5; // reCAPTCHA v3 score: 1.0 = very likely human, 0.0 = very likely bot
const LIMITS = { name: 100, email: 200, message: 5000 };

function doPost(e) {
  try {
    let data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (!data || typeof data !== 'object') data = {};

    // Honeypot field is hidden from people; bots that fill it get a fake success.
    if (data.website) return json({ ok: true });

    const name = clean(data.name, LIMITS.name, false);
    const email = clean(data.email, LIMITS.email, false);
    const message = clean(data.message, LIMITS.message, true);
    if (!name || !email || !message) return json({ ok: false, error: 'missing_fields' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ ok: false, error: 'invalid_email' });

    const captcha = verifyRecaptcha(data.token);
    if (captcha.error) return json({ ok: false, error: captcha.error });
    if (!captcha.ok) {
      console.log('reCAPTCHA rejected: ' + captcha.reason);
      return json({ ok: false, error: 'captcha_failed', reason: captcha.reason });
    }

    getSheet().appendRow([new Date(), safe(name), safe(email), safe(message), captcha.score, captcha.hostname]);
    notify(name, email, message);
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: 'server_error' });
  }
}

/**
 * Returns { ok, reason, score, hostname } or { error } for setup problems. Error codes are safe to expose:
 *   not_configured      RECAPTCHA_SECRET script property is missing
 *   verify_unavailable  the script can't reach Google (usually not authorized for external requests)
 *   bad_secret          Google rejected the secret key
 */
function verifyRecaptcha(token) {
  const secret = PropertiesService.getScriptProperties().getProperty('RECAPTCHA_SECRET');
  if (!secret) {
    console.error('RECAPTCHA_SECRET script property is not set');
    return { error: 'not_configured' };
  }
  if (!token) return { ok: false, reason: 'missing_token' };

  let body;
  try {
    const res = UrlFetchApp.fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'post',
      payload: { secret: secret, response: String(token) },
      muteHttpExceptions: true,
    });
    body = JSON.parse(res.getContentText());
  } catch (err) {
    console.error('reCAPTCHA verification request failed: ' + err);
    return { error: 'verify_unavailable' };
  }
  if ((body['error-codes'] || []).indexOf('invalid-input-secret') !== -1) {
    console.error('Google rejected RECAPTCHA_SECRET (invalid-input-secret)');
    return { error: 'bad_secret' };
  }
  // reason helps diagnose rejections: Google's error code, or which of our checks failed.
  let reason = '';
  if (body.success !== true) reason = (body['error-codes'] || ['unknown']).join(',');
  else if (body.action !== EXPECTED_ACTION) reason = 'wrong_action';
  else if (!(body.score >= MIN_SCORE)) reason = 'low_score';
  return { ok: !reason, reason: reason, score: body.score, hostname: body.hostname || '' };
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Received', 'Name', 'Email', 'Message', 'reCAPTCHA score', 'Site']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function notify(name, email, message) {
  const to = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL');
  if (!to) return;
  MailApp.sendEmail({
    to: to,
    replyTo: email,
    subject: 'Portfolio message from ' + name,
    body: 'From: ' + name + ' <' + email + '>\n\n' + message,
  });
}

/** Trims, strips control characters and caps length. Newlines are kept only for the message. */
function clean(value, max, multiline) {
  let s = String(value == null ? '' : value);
  s = multiline ? s.replace(/\r\n?/g, '\n') : s.replace(/[\r\n\t]+/g, ' ');
  s = s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  return s.trim().slice(0, max);
}

/** Stops spreadsheet formula injection: cells starting with = + - @ are stored as plain text. */
function safe(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

/**
 * Setup check: select "testSetup" in the editor's function dropdown and click Run.
 * It also triggers the permission prompt the first time, if the script hasn't been authorized yet.
 */
function testSetup() {
  const props = PropertiesService.getScriptProperties();
  const secret = props.getProperty('RECAPTCHA_SECRET');
  if (!secret) {
    console.log('RECAPTCHA_SECRET is NOT set. Script property names found: [' + props.getKeys().join(', ') + ']');
    return;
  }
  console.log('RECAPTCHA_SECRET is set (' + secret.length + ' characters).');
  const res = UrlFetchApp.fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'post',
    payload: { secret: secret, response: 'setup-test' },
    muteHttpExceptions: true,
  });
  // A correct secret gives "invalid-input-response" (the dummy token); a wrong one gives "invalid-input-secret".
  console.log('Google replied: ' + res.getContentText());
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
