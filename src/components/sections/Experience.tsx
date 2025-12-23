"use client";

import { Reveal } from "../ui/Reveal";
import { ExpandableCards2Up } from "../ui/ExpandableCards2Up";
import type { ExperienceLocalization } from "../../lib/types/ExperienceLocalization";

export function Experience({ copy }: { copy: ExperienceLocalization }) {
  const BulletList = ({ items }: { items: { title: string; meta?: string }[] }) => (
    <ul className="mt-5 space-y-3 text-sm text-text/90">
      {items.map((it) => (
        <li key={it.title} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/35" />
          <div>
            <div>{it.title}</div>
            {it.meta ? <div className="mt-1 text-xs text-text/60">{it.meta}</div> : null}
          </div>
        </li>
      ))}
    </ul>
  );

  const Info = ({ tooltip }: { tooltip: string }) => (
    <span
      title={tooltip}
      className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full border border-black/15 text-[11px] text-text/70"
      aria-label="Info"
    >
      i
    </span>
  );

  return (
    <section
      id="vzdelani"
      className="min-h-[calc(100dvh-var(--header-h)-var(--header-h))] scroll-mt-[calc(var(--header-h)+16px)]"
    >
      <div className="flex items-center pt-8 px-10 py-14 lg:px-20 pb-10">
        <div className="max-w-[640px]">
          <Reveal>
            <h2 className="mt-3 w-full font-serif text-5xl text-text lg:w-[532px] lg:text-6xl lg:whitespace-nowrap">
                {copy.title}
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-6 h-px w-56 bg-text/10" />
          </Reveal>

          <div className="mt-10 space-y-6">
            {/* ROW 1 – expanduje DOLŮ, musí překrýt spodní => vyšší z-index */}
            <Reveal delay={0.12}>
              <div className="relative">
                <ExpandableCards2Up
                  moreLabel={copy.moreLabel}
                  cardHeight={160}
                  cardExpandedHeight={260}
                  expandDirection="down"
                  overlayZIndex={40} // ✅ důležité
                  left={{
                    collapsed: {
                      title: copy.cards.work.title,
                      body: copy.cards.work.preview,
                    },
                    expanded: {
                      title: copy.cards.work.title,
                      body: <BulletList items={copy.cards.work.items} />,
                    },
                  }}
                  right={{
                    collapsed: {
                      title: copy.cards.education.title,
                      body: copy.cards.education.preview,
                    },
                    expanded: {
                      title: copy.cards.education.title,
                      body: <BulletList items={copy.cards.education.items} />,
                    },
                  }}
                />
              </div>
            </Reveal>

            {/* ROW 2 – expanduje NAHORU => nižší z-index */}
            <Reveal delay={0.18}>
              <div className="relative">
                <ExpandableCards2Up
                  moreLabel={copy.moreLabel}
                  cardHeight={160}
                  cardExpandedHeight={260}
                  expandDirection="up"
                  overlayZIndex={20}
                  left={{
                    collapsed: {
                      title: (
                        <span className="inline-flex items-center">
                          {copy.cards.training.title}
                          <Info tooltip={copy.cards.training.tooltip} />
                        </span>
                      ),
                      body: copy.cards.training.preview,
                    },
                    expanded: {
                      title: copy.cards.training.title,
                      body: <BulletList items={copy.cards.training.items} />,
                    },
                  }}
                  right={{
                    collapsed: {
                      title: (
                        <span className="inline-flex items-center">
                          {copy.cards.courses.title}
                          <Info tooltip={copy.cards.courses.tooltip} />
                        </span>
                      ),
                      body: copy.cards.courses.preview,
                    },
                    expanded: {
                      title: copy.cards.courses.title,
                      body: <BulletList items={copy.cards.courses.items} />,
                    },
                  }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
