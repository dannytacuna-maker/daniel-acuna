"use client";

import { useEffect, useRef } from "react";
import { content, projects } from "@/lib/content";
import { MacBook } from "./MacBook";
import { Phone } from "./Phone";
import { useLanguage } from "./LanguageProvider";

const laptopIds = ["ssc", "countme", "ontrack-ops", "ontrack"] as const;
const laptopAngles = ["left", "center", "center", "right"] as const;
const phoneSides = ["left", "left", "right", "right"] as const;

export function LaptopStudio() {
  const { locale } = useLanguage();
  const work = content.work[locale];
  const laptops = laptopIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is (typeof projects)[number] => Boolean(project));

  return (
    <section id="work" className="stage work-stage border-t border-white/8 py-24">
      <WorkReel />
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-sm tracking-[0.16em] text-zinc-400 uppercase">{work.title}</h2>
          <p className="mt-3 text-zinc-400">{work.subtitle}</p>
        </div>
      </div>

      <div className="display mt-4">
        <div className="mac-row">
          {laptops.map((project, index) => (
            <div key={project.id} className={`mac-pair mac-pair-${laptopAngles[index] ?? "left"}`}>
              <MacBook
                angle={laptopAngles[index] ?? "left"}
                href={project.url}
                caption={project.title[locale]}
                reel={project.reel}
                poster={project.poster}
                title={project.title[locale]}
              />
              <Phone
                href={project.url}
                poster={project.mobilePoster}
                title={project.title[locale]}
                side={phoneSides[index] ?? "right"}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-5xl gap-10 border-t border-white/8 px-6 pt-12 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) => (
          <article key={project.id}>
            <p className="text-[11px] tracking-[0.14em] text-zinc-400 uppercase">
              {project.year} · {project.category[locale]}
            </p>
            <h3 className="mt-2 text-lg text-white">{project.title[locale]}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.description[locale]}</p>
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="site-link mt-3 inline-block text-sm text-zinc-300"
              >
                {work.visit} →
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function WorkReel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const markReady = () => wrap.classList.add("is-ready");
    const play = () => {
      if (media.matches) {
        video.pause();
        return;
      }
      video.play().then(markReady).catch(() => {});
    };

    play();
    media.addEventListener("change", play);
    video.addEventListener("playing", markReady);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry || media.matches) return;
        if (entry.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.12 },
    );
    observer.observe(video);

    return () => {
      media.removeEventListener("change", play);
      video.removeEventListener("playing", markReady);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="work-reel-wrap" aria-hidden="true">
      <img className="work-reel-still" src="/work/studio-poster.jpg?v=15682105" alt="" decoding="async" />
      <video
        ref={videoRef}
        className="work-reel"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/work/studio-poster.jpg?v=15682105"
        disablePictureInPicture
      >
        <source src="/work/studio-loop-4k.mp4?v=15682105" type="video/mp4" media="(min-width: 900px)" />
        <source src="/work/studio-loop-1080.mp4?v=15682105" type="video/mp4" />
      </video>
    </div>
  );
}
