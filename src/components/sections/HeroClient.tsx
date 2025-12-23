"use client";

import { useState } from "react";
import type { Lang } from "../../lib/i18n";
import { HeroRightPanel } from "./HeroRightPanel";
import { HeroLeftPanel } from "./HeroLeftPanel";
import type { HeroLocalization } from "../../lib/types/HeroLocalization";


export function HeroClient({
  lang,
  copy,
  onIntroDone,
}: {
  lang: Lang;
  copy: HeroLocalization;
  onIntroDone?: () => void;
}) {
  const [rightDone, setRightDone] = useState(false);

  return (
    <div className="mx-auto grid min-h-[100dvh] max-w-[1200px] grid-cols-1 px-8 lg:grid-cols-2">
      <HeroLeftPanel
        start={rightDone}
        copy={copy}
        onDone={onIntroDone}          // ← po dokončení levého panelu
      />

      <HeroRightPanel
        src="/klara-hero.png"
        alt={copy.photoAlt}
        onDone={() => setRightDone(true)} // ← odemkne levý panel
      />
    </div>
  );
}
