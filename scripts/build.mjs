import { build } from "vite";
import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";
await build();
await build({
  build: { ssr: "src/prerender.tsx", outDir: ".prerender", emptyOutDir: true },
});
const { render, pageMeta, publicRoutes } = await import(
  pathToFileURL(resolve(".prerender/prerender.js")).href
);
let template = await readFile("dist/index.html", "utf8");
// Static pages carry their small compressed stylesheet with the HTML to avoid
// a render-blocking network round trip on mobile connections.
for (const match of [
  ...template.matchAll(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g),
]) {
  const cssPath = match[1].replace(/^.*?assets\//, "assets/");
  template = template.replace(
    match[0],
    `<style>${await readFile(join("dist", cssPath), "utf8")}</style>`,
  );
}
const base = process.env.VITE_BASE_PATH || "/";
const origin = (process.env.VITE_SITE_URL || "").replace(/\/$/, "");
if (origin && !/^https?:\/\/[^\s<>"']+$/.test(origin))
  throw new Error(
    "VITE_SITE_URL must be a valid HTTP(S) site URL without a trailing slash.",
  );
const escape = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const routeUrl = (route) =>
  origin + (route === "/" ? "/" : route.replace(/\/$/, "") + "/");
const routes = publicRoutes.flatMap((route) => [
  route,
  "/en" + (route === "/" ? "/" : route),
]);
for (const route of [
  ...routes,
  "/portfolio",
  "/en/portfolio",
  "/404",
  "/en/404",
]) {
  const meta = pageMeta(
    route === "/portfolio"
      ? "/projects"
      : route === "/en/portfolio"
        ? "/en/projects"
        : route,
  );
  let seo = `<meta name="description" content="${escape(meta.description)}"/><meta name="robots" content="${meta.known ? "index,follow" : "noindex,follow"}"/><meta property="og:type" content="website"/><meta property="og:site_name" content="MADAR — مدار"/><meta property="og:title" content="${escape(meta.title)}"/><meta property="og:description" content="${escape(meta.description)}"/><meta property="og:locale" content="${meta.lang === "ar" ? "ar_SA" : "en_US"}"/><meta name="twitter:card" content="summary_large_image"/>`;
  const image = origin
    ? origin + "/videos/madar-poster.webp"
    : base + "videos/madar-poster.webp";
  if (meta.route === "/" && meta.lang === "ar")
    seo += `<link rel="preload" href="${base}fonts/ArabicDisplay.woff2" as="font" type="font/woff2" crossorigin/>`;
  if (meta.route === "/")
    seo += `<link rel="preload" href="${base}videos/madar-poster-preview.webp" as="image" fetchpriority="high"/>`;
  seo += `<meta property="og:image" content="${escape(image)}"/><meta property="og:image:width" content="1920"/><meta property="og:image:height" content="1080"/><meta property="og:image:alt" content="MADAR — نصنع التقنية. ونوسّع أثرها."/>`;
  if (origin && meta.known) {
    seo += `<link rel="canonical" href="${escape(routeUrl(route === "/portfolio" ? "/projects" : route === "/en/portfolio" ? "/en/projects" : route))}"/><meta property="og:url" content="${escape(routeUrl(route === "/portfolio" ? "/projects" : route === "/en/portfolio" ? "/en/projects" : route))}"/>`;
    for (const lang of ["ar", "en", "x-default"])
      seo += `<link rel="alternate" hreflang="${lang}" href="${escape(routeUrl((lang === "en" ? "/en" : "") + (meta.route === "/" ? "/" : meta.route)))}"/>`;
    if (meta.route === "/")
      seo += `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: "MADAR — مدار", url: origin + "/", inLanguage: ["ar", "en"], description: meta.description }).replace(/</g, "\\u003c")}</script>`;
  }
  const renderRoute =
    route === "/portfolio"
      ? "/projects"
      : route === "/en/portfolio"
        ? "/en/projects"
        : route;
  const html = template
    .replace(
      '<html lang="ar" dir="rtl">',
      `<html lang="${meta.lang}" dir="${meta.lang === "ar" ? "rtl" : "ltr"}">`,
    )
    .replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace("<!--seo-->", seo)
    .replace(
      '<div id="root"></div>',
      `<div id="root" data-prerender="true">${render(renderRoute)}</div>`,
    );
  const target = route === "/" ? "dist" : join("dist", route.slice(1));
  await mkdir(target, { recursive: true });
  await writeFile(join(target, "index.html"), html);
}
await copyFile("dist/404/index.html", "dist/404.html");
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ""}`,
);
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${origin ? routes.map((route) => `<url><loc>${escape(routeUrl(route === "/portfolio" ? "/projects" : route === "/en/portfolio" ? "/en/projects" : route))}</loc></url>`).join("") : ""}</urlset>\n`,
);
await writeFile("dist/.nojekyll", "");
console.log(
  `Prerendered ${routes.length} localized pages + legacy aliases and 404. Base: ${base}. ${origin ? "Canonical + sitemap generated for " + origin : "Set VITE_SITE_URL for production canonical URLs and sitemap entries."}`,
);
