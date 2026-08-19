export function HeroFlow() {
  return (
    <div className="hero-flow" aria-hidden="true">
      <svg className="hero-flow-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="hero-silk" x="-20%" y="-40%" width="140%" height="180%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.0035"
              numOctaves="4"
              seed="7"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="28s"
                values="0.012 0.0035;0.016 0.005;0.012 0.0035"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0.95 0"
              result="whiteNoise"
            />
            <feGaussianBlur in="whiteNoise" stdDeviation="12 4" result="soft" />
            <feComponentTransfer in="soft">
              <feFuncA type="table" tableValues="0 0.05 0.22 0.55 0.8 0.4 0.08 0" />
            </feComponentTransfer>
          </filter>
          <linearGradient id="hero-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="22%" stopColor="#fff" stopOpacity="1" />
            <stop offset="78%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="hero-band">
            <rect width="1440" height="900" fill="url(#hero-fade)" />
          </mask>
        </defs>
        <g mask="url(#hero-band)" className="hero-flow-drift">
          <rect x="-120" y="220" width="1680" height="460" filter="url(#hero-silk)" />
        </g>
      </svg>
    </div>
  );
}
