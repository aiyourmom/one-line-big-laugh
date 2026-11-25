import { writeFileSync, mkdirSync } from "node:fs";

const TEXT =
  "I asked my smart speaker to play something relaxing, so it started reading my search history out loud in a soothing voice.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
if (TEXT.includes("\n") || TEXT.length < 1 || TEXT.length > 200 || TEXT.trim().length === 0) {
  throw new Error(`gate violation: text must be one line, 1-200 chars (got ${TEXT.length})`);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, TEXT, "utf8");
console.log(`wrote ${TEXT.length} characters to ${outDir}/entry.txt`);
