"use client";

import { content, cvPaths } from "@/lib/content";
import { useLanguage } from "./LanguageProvider";
import { PillLink } from "./PillLink";

const links = ["work", "experience", "contact"] as const;

export function Header() {
  const { locale, setLocale } = useLanguage();
  const nav = content.nav[locale];
  const hero = content.hero[locale];

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#0b0b0c]/55 backdrop-blur-md">
      <a href="#content" className="skip-link">
        {nav.skip}
      </a>
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex h-14 items-center justify-between gap-3">
          <a href="#top" className="site-link shrink-0 text-[13px] tracking-[0.2em] text-zinc-300 uppercase">
            DA
          </a>

          <nav
            aria-label={locale === "es" ? "Principal" : "Primary"}
            className="hidden items-center gap-6 md:flex"
          >
            {links.map((key) => (
              <a key={key} href={`#${key}`} className="site-link text-[13px] text-zinc-400">
                {nav[key]}
              </a>
            ))}
            <div className="flex items-center gap-2 pl-1">
              <PillLink href="#about" label={hero.about} variant="primary" size="sm" />
              <PillLink href={cvPaths[locale]} label={hero.cv} variant="secondary" size="sm" external />
            </div>
          </nav>

          <div className="flex items-center gap-1" role="group" aria-label={locale === "es" ? "Idioma" : "Language"}>
            {(["en", "es"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLocale(lang)}
                aria-pressed={locale === lang}
                className={`site-link inline-flex min-h-11 min-w-11 items-center justify-center text-[11px] tracking-wider uppercase ${
                  locale === lang ? "text-white" : "text-zinc-400"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <nav
          aria-label={locale === "es" ? "Secciones" : "Sections"}
          className="flex items-center gap-3 overflow-x-auto pb-3 text-[13px] text-zinc-400 md:hidden"
        >
          {links.map((key) => (
            <a key={key} href={`#${key}`} className="site-link shrink-0 py-1">
              {nav[key]}
            </a>
          ))}
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <PillLink href="#about" label={hero.about} variant="primary" size="sm" />
            <PillLink href={cvPaths[locale]} label={hero.cv} variant="secondary" size="sm" external />
          </div>
        </nav>
      </div>
    </header>
  );
}
