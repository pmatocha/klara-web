"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "../ui/Reveal";
import { ExpandableCards2Up } from "../ui/ExpandableCards2Up";
import type { ContactLocalization } from "@/src/lib/types/ContactLocalization";
import { Button } from "../ui/Button"; 

type Status = "idle" | "sending" | "sent";

export function Contact({ copy }: { copy: ContactLocalization }) {
  const reduce = useReducedMotion();
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const mapSrc = useMemo(() => {
    const q = encodeURIComponent(copy.cards.address.address);
    return `https://www.google.com/maps?q=${q}&output=embed`;
  }, [copy.cards.address.address]);

  const onSend = async () => {
    if (!text.trim()) return;

    console.log("[CONTACT MESSAGE]", text);

    setStatus("sending");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("idle");
      
    setText("")
  };

  const onClear = () => {
    setText("");
    setStatus("idle");
  };

  return (
    <section
      id="kontakt"
      className="min-h-[calc(100dvh-var(--header-h)-var(--header-h))] scroll-mt-[calc(var(--header-h)+16px)]"
    >
      {/* ✅ wrapper úplně stejně jako Experience */}
      <div className="flex items-center pt-8 px-10 py-14 pb-10 lg:px-20">
        {/* ✅ stejné šířky jako ostatní */}
        <div className="w-full max-w-[640px]">
          <Reveal>
            <h2 className="mt-3 w-full font-serif text-5xl text-text lg:w-[532px] lg:text-6xl lg:whitespace-nowrap">
              {copy.title}
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-6 h-px w-56 bg-text/10" />
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-6 text-lg font-semibold text-text">
              {copy.subtitle}
            </div>
          </Reveal>

          {/* FORM */}
          <Reveal delay={0.18}>
            <div className="mt-4">
              <label className="sr-only">{copy.subtitle}</label>

              {/* ✅ vizuálně sjednoceno na 532px na lg (ať sekce nepůsobí “jinak široká”) */}
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={copy.form.placeholder}
                rows={7}
                className={[
                  "w-full lg:w-[532px]",
                  "rounded-xl border border-black/10 bg-white/70 px-5 py-4",
                  "text-sm text-text placeholder:text-text/40",
                  "shadow-[0_12px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm",
                  "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent",
                ].join(" ")}
              />

           <div className="mt-4 flex items-center gap-3">
  <Button
    variant="primary"
    type="button"
    onClick={onSend}
    disabled={status === "sending"}
    className="relative px-5 py-3" // zachováme menší padding jako doteď
  >
    <span className={status === "idle" ? "opacity-100" : "opacity-0"}>
        {copy.form.send}
    </span>

    <AnimatePresence>
      {status === "sending" && (
        <motion.span
          key="sending"
          className="absolute inset-0 flex items-center justify-center gap-2"
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? false : { opacity: 1 }}
          exit={reduce ? false : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
          {copy.form.sending}
        </motion.span>
      )}

      {status === "sent" && (
        <motion.span
          key="sent"
          className="absolute inset-0 flex items-center justify-center"
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={reduce ? false : { opacity: 1, y: 0 }}
          exit={reduce ? false : { opacity: 0, y: 4 }}
          transition={{ duration: 0.2 }}
        >
          {copy.form.sent}
        </motion.span>
      )}
    </AnimatePresence>
  </Button>

  <Button
    variant="secondary"
    type="button"
    onClick={onClear}
    className="px-5 py-3"
  >
    {copy.form.clear}
  </Button>
</div>

            </div>
          </Reveal>

          {/* CARDS */}
          <Reveal delay={0.24}>
            <div className="mt-10 lg:w-[532px]">
              <ExpandableCards2Up
                moreLabel={copy.moreLabel}
                cardHeight={160}
                cardExpandedHeight={380}
                left={{
                  collapsed: {
                    title: copy.cards.office.title,
                    body: copy.cards.office.preview,
                  },
                  expanded: {
                    title: copy.cards.office.title,
                    body: (
                      <div className="mt-1">
                        <div className="mt-4 overflow-hidden rounded-lg border border-black/10 bg-white">
                          <div className="relative h-[220px] w-full">
                            <Image
                              src={copy.cards.office.imageSrc}
                              alt={copy.cards.office.imageAlt}
                              fill
                              sizes="(min-width: 1024px) 532px, 100vw"
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    ),
                  },
                }}
                right={{
                  collapsed: {
                    title: copy.cards.address.title,
                    body: copy.cards.address.address,
                  },
                  expanded: {
                    title: copy.cards.address.title,
                    body: (
                      <div className="mt-1">
                        <div className="mt-4 text-sm text-text/85">
                          {copy.cards.address.address}
                        </div>

                        <div className="mt-4 overflow-hidden rounded-lg border border-black/10 bg-white">
                          <div className="relative h-[220px] w-full">
                            <iframe
                              title={copy.cards.address.mapTitle}
                              src={mapSrc}
                              className="h-full w-full"
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                            />
                          </div>
                        </div>
                      </div>
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
