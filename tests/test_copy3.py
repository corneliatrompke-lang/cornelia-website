import asyncio
from playwright.async_api import async_playwright

APP_URL = "https://trompke-executive.preview.emergentagent.com"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1920, "height": 1080})

        # Org Advisory - get all h1/h2/h3 headings
        await page.goto(APP_URL + "/organizational-advisory")
        await page.wait_for_timeout(5000)
        headings = await page.evaluate("""() => {
            return Array.from(document.querySelectorAll('h1,h2,h3,h4')).map(h => h.innerText);
        }""")
        print("OrgAdvisory headings:", headings)

        # Team Facilitation
        await page.goto(APP_URL + "/leadership-team-facilitation")
        await page.wait_for_timeout(5000)
        headings2 = await page.evaluate("""() => {
            return Array.from(document.querySelectorAll('h1,h2,h3,h4')).map(h => h.innerText);
        }""")
        print("TeamFacilit headings:", headings2)

        # Executive Retreats
        await page.goto(APP_URL + "/executive-retreats")
        await page.wait_for_timeout(5000)
        headings3 = await page.evaluate("""() => {
            return Array.from(document.querySelectorAll('h1,h2,h3,h4')).map(h => h.innerText);
        }""")
        print("Retreats headings:", headings3)

        # Method page
        await page.goto(APP_URL + "/how-i-work")
        await page.wait_for_timeout(5000)
        headings4 = await page.evaluate("""() => {
            return Array.from(document.querySelectorAll('h1,h2,h3,h4')).map(h => h.innerText);
        }""")
        print("Method headings:", headings4)

        await browser.close()

asyncio.run(main())
