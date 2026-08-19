import type { Experience, Project, SiteContent } from "./types";

export const cities = [
  { en: "United Kingdom", es: "Reino Unido" },
  { en: "Vietnam", es: "Vietnam" },
  { en: "United States", es: "Estados Unidos" },
  { en: "Panama", es: "Panamá" },
  { en: "Costa Rica", es: "Costa Rica" },
  { en: "El Salvador", es: "El Salvador" },
  { en: "Spain", es: "España" },
] as const;

export const siteUrl = "https://daniel-acuna.vercel.app";

export const cvPaths = {
  en: "/cv/Daniel-Acuna-CV-EN.html",
  es: "/cv/Daniel-Acuna-CV-ES.html",
} as const;

export const projects: Project[] = [
  {
    id: "rio",
    title: { en: "Rio Trucking", es: "Rio Trucking" },
    category: { en: "Logistics & transportation", es: "Logística y transporte" },
    description: {
      en: "Dual-brand site for a US trucking company — freight, dispatch, and logistics under one roof.",
      es: "Sitio de doble marca para una empresa de transporte en EE. UU. — carga, dispatch y logística en un solo lugar.",
    },
    url: "https://rio-trucking.vercel.app",
    year: "2025",
    poster: "/projects/rio.png",
    reel: "/projects/rio-hero.mp4",
    videos: [],
    logo: "https://rio-trucking.vercel.app/favicon.ico",
    heroChrome: {
      theme: "rio",
      nav: ["Services", "Contact"],
      lang: "EN",
      headline: "From standard freight to permit-only loads. We move it. On time. Every time.",
      support: "The entire trucking ecosystem, in one place.",
      ctaPrimary: "View services",
      ctaSecondary: "Contact",
    },
  },
  {
    id: "firmus",
    title: { en: "Firmus Costa Rica", es: "Firmus Costa Rica" },
    category: { en: "Hospitality consulting", es: "Consultoría hotelera" },
    description: {
      en: "Premium marketing site for a hotel consulting firm — cinematic hero, live in production.",
      es: "Sitio premium para una firma de consultoría hotelera — hero cinematográfico, en producción.",
    },
    url: "https://firmus-landing.vercel.app",
    year: "2025",
    poster: "/projects/firmus.png",
    reel: "/projects/firmus-hero.mp4",
    videos: ["https://firmus-landing.vercel.app/brand/hero-cinematic.mp4"],
    logo: "https://firmus-landing.vercel.app/brand/logo-firmus-on-dark.png",
    heroChrome: {
      theme: "firmus",
      nav: ["Hoteles", "Servicios", "Contacto"],
      lang: "ES EN",
      headline: "Representación y mercadeo para hoteles sobresalientes en Costa Rica",
      support: "Hoteles boutique y de experiencias únicas — segmento premium.",
      ctaPrimary: "Contactar por WhatsApp",
      ctaSecondary: "Ver servicios",
    },
  },
  {
    id: "ontrack",
    title: { en: "OnTrack", es: "OnTrack" },
    category: { en: "Business brand", es: "Marca de negocio" },
    description: {
      en: "Modern web presence for the OnTrack brand within the SSC group.",
      es: "Presencia web moderna para la marca OnTrack.",
    },
    url: "https://www.ontrackcr.net/es",
    year: "2025",
    poster: "/projects/ontrack.png",
    reel: "/projects/ontrack-hero.mp4",
    videos: ["https://www.ontrackcr.net/media/hero-reel-01.mp4"],
    logo: "https://www.ontrackcr.net/logo-ontrack.png",
    heroChrome: {
      theme: "ontrack",
      nav: ["Nosotros", "Por qué", "Servicios", "Contacto"],
      lang: "ES EN",
      support:
        "Soluciones contables integradas para optimizar la estructura administrativa.",
      ctaPrimary: "Continuar con esta ruta",
      ctaSecondary: "Contactar",
    },
  },
];

