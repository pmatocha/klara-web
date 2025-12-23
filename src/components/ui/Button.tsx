import * as React from "react";
import Link from "next/link";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center cursor-pointer rounded-lg px-8 py-3 text-sm font-semibold " +
  "transition-all duration-200 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 " +
  "active:translate-y-[1px] disabled:cursor-not-allowed";

const styles: Record<Variant, string> = {
  primary:
    "bg-[rgb(var(--primary))] text-white shadow-[0_10px_20px_rgba(0,0,0,0.14)] " +
    "hover:bg-white hover:text-black hover:shadow-[0_10px_20px_rgba(0,0,0,0.10)] " +
    "border border-transparent hover:border-black/10",
  secondary:
    "bg-white text-text border border-black/15 shadow-[0_10px_20px_rgba(0,0,0,0.08)] " +
    "hover:bg-[rgb(var(--primary))] hover:text-white hover:border-transparent " +
    "hover:shadow-[0_10px_20px_rgba(0,0,0,0.14)]",
};

export function Button({
  variant = "secondary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />;
}

export function ButtonLink({
  href,
  variant = "secondary",
  className = "",
  ...props
}: React.ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`} {...props} />
  );
}
