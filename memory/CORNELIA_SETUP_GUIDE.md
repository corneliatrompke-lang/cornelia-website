# Setup Guide for Cornelia Trompke
**Prepared for: Cornelia Trompke**
**Purpose: Create accounts and share access with your developer to complete the website setup**

---

## OVERVIEW

You need to complete four setup steps:
1. **Google Analytics 4** — to track website visitors
2. **Google Search Console** — to manage how Google indexes your website
3. **GitHub** — to store and manage the website code
4. **Google Sheets + Apps Script** — to migrate your contact form data and retreat management to your own Google account

For each step, you will create the account/resource and then invite your developer (`info@corneliatrompke.com` should be replaced with the developer's email — ask for it if you don't have it).

---

---

## PART 1 — Google Analytics 4

### What this is
Google Analytics tracks who visits your website, where they come from, which pages they read, and how long they stay.

### Step-by-Step

**Step 1: Go to Google Analytics**
- Open your browser and go to: **https://analytics.google.com**
- Sign in with your company Google account (e.g. cornelia@corneliatrompke.com)

**Step 2: Start account creation**
- Click the blue **"Start measuring"** button (or if you already have an account, click **Admin** in the bottom-left gear icon, then click **"+ Create"** → **"Account"**)

**Step 3: Set up the Account**
- **Account name:** `Cornelia Trompke Consulting`
- Leave all checkboxes for "Google products & services" as-is (default)
- Click **"Next"**

**Step 4: Create a Property**
- **Property name:** `corneliatrompke.com`
- **Reporting time zone:** `Germany – (GMT+01:00) Berlin`
- **Currency:** `Euro (€)`
- Click **"Next"**

**Step 5: Business details**
- **Industry category:** `Business & Industrial` or `Education`
- **Business size:** `Small (1–10 employees)`
- Click **"Next"**

**Step 6: Business objectives**
- Select **"Examine user behavior"** and **"Generate leads"**
- Click **"Create"**
- Accept the Google Analytics Terms of Service → click **"I Accept"**

**Step 7: Set up a Web data stream**
- A setup screen appears. Click **"Web"**
- **Website URL:** `https://www.corneliatrompke.com`
- **Stream name:** `corneliatrompke.com – Main`
- Click **"Create stream"**

**Step 8: Copy your Measurement ID**
- You will see a screen with a **Measurement ID** — it looks like: `G-XXXXXXXXXX`
- **Copy this ID and send it to your developer.** This is what gets embedded in the website code.

**Step 9: Add your developer as an Admin**
- In the left sidebar, click the gear icon **"Admin"** (bottom-left)
- Under the **"Account"** column (left), click **"Account Access Management"**
- Click the blue **"+"** (plus) button in the top-right corner
- Click **"Add users"**
- Enter your developer's email address
- Set Role to **"Administrator"**
- Check the box **"Notify new users by email"**
- Click **"Add"**

✅ **Done. Send your developer:** the Measurement ID (G-XXXXXXXXXX)

---

---

## PART 2 — Google Search Console

### What this is
Google Search Console shows how your website appears in Google search results, which keywords bring visitors to you, and alerts you to any indexing issues.

### Step-by-Step

**Step 1: Go to Google Search Console**
- Go to: **https://search.google.com/search-console**
- Sign in with your company Google account

**Step 2: Add your property**
- Click **"Add property"** (top-left dropdown)
- Choose **"Domain"** (the wider option — covers all subdomains like www and non-www)
- Enter: `corneliatrompke.com`
- Click **"Continue"**

**Step 3: Verify domain ownership**
Google needs to confirm you own this domain. It will show you a TXT record like:
```
google-site-verification=XXXXXXXXXXXXXXXXXXXX
```
- **Copy this TXT record**
- Log in to wherever your domain is registered (e.g. IONOS, Strato, GoDaddy, Namecheap, or wherever you purchased `corneliatrompke.com`)
- Go to your **DNS settings** for the domain
- Add a new **TXT record**:
  - **Host/Name:** `@` (or leave blank)
  - **Value/Content:** paste the full `google-site-verification=...` string
  - **TTL:** 3600 (or default)
- Save the record
- Go back to Search Console and click **"Verify"**
  - Note: DNS changes can take up to 48 hours to propagate. If verification fails immediately, wait 15–30 minutes and try again.

**Step 4: Add your developer as an Owner**
- Once verified, in the left sidebar click **"Settings"**
- Click **"Users and permissions"**
- Click **"Add user"**
- Enter your developer's email address
- Set Permission to **"Owner"** (Full access — needed to submit sitemaps and fix indexing issues)
- Click **"Add"**

