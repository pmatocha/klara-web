"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  onDone?: () => void;
};

export function HeroRightPanel({ src, alt, onDone }: Props) {
  const reduce = useReducedMotion();

  return (
    <div className="relative hidden lg:block  pointer-events-none">
      <div className="sticky top-[var(--header-h)] h-[calc(100dvh-var(--header-h))]">
        <div className="flex h-full items-end justify-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18, scale: 0.985 }}
            animate={reduce ? false : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => onDone?.()}
            className="relative h-[clamp(520px,calc(100dvh-var(--header-h)-20px),820px)] w-auto max-w-[720px] aspect-[1/1]"
          >
            <div
              className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2
                         h-20 w-[80%] rounded-full bg-black/25 blur-2xl opacity-25"
            />
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="select-none object-contain object-bottom
                [filter:drop-shadow(0_18px_30px_rgba(0,0,0,0.14))]
                [transform:translateZ(0)]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
