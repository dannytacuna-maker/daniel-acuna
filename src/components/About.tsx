"use client";

import { content } from "@/lib/content";
import { useLanguage } from "./LanguageProvider";

export function About() {
  const { locale } = useLanguage();
  const about = content.about[locale];

  return (
    <section id="about" className="stage border-t border-white/8 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-12 lg:grid-cols-[200px_1fr]">
          <h2 className="text-sm tracking-[0.16em] text-zinc-400 uppercase">{about.title}</h2>
          <div className="max-w-2xl space-y-5">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-[17px] leading-[1.65] text-zinc-400">
                <EmphasizedText text={paragraph} />
              </p>
            ))}
          </div>
        </div>
        <dl className="mt-16 grid gap-8 border-t border-white/8 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {about.highlights.map((item) => (
            <div key={item.label}>
              <dt className="text-[11px] tracking-[0.16em] text-zinc-400 uppercase">{item.label}</dt>
              <dd className="mt-2 text-sm text-zinc-300">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function EmphasizedText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        const emphasized = part.match(/^\*\*([^*]+)\*\*$/);
        if (emphasized) {
          return (
            <strong key={index} className="font-medium text-zinc-200">
              {emphasized[1]}
            </strong>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
