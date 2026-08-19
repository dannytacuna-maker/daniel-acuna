"use client";

import { PointerEvent, useRef } from "react";

type Card = {
  title: string;
  body: string;
};

export function ServiceCards({ items }: { items: Card[] }) {
  return (
    <div className="vx-services">
      {items.map((item, index) => (
        <ServiceCard key={item.title} index={index} item={item} />
      ))}
    </div>
  );
}

function ServiceCard({ item, index }: { item: Card; index: number }) {
  const cardRef = useRef<HTMLElement>(null);

  function onMove(event: PointerEvent<HTMLElement>) {
    const card = cardRef.current;
    if (!card) return;
    const box = card.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    card.style.setProperty("--tilt-x", `${y * -7}deg`);
    card.style.setProperty("--tilt-y", `${x * 9}deg`);
  }

  function onLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <article
      ref={cardRef}
      className="vx-card"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <span className="vx-idx">{String(index + 1).padStart(2, "0")}</span>
      <strong>{item.title}</strong>
      <p>{item.body}</p>
    </article>
  );
}
