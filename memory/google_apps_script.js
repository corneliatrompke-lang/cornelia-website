/**
 * Cornelia Trompke — Google Apps Script
 *
 * POST → writes contact form submission to "Leads" sheet
 * GET  → returns upcoming retreats from "Retreats" sheet as JSON
 *
 * RETREATS sheet expected columns (row 1 = headers):
 *   A: ID | B: Date | C: Location | D: Region | E: Duration
 *   F: Spots | G: Status | H: Visible | I: Title | J: Theme | K: Price | L: Notes
 *
 *   Visible must be TRUE for a row to appear on the website.
 *   Status values: Open | Forming | Full | Cancelled
 */

const LEADS_TAB    = "Leads";
const RETREATS_TAB = "Retreats";

// ── POST — write contact form submission ──────────────────────────────────────
function doPost(e) {
  try {
    const data  = JSON.parse(e.postData.contents);
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let sheet   = ss.getSheetByName(LEADS_TAB);

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
      data.name      || "",
      data.email     || "",
      data.phone     || "",
      (data.services || []).join(", "),
      data.notes     || "",
      data.send_from || "",
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
      .filter(row => {
        // Visible column (H, index 7) must be TRUE
        const visible = row[7];
        return visible === true || visible === "TRUE" || visible === "true";
      })
      .map(row => {
        const obj = {};
        headers.forEach((h, i) => {
          obj[h] = row[i] !== undefined ? String(row[i]) : "";
        });
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