export const experiences: Experience[] = [
  {
    role: {
      en: "Bachelor’s in International Business",
      es: "Grado en Negocios Internacionales",
    },
    org: { en: "Universidad Europea Madrid", es: "Universidad Europea Madrid" },
    period: "2023 – Present",
    location: {
      en: "Villaviciosa de Odón, Madrid",
      es: "Villaviciosa de Odón, Madrid",
    },
    bullets: {
      en: ["International markets, strategy, and how businesses operate across borders."],
      es: ["Mercados internacionales, estrategia y cómo operan los negocios a través de fronteras."],
    },
  },
  {
    role: {
      en: "Founder & Coach — Brazilian Jiu-Jitsu Team",
      es: "Fundador y entrenador — Equipo de BJJ",
    },
    org: { en: "Universidad Europea Madrid", es: "Universidad Europea Madrid" },
    period: "2023 – Present",
    bullets: {
      en: ["Founded a university BJJ team from zero; weekly training for 15–25 students."],
      es: ["Fundé un equipo universitario de BJJ desde cero; entrenamientos semanales para 15–25 estudiantes."],
    },
  },
  {
    role: {
      en: "Member — Martial Arts Committee",
      es: "Miembro — Comité de artes marciales",
    },
    org: { en: "Universidad Europea Madrid", es: "Universidad Europea Madrid" },
    period: "2023 – Present",
    bullets: {
      en: ["Support martial arts programs, workshops, and student events."],
      es: ["Apoyo programas de artes marciales, talleres y eventos estudiantiles."],
    },
  },
];

