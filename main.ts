// one-line-laugh-20261124 — writes the entry line to /output/entry.txt.
// The line lives in entry.txt next to this script; this program only copies it
// into the grader's output directory, resolving paths from the script itself.
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const line = readFileSync(join(here, "entry.txt"), "utf8").trim();

if (line.length < 1 || line.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${line.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, line, "utf8");

// Read back what was written so a truncated or mangled write fails loudly
// instead of shipping a broken entry.
const written = readFileSync(outPath, "utf8");
if (written !== line) {
  throw new Error("read-back mismatch: output does not match entry.txt");
}
