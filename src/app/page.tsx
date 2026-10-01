import { SectionLink } from "@/components/section-link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Perspective } from "@/components/sections/perspective";
import { Values } from "@/components/sections/values";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div id="top">
      <SectionLink className="skip-link" href="#main">
        本文へ移動
      </SectionLink>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Experience />
        <Perspective />
        <Values />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
