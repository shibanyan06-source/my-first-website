import { Plus } from "lucide-react";
import { faqs } from "@/content/profile";
import { Container, Eyebrow } from "../ui";

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="py-20 lg:py-24">
      <Container className="grid gap-8 lg:grid-cols-[.7fr_2fr] lg:gap-16">
        <div>
          <Eyebrow number="05">GOOD TO KNOW</Eyebrow>
          <h2 id="faq-title" className="mt-5 text-2xl font-medium">
            もう少し、Yukaのこと。
          </h2>
        </div>
        <div>
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group border-b border-line first:border-t"
            >
              <summary className="faq-summary flex min-h-20 items-center justify-between gap-5 py-5 text-sm font-medium">
                <span>{faq.question}</span>
                <Plus
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 text-accent transition-transform group-open:rotate-45"
                />
              </summary>
              <p className="max-w-2xl pb-7 pr-8 text-sm leading-[2.1] text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
