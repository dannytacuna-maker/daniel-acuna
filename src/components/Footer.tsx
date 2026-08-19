"use client";

import { content } from "@/lib/content";
import { useLanguage } from "./LanguageProvider";

export function Footer() {
  const { locale } = useLanguage();

  return (
    <footer className="stage border-t border-white/8 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-sm text-zinc-400 sm:flex-row">
        <p>{content.footer[locale]}</p>
        <a href={`mailto:${content.contact[locale].email}`} className="site-link hover:text-zinc-300">
          {content.contact[locale].email}
        </a>
      </div>
    </footer>
  );
}
