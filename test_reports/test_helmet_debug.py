import asyncio
from playwright.async_api import async_playwright

BASE_URL = "https://nervous-system-exec.preview.emergentagent.com"

async def run_tests():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1920, "height": 1080})
        
        # Test homepage with extra wait for preloader
        await page.goto(BASE_URL, wait_until='load', timeout=30000)
        await page.wait_for_timeout(5000)  # Wait for preloader to finish
        
        title = await page.title()
        print(f"Homepage title after 5s: {title}")
        
        # Check if react-helmet title elements are in DOM
        title_in_dom = await page.evaluate("""() => {
            const titleEls = document.querySelectorAll('title');
            return Array.from(titleEls).map(t => t.textContent);
        }""")
        print(f"Title elements in DOM: {title_in_dom}")
        
        meta_desc = await page.evaluate("""() => {
            const metas = Array.from(document.querySelectorAll('meta[name="description"]'));
            return metas.map(m => m.getAttribute('content'));
        }""")
        print(f"Meta descriptions: {meta_desc}")
        
        # Check for any Helmet data attributes
        helmet_els = await page.evaluate("""() => {
            return document.head.innerHTML.substring(0, 2000);
        }""")
        print(f"Head HTML (first 2000 chars): {helmet_els}")
        
        await browser.close()

asyncio.run(run_tests())
