import { ArrowUpRight, Sparkles } from "lucide-react";
import { profile } from "@/content/profile";
import { Container, Eyebrow } from "../ui";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="contact-section bg-ink py-14 text-paper lg:py-20"
    >
      <Container>
        <div className="flex items-center justify-between">
          <Eyebrow number="06" light>
            LET’S CONNECT
          </Eyebrow>
          <Sparkles
            size={32}
            strokeWidth={1}
            aria-hidden="true"
            className="text-highlight"
          />
        </div>
        <div className="mt-9 grid items-end gap-9 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2
              id="contact-title"
              className="font-display text-[clamp(3rem,7.2vw,6.5rem)] leading-[1.1] tracking-[-.065em]"
            >
              Good things
              <br />
              start with{" "}
              <span className="font-serif italic text-highlight">people.</span>
            </h2>
            <p className="mt-7 text-sm leading-[2] text-paper/75">
              新しい可能性は、人とのつながりから。
              <br />
              これからの歩みも、この場所で伝えていきます。
            </p>
          </div>
          <div className="rounded-xl border border-white/20 p-7">
            <p className="eyebrow text-highlight">CONTACT</p>
            {profile.email ? (
              <a
                className="mt-5 inline-flex min-h-12 items-center gap-5 text-lg underline decoration-white/40 underline-offset-8"
                href={`mailto:${profile.email}`}
              >
                メールで相談する
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            ) : (
              <>
                <p className="mt-4 flex items-center gap-3 text-sm">
                  <span className="size-1.5 rounded-full bg-highlight" />
                  お問い合わせ窓口は準備中です
                </p>
                <p className="mt-4 text-xs leading-[2] text-paper/65">
                  受付方法が整い次第、こちらでお知らせします。
                </p>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
