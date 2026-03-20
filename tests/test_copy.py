import asyncio
from playwright.async_api import async_playwright

APP_URL = "https://executive-luxury-1.preview.emergentagent.com"

async def check_page(page, url, checks, page_name):
    print(f"\n--- Testing {page_name} ---")
    await page.goto(url)
    await page.wait_for_timeout(4000)
    body_text = await page.evaluate("() => document.body.innerText")
    for text in checks:
        status = "FOUND" if text in body_text else "MISSING"
        print(f"  [{status}] {text}")

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1920, "height": 1080})

        # Homepage
        await check_page(page, APP_URL + "/", [
            "The Work That Changes How You Lead",
            "From the Inside Out",
            "Berlin & Worldwide",
            "This Is Where It Begins",
            "An Advisor Who Works Where Most Never Go",
            "One Direction. Four Ways to Begin.",
        ], "Homepage")

        # Method page
        await check_page(page, APP_URL + "/how-i-work", [
            "What Becomes Possible When the Work Goes Deep",
            "Most Leadership Development",
        ], "Method Page")

        # Executive Coaching
        await check_page(page, APP_URL + "/executive-coaching", [
            "A Container for the Work That Actually Matters",
            "You've Outgrown Standard Coaching",
        ], "Executive Coaching")

        # Organizational Advisory
        await check_page(page, APP_URL + "/organizational-advisory", [
            "Your Organisation Has a Nervous System, Too",
        ], "Organizational Advisory")

        # Team Facilitation
        await check_page(page, APP_URL + "/leadership-team-facilitation", [
            "Most Team Problems",
        ], "Team Facilitation")

        # Executive Retreats
        await check_page(page, APP_URL + "/executive-retreats", [
            "The Space Your Real Questions Have Been Waiting For",
        ], "Executive Retreats")

        # Work With Me
        await check_page(page, APP_URL + "/work-with-me", [
            "Four Ways We Can Work Together",
        ], "Work With Me")

        # About page - should be UNCHANGED
        await check_page(page, APP_URL + "/about-me", [
            "Two Decades. One Direction.",
        ], "About Page (UNCHANGED)")

        await browser.close()

asyncio.run(main())
