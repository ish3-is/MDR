import { readdir, readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import assert from "node:assert/strict";
const root = resolve("dist");
const base = process.env.VITE_BASE_PATH || "/";
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? walk(join(dir, e.name)) : join(dir, e.name),
      ),
    )
  ).flat();
}
const pages = (await walk(root)).filter((p) => p.endsWith(".html"));
let links = 0,
  media = 0;
const failures = [];
for (const file of pages) {
  const html = await readFile(file, "utf8");
  assert.match(html, /data-prerender="true"/);
  assert.equal((html.match(/<h1(?: |>)/g) || []).length, 1, file + ": one h1");
  assert.match(html, /<meta name="description" content="[^\"]+"/);
  assert.match(
    html,
    file.replaceAll("\\", "/").includes("/en/")
      ? /lang="en" dir="ltr"/
      : /lang="ar" dir="rtl"/,
  );
  for (const match of html.matchAll(/(?:href|src|poster)="([^\"]+)"/g)) {
    const url = match[1].replace(/&amp;/g, "&");
    if (!url.startsWith("/")) continue;
    const isBaseRoot = url === base.replace(/\/$/, "");
    if (!isBaseRoot && !url.startsWith(base)) {
      failures.push(`${file}: URL does not use base ${url}`);
      continue;
    }
    const local = isBaseRoot
      ? ""
      : decodeURIComponent(url.slice(base.length).split(/[?#]/)[0]);
    const target = join(root, local);
    try {
      const s = await stat(target);
      if (s.isDirectory()) await stat(join(target, "index.html"));
    } catch {
      failures.push(`${file}: missing ${url}`);
    }
    if (/\.(png|webp|woff2|mp4|webm|otf|css|js)$/.test(local)) media++;
    else links++;
  }
}
assert.deepEqual(failures, []);
console.log(
  `PASS: ${pages.length} prerendered HTML files, ${links} internal references, ${media} asset references. No missing paths or base-path errors.`,
);
