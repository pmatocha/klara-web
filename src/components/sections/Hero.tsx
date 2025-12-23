"use client";

import { useState } from "react";
import type { Lang } from "../../lib/i18n";
import { HeroClient } from "./HeroClient";
import type { HeroLocalization } from "../../lib/types/HeroLocalization";

export function Hero({
  lang,
  copy,
  onIntroDone,
}: {
  lang: Lang;
  copy: HeroLocalization;
  onIntroDone?: () => void;
}) {
  return (
<section className="bg-[rgb(var(--hero))]">
  {/* jemný wash / gradient jako ve vzoru */}
  <div
    className="
      pointer-events-none absolute inset-0
      [background:radial-gradient(900px_520px_at_70%_55%,rgba(0,0,0,0.06),transparent_60%)]
    "
  />
    <HeroClient lang={lang} copy={copy}  onIntroDone={onIntroDone} />
</section>
  );
}