✅ **Done. Let your developer know verification is complete.**

---

---

## PART 3 — GitHub

### What this is
GitHub stores the website's source code. Having it on your own GitHub account means you own the code, can back it up, and your developer can work on it with you.

### Step-by-Step

**Step 1: Create a GitHub account**
- Go to: **https://github.com/signup**
- Enter your email: `cornelia@corneliatrompke.com` (or your preferred email)
- Choose a username — something like `corneliatrompke` or `ct-consulting`
- Create a strong password
- Verify your email address when prompted

**Step 2: Set up your profile (optional but recommended)**
- Go to **https://github.com/settings/profile**
- Add your name: `Cornelia Trompke`
- You can skip the photo and bio for now

**Step 3: Create a new repository (code project)**
- Click the **"+"** icon in the top-right corner
- Select **"New repository"**
- **Repository name:** `corneliatrompke-website`
- **Description:** `Cornelia Trompke Consulting & Coaching – Official Website`
- Set visibility to **"Private"** (important — keeps your code secure)
- Leave everything else unchecked
- Click **"Create repository"**

**Step 4: Add your developer as a collaborator**
- In your new repository, click **"Settings"** (top navigation bar of the repo)
- In the left sidebar, click **"Collaborators"**
- Click **"Add people"**
- Search for your developer's GitHub username or email address
- Click **"Add [name] to this repository"**
- They will receive an email invitation and must accept it

**Step 5: Send your developer your GitHub username**
- Your developer will then push (upload) the website code to your new repository

✅ **Done. Send your developer:** your GitHub username and confirm the repository name is `corneliatrompke-website`

---

---

## PART 4 — Google Sheets & Apps Script Migration

### What this is
Your website uses a Google Sheet in your developer's Google account to:
- **Store contact form submissions** ("Leads" tab)
- **Store retreat applications** ("Applications" tab)
- **Power the retreat listings** on your website ("Retreats" tab — you add rows here to publish retreats)

You need to create your own copy in your Google account so you control the data.

### The 3-Tab Sheet Structure

Your sheet needs exactly **3 tabs** with these names (spelling and capitalisation must be exact):

| Tab Name | Purpose |
|---|---|
| `Leads` | Contact form submissions from your website |
| `Applications` | Retreat application form submissions |
| `Retreats` | Retreat listings you control (edit this to publish/unpublish retreats on the website) |

---

### STEP A — Create the Google Spreadsheet

**Step 1:** Go to **https://sheets.google.com** and sign in with your company Google account

**Step 2:** Click **"Blank spreadsheet"** (the large + icon)

**Step 3:** Rename the spreadsheet:
- Click "Untitled spreadsheet" at the top-left
- Type: `Cornelia Trompke — Website Data`
- Press Enter

---

### STEP B — Set up the "Leads" Tab

**Step 1:** At the bottom of the sheet, the default tab is called "Sheet1". **Right-click it** → **Rename** → type `Leads` → press Enter

**Step 2:** Click on cell **A1** and type the following headers across row 1 (one per cell, A1 through H1):

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 |
|---|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Phone | Services | Notes | Lead Source | Status |

**Step 3:** Select the entire row 1 (click the row number "1" on the left) → click the **Bold button (B)** in the toolbar

---

### STEP C — Set up the "Applications" Tab

**Step 1:** At the bottom of the sheet, click **"+"** (Add Sheet) to add a new tab

**Step 2:** Right-click the new tab → **Rename** → type `Applications` → press Enter

**Step 3:** Click on cell **A1** and type the following headers across row 1 (A1 through K1):

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 | I1 | J1 | K1 |
|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Phone | Retreat ID | Retreat Title | Retreat Date | Retreat Location | T&C Agreed | Notes | Status |

**Step 4:** Select row 1 → Bold it

---

### STEP D — Set up the "Retreats" Tab

**Step 1:** Click **"+"** again to add a third tab

**Step 2:** Right-click → **Rename** → type `Retreats` → press Enter

**Step 3:** Click cell **A1** and type the following headers across row 1 (A1 through L1):

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 | I1 | J1 | K1 | L1 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| ID | Date | Location | Region | Duration | Spots | Status | Visible | Title | Theme | Price | Notes |

**Step 4:** Select row 1 → Bold it

