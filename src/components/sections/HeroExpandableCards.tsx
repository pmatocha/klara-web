"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Props = {
  leftTitle: string;
  rightTitle: string;
  rightText: string;
  rightAddress: string;
  moreLabel: string;
  cardHeight?: number;
  cardExpandedHeight?: number;
};

const FOCUS = [
  "Úzkosti",
  "Stres",
  "Deprese",
  "Emoční problémy, vztek",
  "Existenciální problémy",
  "Intimita a sexualita",
  "Panické ataky",
  "Poruchy příjmu potravy",
  "Psychosomatika",
  "Rozchod",
  "Seberozvoj",
  "Sebevědomí",
  "Syndrom vyhoření",
  "Vztahy",
  "Zdravotní problémy",
];

export function HeroExpandableCards({
  leftTitle,
  rightTitle,
  rightText,
  rightAddress,
  moreLabel,
  cardHeight = 150,
  cardExpandedHeight = 420,
}: Props) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<null | "left" | "right">(null);

  const baseCard =
    "group relative rounded-xl border bg-white/70 px-8 py-7 text-left " +
    "shadow-[0_12px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm " +
    "transition-colors duration-200 outline-none";

  // ✅ Hover: jen border + underline "more", žádná změna fontu/textu
  const hoverCard =
    "cursor-pointer hover:border-[rgb(var(--primary))]";

  const divider = <div className="mt-3 h-px w-24 bg-black/10" />;

  const mapSrc = useMemo(() => {
    const q = encodeURIComponent(rightAddress);
    return `https://www.google.com/maps?q=${q}&output=embed`;
  }, [rightAddress]);

  // ✅ výška mapy: aby se vešla do overlay výšky
  const mapHeight = Math.max(200, Math.min(320, cardExpandedHeight - 150));

  return (
    <div className="relative">
      {/* COLLAPSED GRID – pevný layout */}
      <div className="grid grid-cols-2 gap-6">
        <button
          type="button"
          onClick={() => setActive("left")}
          className={[baseCard, "border-black/10 text-text", hoverCard].join(" ")}
          style={{ height: cardHeight }}
        >
          <div className="font-semibold">{leftTitle}</div>
          {divider}

          <div className="mt-4 text-sm text-text/80">Úzkosti • Stres • Deprese</div>

          <div
            className="
              absolute bottom-4 right-5 text-xs font-semibold text-[rgb(var(--primary))]
              group-hover:underline
            "
          >
            {moreLabel}
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActive("right")}
          className={[baseCard, "border-black/10 text-text", hoverCard].join(" ")}
          style={{ height: cardHeight }}
        >
          <div className="font-semibold">{rightTitle}</div>
          {divider}

          <div className="mt-4 text-sm text-text/80">{rightText}</div>

          <div
            className="
              absolute bottom-4 right-5 text-xs font-semibold text-[rgb(var(--primary))]
              group-hover:underline
            "
          >
            {moreLabel}
          </div>
        </button>
      </div>

      {/* OVERLAY – překrývá, nic nevytlačuje */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active}
            className="pointer-events-none absolute left-0 right-0 bottom-0 z-30"
            initial={reduce ? undefined  : { opacity: 0, y: 10, scale: 0.985 }}
            animate={reduce ? undefined  : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined  : { opacity: 0, y: 8, scale: 0.99 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className={["flex", active === "left" ? "justify-start" : "justify-end"].join(" ")}>
              <motion.div
                className={[
                  "pointer-events-auto",
                  "relative w-full max-w-[720px]",
                  "rounded-xl border border-black/10 bg-white/80 px-8 py-7",
                  "shadow-[0_18px_60px_rgba(0,0,0,0.14)] backdrop-blur-sm",
                ].join(" ")}
                style={{
                  transformOrigin: active === "left" ? "left bottom" : "right bottom",
                  height: cardExpandedHeight, // ✅ používáme parametr
                }}
                initial={reduce ? undefined  : { scaleX: 0.92 }}
                animate={reduce ? undefined  : { scaleX: 1 }}
                exit={reduce ? undefined  : { scaleX: 0.96 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                onMouseLeave={() => setActive(null)}
              >
                {/* aby se obsah v pevné výšce rozumně choval */}
                <div className="h-full overflow-hidden">
                  {active === "left" ? (
                    <>
                      <div className="font-semibold text-text">{leftTitle}</div>
                      {divider}

                      {/* ✅ scroll uvnitř, pokud by se seznam nevešel */}
                      <div className="mt-5 h-[calc(100%-72px)] overflow-auto pr-2">
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-text/90">
                          {FOCUS.map((x) => (
                            <li key={x} className="flex items-start gap-2">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/35" />
                              {x}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="font-semibold text-text">{rightTitle}</div>
                      {divider}

                      <div className="mt-4 text-sm text-text/80">{rightText}</div>
                      <div className="mt-2 text-sm text-text/80">{rightAddress}</div>

                      <div className="mt-4 overflow-hidden rounded-lg border border-black/10 bg-white">
                        <div className="relative w-full" style={{ height: mapHeight }}>
                          <iframe
                            title="Mapa"
                            src={mapSrc}
                            className="h-full w-full"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
