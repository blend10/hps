// The lookup primitive shared by the server (`getT`) and the client
// (`useT`). Kept dependency-free and framework-agnostic so both environments
// build their translator from the exact same code path.

// Walk a dot-separated path ("footer.columns.company.title") through a nested
// dictionary. Returns `undefined` at the first missing hop.
export function lookup(dict, path) {
  return String(path)
    .split(".")
    .reduce((node, key) => (node == null ? undefined : node[key]), dict);
}

// Build a translator bound to one dictionary.
//
//   t("common.contactUs")            -> "Contact us"
//   t("frontline.features")          -> [{ title, body }, …]   (arrays/objects pass through)
//   t("nope.missing", "Fallback")    -> "Fallback"
//
// A missing key with no fallback returns the key itself. That is deliberate:
// the page still renders and the offending key is visible in the UI (and warned
// about in dev) rather than crashing or silently showing an empty string.
export function createT(dict) {
  return function t(path, fallback) {
    const value = lookup(dict, path);
    if (value !== undefined && value !== null) return value;
    if (fallback !== undefined) return fallback;
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[i18n] missing translation key: "${path}"`);
    }
    return path;
  };
}