**Step 5 (Important — "Visible" column):** The website only shows retreats where the **Visible** column (H) is set to `TRUE`.
- When you add a retreat you want to show on the website, type `TRUE` in column H
- When you want to hide a retreat (e.g. full or cancelled), type `FALSE`
- **Status** values the website understands: `Open`, `Forming`, `Full`, `Cancelled`

**Example row to test (add this in row 2):**

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| R001 | September 2025 | Tuscany, Italy | Italy | 5 days | 8 | Open | TRUE | Autumn Leadership Retreat | Inner Stillness & Strategic Clarity | €2,800 | Includes accommodation |

---

### STEP E — Create the Apps Script

This is the "engine" that connects your Google Sheet to your website.

**Step 1:** In your spreadsheet, click **"Extensions"** in the top menu bar → **"Apps Script"**
- A new browser tab opens with the Apps Script editor

**Step 2:** Delete all the default code in the editor (select all with Ctrl+A / Cmd+A, then Delete)

**Step 3:** Copy the entire script below and paste it into the editor:

```javascript
/**
 * Cornelia Trompke — Google Apps Script
 * POST → writes to "Leads" or "Applications" sheet
 * GET  → returns upcoming retreats from "Retreats" sheet
 */

const LEADS_TAB        = "Leads";
const APPLICATIONS_TAB = "Applications";
const RETREATS_TAB     = "Retreats";

// ── Email notification settings ───────────────────────────────────────────────
const OWNER_EMAIL      = "cornelia@corneliatrompke.com";   // ← update this
const SENDER_NAME      = "Cornelia Trompke Website";

// ── POST ──────────────────────────────────────────────────────────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss   = SpreadsheetApp.getActiveSpreadsheet();

    if (data.retreat_id) {
      // Retreat Application
      let sheet = ss.getSheetByName(APPLICATIONS_TAB);
      if (!sheet) { sheet = ss.insertSheet(APPLICATIONS_TAB); }
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Timestamp","Name","Email","Phone","Retreat ID","Retreat Title","Retreat Date","Retreat Location","T&C Agreed","Notes","Status"]);
        sheet.getRange(1,1,1,11).setFontWeight("bold");
      }
      sheet.appendRow([
        new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" }),
        data.name || "", data.email || "", data.phone || "",
        data.retreat_id || "", data.retreat_title || "",
        data.retreat_date || "", data.retreat_location || "",
        "Yes", data.notes || "", "New"
      ]);
      // Email notification
      MailApp.sendEmail({
        to: OWNER_EMAIL, name: SENDER_NAME,
        subject: "New Retreat Application — " + (data.retreat_title || ""),
        body: "New application received:\n\nName: " + data.name + "\nEmail: " + data.email + "\nPhone: " + (data.phone || "—") + "\nRetreat: " + data.retreat_title + " (" + data.retreat_date + ")\nNotes: " + (data.notes || "—")
      });
      MailApp.sendEmail({
        to: data.email, name: SENDER_NAME,
        subject: "Your Application — " + (data.retreat_title || ""),
        body: "Dear " + data.name + ",\n\nThank you for your application for the " + data.retreat_title + " retreat.\n\nWe will be in touch shortly to confirm your place.\n\nWith warm regards,\nCornelia Trompke"
      });
      return ContentService.createTextOutput(JSON.stringify({ success: true, type: "application" })).setMimeType(ContentService.MimeType.JSON);
    }

    // General Lead
    let sheet = ss.getSheetByName(LEADS_TAB);
    if (!sheet) { sheet = ss.insertSheet(LEADS_TAB); }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp","Name","Email","Phone","Services","Notes","Lead Source","Status"]);
      sheet.getRange(1,1,1,8).setFontWeight("bold");
    }
    sheet.appendRow([
      new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" }),
      data.name || "", data.email || "", data.phone || "",
      (data.services || []).join(", "), data.notes || "",
      data.send_from || "", "New"
    ]);
    MailApp.sendEmail({
      to: OWNER_EMAIL, name: SENDER_NAME,
      subject: "New Website Enquiry — " + (data.name || ""),
      body: "New enquiry received:\n\nName: " + data.name + "\nEmail: " + data.email + "\nPhone: " + (data.phone || "—") + "\nServices: " + (data.services || []).join(", ") + "\nMessage: " + (data.notes || "—")
    });
    MailApp.sendEmail({
      to: data.email, name: SENDER_NAME,
      subject: "Thank you for your enquiry",
      body: "Dear " + data.name + ",\n\nThank you for reaching out. I will be in touch with you shortly.\n\nWith warm regards,\nCornelia Trompke\nwww.corneliatrompke.com"
    });
    return ContentService.createTextOutput(JSON.stringify({ success: true, type: "lead" })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ── GET — read upcoming retreats ──────────────────────────────────────────────
function doGet(e) {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(RETREATS_TAB);
    if (!sheet || sheet.getLastRow() < 2) {
      return ContentService.createTextOutput(JSON.stringify({ retreats: [] })).setMimeType(ContentService.MimeType.JSON);
    }
    const rows    = sheet.getDataRange().getValues();
    const headers = rows[0].map(h => h.toString().trim().toLowerCase().replace(/\s+/g, "_"));
    const retreats = rows.slice(1)
      .filter(row => {
        const visible = row[7];
        return visible === true || visible === "TRUE" || visible === "true";
      })
      .map(row => {
        const obj = {};
        headers.forEach((h, i) => { obj[h] = row[i] !== undefined ? String(row[i]) : ""; });
        return obj;
      });
    return ContentService.createTextOutput(JSON.stringify({ retreats })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ retreats: [], error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

**Step 4:** At the top of the script, update line 9:
- Change `cornelia@corneliatrompke.com` to your actual email address (the one where you want to receive notification emails)

**Step 5:** Click **"Save"** (the floppy disk icon, or Ctrl+S / Cmd+S)
- When prompted for a project name, type: `CT Website Script` → click **"Rename"**

---

### STEP F — Deploy the Apps Script as a Web App

**Step 1:** Click **"Deploy"** button (top-right, blue button) → **"New deployment"**

**Step 2:** Click the gear icon next to "Select type" → choose **"Web app"**

**Step 3:** Fill in the settings:
- **Description:** `v1 — Initial deployment`
- **Execute as:** `Me (cornelia@corneliatrompke.com)`
- **Who has access:** `Anyone` (⚠️ This must be set to "Anyone" — this is what allows the website to send data to the sheet)

**Step 4:** Click **"Deploy"**

**Step 5:** A popup appears asking you to authorise the script:
- Click **"Authorise access"**
- A Google sign-in/authorisation screen appears — choose your Google account
- You may see a warning: *"Google hasn't verified this app"* — this is normal for personal scripts
  - Click **"Advanced"** (bottom-left of the warning)
  - Click **"Go to CT Website Script (unsafe)"** — this is safe, it is your own script
- Review the permissions and click **"Allow"**

**Step 6:** After authorising, the deployment completes. You will see a screen with:
- **Deployment ID** — a long string
- **Web app URL** — looks like: `https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXXXXXX/exec`

**⚠️ CRITICAL: Copy the entire Web app URL and send it to your developer.** This is the address the website uses to send contact forms and fetch retreat data.

---

### STEP G — Transfer existing data (optional)

If you want to keep the submissions already captured in the developer's Google Sheet:

**Step 1:** Ask your developer to share their current Google Sheet with you (view access)

**Step 2:** Open their sheet, go to each tab (Leads, Applications, Retreats)

**Step 3:** Select all rows **below the header row** (row 2 onwards) → Copy (Ctrl+C / Cmd+C)

**Step 4:** Go to your new sheet, click on the same tab, click on cell **A2** → Paste (Ctrl+V / Cmd+V)

Repeat for each tab.

---

### STEP H — What to send your developer

Once you have completed all steps, send your developer:

| Item | What it looks like |
|---|---|
| **GA4 Measurement ID** | `G-XXXXXXXXXX` |
| **Google Sheet Web App URL** | `https://script.google.com/macros/s/.../exec` |
| **GitHub username** | e.g. `corneliatrompke` |
| **Confirmation** that Search Console is verified | Just a message saying it's done |

---

## CHECKLIST

- [ ] Google Analytics 4 account created and Measurement ID sent to developer
- [ ] Developer added as Admin in Google Analytics
- [ ] Google Search Console property added and verified (TXT record in DNS)
- [ ] Developer added as Owner in Search Console
- [ ] GitHub account created
- [ ] GitHub repository `corneliatrompke-website` created (Private)
- [ ] Developer added as collaborator on GitHub
- [ ] Google Sheet created with 3 tabs: Leads, Applications, Retreats
- [ ] Apps Script pasted, email address updated, saved
- [ ] Apps Script deployed as Web App ("Anyone" access)
- [ ] Web App URL copied and sent to developer

---

*Guide prepared by your developer. If anything is unclear, send a screenshot and ask — happy to help.*
