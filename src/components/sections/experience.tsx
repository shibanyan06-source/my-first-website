import { SectionLink } from "@/components/section-link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { experiences } from "@/content/profile";
import { Container, Eyebrow } from "../ui";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="bg-surface py-16 lg:py-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.4fr] lg:gap-16">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <Eyebrow number="02">EXPERIENCE</Eyebrow>
            <h2 id="experience-title" className="section-title mt-5">
              違う経験が、
              <br />
              視点を広げる。
            </h2>
            <p className="mt-6 max-w-xs text-sm leading-[2] text-muted">
              人を知る。行動を読み解く。魅力を伝える。
              <br />
              3つの領域は、ひとつの線でつながっています。
            </p>
            <div
              className="journey-art relative mt-9 overflow-hidden rounded-2xl bg-accent p-8 text-white"
              aria-hidden="true"
            >
              <div className="relative z-10">
                <p className="eyebrow text-white/85">CONNECTING THE DOTS</p>
                <p className="mt-7 font-serif text-[clamp(2.8rem,4vw,4rem)] italic leading-[1.15]">
                  Listen.
                  <br />
                  Understand.
                  <br />
                  <span className="text-highlight">Connect.</span>
                </p>
              </div>
              <svg
                viewBox="0 0 240 280"
                className="absolute -right-10 top-4 h-full w-[70%] opacity-35"
              >
                <ellipse
                  cx="145"
                  cy="140"
                  rx="67"
                  ry="126"
                  fill="none"
                  stroke="white"
                  transform="rotate(28 145 140)"
                />
                <ellipse
                  cx="145"
                  cy="140"
                  rx="112"
                  ry="55"
                  fill="none"
                  stroke="white"
                  transform="rotate(-28 145 140)"
                />
                <circle cx="162" cy="24" r="6" fill="#e5d6a2" />
              </svg>
              <ArrowDownRight
                className="absolute bottom-8 right-8 text-highlight"
                size={34}
                strokeWidth={1}
              />
            </div>
          </div>
          <div className="relative">
            {experiences.map((item, index) => (
              <article
                key={item.number}
                className="experience-row relative grid grid-cols-[2.2rem_1fr] gap-5 border-t border-line py-9 first:pt-6 sm:grid-cols-[3.6rem_1fr] sm:gap-8"
              >
                <div className="relative">
                  <span className="font-display text-2xl tracking-tight text-accent sm:text-4xl">
                    {item.number}
                  </span>
                  {index < experiences.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-[-2.25rem] left-3 top-14 w-px bg-line"
                    />
                  )}
                </div>
                <div>
                  <p className="eyebrow text-muted">{item.tag}</p>
                  <h3 className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight tracking-[-.045em]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted">{item.subtitle}</p>
                  <p className="mt-6 text-base font-medium leading-relaxed">
                    {item.lead}
                  </p>
                  <p className="mt-4 max-w-lg text-sm leading-[2.1] text-muted">
                    {item.body}
                  </p>
                  <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-xs">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {item.lens}
                  </p>
                </div>
              </article>
            ))}
            <SectionLink
              href="#perspective"
              className="mt-3 flex min-h-16 items-center justify-between gap-5 border-t border-ink py-4 text-sm font-medium hover:text-accent"
            >
              この経験を、どんな視点につなげるか
              <ArrowUpRight size={20} aria-hidden="true" className="shrink-0" />
            </SectionLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
