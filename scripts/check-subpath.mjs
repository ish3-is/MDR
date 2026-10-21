import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const results = [];
try {
  for (const javaScriptEnabled of [false, true]) {
    const context = await browser.newContext({ javaScriptEnabled });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const route of [
      "",
      "projects/mizan/",
      "services/soc/",
      "en/projects/",
      "en/contact/",
    ]) {
      const url = "http://127.0.0.1:4181/MADAR/" + route;
      const response = await page.goto(url);
      assert.equal(response.status(), 200, url);
      assert.equal(await page.locator("main h1").count(), 1, url);
      const hrefs = await page
        .locator('a[href^="/"]')
        .evaluateAll((links) => links.map((a) => a.getAttribute("href")));
      assert.ok(
        hrefs.every((href) => href === "/MADAR" || href.startsWith("/MADAR/")),
        "Every SSR/client link must include the project base",
      );
      await page.reload();
      assert.equal(await page.locator("main h1").count(), 1);
      assert.equal(
        await page.locator('link[rel="canonical"]').getAttribute("href"),
        "https://example.invalid/MADAR/" + route,
      );
      results.push({
        url,
        javaScriptEnabled,
        directNavigation: "PASS",
        reload: "PASS",
        links: "PASS",
        canonical: "PASS",
      });
    }
    assert.deepEqual(errors, []);
    await context.close();
  }
  await writeFile(
    "docs/qa/subpath.json",
    JSON.stringify(
      {
        date: new Date().toISOString(),
        server: "Python static HTTP server, no SPA fallback",
        results,
      },
      null,
      2,
    ),
  );
  console.log(
    "PASS: direct routes, refresh, Arabic/English, asset/link bases and canonical URLs under /MADAR/, with and without JavaScript.",
  );
} finally {
  await browser.close();
}
