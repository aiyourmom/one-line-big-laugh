import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Line, Big Laugh v2 — the speaker stops leaking history and turns
// therapist/judge instead: it pauses, then calls the user out by weekday.
const JOKE_LINES = [
  "I told my smart speaker to calm me down.",
  "It read my search history aloud, paused,",
  "and said: 'We need to talk about Tuesday.'",
];

const ENTRY = JOKE_LINES.join(" ");

function failGate(reason: string): never {
  throw new Error(
    `gate violation (${reason}): entry must be one line, 1-200 chars`,
  );
}

function checkEntry(line: string): void {
  const checks: Array<[string, boolean]> = [
    ["single-line", !line.includes("\n")],
    ["min-length", line.length >= 1],
    ["max-length", line.length <= 200],
    ["non-blank", line.trim().length > 0],
    ["no-surrounding-space", line === line.trim()],
  ];
  for (const [name, ok] of checks) {
    if (!ok) failGate(name);
  }
}

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
checkEntry(ENTRY);
mkdirSync(targetDir, { recursive: true });
writeFileSync(join(targetDir, "entry.txt"), ENTRY, "utf8");
console.log(`saved ${ENTRY.length} characters to ${targetDir}/entry.txt`);
