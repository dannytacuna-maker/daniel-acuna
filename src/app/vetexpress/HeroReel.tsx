"use client";

import { useEffect, useRef } from "react";

export function HeroReel() {
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
    <div ref={wrapRef} className="vx-hero-visual" aria-hidden="true">
      <img className="vx-hero-still" src="/vetexpress/hero-poster.jpg?v=gsd" alt="" decoding="async" />
      <video
        ref={videoRef}
        className="vx-hero-reel"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/vetexpress/hero-poster.jpg?v=gsd"
        disablePictureInPicture
      >
        <source src="/vetexpress/hero-loop-4k.mp4?v=gsd" type="video/mp4" media="(min-width: 900px)" />
        <source src="/vetexpress/hero-loop-1080.mp4?v=gsd" type="video/mp4" />
      </video>
    </div>
  );
}
