"use client";

import { useEffect, useRef, useState } from "react";
import { content, cvPaths } from "@/lib/content";
import { useLanguage } from "./LanguageProvider";
import { PillLink } from "./PillLink";

export function Hero() {
  const { locale } = useLanguage();
  const hero = content.hero[locale];

  return (
    <section id="top" className="stage hero-stage flex min-h-[100dvh] items-center justify-center px-6 pt-24">
      <HeroField />
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
          <PillLink href="#about" label={hero.about} variant="primary" />
          <PillLink href={cvPaths[locale]} label={hero.cv} variant="secondary" external />
        </div>
      </div>
    </section>
  );
}

/** Quiet constellation field — borders / cities as nodes, soft arcs, pointer parallax. */
function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = [
      { x: 0.18, y: 0.28, r: 1.6 },
      { x: 0.32, y: 0.62, r: 1.2 },
      { x: 0.48, y: 0.22, r: 1.8 },
      { x: 0.58, y: 0.55, r: 1.3 },
      { x: 0.72, y: 0.34, r: 1.5 },
      { x: 0.78, y: 0.68, r: 1.1 },
      { x: 0.88, y: 0.42, r: 1.4 },
    ];
    const edges: Array<[number, number]> = [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [2, 4],
      [3, 5],
      [4, 5],
      [4, 6],
      [5, 6],
    ];

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let start = performance.now();
    let pointerX = 0.5;
    let pointerY = 0.45;
    let targetX = 0.5;
    let targetY = 0.45;
    let visible = true;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      if (!visible) {
        raf = 0;
        return;
      }

      const t = (now - start) / 1000;
      pointerX += (targetX - pointerX) * 0.06;
      pointerY += (targetY - pointerY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const driftX = (pointerX - 0.5) * 28;
      const driftY = (pointerY - 0.5) * 20;
      const pulse = reduce.matches ? 0.55 : 0.42 + Math.sin(t * 0.7) * 0.18;

      // soft vignette wash
      const wash = ctx.createRadialGradient(
        width * 0.5 + driftX * 0.3,
        height * 0.42 + driftY * 0.3,
        40,
        width * 0.5,
        height * 0.45,
        Math.max(width, height) * 0.62,
      );
      wash.addColorStop(0, "rgba(42, 155, 138, 0.07)");
      wash.addColorStop(0.45, "rgba(227, 161, 90, 0.03)");
      wash.addColorStop(1, "rgba(8, 9, 12, 0)");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, width, height);

      const points = nodes.map((node, index) => {
        const sway = reduce.matches
          ? 0
          : Math.sin(t * 0.55 + index * 0.9) * 6 + Math.cos(t * 0.35 + index) * 3;
        return {
          x: node.x * width + driftX * (0.4 + node.x * 0.4) + sway,
          y: node.y * height + driftY * (0.35 + node.y * 0.35) + sway * 0.45,
          r: node.r,
        };
      });

      // arcs
      ctx.lineCap = "round";
      for (const [a, b] of edges) {
        const p = points[a];
        const q = points[b];
        if (!p || !q) continue;
        const midX = (p.x + q.x) / 2 + (q.y - p.y) * 0.12;
        const midY = (p.y + q.y) / 2 - (q.x - p.x) * 0.12;
        const phase = reduce.matches ? 0.5 : (Math.sin(t * 0.8 + a + b) + 1) / 2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.quadraticCurveTo(midX, midY, q.x, q.y);
        ctx.strokeStyle = `rgba(232, 238, 244, ${0.05 + phase * 0.1})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 10]);
        ctx.lineDashOffset = reduce.matches ? 0 : -t * 12;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // orbit rings around center mass
      const cx = width * 0.5 + driftX * 0.2;
      const cy = height * 0.44 + driftY * 0.2;
      for (let i = 0; i < 3; i += 1) {
        const radius = Math.min(width, height) * (0.16 + i * 0.11);
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius * 1.35, radius * 0.72, -0.35 + i * 0.08, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(232, 238, 244, ${0.035 + i * 0.012})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // nodes
      points.forEach((p, index) => {
        const glow = reduce.matches ? 0.5 : 0.45 + Math.sin(t * 1.1 + index) * 0.25;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(42, 155, 138, ${0.04 + glow * 0.06})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 247, 251, ${0.35 + glow * 0.35})`;
        ctx.fill();
      });

      // traveling mote on one arc
      if (!reduce.matches) {
        const edge = edges[Math.floor(t * 0.35) % edges.length] ?? edges[0];
        if (edge) {
          const [ai, bi] = edge;
          const p = points[ai];
          const q = points[bi];
          if (p && q) {
            const u = (t * 0.35) % 1;
            const midX = (p.x + q.x) / 2 + (q.y - p.y) * 0.12;
            const midY = (p.y + q.y) / 2 - (q.x - p.x) * 0.12;
            const ox = (1 - u) * (1 - u) * p.x + 2 * (1 - u) * u * midX + u * u * q.x;
            const oy = (1 - u) * (1 - u) * p.y + 2 * (1 - u) * u * midY + u * u * q.y;
            ctx.beginPath();
            ctx.arc(ox, oy, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(227, 161, 90, ${0.55 + pulse * 0.35})`;
            ctx.fill();
          }
        }
      }

      if (!reduce.matches) raf = requestAnimationFrame(draw);
      else raf = 0;
    };

    const onPointer = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      targetX = (event.clientX - rect.left) / rect.width;
      targetY = (event.clientY - rect.top) / rect.height;
    };

    const onLeave = () => {
      targetX = 0.5;
      targetY = 0.45;
    };

    resize();
    draw(performance.now());
    wrap.classList.add("is-ready");

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce.matches) draw(performance.now());
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (visible && !raf) {
          start = performance.now();
          raf = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.05 },
    );
    io.observe(wrap);

    window.addEventListener("pointermove", onPointer, { passive: true });
    wrap.addEventListener("pointerleave", onLeave);
    const onReduce = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      draw(performance.now());
      if (!reduce.matches) raf = requestAnimationFrame(draw);
    };
    reduce.addEventListener("change", onReduce);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      wrap.removeEventListener("pointerleave", onLeave);
      reduce.removeEventListener("change", onReduce);
    };
  }, []);

  return (
    <div ref={wrapRef} className="hero-field" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-field-canvas" />
      <div className="hero-field-mark">DA</div>
    </div>
  );
}

function SkillSwap({ skills }: { skills: string[] }) {
  const pillRef = useRef<HTMLButtonElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);
  const busyRef = useRef(false);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(skills[0] ?? "");
  const [hovered, setHovered] = useState(false);
  const [morphing, setMorphing] = useState(false);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const current = skills[index] ?? "";

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    setDisplay(skills[0] ?? "");
    setIndex(0);
    indexRef.current = 0;
  }, [skills]);

  const measureWidth = (text: string) => {
    const measure = measureRef.current;
    const pill = pillRef.current;
    if (!measure || !pill) return;

    pill.style.removeProperty("font-size");
    const cap = (pill.closest(".hero-copy")?.clientWidth ?? window.innerWidth) - 48;
    const longest = skills.reduce(
      (best, skill) => (skill.length > best.length ? skill : best),
      skills[0] ?? "",
    );
    measure.textContent = longest;
    const need = measure.scrollWidth + 56;
    if (need > cap && need > 0) {
      const size = Number.parseFloat(getComputedStyle(pill).fontSize);
      pill.style.fontSize = `${size * (cap / need) * 0.98}px`;
    }
    measure.textContent = text;
    setWidth(Math.ceil(measure.scrollWidth));
  };

  useEffect(() => {
    measureWidth(display);
    const pill = pillRef.current;
    if (!pill) return;
    const observer = new ResizeObserver(() => measureWidth(display));
    const copy = pill.closest(".hero-copy");
    if (copy) observer.observe(copy);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display, skills]);

  const morphTo = (nextText: string) => {
    const track = trackRef.current;
    if (!track || busyRef.current) return;
    if (nextText === display) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(nextText);
      return;
    }

    busyRef.current = true;
    setMorphing(true);
    const ease = "cubic-bezier(0.76, 0, 0.24, 1)";
    const glyphs = [...track.querySelectorAll<HTMLElement>(".skill-glyph")];

    // Phase 1 — fold glyphs out with stagger (split-flap)
    const exit = glyphs.map((glyph, i) =>
      glyph.animate(
        [
          { transform: "translateY(0) rotateX(0deg)", opacity: 1, filter: "blur(0px)" },
          { transform: "translateY(-110%) rotateX(55deg)", opacity: 0, filter: "blur(4px)" },
        ],
        {
          duration: 340,
          delay: i * 28,
          easing: ease,
          fill: "forwards",
        },
      ),
    );

    // Width eases toward the next label while glyphs leave
    if (measureRef.current) measureRef.current.textContent = nextText;
    const nextWidth = measureRef.current ? Math.ceil(measureRef.current.scrollWidth) : undefined;
    if (nextWidth) setWidth(nextWidth);

    const exitMs = 340 + Math.max(0, glyphs.length - 1) * 28;

    window.setTimeout(() => {
      setDisplay(nextText);

      // Phase 2 — new glyphs rise in after DOM paint
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const incoming = [...track.querySelectorAll<HTMLElement>(".skill-glyph")];
          const enter = incoming.map((glyph, i) =>
            glyph.animate(
              [
                { transform: "translateY(110%) rotateX(-55deg)", opacity: 0, filter: "blur(4px)" },
                { transform: "translateY(0) rotateX(0deg)", opacity: 1, filter: "blur(0px)" },
              ],
              {
                duration: 420,
                delay: i * 32,
                easing: ease,
                fill: "forwards",
              },
            ),
          );

          Promise.all(enter.map((a) => a.finished.catch(() => undefined))).then(() => {
            exit.forEach((a) => a.cancel());
            enter.forEach((a) => a.cancel());
            incoming.forEach((glyph) => {
              glyph.style.transform = "";
              glyph.style.opacity = "";
              glyph.style.filter = "";
            });
            busyRef.current = false;
            setMorphing(false);
          });
        });
      });
    }, exitMs);
  };

  const advance = () => {
    if (skills.length < 2 || busyRef.current) return;
    const nextIndex = (indexRef.current + 1) % skills.length;
    const nextSkill = skills[nextIndex];
    if (!nextSkill) return;
    setIndex(nextIndex);
    morphTo(nextSkill);
  };

  useEffect(() => {
    if (skills.length < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Hover keeps cycling — slightly faster while engaged
    const ms = hovered ? 2100 : 2600;
    const timer = window.setInterval(advance, ms);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skills, hovered]);

  return (
    <button
      ref={pillRef}
      type="button"
      className={`skill-pill${hovered ? " is-hovered" : ""}${morphing ? " is-morphing" : ""}`}
      aria-label={current}
      onClick={advance}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <span ref={measureRef} className="skill-pill-measure" aria-hidden="true" />
      <span className="skill-pill-viewport" style={width ? { width } : undefined}>
        <span ref={trackRef} className="skill-pill-track" aria-hidden="true">
          {[...display].map((char, i) => (
            <span
              key={`${display}-${i}-${char}`}
              className={`skill-glyph${char === " " ? " is-space" : ""}`}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      </span>
    </button>
  );
}
