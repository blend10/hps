// i18n consistency check. Run with `npm run i18n:check`.
//
// Three failure modes it catches, all of which are silent at build time and only
// show up as the raw key text leaking into the rendered page:
//
//   1. A `t("some.key")` whose key does not exist in en.json (typo, or a key
//      renamed in one place).
//   2. A translation file whose shape drifts from en.json — a missing key, or an
//      array whose length no longer matches (the components index into them).
//   3. A Client Component reading a dictionary section that is not shipped to the
//      browser (see CLIENT_SECTIONS in src/i18n/server.js). This is the trap in
//      the payload-trimming optimisation: it works fine on the server and returns
//      the bare key in the browser.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const srcDir = join(root, "src");
const dictDir = join(srcDir, "i18n", "dictionaries");

const read = (p) => readFileSync(p, "utf8");
const loadDict = (locale) => JSON.parse(read(join(dictDir, `${locale}.json`)));

const en = loadDict("en");
const locales = ["en", "de", "ar"];

// Mirror of CLIENT_SECTIONS in src/i18n/server.js, parsed from the source so the
// two cannot drift apart.
const serverSrc = read(join(srcDir, "i18n", "server.js"));
const clientSections = new Set(
  [...serverSrc.matchAll(/^\s*"([a-zA-Z]+)",\s*\/\//gm)].map((m) => m[1]),
);

const errors = [];
const warnings = [];

/* ------------------------------------------------------------------ */
/* Walk the source tree                                                */
/* ------------------------------------------------------------------ */

// src/i18n itself is skipped: it defines `t` rather than calling it, and its doc
// comments contain illustrative keys like t("nope.missing") that do not exist.
const i18nDir = join(srcDir, "i18n");

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (full === i18nDir) continue;
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (/\.(jsx?|mjs)$/.test(full)) yield full;
  }
}

const lookup = (dict, path) =>
  path.split(".").reduce((node, k) => (node == null ? undefined : node[k]), dict);

let literalCount = 0;
let templateCount = 0;
let clientFiles = 0;

for (const file of walk(srcDir)) {
  const src = read(file);
  const rel = relative(root, file).replace(/\\/g, "/");
  const isClient = /^\s*["']use client["']/m.test(src);

  // t("literal.key") and t('literal.key')
  const literals = [...src.matchAll(/\bt\(\s*["']([\w.]+)["']/g)].map((m) => m[1]);

  // t(`prefix.${expr}.suffix`) — we can only verify the static prefix, so check
  // that the prefix resolves to an object in the dictionary.
  const templates = [...src.matchAll(/\bt\(\s*`([\w.]+)\$\{/g)].map((m) =>
    m[1].replace(/\.$/, ""),
  );

  literalCount += literals.length;
  templateCount += templates.length;
  if (isClient && (literals.length || templates.length)) clientFiles += 1;

  for (const key of literals) {
    const value = lookup(en, key);
    if (value === undefined) {
      errors.push(`${rel}: t("${key}") — key not found in en.json`);
      continue;
    }
    const section = key.split(".")[0];
    if (isClient && !clientSections.has(section)) {
      errors.push(
        `${rel}: t("${key}") — "${section}" is a Client Component read but is not in CLIENT_SECTIONS (src/i18n/server.js); it will not reach the browser`,
      );
    }
  }

  for (const prefix of templates) {
    const value = lookup(en, prefix);
    if (value === undefined || typeof value !== "object") {
      errors.push(
        `${rel}: t(\`${prefix}.\${…}\`) — prefix "${prefix}" is not an object in en.json`,
      );
      continue;
    }
    const section = prefix.split(".")[0];
    if (isClient && !clientSections.has(section)) {
      errors.push(
        `${rel}: t(\`${prefix}.\${…}\`) — "${section}" is a Client Component read but is not in CLIENT_SECTIONS`,
      );
    }
  }
}

/* ------------------------------------------------------------------ */
/* Structural parity across locales                                    */
/* ------------------------------------------------------------------ */

function compare(a, b, path, locale) {
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      errors.push(`${locale}.json: ${path} — expected an array`);
      return;
    }
    if (a.length !== b.length) {
      errors.push(
        `${locale}.json: ${path} — array length ${b.length}, en.json has ${a.length}`,
      );
      return;
    }
    a.forEach((v, i) => compare(v, b[i], `${path}[${i}]`, locale));
    return;
  }
  if (a && typeof a === "object") {
    if (!b || typeof b !== "object") {
      errors.push(`${locale}.json: ${path} — expected an object`);
      return;
    }
    for (const k of Object.keys(a)) {
      if (!(k in b)) {
        errors.push(`${locale}.json: ${path}.${k} — missing`);
        continue;
      }
      compare(a[k], b[k], `${path}.${k}`, locale);
    }
    for (const k of Object.keys(b)) {
      if (!(k in a)) warnings.push(`${locale}.json: ${path}.${k} — extra key`);
    }
    return;
  }
  if (typeof a !== typeof b) {
    errors.push(`${locale}.json: ${path} — type ${typeof b}, en.json has ${typeof a}`);
    return;
  }
  // Untranslated identifiers must stay byte-identical: `id` selects code paths
  // and `image` is a filesystem path.
  const leaf = path.split(".").pop();
  if ((leaf === "id" || leaf === "image") && a !== b) {
    errors.push(`${locale}.json: ${path} — "${b}" must stay "${a}"`);
  }
  // Placeholders substituted at runtime must survive translation.
  for (const token of a.match?.(/\{\w+\}/g) ?? []) {
    if (!b.includes(token)) {
      errors.push(`${locale}.json: ${path} — lost placeholder ${token}`);
    }
  }
}

for (const locale of locales.filter((l) => l !== "en")) {
  compare(en, loadDict(locale), locale, locale);
}

/* ------------------------------------------------------------------ */

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);

console.log(
  `scanned ${literalCount} literal key(s) + ${templateCount} template prefix(es); ` +
    `${clientFiles} Client Component(s) call t()`,
);
console.log(`client sections shipped: ${[...clientSections].join(", ")}`);

if (errors.length) {
  console.error(`\ni18n check FAILED — ${errors.length} error(s).`);
  process.exit(1);
}
console.log(
  `\ni18n check passed — ${locales.length} locales in sync` +
    (warnings.length ? ` (${warnings.length} warning(s))` : ""),
);