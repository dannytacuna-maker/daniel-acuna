"use client";

export function Phone({
  href,
  poster,
  title,
  side = "right",
}: {
  href?: string;
  poster: string;
  title: string;
  side?: "left" | "right";
}) {
  const className = `phone-mock phone-mock-${side}`;
  const body = (
    <>
      <span className="phone-mock-shadow" aria-hidden="true" />
      <span className="phone-mock-frame">
        <span className="phone-mock-notch" aria-hidden="true" />
        <span className="phone-mock-glass">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="phone-mock-screen" src={poster} alt="" decoding="async" />
        </span>
        <span className="phone-mock-home" aria-hidden="true" />
      </span>
    </>
  );

  if (!href) {
    return (
      <span className={className} aria-label={`${title} — mobile`}>
        {body}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`${title} — mobile`}
    >
      {body}
    </a>
  );
}
