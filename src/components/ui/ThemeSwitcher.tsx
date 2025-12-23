"use client";

import { useEffect, useMemo, useState } from "react";

type Theme = "theme-a" | "theme-b" | "theme-c";

const THEMES: { id: Theme; label: string }[] = [
  { id: "theme-a", label: "A" },
  { id: "theme-b", label: "B" },
  { id: "theme-c", label: "C" },
];

export function ThemeSwitcher() {
    const [theme, setTheme] = useState<Theme>("theme-a");

    // load saved theme
    useEffect(() => {
        const saved = window.localStorage.getItem("theme") as Theme | null;
        if (saved && THEMES.some((t) => t.id === saved)) setTheme(saved);
    }, []);

    // apply theme to <html>
    useEffect(() => {
        const root = document.documentElement;

        // remove previous
        root.classList.remove("theme-a", "theme-b", "theme-c");
        root.classList.add(theme);

        window.localStorage.setItem("theme", theme);
    }, [theme]);

    const currentLabel = useMemo(
        () => THEMES.find((t) => t.id === theme)?.label ?? "A",
        [theme]
    );

    return (
        <div className="flex items-center gap-1 rounded-full border border-border bg-surface p-1 text-xs shadow-soft">
            {THEMES.map((t) => (
                <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`rounded-full px-2 py-1 ${theme === t.id ? "bg-primary text-primaryContrast" : "text-muted hover:bg-bg"
                        }`}
                    aria-label={`Theme ${t.label}`}
                    title={`Theme ${t.label}`}
                >
                    {t.label}
                </button>
            ))}
            <span className="pl-1 pr-2 text-muted">Theme</span>
        </div>
    );
}
