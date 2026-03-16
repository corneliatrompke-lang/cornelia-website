/**
 * Cornelia Trompke — Google Apps Script
 *
 * POST → writes to "Leads" sheet (general contact) OR "Applications" sheet (retreat application)
 *        Differentiator: payload contains `retreat_id` → Applications tab
 * GET  → returns upcoming retreats from "Retreats" sheet as JSON
 *
 * LEADS sheet columns:
 *   A: Timestamp | B: Name | C: Email | D: Phone
 *   E: Services  | F: Notes | G: Lead Source | H: Status
 *
 * APPLICATIONS sheet columns:
 *   A: Timestamp | B: Name  | C: Email | D: Phone
 *   E: Retreat ID | F: Retreat Title | G: Retreat Date | H: Retreat Location
 *   I: T&C Agreed | J: Notes | K: Status
 *
 * RETREATS sheet expected columns (row 1 = headers):
 *   A: ID | B: Date | C: Location | D: Region | E: Duration
 *   F: Spots | G: Status | H: Visible | I: Title | J: Theme | K: Price | L: Notes
 *
 *   Visible must be TRUE for a row to appear on the website.
 *   Status values: Open | Forming | Full | Cancelled
 */

const LEADS_TAB        = "Leads";
const APPLICATIONS_TAB = "Applications";
const RETREATS_TAB     = "Retreats";

// ── POST — route to Leads or Applications based on payload ───────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss   = SpreadsheetApp.getActiveSpreadsheet();

    // ── Retreat Application ──────────────────────────────────────────────────
    if (data.retreat_id) {
      let sheet = ss.getSheetByName(APPLICATIONS_TAB);
      if (!sheet) {
        sheet = ss.insertSheet(APPLICATIONS_TAB);
      }
      if (sheet.getLastRow() === 0) {
        sheet.appendRow([
          "Timestamp", "Name", "Email", "Phone",
          "Retreat ID", "Retreat Title", "Retreat Date", "Retreat Location",
          "T&C Agreed", "Notes", "Status"
        ]);
        sheet.getRange(1, 1, 1, 11).setFontWeight("bold");
      }

      sheet.appendRow([
        new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" }),
        data.name             || "",
        data.email            || "",
        data.phone            || "",
        data.retreat_id       || "",
        data.retreat_title    || "",
        data.retreat_date     || "",
        data.retreat_location || "",
        "Yes",
        data.notes            || "",
        "New",
      ]);

      return ContentService
        .createTextOutput(JSON.stringify({ success: true, type: "application" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ── General Contact / Lead ───────────────────────────────────────────────
    let sheet = ss.getSheetByName(LEADS_TAB);
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
      .createTextOutput(JSON.stringify({ success: true, type: "lead" }))
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
