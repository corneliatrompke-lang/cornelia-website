import asyncio
from playwright.async_api import async_playwright

APP_URL = "https://cornelia-coaching.preview.emergentagent.com"

async def get_page_text(page, url):
    await page.goto(url)
    await page.wait_for_timeout(5000)
    return await page.evaluate("() => document.body.innerText")

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1920, "height": 1080})

        # Method page - check what's actually there
        text = await get_page_text(page, APP_URL + "/how-i-work")
        if "Most Leadership" in text:
            print("Method: Found 'Most Leadership'")
        # Search for the key phrase
        lines = [l for l in text.split('\n') if 'leadership' in l.lower() or 'deep' in l.lower()]
        print("Method relevant lines:", lines[:5])

        # Org Advisory
        text = await get_page_text(page, APP_URL + "/organizational-advisory")
        if "Nervous System" in text:
            print("OrgAdvisory: Found 'Nervous System'")
        lines2 = [l for l in text.split('\n') if 'nervous' in l.lower() or 'organisation' in l.lower() or 'organization' in l.lower()]
        print("OrgAdvisory relevant lines:", lines2[:5])

        # Team Facilitation
        text = await get_page_text(page, APP_URL + "/leadership-team-facilitation")
        if "Team Problems" in text:
            print("TeamFacilit: Found 'Team Problems'")
        lines3 = [l for l in text.split('\n') if 'team' in l.lower() and 'problem' in l.lower()]
        print("TeamFacilit relevant lines:", lines3[:5])

        # Executive Retreats
        text = await get_page_text(page, APP_URL + "/executive-retreats")
        if "Real Questions" in text:
            print("Retreats: Found 'Real Questions'")
        lines4 = [l for l in text.split('\n') if 'space' in l.lower() or 'question' in l.lower() or 'waiting' in l.lower()]
        print("Retreats relevant lines:", lines4[:5])

        await browser.close()

asyncio.run(main())
