import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState, useMemo } from "react";
import { ArrowRight, Clock, Scissors, Sparkles, Users } from "lucide-react";

import {
  CATEGORIES,
  SERVICES,
  formatPrice,
  formatTime,
  type CategoryId,
  type Barber,
} from "@/lib/eleven-data";
import { Navbar } from "@/components/eleven/Navbar";
import { Footer } from "@/components/eleven/Footer";
import { MasterModal } from "@/components/eleven/MasterModal";
import { LightboxModal } from "@/components/eleven/LightboxModal";
import { t, type Lang } from "@/lib/eleven-i18n";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Услуги и цены — ELEVEN Барбершоп Самарканд" },
      {
        name: "description",
        content:
          "Полный каталог услуг: мужские стрижки, моделирование бороды, уход, свадебные образы и VIP у Бобура Вафаева в ELEVEN Самарканд.",
      },
      { property: "og:title", content: "Услуги и цены — ELEVEN Барбершоп" },
      {
        property: "og:description",
        content: "Стрижки, борода, стайлинг и VIP-услуги в Самарканде. Онлайн-запись.",
      },
    ],
  }),
});

function ServicesPage() {
  const [lang, setLang] = useState<Lang>("ru");
  const [activeCategory, setActiveCategory] = useState<CategoryId | "all">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [master, setMaster] = useState<Barber | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const L = t(lang);

  const filteredServices = useMemo(() => {
    if (activeCategory === "all") return SERVICES;
    return SERVICES.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050505] text-foreground pt-28 pb-20">
      {/* Sticky Navbar */}
      <Navbar lang={lang} setLang={setLang} onBookClick={() => setIsBookingOpen(true)} />

      {/* Hero Header */}
      <div className="mx-auto w-[92%] max-w-6xl pt-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-medium tracking-[0.3em] uppercase glass mb-4">
            <Scissors className="size-3 text-muted-foreground" />
            <span>PRICING & SERVICES</span>
          </div>
          <h1 className="font-display text-4xl tracking-tight sm:text-6xl md:text-7xl">
            {L.servicesTitle}
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            {L.servicesSubtitle}
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 flex flex-wrap items-center gap-2 sm:gap-3"
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
      </div>

      {/* Services Grid (Pure Info Price List) */}
      <div className="mx-auto w-[92%] max-w-6xl pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service, idx) => {
            const roleBadgeStyle =
              service.category === "vip"
                ? "border-amber-400/60 bg-black/85 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                : service.category === "top"
                  ? "border-sky-400/60 bg-black/85 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                  : "border-white/30 bg-black/85 text-white shadow-[0_0_10px_rgba(0,0,0,0.6)]";

            const roleLabel =
              service.category === "vip" ? "VIP" : service.category === "top" ? "TOP BARBER" : "BARBER";

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="group flex flex-col justify-between overflow-hidden rounded-[2rem] glass transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1"
              >
                {/* Photo */}
                <div
                  onClick={() => setLightboxIndex(idx)}
                  className="relative overflow-hidden aspect-[16/10] cursor-pointer"
                >
                  <img
                    src={service.photo}
                    alt={lang === "uz" ? service.nameUz : service.name}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider backdrop-blur-md border ${roleBadgeStyle}`}
                    >
                      {service.category === "vip" && <Sparkles className="size-2.5" />}
                      {roleLabel}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {lang === "uz" ? service.nameUz : service.name}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {lang === "uz" ? service.descUz : service.desc}
                    </p>
                  </div>

                  {/* Duration & Price */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3.5" />
                      <span>{formatTime(service.minutes, lang)}</span>
                    </div>
                    <span className="text-base font-bold tabular-nums text-foreground">
                      {formatPrice(service.price, service.isFromPrice, lang)}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Generic Choose Master CTA */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/team"
            className="inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-[0_0_30px_rgba(255,255,255,0.2)] transition hover:scale-105 active:scale-95"
          >
            <Users className="size-4" />
            <span>{L.chooseMaster}</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <section className="mx-auto w-[92%] max-w-6xl pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-14 glass-strong text-center border border-white/15">
          <div className="mx-auto max-w-2xl space-y-4">
            <h2 className="font-display text-3xl sm:text-5xl tracking-wide">
              {lang === "uz" ? "O'z uslubingizni yarating" : "Готовы обновить свой стиль?"}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {lang === "uz"
                ? "10 nafar malakali ustalarimizdan birini tanlang yoki asoschimiz Bobur Vafaev huzurida VIP qabulga yoziling."
                : "Запишитесь к любому из наших 10 мастеров или выберите VIP-обслуживание у основателя Бобура Вафаева."}
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                to="/team"
                className="rounded-full bg-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition hover:opacity-90 shadow-lg inline-flex items-center gap-2"
              >
                <span>{L.chooseMaster}</span>
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                to="/contacts"
                className="rounded-full glass px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-foreground transition hover:bg-white/[0.1]"
              >
                {L.contacts}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Footer */}
      <Footer lang={lang} />

      {/* Fullscreen Lightbox for Services */}
      <LightboxModal
        photos={filteredServices.map((s) => s.photo)}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />

      {/* Master Booking Modal */}
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
