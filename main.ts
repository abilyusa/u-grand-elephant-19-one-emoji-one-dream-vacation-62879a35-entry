// One Emoji, One Dream Vacation — entry program.
//
// Writes exactly one emoji to $MAKEFUN_OUTPUT_DIR/entry.txt
// (fallback /output). Deterministic, no network, no file reads.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// U+1F5FB MOUNT FUJI — one code point, one emoji, no words.
// A dream vacation as a postcard: one specific faraway place
// (Japan, Mount Fuji), not a generic beach or plane.
const ENTRY = "🗻";

// Self-check against the gate before writing anything: the sealed
// scorer requires UTF-8 text of 1 to 8 characters, not only
// whitespace, and the judge's first criterion is exactly one emoji.
// [...ENTRY] counts Unicode code points, so a multi-byte emoji
// still counts as one. Fail loudly instead of shipping a bad file.
const codePoints = [...ENTRY];
if (codePoints.length < 1 || codePoints.length > 8) {
  throw new Error(`entry is ${codePoints.length} code points, gate needs 1-8`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output";
mkdirSync(outDir, { recursive: true });
// No trailing newline: the file must be exactly the one emoji.
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
