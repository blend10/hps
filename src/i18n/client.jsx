"use client";

// Client-side translation context.
//
// The root layout (a Server Component) resolves the active dictionary once and
// hands it to this provider as a plain serialisable object. Every Client
// Component below it then reads strings with `useI18n()` / `useT()` — no
// dictionary import, so only the active locale's strings cross the network.
//
// Note there is deliberately NO effect syncing <html lang>/<html dir> here.
// Switching locale only changes the [lang] param of the root layout, and Next.js
// re-renders that layout and patches the <html> attributes for us — verified
// end-to-end for en↔de↔ar with no full page reload.

import { createContext, useContext, useMemo } from "react";
import { getDirection, localeHref } from "./config";
import { createT } from "./translate";

const I18nContext = createContext(null);

export function I18nProvider({ lang, dict, children }) {
  const value = useMemo(
    () => ({
      lang,
      dict,
      dir: getDirection(lang),
      t: createT(dict),
      // Bound so client components can write `href(path)` without repeating lang.
      href: (path) => localeHref(lang, path),
    }),
    [lang, dict],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n() must be used inside <I18nProvider>");
  }
  return ctx;
}

// Sugar for the overwhelmingly common case; the server-side twin is `getT`.
export function useT() {
  return useI18n().t;
}