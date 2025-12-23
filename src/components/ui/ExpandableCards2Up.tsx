"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type CardCollapsed = {
  title: React.ReactNode; // ✅ bylo string
  body: React.ReactNode;
};

type CardExpanded = {
  title: React.ReactNode; // ✅ bylo string
  body: React.ReactNode;
};

type ExpandDirection = "up" | "down";

type Props = {
  left: { collapsed: CardCollapsed; expanded: CardExpanded };
  right: { collapsed: CardCollapsed; expanded: CardExpanded };
  moreLabel: string;

  cardHeight?: number;
  cardExpandedHeight?: number;

  /** default = "up" */
  expandDirection?: ExpandDirection;

  /** ✅ aby šlo řídit překrytí mezi řadami */
  overlayZIndex?: number;

  className?: string;
};

export function ExpandableCards2Up({
  left,
  right,
  moreLabel,
  cardHeight = 150,
  cardExpandedHeight = 320,
  expandDirection = "up",
  overlayZIndex = 30,
  className,
}: Props) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<null | "left" | "right">(null);

  const baseCard =
    "relative rounded-xl border border-black/10 bg-white/70 px-8 py-7 text-left " +
    "shadow-[0_12px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm " +
    "transition-colors duration-200 outline-none";

  const hoverCard = "cursor-pointer hover:border-[rgb(var(--primary))]";
  const divider = <div className="mt-3 h-px w-24 bg-black/10" />;

  const overlayVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 10, scale: 0.985 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 8, scale: 0.99 },
    }),
    []
  );

  const panelVariants = useMemo(
    () => ({
      initial: { scaleX: 0.92 },
      animate: { scaleX: 1 },
      exit: { scaleX: 0.96 },
    }),
    []
  );

  const overlayPos = expandDirection === "down" ? "top-0" : "bottom-0";

  const origin = (side: "left" | "right") => {
    const v = expandDirection === "down" ? "top" : "bottom";
    const h = side === "left" ? "left" : "right";
    return `${h} ${v}` as const;
  };

  return (
    <div className={["relative", className].filter(Boolean).join(" ")}>
      {/* COLLAPSED GRID */}
      <div className="grid grid-cols-2 gap-6">
        <button
          type="button"
          onClick={() => setActive("left")}
          className={[baseCard, hoverCard, "group"].join(" ")}
          style={{ height: cardHeight }}
        >
          <div className="font-semibold">{left.collapsed.title}</div>
          {divider}
          <div className="mt-4 text-sm text-text/80">{left.collapsed.body}</div>

          <div
            className={[
              "absolute bottom-4 right-5 text-xs font-semibold text-[rgb(var(--primary))]",
              "underline-offset-4 group-hover:underline",
            ].join(" ")}
          >
            {moreLabel}
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActive("right")}
          className={[baseCard, hoverCard, "group"].join(" ")}
          style={{ height: cardHeight }}
        >
          <div className="font-semibold">{right.collapsed.title}</div>
          {divider}
          <div className="mt-4 text-sm text-text/80">{right.collapsed.body}</div>

          <div
            className={[
              "absolute bottom-4 right-5 text-xs font-semibold text-[rgb(var(--primary))]",
              "underline-offset-4 group-hover:underline",
            ].join(" ")}
          >
            {moreLabel}
          </div>
        </button>
      </div>

      {/* OVERLAY */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active}
            className={["pointer-events-none absolute left-0 right-0", overlayPos].join(" ")}
            style={{ zIndex: overlayZIndex }} // ✅ tady
            initial={reduce ? undefined  : overlayVariants.initial}
            animate={reduce ? undefined  : overlayVariants.animate}
            exit={reduce ? undefined  : overlayVariants.exit}
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
                  height: cardExpandedHeight,
                  transformOrigin: origin(active),
                }}
                initial={reduce ? undefined  : panelVariants.initial}
                animate={reduce ? undefined  : panelVariants.animate}
                exit={reduce ? undefined  : panelVariants.exit}
                transition={{ duration: 0.22, ease: "easeOut" }}
                onMouseLeave={() => setActive(null)}
              >
                {active === "left" ? (
                  <>
                    <div className="font-semibold text-text">{left.expanded.title}</div>
                    {divider}
                    <div className="mt-5 text-sm text-text/90">{left.expanded.body}</div>
                  </>
                ) : (
                  <>
                    <div className="font-semibold text-text">{right.expanded.title}</div>
                    {divider}
                    <div className="mt-5 text-sm text-text/90">{right.expanded.body}</div>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
