import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coffee,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Scissors,
  Sparkles,
  X,
  Droplets,
} from "lucide-react";

import {
  BARBERS,
  LOOKBOOK,
  SERVICES,
  formatPrice,
  formatTime,
  type Barber,
} from "@/lib/eleven-data";
import { MasterModal } from "@/components/eleven/MasterModal";
import {
  ADDRESS,
  ADDRESS_CITY,
  HOURS,
  INSTAGRAM,
  PHONE as PHONE_NUM,
  PHONE_HREF,
  t,
  type Lang,
} from "@/lib/eleven-i18n";

export const Route = createFileRoute("/")(  {
  component: Index,
  head: () => ({
    meta: [
      { title: "ELEVEN — премиум барбершоп в Самарканде" },
      {
        name: "description",
        content:
          "ELEVEN — премиум барбершоп: стрижки, борода, VIP у Бобура Вафаева. Онлайн-бронь кресла за минуту.",
      },
      { property: "og:title", content: "ELEVEN — премиум барбершоп" },
      {
        property: "og:description",
        content: "Твоя территория. Твой стиль. Забронируй кресло у лучших мастеров.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

/* ─── Assets ─── */
const HERO_IMG =
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1920&q=80";

/* Only show these 5 services in the catalog */
const CATALOG_SERVICES = SERVICES.filter((s) =>
  ["e1", "e2", "e3", "e4", "e5"].includes(s.id),
);

/* ─── Nav links ─── */
const NAV_IDS = ["home", "services", "team", "lookbook", "contacts"] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ═══════════════════════════════════════════════════════════════════════════ */

function Index() {
  const [lang, setLang] = useState<Lang>("ru");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [master, setMaster] = useState<Barber | null>(null);
  const L = t(lang);

  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; scrollLeft: number; hasMoved: boolean }>({
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  });

  const checkScrollButtons = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    checkScrollButtons();
    el.addEventListener("scroll", checkScrollButtons, { passive: true });
    window.addEventListener("resize", checkScrollButtons);
    return () => {
      el.removeEventListener("scroll", checkScrollButtons);
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, [checkScrollButtons]);

  const scrollCarousel = useCallback((direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const firstCard = container.querySelector<HTMLElement>("[data-barber-card]");
    const step = firstCard ? firstCard.offsetWidth + 16 : 280;
    container.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.pageX - carouselRef.current.offsetLeft,
      scrollLeft: carouselRef.current.scrollLeft,
      hasMoved: false,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - dragStartRef.current.startX) * 1.2;
    if (Math.abs(walk) > 6) {
      dragStartRef.current.hasMoved = true;
    }
    carouselRef.current.scrollLeft = dragStartRef.current.scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const navLabels: Record<(typeof NAV_IDS)[number], string> = {
    home: L.home,
    services: L.services,
    team: L.team,
    lookbook: L.lookbook,
    contacts: L.contacts,
  };

  const handleNav = useCallback(
    (id: string) => {
      scrollTo(id);
      setMobileMenu(false);
    },
    [],
  );

  return (
    <main className="relative overflow-x-hidden bg-[#050505] pb-20">
      {/* ─────────────────────── STICKY HEADER ─────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-3 flex w-[94%] max-w-5xl items-center justify-between rounded-full px-5 py-3 glass">
          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="font-display text-xl tracking-[0.25em] sm:text-2xl"
          >
            ELEVEN
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_IDS.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-base font-medium tracking-wide text-muted-foreground uppercase transition hover:text-foreground"
              >
                {navLabels[id]}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2.5">
            {/* Lang switcher */}
            <div className="flex items-center rounded-full border border-white/10 p-0.5 text-[10px] font-semibold tracking-[0.15em]">
              {(["ru", "uz"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-full px-2.5 py-1 uppercase transition ${
                    lang === l
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollTo("team")}
              className="hidden rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90 sm:block"
            >
              {L.book}
            </button>

            {/* Mobile hamburger */}
            <button
              className="grid size-9 place-items-center rounded-full transition hover:bg-white/10 lg:hidden"
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
              {NAV_IDS.map((id) => (
                <button
                  key={id}
                  onClick={() => handleNav(id)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium tracking-wider text-foreground/80 uppercase transition hover:bg-white/[0.08] hover:text-foreground active:scale-[0.99]"
                >
                  <span>{navLabels[id]}</span>
                  <ArrowRight className="size-3.5 text-muted-foreground/50" />
                </button>
              ))}
              <div className="pt-2 border-t border-white/10 mt-1">
                <button
                  onClick={() => handleNav("team")}
                  className="w-full rounded-2xl bg-primary py-3.5 text-center text-sm font-semibold tracking-wide text-primary-foreground shadow-[0_0_20px_rgba(255,255,255,0.2)] transition active:scale-[0.99]"
                >
                  {L.book}
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ─────────────────────── HERO ─────────────────────── */}
      <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background */}
        <img
          src={HERO_IMG}
          alt="Интерьер барбершопа ELEVEN"
          className="absolute inset-0 size-full scale-105 object-cover"
        />
        {/* Heavy dark overlay */}
        <div className="absolute inset-0 bg-black/80" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center rounded-full px-5 py-2 text-[10px] font-medium tracking-[0.3em] uppercase glass"
          >
            {L.heroBadge}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[clamp(4rem,15vw,12rem)] leading-[0.85] tracking-tight"
          >
            {L.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-sm tracking-[0.2em] text-muted-foreground uppercase sm:text-base"
          >
            {L.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 flex flex-col items-center gap-5 sm:flex-row"
          >
            <button
              onClick={() => scrollTo("team")}
              className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold tracking-wide transition hover:bg-white/10 glass-strong"
            >
              {L.heroCta}
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </button>
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-3.5" /> {ADDRESS[lang]}, {ADDRESS_CITY[lang]}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="size-3.5" /> {HOURS[lang]}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────── SERVICES (Наши услуги) ─────────────────────── */}
      <section id="services" className="mx-auto w-[92%] max-w-6xl py-28" style={{ contentVisibility: "auto", containIntrinsicSize: "auto 800px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl tracking-wide sm:text-6xl">{L.servicesTitle}</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">{L.servicesHint}</p>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATALOG_SERVICES.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group overflow-hidden rounded-[2rem] glass transition hover:bg-white/[0.07]"
            >
              {/* Service photo */}
              <div className="overflow-hidden">
                <img
                  src={s.photo}
                  alt={lang === "uz" ? s.nameUz : s.name}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>

              <div className="p-5 space-y-3">
                {/* Name & price */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold">{lang === "uz" ? s.nameUz : s.name}</h3>
                  <span className="shrink-0 text-sm font-semibold tabular-nums text-foreground/90">
                    {formatPrice(s.price)}
                  </span>
                </div>

                {/* Duration */}
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3" /> {formatTime(s.minutes, lang)}
                </span>

                {/* Description */}
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {lang === "uz" ? s.descUz : s.desc}
                </p>

                {/* CTA */}
                <button
                  onClick={() => scrollTo("team")}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 py-3 text-xs font-medium tracking-wide text-foreground/80 transition hover:bg-white/[0.06] hover:text-foreground"
                >
                  {L.chooseMaster}
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vibe info cards */}
        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Droplets, t: L.cardCareT, d: L.cardCareD },
            { icon: Coffee, t: L.cardCoffeeT, d: L.cardCoffeeD },
            { icon: Scissors, t: L.cardTeamT, d: L.cardTeamD },
          ].map((c) => (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-6 glass"
            >
              <c.icon className="size-5" />
              <h3 className="mt-4 text-sm font-semibold tracking-wide">{c.t}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────────────── TEAM (Horizontal Carousel) ─────────────────────── */}
      <section id="team" className="pb-28" style={{ contentVisibility: "auto", containIntrinsicSize: "auto 500px" }}>
        <div className="mx-auto mb-8 flex w-[92%] max-w-6xl flex-wrap items-end justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl tracking-wide sm:text-6xl">{L.teamTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{L.teamHint}</p>
          </motion.div>

          {/* Liquid Glass Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollCarousel("left")}
              disabled={!canScrollLeft}
              aria-label="Назад"
              className={`group relative grid size-12 place-items-center rounded-full liquid-glass-btn transition-all duration-300 ${
                canScrollLeft
                  ? "text-foreground hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_24px_rgba(255,255,255,0.15)]"
                  : "opacity-35 cursor-not-allowed text-muted-foreground"
              }`}
            >
              <ChevronLeft className="size-5 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              disabled={!canScrollRight}
              aria-label="Вперед"
              className={`group relative grid size-12 place-items-center rounded-full liquid-glass-btn transition-all duration-300 ${
                canScrollRight
                  ? "text-foreground hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_24px_rgba(255,255,255,0.15)]"
                  : "opacity-35 cursor-not-allowed text-muted-foreground"
              }`}
            >
              <ChevronRight className="size-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll carousel wrapper with floating arrows */}
        <div className="relative group/carousel">
          {/* Floating Left Arrow (Desktop) */}
          <button
            onClick={() => scrollCarousel("left")}
            disabled={!canScrollLeft}
            aria-label="Предыдущий мастер"
            className={`absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-20 hidden md:grid size-12 place-items-center rounded-full liquid-glass-btn transition-all duration-300 ${
              canScrollLeft
                ? "text-foreground opacity-90 hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer shadow-[0_0_28px_rgba(255,255,255,0.2)]"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronLeft className="size-6" />
          </button>

          {/* Horizontal scroll carousel */}
          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-[4%] pb-4 select-none ${
              isDragging ? "cursor-grabbing scroll-auto" : "cursor-grab"
            }`}
            style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
          >
            {BARBERS.map((b, i) => (
              <motion.button
                key={b.id}
                data-barber-card
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                onClick={() => {
                  if (!dragStartRef.current.hasMoved) {
                    setMaster(b);
                  }
                }}
                className="w-[68vw] shrink-0 snap-center overflow-hidden rounded-[2rem] text-left transition duration-300 hover:bg-white/[0.08] sm:w-64 glass"
              >
                <img
                  src={b.photo}
                  alt={b.name}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="aspect-[3/4] w-full object-cover object-top grayscale transition duration-500 hover:grayscale-0 pointer-events-none"
                />
                <div className="p-4">
                  <h3 className="text-sm font-semibold">{b.name}</h3>
                  <p className="mt-0.5 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    {b.role}
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {L.experience}: {b.years} {L.years}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Floating Right Arrow (Desktop) */}
          <button
            onClick={() => scrollCarousel("right")}
            disabled={!canScrollRight}
            aria-label="Следующий мастер"
            className={`absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-20 hidden md:grid size-12 place-items-center rounded-full liquid-glass-btn transition-all duration-300 ${
              canScrollRight
                ? "text-foreground opacity-90 hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer shadow-[0_0_28px_rgba(255,255,255,0.2)]"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      </section>

      {/* ─────────────────────── LOOKBOOK ─────────────────────── */}
      <section id="lookbook" className="mx-auto w-[92%] max-w-6xl pb-28" style={{ contentVisibility: "auto", containIntrinsicSize: "auto 800px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-end justify-between"
        >
          <h2 className="font-display text-4xl tracking-wide sm:text-6xl">{L.lookbookTitle}</h2>
          <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
            {L.ourWork}
          </span>
        </motion.div>

        <div className="columns-2 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
          {LOOKBOOK.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`mb-4 overflow-hidden rounded-3xl border border-white/10 ${
                i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
              }`}
            >
              <img
                src={src}
                alt={`Работа мастеров ELEVEN ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="size-full object-cover grayscale transition duration-700 hover:scale-105 hover:grayscale-0"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────────────── CONTACTS ─────────────────────── */}
      <section id="contacts" className="mx-auto w-[92%] max-w-6xl pb-20" style={{ contentVisibility: "auto", containIntrinsicSize: "auto 600px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl tracking-wide sm:text-6xl">{L.contactsTitle}</h2>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Info cards */}
          <div className="space-y-4">
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-6 glass"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="grid size-10 place-items-center rounded-2xl bg-white/[0.06]">
                  <MapPin className="size-5 text-foreground/70" />
                </div>
                <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  {L.address}
                </span>
              </div>
              <p className="text-sm font-medium leading-relaxed">
                {ADDRESS_CITY[lang]}, {ADDRESS[lang]}
              </p>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl p-6 glass"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="grid size-10 place-items-center rounded-2xl bg-white/[0.06]">
                  <Clock className="size-5 text-foreground/70" />
                </div>
                <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  {L.workHours}
                </span>
              </div>
              <p className="text-sm font-medium">10:00 — 21:00</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {lang === "uz" ? "Har kuni, dam olish kunlarisiz" : "Ежедневно, без выходных"}
              </p>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-3xl p-6 glass"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="grid size-10 place-items-center rounded-2xl bg-white/[0.06]">
                  <Phone className="size-5 text-foreground/70" />
                </div>
                <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  {L.phone}
                </span>
              </div>
              <a
                href={PHONE_HREF}
                className="text-base font-semibold transition hover:text-muted-foreground"
              >
                {PHONE_NUM}
              </a>
            </motion.div>

            {/* Instagram */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-3xl p-6 glass"
            >
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm font-medium transition hover:text-muted-foreground"
              >
                <span className="grid size-10 place-items-center rounded-2xl bg-white/[0.06] text-foreground/80">
                  <Instagram className="size-5" />
                </span>
                @eleven_uzb
              </a>
            </motion.div>
          </div>

          {/* Map — Liquid Glass container */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] bg-white/5"
          >
            <a
              href="https://yandex.uz/maps/10334/samarkand/?utm_medium=mapframe&utm_source=maps"
              className="absolute top-0 text-xs text-[#eee] opacity-0 pointer-events-none"
            >
              Самарканд
            </a>
            <a
              href="https://yandex.uz/maps/10334/samarkand/?from=mapframe&ll=66.923681%2C39.646072&mode=routes&rtext=39.646337%2C66.923655~39.646232%2C66.924297&rtt=auto&ruri=ymapsbm1%3A%2F%2Forg%3Foid%3D242105212925~ymapsbm1%3A%2F%2Forg%3Foid%3D93382537025&utm_medium=mapframe&utm_source=maps&z=19.06"
              className="absolute top-3.5 text-xs text-[#eee] opacity-0 pointer-events-none"
            >
              Atlas: как доехать на автомобиле, общественным транспортом или пешком – Яндекс Карты
            </a>
            <iframe
              src="https://yandex.uz/map-widget/v1/?from=mapframe&ll=66.923681%2C39.646072&mode=routes&rtext=39.646337%2C66.923655~39.646232%2C66.924297&rtt=auto&ruri=ymapsbm1%3A%2F%2Forg%3Foid%3D242105212925~ymapsbm1%3A%2F%2Forg%3Foid%3D93382537025&z=19.06"
              title={L.mapTitle}
              className="relative w-full h-64 md:h-96 lg:h-full lg:min-h-[420px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────── FOOTER ─────────────────────── */}
      <footer className="mx-auto w-[92%] max-w-6xl border-t border-border pt-10 pb-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <span className="font-display text-5xl tracking-[0.2em]">ELEVEN</span>
          <div className="space-y-1 text-xs text-muted-foreground sm:text-right">
            <p>{ADDRESS_CITY[lang]}, {ADDRESS[lang]}</p>
            <p>{HOURS[lang]}</p>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition hover:text-foreground"
            >
              <Instagram className="size-3.5" />
              @eleven_uzb
            </a>
          </div>
        </div>
      </footer>

      {/* ─── Master Modal ─── */}
      <MasterModal master={master} onClose={() => setMaster(null)} lang={lang} />
    </main>
  );
}
