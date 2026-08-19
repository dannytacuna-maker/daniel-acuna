"use client";

import { content, experiences } from "@/lib/content";
import { useLanguage } from "./LanguageProvider";

export function Experience() {
  const { locale } = useLanguage();
  const section = content.experience[locale];

  return (
    <section id="experience" className="stage border-t border-white/8 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-sm tracking-[0.16em] text-zinc-400 uppercase">{section.title}</h2>
        <p className="mt-3 text-zinc-400">{section.subtitle}</p>

        <div className="mt-12 divide-y divide-white/8 border-y border-white/8">
          {experiences.map((item) => (
            <div key={item.role.en} className="grid gap-4 py-8 sm:grid-cols-[180px_1fr]">
              <p className="text-sm text-zinc-400">{item.period}</p>
              <div>
                <h3 className="text-base text-white">{item.role[locale]}</h3>
                <p className="mt-1 text-sm text-zinc-400">{item.org[locale]}</p>
                {item.bullets[locale].map((bullet) => (
                  <p key={bullet.slice(0, 40)} className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {bullet}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
