import { SectionLink } from "@/components/section-link";
import { ArrowDown } from "lucide-react";
import { profile } from "@/content/profile";
import { OrbitArt } from "../orbit-art";
import { ActionLink, Container } from "../ui";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="hero-section relative isolate overflow-hidden pb-5 pt-8 md:pt-12"
    >
      <Container>
        <div className="mb-8 flex items-center justify-between gap-5 border-b border-line pb-5">
          <p className="eyebrow flex items-center gap-3 text-muted">
            <span className="size-1.5 rounded-full bg-accent" />
            PERSONAL PROFILE / {profile.name}
          </p>
          <span className="eyebrow hidden text-muted sm:block">
            A DIFFERENT POINT OF VIEW
          </span>
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div className="hero-intro relative z-10 pb-4">
            <div aria-hidden="true" className="mb-5 flex items-start gap-4">
              <p className="font-display text-[clamp(5rem,12vw,11rem)] font-normal leading-[.85] tracking-[-.08em]">
                Yuka<span className="text-accent">.</span>
              </p>
            </div>
            <p className="mb-8 mt-5 font-serif text-[clamp(1.8rem,3vw,2.6rem)] italic leading-tight text-accent">
              People first. Possibilities next.
            </p>
            <h1
              id="hero-title"
              className="text-[clamp(1.85rem,3.3vw,3rem)] font-medium leading-[1.65] tracking-[-.055em]"
            >
              人の可能性を、
              <br />
              伝わる価値へ。
            </h1>
            <p className="mt-6 max-w-md text-sm leading-[2.2] text-muted">
              現場で聞く。データで捉える。人の魅力を届ける。
              <br className="hidden sm:block" />
              異なる3つの経験をつなぎ、
              <br className="hidden sm:block" />
              人とブランドの「伝わる」を考えます。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href="#perspective">3つの視点を知る</ActionLink>
              <ActionLink href="#about" secondary down>
                プロフィールを読む
              </ActionLink>
            </div>
          </div>
          <div className="hero-visual relative">
            <OrbitArt />
            <div className="mt-5 flex justify-between gap-5 text-muted">
              <span className="eyebrow">THREE FIELDS.</span>
              <span className="eyebrow">ONE CONNECTED PERSPECTIVE.</span>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 md:mt-14">
          <p className="eyebrow text-muted">
            RETAIL <span className="mx-3 text-accent">×</span> DATA{" "}
            <span className="mx-3 text-accent">×</span> INFLUENCE
          </p>
          <SectionLink
            href="#experience"
            className="group inline-flex min-h-11 items-center gap-4 text-xs text-muted"
          >
            経験のつながりをたどる
            <ArrowDown
              size={16}
              aria-hidden="true"
              className="transition-transform group-hover:translate-y-1"
            />
          </SectionLink>
        </div>
      </Container>
    </section>
  );
}
