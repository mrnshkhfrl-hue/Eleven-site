import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState, useMemo } from "react";
import { Award, Users, ArrowRight, Sparkles } from "lucide-react";

import { BARBERS, type Barber } from "@/lib/eleven-data";
import { Navbar } from "@/components/eleven/Navbar";
import { Footer } from "@/components/eleven/Footer";
import { MasterModal, getRoleBadge } from "@/components/eleven/MasterModal";
import { t, type Lang } from "@/lib/eleven-i18n";

export const Route = createFileRoute("/team")({
  component: TeamPage,
  head: () => ({
    meta: [
      { title: "Команда мастеров — ELEVEN Барбершоп Самарканд" },
      {
        name: "description",
        content:
          "Познакомьтесь с командой мастеров ELEVEN в Самарканде: VIP Barber Бобур Вафаев, TOP Barber Шахриёр Мансуров и 8 профессиональных барберов. Портфолио и онлайн-запись.",
      },
      { property: "og:title", content: "Команда мастеров — ELEVEN Барбершоп" },
      {
        property: "og:description",
        content: "10 профессионалов своего дела. Выберите мастера и запишитесь онлайн.",
      },
    ],
  }),
});

function TeamPage() {
  const [lang, setLang] = useState<Lang>("ru");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [master, setMaster] = useState<Barber | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const L = t(lang);

  const roles = ["all", "VIP Barber", "TOP Barber", "Barber"];

  const filteredBarbers = useMemo(() => {
    if (roleFilter === "all") return BARBERS;
    return BARBERS.filter((b) => b.role === roleFilter);
  }, [roleFilter]);

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
            <Users className="size-3 text-muted-foreground" />
            <span>OUR SPECIALISTS</span>
          </div>
          <h1 className="font-display text-4xl tracking-tight sm:text-6xl md:text-7xl">
            {L.teamTitle}
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            {L.teamSubtitle}
          </p>
        </motion.div>

        {/* Role Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 flex flex-wrap items-center gap-2.5"
        >
          {roles.map((role) => {
            const count = role === "all" ? BARBERS.length : BARBERS.filter((b) => b.role === role).length;
            const isRoleActive = roleFilter === role;
            return (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isRoleActive
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105"
                    : "glass text-muted-foreground hover:text-foreground hover:bg-white/[0.08]"
                }`}
              >
                {role === "all" ? `${L.allCategories} (${count})` : `${role} (${count})`}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Masters Grid */}
      <div className="mx-auto w-[92%] max-w-6xl pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBarbers.map((b, idx) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              onClick={() => setMaster(b)}
              className="group cursor-pointer overflow-hidden rounded-[2rem] glass transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={b.photo}
                  alt={b.name}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover object-top grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider backdrop-blur-md border ${getRoleBadge(
                      b.role
                    )}`}
                  >
                    {b.role === "VIP Barber" && <Sparkles className="size-2.5" />}
                    {b.role}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-semibold tracking-tight">{b.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {lang === "uz" ? b.bioUz : b.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Award className="size-3.5 text-foreground/70" />
                    {L.experience}: {b.years} {L.years}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    {L.book} <ArrowRight className="size-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Shared Footer */}
      <Footer lang={lang} />

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
