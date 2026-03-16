/**
 * Cornelia Trompke — Google Apps Script
 * 
 * Handles two operations:
 *   POST → writes a contact form submission to the "Leads" sheet
 *   GET  → returns upcoming retreats from the "Retreats" sheet as JSON
 *
 * SETUP:
 *   1. Open your Google Sheet → Extensions → Apps Script
 *   2. Paste this entire file, replacing any existing code
 *   3. Click Deploy → New deployment → Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 *   4. Copy the Web App URL
 *   5. Paste it into backend/.env as APPS_SCRIPT_URL=<your-url>
 */

const LEADS_TAB    = "Leads";
const RETREATS_TAB = "Retreats";

// ── POST — write contact form submission ──────────────────────────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let sheet   = ss.getSheetByName(LEADS_TAB);

    // Create sheet + headers if it doesn't exist yet
    if (!sheet) {
      sheet = ss.insertSheet(LEADS_TAB);
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Name", "Email", "Phone",
        "Services", "Notes", "Lead Source", "Status"
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight("bold");
    }

    sheet.appendRow([
      new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" }),
      data.name     || "",
      data.email    || "",
      data.phone    || "",
      (data.services || []).join(", "),
      data.notes    || "",
      data.send_from|| "",
      "New",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


// ── GET — read upcoming retreats ──────────────────────────────────────────────
function doGet(e) {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(RETREATS_TAB);

    if (!sheet || sheet.getLastRow() < 2) {
      return ContentService
        .createTextOutput(JSON.stringify({ retreats: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const rows    = sheet.getDataRange().getValues();
    const headers = rows[0].map(h => h.toString().trim().toLowerCase().replace(/\s+/g, "_"));

    const retreats = rows
      .slice(1)
      // Only include rows where Visible (column H, index 7) is TRUE
      .filter(row => {
        const visible = row[7];
        return visible === true || visible === "TRUE" || visible === "true";
      })
      .map(row => {
        const obj = {};
        headers.forEach((h, i) => { obj[h] = row[i] !== undefined ? String(row[i]) : ""; });
        return obj;
      });

    return ContentService
      .createTextOutput(JSON.stringify({ retreats }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ retreats: [], error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
