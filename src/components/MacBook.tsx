"use client";

import { useEffect, useRef, type PointerEvent } from "react";

type Angle = "left" | "center" | "right";

const KEY_ROWS = [
  [14, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 16],
  [16, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 14],
  [18, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 22],
  [24, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 26],
  [12, 12, 14, 48, 14, 12, 12, 18],
];

const BASE: Record<Angle, { x: number; y: number }> = {
  left: { x: 8, y: 36 },
  center: { x: 10, y: 0 },
  right: { x: 8, y: -36 },
};

export function MacBook({
  angle = "center",
  href,
  caption,
  reel,
  poster,
  title,
}: {
  angle?: Angle;
  href: string;
  caption: string;
  reel: string;
  poster: string;
  title: string;
}) {
  const base = BASE[angle];
  const chassis = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frame = useRef(0);
  const running = useRef(false);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = chassis.current;
    if (el) {
      el.style.transform = `rotateX(${base.x}deg) rotateY(${base.y}deg)`;
    }
    return () => cancelAnimationFrame(frame.current);
  }, [base.x, base.y]);

  function apply() {
    const el = chassis.current;
    if (!el) return;
    el.style.transform = `rotateX(${base.x + current.current.x}deg) rotateY(${base.y + current.current.y}deg)`;
  }

  function loop() {
    const dx = target.current.x - current.current.x;
    const dy = target.current.y - current.current.y;
    current.current.x += dx * 0.16;
    current.current.y += dy * 0.16;
    apply();
    if (Math.abs(dx) < 0.02 && Math.abs(dy) < 0.02) {
      current.current = { ...target.current };
      apply();
      running.current = false;
      return;
    }
    frame.current = requestAnimationFrame(loop);
  }

  function startLoop() {
    if (running.current || reduce.current) return;
    running.current = true;
    frame.current = requestAnimationFrame(loop);
  }

  function onPointerMove(event: PointerEvent<HTMLAnchorElement>) {
    if (reduce.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - box.left) / box.width;
    const py = (event.clientY - box.top) / box.height;
    target.current = {
      x: (0.5 - py) * 3,
      y: (px - 0.5) * 4,
    };
    startLoop();
  }

  function onPointerLeave() {
    target.current = { x: 0, y: 0 };
    startLoop();
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`mb-link mb-${angle}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <span className="mb-shadow" aria-hidden="true" />
      <div ref={chassis} className="mb">
        <div className="mb-lid">
          <div className="mb-bezel">
            <div className="mb-notch">
              <span className="mb-camera" />
            </div>
            <div className="mb-glass">
              <HeroReel src={reel} poster={poster} title={title} />
            </div>
          </div>
          <p className="mb-wordmark">MacBook Pro</p>
        </div>
        <div className="mb-hinge" aria-hidden="true" />
        <div className="mb-body">
          <div className="mb-well">
            <div className="mb-deck">
              <div className="mb-grill" />
              <div className="mb-keys">
                {KEY_ROWS.map((row, i) => (
                  <div key={i} className="mb-row">
                    {row.map((flex, j) => (
                      <span key={`${i}-${j}`} style={{ flex }} />
                    ))}
                  </div>
                ))}
              </div>
              <div className="mb-grill" />
            </div>
            <div className="mb-pad" />
          </div>
        </div>
      </div>
      <span className="mb-caption">{caption}</span>
    </a>
  );
}

function HeroReel({
  src,
  poster,
  title,
}: {
  src: string;
  poster: string;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const play = () => {
      if (media.matches) return;
      void video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(video);
    play();

    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="mb-screen"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      aria-label={title}
    />
  );
}
