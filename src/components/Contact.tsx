"use client";

import { content, cvPaths } from "@/lib/content";
import { useLanguage } from "./LanguageProvider";

export function Contact() {
  const { locale } = useLanguage();
  const contact = content.contact[locale];

  return (
    <section id="contact" className="stage border-t border-white/8 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-sm tracking-[0.16em] text-zinc-400 uppercase">{contact.title}</h2>
        <p className="mt-3 max-w-md text-zinc-400">{contact.subtitle}</p>

        <div className="mt-10 space-y-3">
          <a href={`mailto:${contact.email}`} className="site-link block text-2xl text-white sm:text-[1.75rem]">
            {contact.email}
          </a>
          <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="site-link block text-zinc-300">
            {contact.phone}
          </a>
          <p className="text-zinc-400">{contact.location}</p>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 text-sm">
          <span className="text-zinc-400">{contact.cvLabel}</span>
          <a
            href={cvPaths.en}
            target="_blank"
            rel="noopener noreferrer"
            className="site-link text-zinc-200 underline underline-offset-4"
          >
            {contact.cvEn}
          </a>
          <a
            href={cvPaths.es}
            target="_blank"
            rel="noopener noreferrer"
            className="site-link text-zinc-200 underline underline-offset-4"
          >
            {contact.cvEs}
          </a>
        </div>
      </div>
    </section>
  );
}
