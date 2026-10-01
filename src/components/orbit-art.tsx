export function OrbitArt() {
  return (
    <div
      className="orbit-stage relative mx-auto w-full max-w-[540px]"
      role="img"
      aria-label="小売・データ・インフルエンスという3つの視点が、ひとつの球体を囲むグラフィック"
    >
      <div className="orbit-window relative aspect-[.93] overflow-hidden rounded-t-[48%] rounded-b-2xl bg-accent">
        <svg
          viewBox="0 0 600 650"
          className="absolute inset-0 size-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="orb-sphere" cx="28%" cy="23%" r="80%">
              <stop stopColor="var(--color-orb-light)" />
              <stop offset=".34" stopColor="var(--color-orb-cream)" />
              <stop offset=".7" stopColor="var(--color-orb-sage)" />
              <stop offset="1" stopColor="var(--color-orb-deep)" />
            </radialGradient>
            <radialGradient id="orb-glow">
              <stop stopColor="var(--color-orb-glow)" stopOpacity=".6" />
              <stop
                offset="1"
                stopColor="var(--color-accent)"
                stopOpacity="0"
              />
            </radialGradient>
            <filter id="orb-shadow">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>
          <path
            d="M0 130H600M0 260H600M0 390H600M0 520H600M120 0V650M240 0V650M360 0V650M480 0V650"
            stroke="white"
            strokeOpacity=".045"
          />
          <circle cx="300" cy="320" r="290" fill="url(#orb-glow)" />
          <ellipse
            cx="310"
            cy="521"
            rx="132"
            ry="21"
            fill="var(--color-ink)"
            opacity=".3"
            filter="url(#orb-shadow)"
          />
          <ellipse
            cx="300"
            cy="315"
            rx="259"
            ry="92"
            transform="rotate(-35 300 315)"
            fill="none"
            stroke="var(--color-highlight)"
            strokeOpacity=".5"
          />
          <circle cx="300" cy="315" r="163" fill="url(#orb-sphere)" />
          <ellipse
            cx="300"
            cy="315"
            rx="201"
            ry="230"
            transform="rotate(30 300 315)"
            fill="none"
            stroke="var(--color-highlight)"
            strokeOpacity=".45"
          />
          <path
            d="M89 463C131 510 257 479 380 388S568 215 511 166"
            fill="none"
            stroke="var(--color-paper)"
            strokeWidth="1.6"
          />
          <g className="orbit-satellite">
            <circle cx="470" cy="211" r="9" fill="var(--color-highlight)" />
            <circle
              cx="470"
              cy="211"
              r="17"
              fill="none"
              stroke="var(--color-highlight)"
              strokeOpacity=".4"
            />
          </g>
          <path
            d="M111 141v16m-8-8h16M488 541v16m-8-8h16"
            stroke="#fff"
            strokeOpacity=".6"
          />
        </svg>
        <span className="eyebrow absolute inset-x-0 bottom-7 text-center text-white/80">
          DIFFERENT PERSPECTIVES. ONE YUKA.
        </span>
      </div>
      <span className="orbit-tag left-0 top-[25%] lg:-left-5">
        <span className="size-2 rounded-full bg-accent" />
        RETAIL
      </span>
      <span className="orbit-tag right-0 top-[51%] lg:-right-5">
        <span className="size-2 rounded-full bg-accent" />
        DATA
      </span>
      <span className="orbit-tag bottom-[17%] left-0 lg:-left-4">
        <span className="size-2 rounded-full bg-accent" />
        INFLUENCE
      </span>
      <span
        className="absolute right-4 top-5 font-serif text-[3.5rem] italic text-accent md:right-1"
        aria-hidden="true"
      >
        ✳
      </span>
    </div>
  );
}
