export type Locale = "en" | "es";

export type HeroChrome = {
  theme: "firmus" | "rio" | "ontrack";
  nav: string[];
  lang: string;
  eyebrow?: string;
  headline?: string;
  support: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export type Project = {
  id: string;
  title: Record<Locale, string>;
  category: Record<Locale, string>;
  description: Record<Locale, string>;
  url: string;
  year: string;
  poster: string;
  reel: string;
  videos: string[];
  logo: string;
  heroChrome: HeroChrome;
};

export type Experience = {
  role: Record<Locale, string>;
  org: Record<Locale, string>;
  period: string;
  location?: Record<Locale, string>;
  bullets: Record<Locale, string[]>;
};

export type SiteContent = {
  nav: Record<Locale, Record<string, string>>;
  hero: Record<
    Locale,
    { title: string; role: string; line: string; skills: string[]; about: string; cv: string }
  >;
  about: Record<
    Locale,
    { title: string; paragraphs: string[]; highlights: { label: string; value: string }[] }
  >;
  work: Record<Locale, { title: string; subtitle: string; visit: string }>;
  experience: Record<Locale, { title: string; subtitle: string }>;
  skills: Record<Locale, { title: string; groups: { label: string; items: string[] }[] }>;
  contact: Record<
    Locale,
    {
      title: string;
      subtitle: string;
      cvLabel: string;
      cvEn: string;
      cvEs: string;
      email: string;
      phone: string;
      location: string;
    }
  >;
  footer: Record<Locale, string>;
};
