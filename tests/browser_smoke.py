from __future__ import annotations

import os
import argparse
import shutil
import socket
import subprocess
import sys
import time
from pathlib import Path

from playwright.sync_api import Page, sync_playwright


ROOT = Path(__file__).resolve().parents[1]
RESULTS = ROOT / "test-results"
BASE_URL = "http://127.0.0.1:4173/douyin-live-dashboard-portfolio/"


def wait_for_port(port: int, timeout: float = 15) -> None:
    deadline = time.time() + timeout
    while time.time() < deadline:
        with socket.socket() as connection:
            connection.settimeout(0.3)
            if connection.connect_ex(("127.0.0.1", port)) == 0:
                return
        time.sleep(0.2)
    raise RuntimeError(f"preview server did not open port {port}")


def assert_page(page: Page, width: int, height: int) -> None:
    page.set_viewport_size({"width": width, "height": height})
    page.goto(BASE_URL, wait_until="networkidle")
    assert page.title() == "抖音直播电商健康诊断看板｜在线作品页"
    assert page.locator("main section[id]").count() == 12
    assert page.locator("#delivery .delivery-value-card").count() == 4
    assert page.locator("#delivery tbody tr").count() == 6
    assert page.locator("#metrics .metric-table tbody tr").count() == 15
    assert page.locator("#metrics .metric-table").get_by_text("首次出现后超过3分钟仍再次被识别到的观众占比。").is_visible()
    overflow = page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
    assert overflow <= 1, f"page overflows by {overflow}px at {width}px"
    video = page.locator("video")
    assert video.count() == 1
    video.wait_for(state="visible")
    page.wait_for_function("document.querySelector('video')?.readyState >= 1")
    duration = video.evaluate("video => video.duration")
    assert 55 <= duration <= 65
    table_scrolls = page.locator(".table-scroll")
    assert table_scrolls.count() >= 1
    RESULTS.mkdir(exist_ok=True)
    page.screenshot(path=RESULTS / f"portfolio-{width}.png", full_page=True)


def assert_interactions(page: Page) -> None:
    page.set_viewport_size({"width": 1440, "height": 900})
    page.goto(BASE_URL, wait_until="networkidle")
    page.locator('a[href="#metrics"]').filter(has_text="查看指标口径").click()
    page.wait_for_url("**#metrics")
    assert page.locator("#metrics-title").is_visible()

    page.locator('a[href="#delivery"]').first.click()
    page.wait_for_url("**#delivery")
    assert page.locator("#delivery-title").is_visible()
    page.wait_for_function("document.querySelector('.sidebar-desktop a[aria-current=\"location\"]')?.getAttribute('href') === '#delivery'")

    preview = page.get_by_role("button", name="打开看板原尺寸预览")
    preview.click()
    assert page.get_by_role("dialog").is_visible()
    page.keyboard.press("Escape")
    assert not page.get_by_role("dialog").is_visible()

    text_preview = page.get_by_role("button", name="查看大图")
    text_preview.click()
    page.keyboard.press("Escape")
    assert page.evaluate("document.activeElement?.textContent?.includes('查看大图')")

    page.set_viewport_size({"width": 768, "height": 900})
    page.goto(BASE_URL, wait_until="networkidle")
    menu = page.get_by_role("button", name="目录", exact=True)
    menu.click()
    assert menu.get_attribute("aria-expanded") == "true"
    assert page.evaluate("document.querySelector('#main-content')?.inert === true")
    assert page.get_by_role("button", name="关闭目录").count() >= 1
    page.set_viewport_size({"width": 1024, "height": 900})
    page.wait_for_function("document.querySelector('.menu-button')?.getAttribute('aria-expanded') === 'false'")
    assert page.evaluate("document.body.style.overflow !== 'hidden'")
    assert page.evaluate("document.querySelector('#main-content')?.inert === false")

    page.set_viewport_size({"width": 768, "height": 900})
    menu.click()
    page.keyboard.press("Escape")
    assert menu.get_attribute("aria-expanded") == "false"
    assert page.evaluate("document.activeElement?.classList.contains('menu-button')")

    page.set_viewport_size({"width": 390, "height": 844})
    page.goto(BASE_URL + "#delivery", wait_until="networkidle")
    assert page.locator("#delivery-title").is_visible()
    comparison = page.locator("#delivery .table-scroll")
    assert comparison.evaluate("element => element.scrollWidth > element.clientWidth")
    assert page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth") <= 1


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--node", help="path to the Node.js executable")
    parser.add_argument("--browser-exe", help="path to a Chromium executable")
    args = parser.parse_args()
    node = args.node or shutil.which("node")
    if node is None:
        raise RuntimeError("node is not available on PATH")
    vite = ROOT / "node_modules" / "vite" / "bin" / "vite.js"
    server = subprocess.Popen(
        [node, str(vite), "preview", "--host", "127.0.0.1", "--port", "4173"],
        cwd=ROOT,
        env=os.environ.copy(),
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0),
    )
    try:
        wait_for_port(4173)
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True, executable_path=args.browser_exe)
            errors: list[str] = []
            for width, height in ((1440, 900), (1024, 900), (768, 900), (390, 844)):
                page = browser.new_page()
                page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
                page.on("pageerror", lambda error: errors.append(str(error)))
                page.on("response", lambda response: errors.append(f"HTTP {response.status} {response.url}") if response.status >= 400 else None)
                assert_page(page, width, height)
                page.close()
            interaction_page = browser.new_page()
            interaction_page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
            interaction_page.on("pageerror", lambda error: errors.append(str(error)))
            interaction_page.on("response", lambda response: errors.append(f"HTTP {response.status} {response.url}") if response.status >= 400 else None)
            assert_interactions(interaction_page)
            interaction_page.close()
            browser.close()
            assert not errors, "browser errors: " + " | ".join(errors)
    finally:
        server.terminate()
        try:
            server.wait(timeout=5)
        except subprocess.TimeoutExpired:
            server.kill()
    print("browser smoke checks passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
