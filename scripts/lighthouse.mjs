import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
const chrome = await launch({
  chromePath:
    process.env.CHROME_PATH ||
    join(
      process.env["PROGRAMFILES(X86)"] || "C:/Program Files (x86)",
      "Microsoft/Edge/Application/msedge.exe",
    ),
  chromeFlags: ["--headless", "--disable-gpu", "--no-first-run"],
});
await mkdir("docs/qa", { recursive: true });
try {
  for (const mode of ["mobile", "desktop"]) {
    const result = await lighthouse("http://127.0.0.1:4180/", {
      port: chrome.port,
      output: ["json", "html"],
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      ...(mode === "desktop"
        ? {
            formFactor: "desktop",
            screenEmulation: {
              mobile: false,
              width: 1440,
              height: 1000,
              deviceScaleFactor: 1,
              disabled: false,
            },
            throttling: {
              rttMs: 40,
              throughputKbps: 10240,
              cpuSlowdownMultiplier: 1,
            },
          }
        : {}),
    });
    await writeFile(`docs/qa/lighthouse-${mode}.json`, result.report[0]);
    await writeFile(`docs/qa/lighthouse-${mode}.html`, result.report[1]);
    console.log(
      mode,
      Object.fromEntries(
        Object.entries(result.lhr.categories).map(([key, value]) => [
          key,
          Math.round(value.score * 100),
        ]),
      ),
    );
    console.log(
      "METRICS",
      Object.fromEntries(
        [
          "first-contentful-paint",
          "largest-contentful-paint",
          "total-blocking-time",
          "cumulative-layout-shift",
          "speed-index",
        ].map((key) => [key, result.lhr.audits[key].displayValue]),
      ),
    );
    console.log(
      "IMPROVEMENTS",
      Object.entries(result.lhr.audits)
        .filter(
          ([, value]) =>
            value.score !== null &&
            value.score < 0.9 &&
            value.details?.type === "opportunity",
        )
        .map(([key, value]) => [key, value.displayValue]),
    );
  }
} finally {
  await chrome.kill();
}
