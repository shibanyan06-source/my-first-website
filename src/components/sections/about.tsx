import { Container, Eyebrow } from "../ui";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="py-20 lg:py-28"
    >
      <Container className="grid gap-8 lg:grid-cols-[.7fr_2fr] lg:gap-16">
        <Eyebrow number="01">ABOUT YUKA</Eyebrow>
        <div>
          <h2 id="about-title" className="section-title">
            ひとつの肩書きでは、
            <br />
            <span className="text-muted">見えない景色がある。</span>
          </h2>
          <div className="mt-8 grid gap-6 text-sm leading-[2.2] text-muted md:grid-cols-2 md:gap-10">
            <p>
              小売からデジタル分析、そしてインフルエンサーマーケティングへ。性質の異なる3つの職種を経験してきました。
            </p>
            <p>
              共通して大切にしているのは、人の良さや可能性を見つけること。現場・データ・発信を行き来する視点を、私らしい強みにしていきたいと考えています。
            </p>
          </div>
          <div className="mt-9 flex items-center gap-3 border-l-2 border-accent pl-5">
            <span className="font-serif text-4xl italic text-accent">+</span>
            <p className="text-sm font-medium">
              足りないものより、その人にあるもの。
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
