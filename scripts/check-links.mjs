import { readFile, writeFile } from "node:fs/promises";
const sources = JSON.parse(
  await readFile("docs/repository-sources.json", "utf8"),
);
const urls = [
  ...sources.map((s) => "https://github.com/" + s.repo),
  "https://ish3-is.github.io/Aljuri/",
  ...["mdr_Tech", "sh3_JU", "mesh_TU", "mesh_UB", "sh3_o", "mstr_mis"].map(
    (c) => "https://t.me/" + c,
  ),
  "https://github.com/ish3-is",
  "https://github.com/Rer-cys",
  "https://github.com/aljory002151-star",
  "https://www.linkedin.com/company/mdr-org/",
  "https://www.linkedin.com/in/remas-alqahtani-1674b33a8",
];
const results = [];
for (let i = 0; i < urls.length; i += 5) {
  results.push(
    ...(await Promise.all(
      urls.slice(i, i + 5).map(async (url) => {
        try {
          const response = await fetch(url, {
            redirect: "follow",
            signal: AbortSignal.timeout(12000),
          });
          await response.body?.cancel();
          return {
            url,
            status: response.status,
            finalUrl: response.url,
            ok: response.ok,
          };
        } catch (error) {
          return { url, status: null, ok: false, error: error.message };
        }
      }),
    )),
  );
}
await writeFile(
  "docs/qa/external-links.json",
  JSON.stringify(
    {
      date: new Date().toISOString(),
      note: "Read-only HTTP checks. Social providers may restrict automated access; no message was sent.",
      results,
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify(
    {
      checked: results.length,
      success: results.filter((r) => r.ok).length,
      needsReview: results.filter((r) => !r.ok),
    },
    null,
    2,
  ),
);
