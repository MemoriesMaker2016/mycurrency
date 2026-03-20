"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleLanguageChange } from "../action/setLangauge";

interface LanguageOption {
  code: string;
  label: string;
  flag: string;
  dir?: "ltr" | "rtl";
}

const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English",  flag: "🇺🇸" },
  { code: "hi", label: "हिन्दी",    flag: "🇮🇳" },
];

export default function Language() {
  const router  = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  // Read current locale from cookie on mount (falls back to "en")
  const [currentCode, setCurrentCode] = useState<string>(() => {
    if (typeof document === "undefined") return "en";
    const match = document.cookie.match(/(?:^|;\s*)locale=([^;]+)/);
    return match ? match[1] : "en";
  });

  const [open, setOpen]         = useState(false);
  const [loading, setLoading]   = useState(false);

  const current = LANGUAGES.find((l) => l.code === currentCode) ?? LANGUAGES[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = async (lang: LanguageOption) => {
    setOpen(false);
    if (lang.code === currentCode) return;

    setLoading(true);
    try {
      // ✅ Call your server action to persist locale in cookie
      await handleLanguageChange(lang.code);

      // Update local state
      setCurrentCode(lang.code);

      // Apply RTL / LTR on <html>
      document.documentElement.setAttribute("dir", lang.dir ?? "ltr");
      document.documentElement.setAttribute("lang", lang.code);

      // Refresh server components so layout picks up new cookie
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={menuRef} className="relative inline-block text-left">

      {/* ── Trigger Button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-150 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          /* Spinner while saving cookie */
          <svg
            className="h-4 w-4 animate-spin text-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        ) : (
          <span className="text-base leading-none">{current.flag}</span>
        )}

        <span className="hidden sm:inline">{current.label}</span>
        <span className="inline sm:hidden font-semibold tracking-wide">
          {current.code.toUpperCase()}
        </span>

        {/* Chevron */}
        <svg
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* ── Dropdown ── */}
      <div
        className={`absolute right-0 z-50 mt-2 w-52 origin-top-right rounded-2xl border border-slate-100 bg-white shadow-xl ring-1 ring-black/5 transition-all duration-200 ${
          open
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="border-b border-slate-100 px-4 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Select Language
          </p>
        </div>

        {/* Options */}
        <ul className="p-1.5">
          {LANGUAGES.map((lang) => {
            const isActive = lang.code === currentCode;
            return (
              <li key={lang.code}>
                <button
                  onClick={() => handleSelect(lang)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors duration-100 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-lg leading-none">{lang.flag}</span>
                  <span className="flex-1 text-left">{lang.label}</span>

                  {isActive && (
                    <span className="flex items-center justify-center rounded-full bg-indigo-100 p-0.5">
                      <svg
                        className="h-3 w-3 text-indigo-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}