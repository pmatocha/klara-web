"use client";

import { ReactNode, useState } from "react";
import { HeroRightPanel } from "../sections/HeroRightPanel";

export function SplitLayout({
  children,
  onRightIntroDone,
}: {
  children: (rightDone: boolean) => ReactNode; // render prop
  onRightIntroDone?: () => void; // když chceš poslat signál výš (Header intro)
}) {
  const [rightDone, setRightDone] = useState(false);

  return (
    <div className="relative bg-[rgb(var(--hero))]">
      <div
        className="pointer-events-none absolute inset-0
        [background:radial-gradient(900px_520px_at_70%_55%,rgba(0,0,0,0.06),transparent_60%)]"
      />

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 px-8 lg:grid-cols-2">
        {/* LEFT – scrollující obsah */}
        <div className="lg:pr-8">{children(rightDone)}</div>

        {/* RIGHT – sticky panel s intro animací */}
        <HeroRightPanel
          src="/klara-hero.png"
          alt="Mgr. Klára Milfaitová"
          onDone={() => {
            setRightDone(true);
            onRightIntroDone?.();
          }}
        />
      </div>
    </div>
  );
}