export const content: SiteContent = {
  nav: {
    en: {
      about: "About",
      work: "Work",
      experience: "Path",
      contact: "Contact",
      cv: "CV",
      skip: "Skip to content",
    },
    es: {
      about: "Sobre mí",
      work: "Proyectos",
      experience: "Trayectoria",
      contact: "Contacto",
      cv: "CV",
      skip: "Saltar al contenido",
    },
  },
  hero: {
    en: {
      title: "Daniel Acuña Torres",
      role: "International Business student",
      line: "I work across borders with",
      skills: [
        "collaboration",
        "communication",
        "follow-through",
        "public speaking",
        "coaching",
        "website delivery",
        "bilingual UX",
        "brand presentation",
      ],
      about: "About me",
      cv: "See CV",
    },
    es: {
      title: "Daniel Acuña Torres",
      role: "Estudiante de Negocios Internacionales",
      line: "Trabajo a través de fronteras con",
      skills: [
        "colaboración",
        "comunicación",
        "seguimiento",
        "oratoria",
        "coaching",
        "entrega web",
        "UX bilingüe",
        "presentación de marca",
      ],
      about: "Sobre mí",
      cv: "Ver CV",
    },
  },
  about: {
    en: {
      title: "About me",
      paragraphs: [
        "I study **International Business at Universidad Europea Madrid**, driven by a curiosity about markets, people, and what makes companies succeed across borders.",
        "That international perspective comes from experience. I have lived and studied in the **UK, Vietnam, the United States, Panama, Costa Rica, El Salvador, and Spain**. Moving between countries and cultures has shaped the way I communicate, adapt, and approach problems. For me, being international is not simply something written on a résumé — it is how I have learned to think.",
        "Outside the classroom, I like turning ideas into something real. I taught myself how to take a business from an initial brief to a **fully launched website**. Web design is not my profession; it is a skill I developed because I wanted to understand how an idea becomes something tangible, functional, and public.",
        "I also founded the **Brazilian Jiu-Jitsu team at Universidad Europea**. The sport has taken me from training rooms to competitions in **Rio de Janeiro, Madrid, Panama City, and San José**, teaching me discipline, resilience, and how much progress depends on consistently showing up.",
        "Different countries, projects, and experiences — but the common thread is simple: **I like learning how things work, taking initiative, and building something from what I learn.**",
      ],
      highlights: [
        { label: "Path", value: "International Business · UEM Madrid" },
        { label: "Languages", value: "English & Spanish — fluent" },
        { label: "Based", value: "Villaviciosa de Odón, Madrid" },
        { label: "Also", value: "Websites for real businesses, when needed" },
      ],
    },
    es: {
      title: "Sobre mí",
      paragraphs: [
        "Estudio **Negocios Internacionales en la Universidad Europea Madrid**, impulsado por la curiosidad por los mercados, las personas y lo que hace que las empresas funcionen a través de fronteras.",
        "Esa perspectiva internacional viene de la experiencia. He vivido y estudiado en el **Reino Unido, Vietnam, Estados Unidos, Panamá, Costa Rica, El Salvador y España**. Moverme entre países y culturas ha formado la forma en que comunico, me adapto y abordo los problemas. Para mí, ser internacional no es simplemente algo escrito en un currículum — es cómo he aprendido a pensar.",
        "Fuera del aula, me gusta convertir ideas en algo real. Aprendí por mi cuenta a llevar un negocio de un brief inicial a un **sitio web lanzado por completo**. El diseño web no es mi profesión; es una habilidad que desarrollé porque quería entender cómo una idea se vuelve algo tangible, funcional y público.",
        "También fundé el **equipo de Brazilian Jiu-Jitsu de la Universidad Europea**. El deporte me ha llevado de las salas de entrenamiento a competiciones en **Río de Janeiro, Madrid, Ciudad de Panamá y San José**, enseñándome disciplina, resiliencia y cuánto depende el progreso de aparecer de forma constante.",
        "Distintos países, proyectos y experiencias — pero el hilo común es simple: **me gusta aprender cómo funcionan las cosas, tomar la iniciativa y construir algo con lo que aprendo.**",
      ],
      highlights: [
        { label: "Camino", value: "Negocios Internacionales · UEM Madrid" },
        { label: "Idiomas", value: "Inglés y español — fluido" },
        { label: "Base", value: "Villaviciosa de Odón, Madrid" },
        { label: "También", value: "Sitios web para negocios reales, cuando hace falta" },
      ],
    },
  },
  work: {
    en: {
      title: "Work",
      subtitle: "Live sites, on the machines they were built for.",
      visit: "Open site",
    },
    es: {
      title: "Proyectos",
      subtitle: "Sitios en producción, en las máquinas para las que se construyeron.",
      visit: "Abrir sitio",
    },
  },
  experience: {
    en: { title: "Path", subtitle: "Study and leadership." },
    es: { title: "Trayectoria", subtitle: "Estudio y liderazgo." },
  },
  skills: {
    en: {
      title: "How I work",
      groups: [
        {
          label: "Business",
          items: [
            "Cross-cultural collaboration",
            "Client communication",
            "Organization and follow-through",
            "Public speaking",
            "Team coaching",
          ],
        },
        {
          label: "A skill I developed",
          items: [
            "End-to-end website delivery",
            "Bilingual UX (ES / EN)",
            "Brand presentation",
            "Landing-page structure",
            "Production deploys",
          ],
        },
      ],
    },
    es: {
      title: "Cómo trabajo",
      groups: [
        {
          label: "Negocio",
          items: [
            "Colaboración intercultural",
            "Comunicación con clientes",
            "Organización y seguimiento",
            "Oratoria",
            "Coaching de equipos",
          ],
        },
        {
          label: "Una habilidad que desarrollé",
          items: [
            "Entrega web de extremo a extremo",
            "UX bilingüe (ES / EN)",
            "Presentación de marca",
            "Estructura de landing",
            "Despliegue en producción",
          ],
        },
      ],
    },
  },
  contact: {
    en: {
      title: "Let’s talk",
      subtitle: "Internships, collaborations, or a business that needs a site.",
      cvLabel: "CV",
      cvEn: "English",
      cvEs: "Español",
      email: "danny.tacuna@gmail.com",
      phone: "+34 695 422 788",
      location: "Villaviciosa de Odón, Madrid",
    },
    es: {
      title: "Hablemos",
      subtitle: "Prácticas y colaboraciones. Madrid.",
      cvLabel: "CV",
      cvEn: "Inglés",
      cvEs: "Español",
      email: "danny.tacuna@gmail.com",
      phone: "+34 695 422 788",
      location: "Villaviciosa de Odón, Madrid",
    },
  },
  footer: {
    en: "© 2026 Daniel Acuña Torres",
    es: "© 2026 Daniel Acuña Torres",
  },
};
