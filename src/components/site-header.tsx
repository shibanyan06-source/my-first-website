"use client";

import { SectionLink } from "@/components/section-link";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/content/profile";
import { Container, Wordmark } from "./ui";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const progress = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id]"),
    );
    const update = () => {
      frame = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const ratio =
        total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      if (progress.current)
        progress.current.style.transform = `scaleX(${ratio})`;
      const threshold =
        (header.current?.offsetHeight ?? 96) + window.innerHeight * 0.2;
      let current = "";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= threshold)
          current = section.id;
      }
      setActiveSection((previous) =>
        previous === current ? previous : current,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [open]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  return (
    <header
      ref={header}
      onClickCapture={(event) => {
        if (
          event.target instanceof Element &&
          event.target.closest('a[href^="#"]')
        )
          setOpen(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      className="sticky top-0 z-30 border-b border-line/70 bg-paper/95 backdrop-blur-xl"
    >
      <Container className="flex min-h-24 items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Wordmark />
          <span className="eyebrow hidden text-muted xl:block">
            PEOPLE, DATA & STORIES
          </span>
        </div>
        <nav
          aria-label="メインナビゲーション"
          className="hidden items-center gap-8 md:flex"
        >
          {navigation.map((link) => (
            <SectionLink
              key={link.href}
              href={link.href}
              className="nav-link section-nav-link"
              aria-current={
                activeSection === link.href.slice(1) ? "location" : undefined
              }
            >
              {link.label}
            </SectionLink>
          ))}
          <SectionLink
            href="#contact"
            aria-current={activeSection === "contact" ? "location" : undefined}
            className="nav-link gap-3 rounded-full border border-ink px-5"
          >
            Contact <ArrowUpRight size={15} aria-hidden="true" />
          </SectionLink>
        </nav>
        <button
          ref={menuButton}
          type="button"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
          className="flex size-12 items-center justify-center rounded-full border border-line md:hidden"
        >
          {open ? (
            <X aria-hidden="true" size={22} />
          ) : (
            <Menu aria-hidden="true" size={22} />
          )}
        </button>
      </Container>
      <nav
        id="mobile-navigation"
        aria-label="モバイルナビゲーション"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-paper px-6 py-5 shadow-lg md:hidden"
      >
        {[...navigation, { href: "#contact", label: "Contact" }].map((link) => (
          <SectionLink
            key={link.href}
            href={link.href}
            aria-current={
              activeSection === link.href.slice(1) ? "location" : undefined
            }
            onClick={() => setOpen(false)}
            className="flex min-h-14 items-center justify-between border-b border-line/60 py-3 font-display text-xl last:border-0"
          >
            {link.label}
            <ArrowUpRight size={18} aria-hidden="true" />
          </SectionLink>
        ))}
      </nav>
      <div
        aria-hidden="true"
        ref={progress}
        data-reading-progress
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-accent"
      />
    </header>
  );
}
