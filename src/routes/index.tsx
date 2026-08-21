import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Coffee,
  Droplets,
  Instagram,
  MapPin,
  Phone,
  Scissors,
  Sparkles,
  Users,
} from "lucide-react";

import {
  BARBERS,
  CATEGORIES,
  LOOKBOOK,
  SERVICES,
  formatPrice,
  formatTime,
  type Barber,
  type CategoryId,
} from "@/lib/eleven-data";
import { Navbar } from "@/components/eleven/Navbar";
import { Footer } from "@/components/eleven/Footer";
import { MasterModal, getRoleBadge } from "@/components/eleven/MasterModal";
import { LightboxModal } from "@/components/eleven/LightboxModal";
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

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ELEVEN — премиум барбершоп в Самарканде" },
      {
        name: "description",
        content:
          "ELEVEN — премиум барбершоп в Самарканде: стрижки, борода, VIP у Бобура Вафаева. Онлайн-бронь кресла за минуту.",
      },
      { property: "og:title", content: "ELEVEN — премиум барбершоп" },
      {
        property: "og:description",
        content: "Твоя территория. Твой стиль. Забронируй кресло у лучших мастеров Самарканда.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

/* ─── Assets ─── */
const HERO_IMG =
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1920&q=80";

function Index() {
  const [lang, setLang] = useState<Lang>("ru");
  const [activeCategory, setActiveCategory] = useState<CategoryId | "all">("all");
  const [showAllServices, setShowAllServices] = useState(false);
  const [lightboxPhotos, setLightboxPhotos] = useState<string[]>(LOOKBOOK);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [master, setMaster] = useState<Barber | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
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

  const scrollToTeam = () => {
    const el = document.getElementById("team");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredServices = useMemo(() => {
    if (activeCategory === "all") {
      return showAllServices ? SERVICES : SERVICES.filter((s) => s.isMain);
    }
    return SERVICES.filter((s) => s.category === activeCategory);
  }, [activeCategory, showAllServices]);

  return (
    <main className="relative overflow-x-hidden bg-[#050505] text-foreground pb-20">
      {/* Shared Navbar */}
      <Navbar lang={lang} setLang={setLang} onBookClick={() => setIsBookingOpen(true)} />

      {/* ─────────────────────── HERO ─────────────────────── */}
      <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background */}
        <img
          src={HERO_IMG}
          alt="Интерьер барбершопа ELEVEN"
          decoding="async"
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
              onClick={scrollToTeam}
              className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold tracking-wide transition hover:bg-white/10 glass-strong shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer"
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

      {/* ─────────────────────── SERVICES (Наши услуги — INFO PRICE LIST) ─────────────────────── */}
      <section
        id="services"
        className="mx-auto w-[92%] max-w-6xl py-28"
        style={{ contentVisibility: "auto", containIntrinsicSize: "auto 800px" }}
      >
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-medium tracking-[0.3em] uppercase glass mb-3">
              <Scissors className="size-3 text-muted-foreground" />
              <span>PRICE LIST</span>
            </div>
            <h2 className="font-display text-4xl tracking-wide sm:text-6xl">{L.servicesTitle}</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{L.servicesSubtitle}</p>
          </motion.div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider liquid-glass-btn hover:scale-105 transition"
          >
            <span>{L.viewAll} ({SERVICES.length})</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* 3 Strict Category Switcher Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-wrap items-center gap-2 sm:gap-3"
        >
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105"
                : "glass text-muted-foreground hover:text-foreground hover:bg-white/[0.08]"
            }`}
          >
            {L.allCategories} ({SERVICES.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = SERVICES.filter((s) => s.category === cat.id).length;
            const label = lang === "uz" ? cat.labelUz : cat.label;
            const isCatActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isCatActive
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105"
                    : "glass text-muted-foreground hover:text-foreground hover:bg-white/[0.08]"
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </motion.div>

        {/* Services Info Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((s, i) => {
            const roleBadgeStyle =
              s.category === "vip"
                ? "border-amber-400/60 bg-black/85 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                : s.category === "top"
                  ? "border-sky-400/60 bg-black/85 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                  : "border-white/30 bg-black/85 text-white shadow-[0_0_10px_rgba(0,0,0,0.6)]";

            const roleLabel =
              s.category === "vip" ? "VIP" : s.category === "top" ? "TOP BARBER" : "BARBER";

            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="group flex flex-col justify-between overflow-hidden rounded-[2rem] glass transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1"
              >
                {/* Service photo */}
                <div
                  onClick={() => {
                    setLightboxPhotos(filteredServices.map((srv) => srv.photo));
                    setLightboxIndex(i);
                  }}
                  className="relative overflow-hidden aspect-[16/10] cursor-pointer"
                >
                  <img
                    src={s.photo}
                    alt={lang === "uz" ? s.nameUz : s.name}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider backdrop-blur-md border ${roleBadgeStyle}`}
                    >
                      {s.category === "vip" && <Sparkles className="size-2.5" />}
                      {roleLabel}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                  <div className="space-y-2">
                    {/* Name */}
                    <h3 className="text-base font-semibold tracking-tight">
                      {lang === "uz" ? s.nameUz : s.name}
                    </h3>
                    {/* Description */}
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {lang === "uz" ? s.descUz : s.desc}
                    </p>
                  </div>

                  {/* Duration & Price info */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3.5" /> {formatTime(s.minutes, lang)}
                    </span>
                    <span className="text-base font-bold tabular-nums text-foreground">
                      {formatPrice(s.price, s.isFromPrice, lang)}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Actions: Show All / Collapse + Choose Master */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          {activeCategory === "all" && (
            <button
              onClick={() => setShowAllServices((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-xs font-semibold uppercase tracking-wider liquid-glass-btn hover:scale-105 transition cursor-pointer"
            >
              <span>
                {showAllServices
                  ? L.collapseServices
                  : `${L.showAllServices} (${SERVICES.length})`}
              </span>
              {showAllServices ? (
                <ChevronUp className="size-4" />
              ) : (
                <ChevronDown className="size-4" />
              )}
            </button>
          )}

          <button
            onClick={scrollToTeam}
            className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>{L.chooseMaster}</span>
            <ArrowRight className="size-4 rotate-90 transition-transform group-hover:translate-y-1" />
          </button>
        </div>

        {/* Vibe info cards */}
        <div className="mt-20 grid gap-4 sm:grid-cols-3">
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

      {/* ─────────────────────── TEAM (Horizontal Carousel with Liquid Glass) ─────────────────────── */}
      <section
        id="team"
        className="pb-28 scroll-mt-24"
        style={{ contentVisibility: "auto", containIntrinsicSize: "auto 500px" }}
      >
        <div className="mx-auto mb-8 flex w-[92%] max-w-6xl flex-wrap items-end justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-medium tracking-[0.3em] uppercase glass mb-3">
              <Users className="size-3 text-muted-foreground" />
              <span>OUR SPECIALISTS</span>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="font-display text-4xl tracking-wide sm:text-6xl">{L.teamTitle}</h2>
              <Link
                to="/team"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-semibold uppercase tracking-wider ml-4"
              >
                {L.allTeam} <ArrowRight className="size-3" />
              </Link>
            </div>
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
                className="w-[68vw] shrink-0 snap-center overflow-hidden rounded-[2rem] text-left transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1 sm:w-64 glass flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={b.photo}
                    alt={b.name}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="size-full object-cover object-top grayscale transition duration-500 hover:grayscale-0 pointer-events-none"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider backdrop-blur-md border ${getRoleBadge(
                        b.role
                      )}`}
                    >
                      {b.role === "VIP Barber" && <Sparkles className="size-2.5" />}
                      {b.role}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div>
                    <h3 className="text-sm font-semibold">{b.name}</h3>
                    <p className="mt-0.5 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                      {b.role}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-muted-foreground">
                    <span>
                      {L.experience}: {b.years} {L.years}
                    </span>
                    <span className="text-foreground font-semibold uppercase tracking-wider inline-flex items-center gap-0.5">
                      {L.book} <ArrowRight className="size-2.5" />
                    </span>
                  </div>
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
      <section
        id="lookbook"
        className="mx-auto w-[92%] max-w-6xl pb-28"
        style={{ contentVisibility: "auto", containIntrinsicSize: "auto 800px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-end justify-between"
        >
          <div>
            <h2 className="font-display text-4xl tracking-wide sm:text-6xl">{L.lookbookTitle}</h2>
            <p className="mt-2 text-xs tracking-[0.2em] text-muted-foreground uppercase">
              {L.ourWork}
            </p>
          </div>
          <Link
            to="/lookbook"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition"
          >
            <span>{L.viewAll}</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </motion.div>

        <div className="columns-2 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
          {LOOKBOOK.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              onClick={() => {
                setLightboxPhotos(LOOKBOOK);
                setLightboxIndex(i);
              }}
              style={{ breakInside: "avoid" }}
              className={`break-inside-avoid mb-4 cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] group relative transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] ${
                i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
              }`}
            >
              <img
                src={src}
                alt={`Работа мастеров ELEVEN ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="size-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-white">
                  ELEVEN Style #{i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────────────── CONTACTS ─────────────────────── */}
      <section
        id="contacts"
        className="mx-auto w-[92%] max-w-6xl pb-20"
        style={{ contentVisibility: "auto", containIntrinsicSize: "auto 600px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <h2 className="font-display text-4xl tracking-wide sm:text-6xl">{L.contactsTitle}</h2>
          <Link
            to="/contacts"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition"
          >
            <span>{L.viewAll}</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
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
            <iframe
              src="https://yandex.uz/map-widget/v1/?from=mapframe&ll=66.923753%2C39.646396&mode=poi&poi%5Bpoint%5D=66.923656%2C39.646335&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D242105212925&z=18.82"
              title={L.mapTitle}
              className="relative w-full h-64 md:h-96 lg:h-full lg:min-h-[420px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Shared Footer */}
      <Footer lang={lang} />

      {/* Fullscreen Lightbox for Lookbook and Services */}
      <LightboxModal
        photos={lightboxPhotos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />

      {/* Master Modal */}
      <MasterModal
        master={master}
        isOpen={isBookingOpen}
        onClose={() => {
          setMaster(null);
          setIsBookingOpen(false);
        }}
        lang={lang}
      />
    </main>
  );
}
