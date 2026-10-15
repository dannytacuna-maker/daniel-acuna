"use client";

function splitLabel(label: string) {
  const i = label.lastIndexOf(" ");
  if (i <= 0) return { lead: label, swap: "" };
  return { lead: label.slice(0, i), swap: label.slice(i + 1) };
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" className="hero-pill-arrow-svg">
      <path
        d="M3.75 9h9M9 14.25 14.25 9 9 3.75"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PillLink({
  href,
  label,
  variant,
  external = false,
  size = "md",
}: {
  href: string;
  label: string;
  variant: "primary" | "secondary";
  external?: boolean;
  size?: "sm" | "md";
}) {
  const { lead, swap } = splitLabel(label);

  return (
    <a
      href={href}
      className={`hero-pill hero-pill-${variant}${size === "sm" ? " hero-pill-sm" : ""}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span className="hero-pill-inner">
        <span className="hero-pill-lead">{lead}</span>
        {swap ? (
          <span className="hero-pill-swap">
            <span className="hero-pill-word">{swap}</span>
            <span className="hero-pill-arrow" aria-hidden="true">
              <ArrowIcon />
            </span>
          </span>
        ) : null}
      </span>
    </a>
  );
}
