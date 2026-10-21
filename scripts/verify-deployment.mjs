import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const origin = "https://ish3-is.github.io/MDR";
const { publicRoutes } = await import(
  pathToFileURL(resolve(".prerender/prerender.js")).href
);
const routes = publicRoutes.flatMap((route) => [
  route,
  "/en" + (route === "/" ? "/" : route),
]);
const results = [];
const assets = new Set();
for (let i = 0; i < routes.length; i += 8) {
  results.push(
    ...(await Promise.all(
      routes.slice(i, i + 8).map(async (route) => {
        const url = origin + (route.endsWith("/") ? route : route + "/");
        const response = await fetch(url, {
          signal: AbortSignal.timeout(30000),
        });
        const html = await response.text();
        assert.equal(response.status, 200, url);
        assert.match(
          html,
          route.startsWith("/en/")
            ? /lang="en" dir="ltr"/
            : /lang="ar" dir="rtl"/,
        );
        assert.match(html, /<h1(?: |>)/);
        assert.ok(
          html.includes(`<link rel="canonical" href="${url}"`),
          "Canonical URL for " + url,
        );
        for (const match of html.matchAll(/(?:href|src|poster)="([^\"]+)"/g))
          if (
            match[1].startsWith("/MDR/") &&
            /\.(?:webp|png|js|css)$/.test(match[1])
          )
            assets.add(match[1]);
        return {
          url,
          status: response.status,
          htmlLanguage: "PASS",
          prerender: "PASS",
          canonical: "PASS",
        };
      }),
    )),
  );
}
assets.add("/MDR/videos/madar-welcome-12s.mp4");
assets.add("/MDR/videos/madar-welcome-12s.webm");
assets.add("/MDR/fonts/ArabicDisplay.woff2");
const assetResults = [];
for (const path of assets) {
  const response = await fetch("https://ish3-is.github.io" + path, {
    method: "HEAD",
    signal: AbortSignal.timeout(30000),
  });
  assert.equal(response.status, 200, path);
  assetResults.push({
    path,
    status: response.status,
    contentType: response.headers.get("content-type"),
  });
}
const sitemap = await fetch(origin + "/sitemap.xml");
assert.equal(sitemap.status, 200);
assert.equal(((await sitemap.text()).match(/<loc>/g) || []).length, 68);
const report = {
  checkedAt: new Date().toISOString(),
  site: origin + "/",
  pages: results,
  assets: assetResults,
  sitemapEntries: 68,
  result: "PASS",
};
await writeFile(
  "docs/qa/deployment-verification.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(
  `PASS: ${results.length} deployed pages, ${assetResults.length} public assets, canonical/language metadata and sitemap with 68 entries.`,
);
