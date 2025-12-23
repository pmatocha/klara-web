"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type NavItem = { href: string; label: string };

export function Header({
  lang,
  nav,
  intro,
  name,
}: {
  lang: "cs" | "en";
  nav: NavItem[];
  intro: boolean;
  name: string;
}) {
  const reduce = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [showName, setShowName] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");

  // držíme poslední známý stav viditelnosti pro všechny sekce
  const visRef = useRef<
    Record<string, { isIntersecting: boolean; ratio: number; top: number }>
  >({});

  const getHeaderH = () => {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--header-h")
      .trim();
    const n = Number(raw.replace("px", ""));
    return Number.isFinite(n) && n > 0 ? n : 64;
  };

  // bg/border
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // showName = až když hero H1 zajíždí pod header
  useEffect(() => {
    const tick = () => {
      const h1 = document.getElementById("hero-title");
      if (!h1) return setShowName(false);
      const rect = h1.getBoundingClientRect();
      setShowName(rect.top <= getHeaderH() + 8);
    };

    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, []);

  // ✅ ScrollSpy (robustní)
  useEffect(() => {
    const pairs = nav
      .map((n) => n.href)
      .filter((h) => h.startsWith("#"))
      .map((h) => ({ hash: h, id: h.slice(1) }));

    const els = pairs
      .map((p) => ({ ...p, el: document.getElementById(p.id) }))
      .filter((x): x is { hash: string; id: string; el: HTMLElement } => !!x.el);

    // init map
    visRef.current = {};
    els.forEach(({ id }) => {
      visRef.current[id] = { isIntersecting: false, ratio: 0, top: 999999 };
    });

    const computeActive = () => {
      // když jsme v hero -> nic nepodtrhávat
      const h1 = document.getElementById("hero-title");
      if (h1) {
        const r = h1.getBoundingClientRect();
        const inHero = r.top > getHeaderH() + 8;
        if (inHero) {
          setActiveHash("");
          return;
        }
      }

      // vyber nejlepší ze všech intersecting
      const items = Object.entries(visRef.current)
        .filter(([, v]) => v.isIntersecting)
        .map(([id, v]) => ({ id, ...v }));

      if (!items.length) return;

      // preferuj vyšší ratio, při remíze ber ten, který je výš (menší top)
      items.sort((a, b) => {
        if (b.ratio !== a.ratio) return b.ratio - a.ratio;
        return a.top - b.top;
      });

      const best = items[0];
      const found = pairs.find((p) => p.id === best.id);
      if (found) setActiveHash(found.hash);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).id;
          visRef.current[id] = {
            isIntersecting: e.isIntersecting,
            ratio: e.intersectionRatio ?? 0,
            top: (e.target as HTMLElement).getBoundingClientRect().top,
          };
        }
        computeActive();
      },
      {
        // sekce se stává aktivní, když její “vršek” projde pod header
        rootMargin: `-${getHeaderH()}px 0px -55% 0px`,
        threshold: [0, 0.05, 0.12, 0.2, 0.35, 0.5],
      }
    );

    els.forEach(({ el }) => io.observe(el));

    // fallback při scrollu (kdyby IO netrefil “hero” přechod)
    const onScroll = () => computeActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    computeActive();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [nav]);

  // animace
  const navVariants = useMemo(
    () => ({
      hidden: {},
      show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, x: -10 },
      show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
    }),
    []
  );

  const langVariants = useMemo(
    () => ({
      hidden: { opacity: 0, x: -8 },
      show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
    }),
    []
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveHash("");
  };

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-[100] transition-colors",
        scrolled
          ? "bg-white/95 backdrop-blur border-b border-border"
          : "bg-[rgb(var(--hero))] border-b border-transparent",
      ].join(" ")}
      style={{ height: "var(--header-h)" }}
    >
      {/* ✅ zarovnání s tvými sekcemi: px-10 lg:px-20 + max-w-[1200px] */}
      <div className="mx-auto grid h-full max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center px-10 lg:px-20">
        {/* left */}
        <button
          type="button"
          onClick={scrollToTop}
          className={[
            "justify-self-start text-left text-sm font-semibold tracking-tight text-text",
              "transition-opacity duration-300",
            "cursor-pointer",
            showName ? "opacity-100" : "opacity-0",
            "hover:text-[rgb(var(--primary))]",
          ].join(" ")}
          aria-label="Scroll to top"
        >
          {name}
        </button>

        {/* center */}
        <motion.nav
          className="hidden justify-self-center gap-8 text-sm md:flex"
          variants={reduce ? undefined : navVariants}
          initial={reduce ? false : "hidden"}
          animate={reduce ? false : intro ? "show" : "hidden"}
        >
          {nav.map((i) => {
            const isActive = activeHash !== "" && i.href === activeHash;
            return (
              <motion.a
                key={i.href}
                href={i.href}
                variants={reduce ? undefined : itemVariants}
                className={[
                  "relative pb-2 transition-colors",
                  "hover:text-[rgb(var(--primary))]",
                  isActive ? "text-[rgb(var(--primary))]" : "text-text",
                  isActive
                    ? "after:absolute after:left-0 after:right-0 after:-bottom-[2px] after:h-[2px] after:bg-[rgb(var(--primary))] after:rounded-full"
                    : "",
                ].join(" ")}
              >
                {i.label}
              </motion.a>
            );
          })}
        </motion.nav>

        {/* right */}
        <motion.div
          className="justify-self-end flex items-center gap-6 text-xs"
          variants={reduce ? undefined : langVariants}
          initial={reduce ? false : "hidden"}
          animate={reduce ? false : intro ? "show" : "hidden"}
          transition={reduce ? undefined : { delay: 0.55 }}
        >
          <div className="flex items-center gap-2 text-muted">
            <a href="/cs" className={lang === "cs" ? "text-text font-semibold" : "hover:text-text"}>
              CZ
            </a>
            <span className="text-black/20">|</span>
            <a href="/en" className={lang === "en" ? "text-text font-semibold" : "hover:text-text"}>
              EN
            </a>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
