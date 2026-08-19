"use client";

import { useEffect } from "react";

export function HeroChrome() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".vx");
    const nav = document.querySelector(".vx-nav");
    if (!root || !nav) return;

    const onScroll = () => {
      const t = Math.min(1, window.scrollY / (window.innerHeight * 0.42));
      root.style.setProperty("--hero-tint", String(t));
      nav.classList.toggle("is-solid", t > 0.16);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
