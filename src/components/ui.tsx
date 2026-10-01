import { SectionLink } from "@/components/section-link";
import type { ReactNode } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20 ${className}`}
    >
      {children}
    </div>
  );
}
export function Eyebrow({
  number,
  children,
  light = false,
}: {
  number?: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`eyebrow flex items-center gap-4 ${light ? "text-white/70" : "text-muted"}`}
    >
      {number && (
        <span className={light ? "text-highlight" : "text-accent"}>
          {number} /
        </span>
      )}
      {children}
    </p>
  );
}
export function ActionLink({
  href,
  children,
  secondary = false,
  down = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  down?: boolean;
}) {
  const Icon = down ? ArrowDown : ArrowUpRight;
  return (
    <SectionLink
      href={href}
      className={`group inline-flex min-h-12 items-center justify-between gap-7 rounded-full border px-6 py-3 text-sm font-medium transition-colors ${secondary ? "border-line hover:border-ink hover:bg-white" : "border-accent bg-accent text-white hover:border-ink hover:bg-ink"}`}
    >
      {children}
      <Icon
        aria-hidden="true"
        size={17}
        className="shrink-0 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
      />
    </SectionLink>
  );
}
export function Wordmark() {
  return (
    <SectionLink
      href="#top"
      aria-label="Yuka トップへ"
      className="inline-flex min-h-11 items-center font-display text-[2.4rem] font-semibold tracking-[-.1em]"
    >
      yuka<span className="text-accent">.</span>
    </SectionLink>
  );
}
