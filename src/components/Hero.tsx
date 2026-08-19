"use client";

import { useEffect, useRef } from "react";
import { content, cvPaths } from "@/lib/content";
import { useLanguage } from "./LanguageProvider";

export function Hero() {
  const { locale } = useLanguage();
  const hero = content.hero[locale];

  return (
    <section id="top" className="stage hero-stage flex min-h-[100dvh] items-center justify-center px-6 pt-24">
      <HeroReel />
      <div className="hero-copy">
        <p className="hero-name">{hero.title}</p>
        <h1 className="hero-line">
          <span className="sr-only">
            {hero.line} {hero.skills.join(", ")}
          </span>
          <span aria-hidden="true" className="hero-line-visible">
            <span className="hero-sentence">{hero.line}</span>
            <SkillSwap key={locale} skills={hero.skills} />
          </span>
        </h1>
        <div className="hero-actions">
          <a href="#about" className="hero-icon-btn">
            <PersonIcon />
            <span>{hero.about}</span>
          </a>
          <a href={cvPaths[locale]} target="_blank" rel="noopener noreferrer" className="hero-icon-btn">
            <CvIcon />
            <span>{hero.cv}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function HeroReel() {
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
      { threshold: 0.15 },
    );
    observer.observe(video);

    return () => {
      media.removeEventListener("change", play);
      video.removeEventListener("playing", markReady);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="hero-reel-wrap" aria-hidden="true">
      <img className="hero-reel-still" src="/hero/abstract-poster.jpg?v=4k" alt="" decoding="async" />
      <video
        ref={videoRef}
        className="hero-reel"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero/abstract-poster.jpg?v=4k"
        disablePictureInPicture
      >
        <source src="/hero/abstract-loop-4k.mp4" type="video/mp4" media="(min-width: 900px)" />
        <source src="/hero/abstract-loop-1080.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

function SkillSwap({ skills }: { skills: string[] }) {
  const boardRef = useRef<HTMLSpanElement>(null);
  const sizerRef = useRef<HTMLSpanElement>(null);
  const blockRef = useRef<HTMLSpanElement>(null);
  const facesRef = useRef<Array<HTMLSpanElement | null>>([]);
  const longest = skills.reduce((best, skill) => (skill.length > best.length ? skill : best), skills[0] ?? "");

  useEffect(() => {
    const board = boardRef.current;
    const sizer = sizerRef.current;
    if (!board || !sizer) return;

    const fit = () => {
      board.style.removeProperty("font-size");
      const cap = board.closest(".hero-copy")?.clientWidth ?? board.clientWidth;
      const need = sizer.scrollWidth;
      if (need > cap && need > 0) {
        const size = Number.parseFloat(getComputedStyle(board).fontSize);
        board.style.fontSize = `${size * (cap / need) * 0.97}px`;
      }
    };

    fit();
    const frame = requestAnimationFrame(fit);
    const observer = new ResizeObserver(fit);
    const copy = board.closest(".hero-copy");
    observer.observe(copy ?? board);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [skills, longest]);

  useEffect(() => {
    const board = boardRef.current;
    const block = blockRef.current;
    if (!board || !block || skills.length === 0) return;

    const count = skills.length;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mod = (value: number) => ((value % count) + count) % count;
    const faceAt = (offset: number) => skills[mod(offset)] ?? "";
    const slotOf = (deg: number) => {
      const quarter = Math.round(-deg / 90);
      return ((quarter % 4) + 4) % 4;
    };
    const wrapPrism = (deg: number) => {
      let next = deg;
      while (next > 0) next -= 360;
      while (next <= -360) next += 360;
      return next === -360 ? 0 : next;
    };
    const paint = (front: number, slot: number) => {
      for (let i = 0; i < 4; i += 1) {
        const label = facesRef.current[i]?.querySelector(".skill-face-text");
        if (label) label.textContent = faceAt(front + ((i - slot + 4) % 4));
      }
    };
    const apply = (deg: number) => {
      block.style.transform = `rotateX(${deg}deg)`;
    };

    let front = 0;
    let angle = 0;
    let restAngle = 0;
    let restTimer = 0;
    let cancelled = false;
    let dragging = false;
    let moved = false;
    let pointerId = 0;
    let startY = 0;
    let startAngle = 0;

    paint(0, 0);
    apply(0);

    const stopAuto = () => {
      window.clearTimeout(restTimer);
      block.getAnimations().forEach((animation) => animation.cancel());
      apply(angle);
    };

    const flip = () => {
      if (cancelled || dragging) return;
      const from = angle;
      const to = from - 90;
      const animation = block.animate(
        [{ transform: `rotateX(${from}deg)` }, { transform: `rotateX(${to}deg)` }],
        {
          duration: 820,
          easing: "cubic-bezier(0.2, 0.72, 0.18, 1)",
          fill: "forwards",
        },
      );

      animation.onfinish = () => {
        if (cancelled || dragging) return;
        front = mod(front + 1);
        angle = wrapPrism(to);
        animation.cancel();
        apply(angle);
        restAngle = angle;
        paint(front, slotOf(angle));
        schedule();
      };
    };

    const schedule = () => {
      if (reduce || cancelled || dragging) return;
      window.clearTimeout(restTimer);
      restTimer = window.setTimeout(flip, 2100);
    };

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      event.preventDefault();
      dragging = true;
      moved = false;
      pointerId = event.pointerId;
      startY = event.clientY;
      startAngle = angle;
      stopAuto();
      try {
        board.setPointerCapture(event.pointerId);
      } catch {
        /* synthetic pointers and some browsers skip capture */
      }
      board.classList.add("is-dragging");
    };

    const onMove = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return;
      const dy = event.clientY - startY;
      if (Math.abs(dy) > 4) moved = true;
      angle = startAngle - dy * 0.58;
      apply(angle);
      const quarters = Math.round((restAngle - angle) / 90);
      paint(mod(front + quarters), slotOf(angle));
    };

    const finishDrag = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return;
      dragging = false;
      board.classList.remove("is-dragging");
      try {
        board.releasePointerCapture(pointerId);
      } catch {
        /* already released */
      }

      const snapped = Math.round(angle / 90) * 90;
      const quarters = Math.round((restAngle - snapped) / 90);
      front = mod(front + quarters);

      const settle = () => {
        if (cancelled) return;
        angle = wrapPrism(snapped);
        apply(angle);
        restAngle = angle;
        paint(front, slotOf(angle));
        schedule();
      };

      if (!moved || Math.abs(snapped - angle) < 0.5) {
        settle();
        return;
      }

      const animation = block.animate(
        [{ transform: `rotateX(${angle}deg)` }, { transform: `rotateX(${snapped}deg)` }],
        {
          duration: 420,
          easing: "cubic-bezier(0.22, 0.8, 0.2, 1)",
          fill: "forwards",
        },
      );
      animation.onfinish = () => {
        animation.cancel();
        settle();
      };
    };

    board.addEventListener("pointerdown", onDown);
    board.addEventListener("pointermove", onMove);
    board.addEventListener("pointerup", finishDrag);
    board.addEventListener("pointercancel", finishDrag);
    if (!reduce) restTimer = window.setTimeout(flip, 2100);

    return () => {
      cancelled = true;
      window.clearTimeout(restTimer);
      block.getAnimations().forEach((animation) => animation.cancel());
      board.classList.remove("is-dragging");
      board.removeEventListener("pointerdown", onDown);
      board.removeEventListener("pointermove", onMove);
      board.removeEventListener("pointerup", finishDrag);
      board.removeEventListener("pointercancel", finishDrag);
    };
  }, [skills]);

  return (
    <span ref={boardRef} className="skill-board">
      <span ref={sizerRef} className="skill-sizer">
        {longest}
      </span>
      <span className="skill-viewport">
        <span ref={blockRef} className="skill-block">
          {Array.from({ length: 4 }, (_, index) => (
            <span
              key={index}
              ref={(node) => {
                facesRef.current[index] = node;
              }}
              className={`skill-face skill-face-${index}`}
            >
              <span className="skill-face-text">{skills[index % skills.length]}</span>
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5.5 19c.8-3.2 3.3-5 6.5-5s5.7 1.8 6.5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CvIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6" y="3.5" width="12" height="17" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 8h6M9 12h6M9 16h3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
