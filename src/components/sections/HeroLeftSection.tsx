"use client";

import { HeroLeftPanel } from "./HeroLeftPanel";
import { HeroExpandableCards } from "./HeroExpandableCards";
import type { HeroLocalization } from "../../lib/types/HeroLocalization";


export function HeroLeftSection({
  copy,
  start,
  onIntroDone,
}: {
  copy: HeroLocalization;
  start: boolean;         // rightDone
  onIntroDone?: () => void; // řekneme Headeru "intro hotovo"
}) {
  return (
    <section className="min-h-[calc(100dvh-var(--header-h))] flex items-center">
      <div className="w-full py-14 lg:py-16">
        <HeroLeftPanel start={start} copy={copy} onDone={onIntroDone} />
      </div>
    </section>
  );
}
