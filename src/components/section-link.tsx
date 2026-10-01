"use client";

import type { ComponentProps, MouseEvent } from "react";

/** Keep native fragments/history; move keyboard focus to the destination as well. */
export function SectionLink({ onClick, ...props }: ComponentProps<"a">) {
  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank" ||
      props.download
    )
      return;
    const href = props.href;
    if (!href?.startsWith("#")) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    requestAnimationFrame(() => {
      const temporaryTabIndex = !target.hasAttribute("tabindex");
      if (temporaryTabIndex) {
        target.tabIndex = -1;
        target.addEventListener(
          "blur",
          () => target.removeAttribute("tabindex"),
          { once: true },
        );
      }
      target.focus({ preventScroll: true });
    });
  }
  return <a {...props} onClick={navigate} />;
}
