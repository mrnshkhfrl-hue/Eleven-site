import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState, useMemo } from "react";
import { ArrowRight, Clock, Sparkles, Scissors, Check, Award } from "lucide-react";

import {
  CATEGORIES,
  SERVICES,
  formatPrice,
  formatTime,
  type CategoryId,
  type Barber,
  BARBERS,
} from "@/lib/eleven-data";
import { Navbar } from "@/components/eleven/Navbar";
import { Footer } from "@/components/eleven/Footer";
import { MasterModal } from "@/components/eleven/MasterModal";
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
  const [master, setMaster] = useState<Barber | null>(null);
  const L = t(lang);

  const filteredServices = useMemo(() => {
    if (activeCategory === "all") return SERVICES;
    return SERVICES.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050505] text-foreground pt-28 pb-20">
      {/* Sticky Navbar */}
      <Navbar lang={lang} setLang={setLang} onBookClick={() => setMaster(BARBERS[0])} />

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
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat.id
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

      {/* Services Grid */}
      <div className="mx-auto w-[92%] max-w-6xl pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="group flex flex-col justify-between overflow-hidden rounded-[2rem] glass transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1"
            >
              {/* Photo */}
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={service.photo}
                  alt={lang === "uz" ? service.nameUz : service.name}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute top-3 right-3 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md bg-black/60 border border-white/10 text-white">
                  {service.category === "bobur"
                    ? "VIP"
                    : service.category === "top"
                      ? "TOP"
                      : "BARBER"}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {lang === "uz" ? service.nameUz : service.name}
                    </h3>
                  </div>

                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {lang === "uz" ? service.descUz : service.desc}
                  </p>
                </div>

                <div className="space-y-4 pt-3 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3.5" />
                      <span>{formatTime(service.minutes, lang)}</span>
                    </div>
                    <span className="text-base font-bold tabular-nums text-foreground">
                      {formatPrice(service.price, service.isFromPrice, lang)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      // Match suitable master
                      const targetMaster =
                        service.category === "bobur"
                          ? BARBERS.find((b) => b.role === "Founder") || BARBERS[0]
                          : service.category === "top"
                            ? BARBERS.find((b) => b.role === "Top Barber") || BARBERS[0]
                            : BARBERS[0];
                      setMaster(targetMaster);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white/[0.06] border border-white/10 py-3 text-xs font-medium tracking-wider uppercase text-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-transparent active:scale-[0.98]"
                  >
                    <span>{L.book}</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
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
                ? "Malakali ustalardan birini tanlang yoki asoschimiz Bobur Vafaev huzurida VIP qabulga yoziling."
                : "Запишитесь к любому из 10 мастеров или выберите VIP-обслуживание у основателя Бобура Вафаева."}
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                to="/team"
                className="rounded-full bg-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition hover:opacity-90 shadow-lg"
              >
                {L.chooseMaster}
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

      {/* Master Booking Modal */}
      <MasterModal master={master} onClose={() => setMaster(null)} lang={lang} />
    </main>
  );
}
