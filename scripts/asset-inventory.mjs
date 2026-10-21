import { readdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
async function scan(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map(async (e) => {
        const file = join(dir, e.name);
        if (e.isDirectory()) return scan(file);
        const data = await readFile(file);
        return [
          {
            file: file.replaceAll("\\", "/"),
            bytes: data.length,
            sha256: createHash("sha256").update(data).digest("hex"),
          },
        ];
      }),
    )
  ).flat();
}
const files = await scan("public");
await writeFile(
  "docs/asset-inventory.json",
  JSON.stringify(
    {
      generated: new Date().toISOString(),
      originalLogoSha256:
        "b870d1ef21fcec9aade06ccb15ccb1330859a68931876badb639e52034707ec4",
      files,
    },
    null,
    2,
  ) + "\n",
);
console.log(`${files.length} public assets inventoried with size and SHA-256.`);
