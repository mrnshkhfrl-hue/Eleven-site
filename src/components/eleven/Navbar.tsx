import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { t, type Lang } from "@/lib/eleven-i18n";

type Props = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  onBookClick?: () => void;
};

const NAV_ITEMS = [
  { to: "/", key: "home" },
  { to: "/services", key: "services" },
  { to: "/team", key: "team" },
  { to: "/lookbook", key: "lookbook" },
  { to: "/contacts", key: "contacts" },
] as const;

export function Navbar({ lang, setLang, onBookClick }: Props) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const L = t(lang);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navLabels: Record<string, string> = {
    home: L.home,
    services: L.services,
    team: L.team,
    lookbook: L.lookbook,
    contacts: L.contacts,
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-3 flex w-[94%] max-w-5xl items-center justify-between rounded-full px-5 py-3 glass">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-xl tracking-[0.25em] transition hover:opacity-80 sm:text-2xl"
        >
          ELEVEN
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPath === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative py-1 text-sm font-medium tracking-wide uppercase transition duration-200 ${
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {navLabels[item.key]}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="absolute -bottom-1 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2.5">
          {/* Lang switcher */}
          <div className="flex items-center rounded-full border border-white/10 p-0.5 text-[10px] font-semibold tracking-[0.15em] bg-white/[0.03]">
            {(["ru", "uz"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full px-2.5 py-1 uppercase transition ${
                  lang === l
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={onBookClick}
            className="hidden rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90 active:scale-95 sm:block"
          >
            {L.book}
          </button>

          {/* Mobile hamburger */}
          <button
            className="grid size-9 place-items-center rounded-full transition hover:bg-white/10 active:scale-90 lg:hidden"
            onClick={() => setMobileMenu((v) => !v)}
            aria-label={mobileMenu ? L.close : L.menu}
          >
            {mobileMenu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.nav
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 flex w-[94%] max-w-5xl flex-col gap-1.5 rounded-3xl p-4 bg-[#0c0c0c]/98 backdrop-blur-3xl border border-white/12 shadow-[0_24px_64px_rgba(0,0,0,0.9)] lg:hidden"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenu(false)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium tracking-wider uppercase transition active:scale-[0.99] ${
                    isActive
                      ? "bg-white/[0.1] text-foreground font-semibold"
                      : "text-foreground/80 hover:bg-white/[0.06] hover:text-foreground"
                  }`}
                >
                  <span>{navLabels[item.key]}</span>
                  <ArrowRight className="size-3.5 text-muted-foreground/50" />
                </Link>
              );
            })}
            <div className="pt-2 border-t border-white/10 mt-1">
              <button
                onClick={() => {
                  setMobileMenu(false);
                  if (onBookClick) onBookClick();
                }}
                className="w-full rounded-2xl bg-primary py-3.5 text-center text-sm font-semibold tracking-wide text-primary-foreground shadow-[0_0_20px_rgba(255,255,255,0.2)] transition active:scale-[0.99]"
              >
                {L.book}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
