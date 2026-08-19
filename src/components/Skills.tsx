"use client";

import { content } from "@/lib/content";
import { useLanguage } from "./LanguageProvider";

export function Skills() {
  const { locale } = useLanguage();
  const skills = content.skills[locale];

  return (
    <section className="stage border-t border-white/8 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-sm tracking-[0.16em] text-zinc-400 uppercase">{skills.title}</h2>
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          {skills.groups.map((group) => (
            <div key={group.label}>
              <h3 className="text-[11px] tracking-[0.16em] text-zinc-400 uppercase">{group.label}</h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-zinc-400">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
