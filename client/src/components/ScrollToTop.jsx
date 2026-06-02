import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Âncoras que devem ir ao topo da página (não usar scrollIntoView em header fixo). */
function isTopHash(hash) {
  const id = hash.replace(/^#/, "").toLowerCase();
  return !id || id === "top";
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (isTopHash(hash)) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    const id = hash.replace(/^#/, "");

    const scrollToSection = () => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToSection);
    });
  }, [pathname, hash]);

  return null;
}
