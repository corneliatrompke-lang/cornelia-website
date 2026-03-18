import asyncio
from playwright.async_api import async_playwright

BASE_URL = "https://cornelia-coaching.preview.emergentagent.com"

async def run_tests():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1920, "height": 1080})
        
        results = {}
        
        # Test 1: Homepage title (wait for preloader)
        await page.goto(BASE_URL, wait_until='load', timeout=30000)
        await page.wait_for_timeout(5000)
        title = await page.title()
        print(f"[1] Homepage title: {title}")
        results['homepage_title'] = 'Executive Leadership Coaching Berlin' in title
        print(f"  {'PASS' if results['homepage_title'] else 'FAIL'}")

        # Test 2: Homepage meta description
        meta_desc = await page.evaluate("() => { const el = document.querySelector('meta[name=\"description\"]'); return el ? el.getAttribute('content') : 'NOT FOUND'; }")
        print(f"[2] Meta description snippet: {meta_desc[:80]}")
        results['meta_desc'] = 'trauma-informed' in meta_desc.lower() or 'nervous system' in meta_desc.lower()
        print(f"  {'PASS' if results['meta_desc'] else 'FAIL'}")

        # Test 3: Favicon
        favicon_href = await page.evaluate("() => { const el = document.querySelector('link[rel*=\"icon\"]'); return el ? el.href : 'NOT FOUND'; }")
        print(f"[3] Favicon: {favicon_href}")
        results['favicon'] = 'favicon.png' in favicon_href
        print(f"  {'PASS' if results['favicon'] else 'FAIL'}")

        # Test 4: Executive Coaching page title
        await page.goto(f"{BASE_URL}/executive-coaching", wait_until='load', timeout=30000)
        await page.wait_for_timeout(5000)
        exec_title = await page.title()
        print(f"[4] Executive Coaching title: {exec_title}")
        results['exec_title'] = 'Executive Coaching' in exec_title and 'Advisory' in exec_title
        print(f"  {'PASS' if results['exec_title'] else 'FAIL'}")

        # Test 5: About page title
        await page.goto(f"{BASE_URL}/about-me", wait_until='load', timeout=30000)
        await page.wait_for_timeout(5000)
        about_title = await page.title()
        print(f"[5] About page title: {about_title}")
        results['about_title'] = 'Cornelia Trompke' in about_title and ('About' in about_title or 'Coach' in about_title)
        print(f"  {'PASS' if results['about_title'] else 'FAIL'}")

        # Test 6: send_from on Executive Coaching
        await page.goto(f"{BASE_URL}/executive-coaching", wait_until='load', timeout=30000)
        await page.wait_for_timeout(5000)
        # Find any button to open form
        btns = await page.query_selector_all('button')
        btn_texts = []
        for b in btns[:10]:
            t = await b.inner_text()
            btn_texts.append(t.strip()[:30])
        print(f"[6] Buttons found: {btn_texts}")
        
        # Try clicking any CTA button
        clicked = False
        for selector in ['[data-testid="coaching-hero-cta"]', 'button:has-text("Begin")', 'button:has-text("Apply")', 'button:has-text("Inquire")', 'button:has-text("Work")']:
            el = await page.query_selector(selector)
            if el:
                await el.click(force=True)
                await page.wait_for_timeout(1500)
                clicked = True
                print(f"  Clicked: {selector}")
                break
        
        if clicked:
            send_from = await page.evaluate("() => { const el = document.querySelector('input[name=\"send_from\"]'); return el ? el.value : 'NOT FOUND'; }")
            print(f"  send_from value: {send_from}")
            results['exec_send_from'] = 'Executive Coaching' in send_from or 'executive' in send_from.lower()
        else:
            print("  No CTA button found")
            results['exec_send_from'] = False
        print(f"  {'PASS' if results['exec_send_from'] else 'FAIL'}")

        # Test 7: About Me page - Begin the Work nav button
        await page.goto(f"{BASE_URL}/about-me", wait_until='load', timeout=30000)
        await page.wait_for_timeout(5000)
        
        # Look for nav CTA button
        nav_btns = await page.query_selector_all('button, a')
        nav_btn_texts = []
        for b in nav_btns[:20]:
            t = await b.inner_text()
            nav_btn_texts.append(t.strip()[:30])
        print(f"[7] Nav buttons on About: {nav_btn_texts[:15]}")
        
        begin_btn = None
        for selector in ['button:has-text("Begin the Work")', 'a:has-text("Begin the Work")', 'button:has-text("Begin")', '[data-testid*="nav"][data-testid*="cta"]']:
            el = await page.query_selector(selector)
            if el:
                begin_btn = el
                print(f"  Found Begin button: {selector}")
                break
        
        if begin_btn:
            await begin_btn.click(force=True)
            await page.wait_for_timeout(1500)
            send_from_about = await page.evaluate("() => { const el = document.querySelector('input[name=\"send_from\"]'); return el ? el.value : 'NOT FOUND'; }")
            print(f"  send_from on About: {send_from_about}")
            results['about_send_from'] = 'About' in send_from_about
        else:
            print("  'Begin the Work' button not found on About page")
            results['about_send_from'] = False
        print(f"  {'PASS' if results['about_send_from'] else 'FAIL'}")

        await browser.close()
        
        total = len(results)
        passed = sum(1 for v in results.values() if v)
        print(f"\n=== RESULTS: {passed}/{total} passed ===")
        for k, v in results.items():
            print(f"  {'PASS' if v else 'FAIL'}: {k}")

asyncio.run(run_tests())
