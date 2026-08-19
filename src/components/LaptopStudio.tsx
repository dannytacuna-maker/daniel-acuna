"use client";

import { useEffect, useRef, type RefObject } from "react";
import { content, projects } from "@/lib/content";
import { MacBook } from "./MacBook";
import { useLanguage } from "./LanguageProvider";

const laptopIds = ["rio", "firmus", "ontrack"] as const;
const laptopAngles = ["left", "center", "right"] as const;

export function LaptopStudio() {
  const { locale } = useLanguage();
  const work = content.work[locale];
  const stageRef = useRef<HTMLElement>(null);
  const laptops = laptopIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is (typeof projects)[number] => Boolean(project));

  useWorkSettle(stageRef);

  return (
    <section ref={stageRef} id="work" className="stage work-stage border-t border-white/8 py-24">
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
            <MacBook
              key={project.id}
              angle={laptopAngles[index] ?? "left"}
              href={project.url}
              caption={project.title[locale]}
              reel={project.reel}
              poster={project.poster}
              title={project.title[locale]}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-5xl gap-10 border-t border-white/8 px-6 pt-12 md:grid-cols-3">
        {projects.map((project) => (
          <article key={project.id}>
            <p className="text-[11px] tracking-[0.14em] text-zinc-400 uppercase">
              {project.year} · {project.category[locale]}
            </p>
            <h3 className="mt-2 text-lg text-white">{project.title[locale]}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.description[locale]}</p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="site-link mt-3 inline-block text-sm text-zinc-300"
            >
              {work.visit} →
            </a>
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

function headerOffset() {
  return document.querySelector("header")?.getBoundingClientRect().height ?? 56;
}

function settleDelta(item: HTMLElement) {
  const box = item.getBoundingClientRect();
  const topPad = headerOffset() + 24;
  const avail = window.innerHeight - topPad - 28;
  if (box.height > avail) return box.top - topPad;
  const mid = box.top + box.height / 2;
  const focus = topPad + (window.innerHeight - topPad) * 0.48;
  return mid - focus;
}

function nearestPortfolio(root: HTMLElement) {
  const items = [...root.querySelectorAll<HTMLElement>(".mb-link")];
  const topPad = headerOffset();
  let best: HTMLElement | null = null;
  let bestAbs = Infinity;

  for (const item of items) {
    const box = item.getBoundingClientRect();
    const mid = box.top + box.height / 2;
    if (mid < topPad - 40 || mid > window.innerHeight + 40) continue;
    const delta = settleDelta(item);
    if (Math.abs(delta) < bestAbs) {
      bestAbs = Math.abs(delta);
      best = item;
    }
  }

  return best;
}

function glideBy(delta: number, onDone: () => void) {
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";

  const start = window.scrollY;
  const end = start + delta;
  const duration = Math.min(1080, 580 + Math.abs(delta) * 1.65);
  const origin = performance.now();
  let frame = 0;
  let stopped = false;

  const finish = () => {
    html.style.scrollBehavior = previous;
    if (!stopped) onDone();
  };

  const step = (now: number) => {
    if (stopped) return;
    const t = Math.min(1, (now - origin) / duration);
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    window.scrollTo({ top: start + (end - start) * eased, behavior: "instant" });
    if (t < 1) {
      frame = requestAnimationFrame(step);
      return;
    }
    finish();
  };

  frame = requestAnimationFrame(step);
  return () => {
    stopped = true;
    cancelAnimationFrame(frame);
    html.style.scrollBehavior = previous;
  };
}

function useWorkSettle(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let idle = 0;
    let settling = false;
    let ignoreUntil = 0;
    let stopGlide: (() => void) | null = null;

    const settle = () => {
      if (settling || performance.now() < ignoreUntil) return;
      const item = nearestPortfolio(root);
      if (!item) return;

      const delta = settleDelta(item);
      const max = Math.min(280, window.innerHeight * 0.38);
      if (Math.abs(delta) < 10 || Math.abs(delta) > max) return;

      settling = true;
      stopGlide = glideBy(delta, () => {
        settling = false;
        ignoreUntil = performance.now() + 120;
        stopGlide = null;
      });
    };

    const onScroll = () => {
      if (settling) return;
      window.clearTimeout(idle);
      idle = window.setTimeout(settle, 160);
    };

    const onUser = () => {
      if (stopGlide) {
        stopGlide();
        stopGlide = null;
      }
      settling = false;
      window.clearTimeout(idle);
      idle = window.setTimeout(settle, 200);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onUser, { passive: true });
    window.addEventListener("touchend", onUser, { passive: true });
    window.addEventListener("keydown", onUser);

    return () => {
      window.clearTimeout(idle);
      stopGlide?.();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onUser);
      window.removeEventListener("touchend", onUser);
      window.removeEventListener("keydown", onUser);
    };
  }, [rootRef]);
}
