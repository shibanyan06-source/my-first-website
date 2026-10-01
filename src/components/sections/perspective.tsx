import { Container, Eyebrow } from "../ui";
import { PerspectiveTabs } from "../perspective-tabs";

export function Perspective() {
  return (
    <section
      id="perspective"
      aria-labelledby="perspective-title"
      className="py-20 lg:py-28"
    >
      <Container>
        <Eyebrow number="03">HOW I SEE THINGS</Eyebrow>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <h2 id="perspective-title" className="section-title">
            こんな問いから、
            <br />
            考えはじめます。
          </h2>
          <p className="max-w-sm text-sm leading-[2] text-muted">
            関心のあるテーマを選んでみてください。
            <br />
            経験を通じて育ててきた、私の視点をご紹介します。
          </p>
        </div>
        <PerspectiveTabs />
      </Container>
    </section>
  );
}
