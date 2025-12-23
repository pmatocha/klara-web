"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "../ui/Button";
import { useEffect, useRef } from "react";
import { HeroExpandableCards } from "./HeroExpandableCards";  
import type { HeroCopy } from "@/lib/types/copy";


type Props = {
  start: boolean;
  copy: HeroCopy;
  onDone?: () => void;
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.10, delayChildren: 0.05 },
  },
};

const row = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function HeroLeftPanel({ start, copy, onDone }: Props) {
  const reduce = useReducedMotion();
  const didCall = useRef(false);

  useEffect(() => {
    if (!start) didCall.current = false;
  }, [start]);

  return (
    <div className="flex items-center pt-8 px-10 py-14 lg:px-20">
      <motion.div
        className="max-w-[640px]"
        variants={reduce ? undefined : container}
        initial={reduce ? false : "hidden"}
        animate={reduce ? false : start ? "show" : "hidden"}
        onAnimationComplete={(def) => {
          if (def === "show" && start && !didCall.current) {
            didCall.current = true;
            onDone?.();
          }
        }}
      >
        <motion.div variants={reduce ? undefined : row}>
          <h1
            id="hero-title"
            className="font-serif text-[52px] leading-[1.05] text-text lg:text-[56px] lg:whitespace-nowrap"
          >
            {copy.name}
          </h1>
        </motion.div>

        <motion.div variants={reduce ? undefined : row} className="mt-6">
          <div className="text-sm text-text/80">{copy.kicker}</div>
          <div className="mt-3 h-px w-56 bg-text/10" />
        </motion.div>

        <motion.div
          variants={reduce ? undefined : row}
          className="mt-8 text-lg leading-relaxed text-text/90"
        >
          {copy.lead1}
          <br />
          {copy.lead2}
        </motion.div>

        <motion.div variants={reduce ? undefined : row} className="mt-10 flex gap-4">
          <ButtonLink variant="primary" href="#rezervace">{copy.ctaPrimary}</ButtonLink>
          <ButtonLink variant="secondary" href="#kontakt">{copy.ctaSecondary}</ButtonLink>
        </motion.div>

       <motion.div variants={reduce ? undefined : row} className="mt-10">
            <HeroExpandableCards
               rightText={copy.card2Text} 
                leftTitle={copy.card1Title}
                rightTitle={copy.card2Title}
                rightAddress={copy.whereAddress}
                moreLabel={copy.moreLabel}   // nebo t("common.more")
                cardHeight={160}
            />
        </motion.div>

      </motion.div>
    </div>
  );
}
