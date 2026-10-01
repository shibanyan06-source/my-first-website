import { SectionLink } from "@/components/section-link";
import { ArrowUp } from "lucide-react";
import { Container, Wordmark } from "./ui";

export function SiteFooter() {
  return (
    <footer>
      <Container className="flex flex-wrap items-center justify-between gap-5 py-8">
        <div className="flex items-center gap-7">
          <Wordmark />
          <p className="eyebrow text-muted">© YUKA. PEOPLE, DATA & STORIES.</p>
        </div>
        <SectionLink href="#top" className="nav-link gap-3">
          Back to top
          <ArrowUp size={15} aria-hidden="true" />
        </SectionLink>
      </Container>
    </footer>
  );
}
