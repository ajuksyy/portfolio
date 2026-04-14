"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, type Theme } from "./ThemeProvider";

const THEMES: { id: Theme; label: string }[] = [
  { id: "minimal", label: "Minimal" },
  { id: "dark", label: "Dark" },
  { id: "cyberpunk", label: "Cyberpunk" },
  { id: "developer", label: "Developer" },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const current = THEMES.find((t) => t.id === theme)!;

  return (
    <div ref={ref} className="fixed top-6 right-6 z-[9999]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 border-b pb-0.5 text-[12px] tracking-[0.03em] transition-all duration-300"
        style={{
          color: "var(--ink)",
          borderColor: open ? "var(--ink)" : "var(--divider)",
          fontFamily: "var(--font-inter)",
        }}
      >
        <span className="opacity-40 text-[10px]">theme</span>
        <span>{current.label}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-3 min-w-[140px] rounded-xl border backdrop-blur-xl p-1"
            style={{
              background: "var(--panel-strong)",
              borderColor: "var(--panel-border)",
              boxShadow: "0 12px 40px -12px rgba(0,0,0,0.15)",
            }}
          >
            {THEMES.map((t) => {
              const active = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-[12px] transition-all duration-150"
                  style={{
                    color: active ? "var(--ink)" : "var(--mist-muted)",
                    background: active ? "var(--card-bg)" : "transparent",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {t.label}
                  {active && (
                    <span className="text-[10px] opacity-50">●</span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
