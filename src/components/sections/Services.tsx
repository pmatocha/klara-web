"use client";

import { Reveal } from "../ui/Reveal";
import { ExpandableCards2Up } from "../ui/ExpandableCards2Up";
import { ServicesLocalization } from "@/src/lib/types/ServicesLocalization";

export function Services({ copy }: { copy: ServicesLocalization }) {
  return (
    <section
      id="sluzby"
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

          <Reveal delay={0.12}>
            <ul className="mt-10 space-y-2 text-base leading-relaxed text-text/85">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/35" />
                {copy.bullets.individual}
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/35" />
                {copy.bullets.teens}
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 text-base text-text/85">
              <span className="font-semibold text-text">{copy.paymentLabel}</span>{" "}
              {copy.paymentText}
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10">
              <ExpandableCards2Up
                moreLabel={copy.moreLabel}
                cardHeight={160}
                cardExpandedHeight={230}
                left={{
                    collapsed: {
                    title: copy.priceCard.title,
                    body: copy.priceCard.line,
                    },
                    expanded: {
                    title: copy.priceCard.title,
                    body: (
                        <div className="grid grid-cols-2 gap-8">
                        <div>
                            <div className="font-semibold">{copy.priceCard.expanded.col1Title}</div>
                            <div className="mt-2 text-text/80">{copy.priceCard.expanded.mode}</div>
                            <div className="mt-3">{copy.priceCard.expanded.duration}</div>
                            <div className="mt-2 font-semibold">{copy.priceCard.expanded.price}</div>
                        </div>

                        <div>
                            <div className="font-semibold">{copy.priceCard.expanded.col2Title}</div>
                            <div className="mt-2 text-text/80">{copy.priceCard.expanded.mode}</div>
                            <div className="mt-3">{copy.priceCard.expanded.duration}</div>
                            <div className="mt-2 font-semibold">{copy.priceCard.expanded.price}</div>
                        </div>
                        </div>
                    ),
                    },
                }}
                right={{
                    collapsed: {
                    title: copy.cancelCard.title,
                    body: copy.cancelCard.preview,
                    },
                    expanded: {
                    title: copy.cancelCard.title,
                    body: (
                        <p className="whitespace-pre-line leading-relaxed text-text/90">
                        {copy.cancelCard.expanded}
                        </p>
                    ),
                    },
                }}
                />

            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
