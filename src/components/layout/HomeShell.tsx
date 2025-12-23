"use client";

import { useState } from "react";
import { Header } from "../layout/Header";
import { SplitLayout } from "../layout/SplitLayout";
import { HeroLeftSection } from "../sections/HeroLeftSection";
import { About } from "../sections/About";
import { Services } from "../sections/Services";
import { Experience } from "../sections/Experience";
import { Contact } from "../sections/Contact";
import { Booking } from "../sections/Booking";

export function HomeShell({
  lang,
  nav,
  localization
}: any) {
  const [intro, setIntro] = useState(false);

  return (
    <>
      <Header lang={lang} nav={nav} intro={intro} name={localization.header.name} />

      <main className="pt-[var(--header-h)] text-text">
        <SplitLayout>
          {(rightDone) => (
            <>
              <HeroLeftSection
                copy={localization.hero}
                start={rightDone}         // 1) čeká na pravý panel
                onIntroDone={() => setIntro(true)} // 2) po levém panelu odemkne header animaci
              />

              <About title={localization.about.title} body={localization.about.body} />
              <Services copy={localization.services} />
              <Experience copy={localization.experience} />
              <Contact copy={localization.contact} />
              <Booking title={"Rezervace"} body={"Makám na tom"} />
            </>
          )}
        </SplitLayout>
      </main>
    </>
  );
}
