"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { useMediaQuery } from "./use-media-query";
import { perspectives } from "@/content/profile";

export function PerspectiveTabs() {
  const [selected, setSelected] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const vertical = useMediaQuery("(max-width: 639px)");
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === (vertical ? "ArrowDown" : "ArrowRight"))
      next = (index + 1) % perspectives.length;
    else if (event.key === (vertical ? "ArrowUp" : "ArrowLeft"))
      next = (index - 1 + perspectives.length) % perspectives.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = perspectives.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    buttons.current[next]?.focus();
  }
  return (
    <div className="mt-10 lg:mt-14">
      <div
        role="tablist"
        aria-orientation={vertical ? "vertical" : "horizontal"}
        aria-label="関心のあるテーマ"
        className="grid gap-2 sm:grid-cols-3"
      >
        {perspectives.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-controls={`panel-${tab.id}`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={`flex min-h-16 items-center gap-3 rounded-t-xl px-5 py-4 text-left text-sm ${selected === index ? "bg-accent text-white" : "bg-surface text-ink hover:bg-line"}`}
          >
            <span
              className={`font-display text-xs ${selected === index ? "text-white/85" : "text-muted"}`}
            >
              0{index + 1}
            </span>
            {tab.label}
            <ArrowUpRight
              size={17}
              aria-hidden="true"
              className="ml-auto shrink-0"
            />
          </button>
        ))}
      </div>
      {perspectives.map((item, index) => (
        <div
          key={item.id}
          hidden={selected !== index}
          role="tabpanel"
          id={`panel-${item.id}`}
          aria-labelledby={`tab-${item.id}`}
          tabIndex={0}
          className="perspective-panel grid gap-10 rounded-b-2xl bg-accent p-7 text-white md:p-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:p-16"
        >
          <div>
            <p className="mb-6 text-sm text-white/80">{item.question}</p>
            <h3 className="whitespace-pre-line text-[clamp(1.45rem,2.5vw,2.3rem)] font-medium leading-[1.7] tracking-tight">
              {item.headline}
            </h3>
            <p className="mt-7 max-w-lg text-sm leading-[2.1] text-white/85">
              {item.body}
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="eyebrow mb-6 text-highlight">
                QUESTIONS I START WITH
              </p>
              <ul className="space-y-5">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 border-b border-white/20 pb-5 text-sm leading-relaxed"
                  >
                    <Check
                      size={17}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-highlight"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <p className="eyebrow mt-9 text-white/85">{item.from}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
