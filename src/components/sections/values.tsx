import { values } from "@/content/profile";
import { Container, Eyebrow } from "../ui";

export function Values() {
  return (
    <section
      id="values"
      aria-labelledby="values-title"
      className="border-y border-line py-20 lg:py-24"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[.7fr_2fr] lg:gap-16">
          <div>
            <Eyebrow number="04">MY VALUES</Eyebrow>
            <p className="mt-8 font-serif text-5xl italic text-accent">
              A little more
              <br />
              human.
            </p>
          </div>
          <div>
            <h2 id="values-title" className="section-title">
              仕事の前に、
              <br />
              大切にしていること。
            </h2>
            <div className="mt-10 space-y-8">
              {values.map((value) => (
                <article
                  key={value.number}
                  className="grid gap-4 border-t border-line pt-7 sm:grid-cols-[1fr_1.15fr] sm:gap-8"
                >
                  <div>
                    <p className="eyebrow text-accent">
                      {value.number} / {value.en}
                    </p>
                    <h3 className="mt-3 text-base font-medium">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-[2.1] text-muted">
                    {value.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
