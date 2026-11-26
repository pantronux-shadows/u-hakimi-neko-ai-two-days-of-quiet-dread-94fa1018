// Two Days of Quiet Dread — writes one code review comment to /output/entry.txt.
// Deterministic: no randomness, no clock, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const COMMENT =
  "LGTM. This will outlive the sprint, the roadmap, and the company — approving while we still mean it.";

// Mirror the round's gate locally so a bad edit can never ship an invalid entry:
// UTF-8 text of 1 to 140 characters, not only white space, on a single line.
const line = COMMENT.replace(/\n+$/, "");
const utf8 = Buffer.from(line, "utf8").length;
if (utf8 < 1 || utf8 > 140) throw new Error(`entry exceeds the gate: ${utf8} bytes`);
if (line.trim().length === 0) throw new Error("entry is only white space");
if (line.includes("\n")) throw new Error("entry must be a single line");

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), COMMENT + "\n", "utf8");
