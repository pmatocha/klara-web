import { PropsWithChildren } from "react";

export function Section({
  id,
  className = "",
  children,
  narrow = false,
}: PropsWithChildren<{ id: string; className?: string; narrow?: boolean }>) {
  return (
    <section
      id={id}
      className={[
        "scroll-mt-[var(--header-h)]",
        "min-h-[calc(100dvh-var(--header-h))]",
        "flex items-center",
        className,
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto w-full px-8",
          narrow ? "max-w-[860px]" : "max-w-[1200px]",
        ].join(" ")}
      >
        {children}
      </div>
    </section>
  );
}
