import { Reveal } from "../ui/Reveal";

export function Booking({ title, body }: { title: string; body: string }) {
  return (
 <section id="rezervace" className="min-h-[calc(100dvh-var(--header-h)-var(--header-h))] scroll-mt-[calc(var(--header-h)+16px)]">
       <div className="flex items-center pt-8 px-10 py-14 lg:px-20 pb-10">
              
              <div className="max-w-[640px]">
                  <Reveal>
<h2 className="mt-3 w-full font-serif text-5xl text-text lg:w-[532px] lg:text-6xl lg:whitespace-nowrap">                          {title}
                      </h2>
                  </Reveal>
                  <Reveal delay={0.05}>
                     <div className="mt-6 h-px w-56 bg-text/10" />
                  </Reveal>
                  <Reveal delay={0.12}>
                    <p className="mt-10 whitespace-pre-line text-base leading-relaxed text-text/85" >
                     {body}
                    </p>              
                  </Reveal>
        </div>
      </div>
    </section>
  );
}