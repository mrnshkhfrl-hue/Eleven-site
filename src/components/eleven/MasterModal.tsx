import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, Phone, X, Clock, Award, Users, Sparkles } from "lucide-react";

import { widgetUrl, type Barber } from "@/lib/eleven-data";
import { t, PHONE, PHONE_HREF, type Lang } from "@/lib/eleven-i18n";
import { LightboxModal } from "@/components/eleven/LightboxModal";

type Props = {
  master: Barber | null;
  isOpen?: boolean;
  onClose: () => void;
  lang: Lang;
};

export const getRoleBadge = (role: string) => {
  if (role === "VIP Barber") {
    return "border-amber-400/60 bg-black/85 text-amber-300 font-semibold shadow-[0_0_15px_rgba(251,191,36,0.3)]";
  }
  if (role === "TOP Barber") {
    return "border-sky-400/60 bg-black/85 text-sky-300 font-semibold shadow-[0_0_15px_rgba(56,189,248,0.3)]";
  }
  return "border-white/30 bg-black/85 text-white font-semibold shadow-[0_0_10px_rgba(0,0,0,0.6)]";
};

export function MasterModal({ master, isOpen = false, onClose, lang }: Props) {
  const L = t(lang);
  const [booking, setBooking] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isVisible = Boolean(master || isOpen);

  useEffect(() => {
    if (master) {
      setBooking(false);
      setLightboxIndex(null);
    }
  }, [master]);

  /* Lock body scroll when modal is open */
  useEffect(() => {
    if (!isVisible) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={master ? master.name : L.bookingTitle}
            initial={{ y: 35, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 25, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="max-h-[92vh] overflow-y-auto w-full max-w-2xl sm:max-w-3xl my-auto relative rounded-[2rem] glass-strong p-4 sm:p-6 scrollbar-thin"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label={L.close}
              className="glass absolute top-4 right-4 sm:top-5 sm:right-5 z-20 grid size-9 place-items-center rounded-full text-foreground/70 transition hover:text-foreground hover:bg-white/15"
            >
              <X className="size-4" />
            </button>

            {master ? (
              booking ? (
                /* ─── Specific Master Booking iframe view ─── */
                <div className="space-y-4 pt-1">
                  <div className="flex items-center justify-between pr-8">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] uppercase font-semibold border ${getRoleBadge(
                            master.role,
                          )}`}
                        >
                          {master.role}
                        </span>
                        <p className="text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
                          {master.name}
                        </p>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl tracking-wide mt-1">
                        {L.bookingTitle}
                      </h3>
                    </div>
                  </div>
                  <iframe
                    key={master.id}
                    src={widgetUrl(master.id)}
                    title={`${L.bookingTitle} — ${master.name}`}
                    className="w-full h-[75vh] sm:h-[80vh] bg-white rounded-xl border border-white/10"
                    allow="payment; geolocation"
                  />
                  <button
                    onClick={() => setBooking(false)}
                    className="w-full rounded-2xl border border-white/15 py-3 text-xs tracking-[0.2em] text-muted-foreground uppercase transition hover:text-foreground hover:bg-white/[0.04]"
                  >
                    {L.portfolio}
                  </button>
                </div>
              ) : (
                /* ─── Specific Master Portfolio / bio view (Fixed Aspect Ratio & Premium Split Layout) ─── */
                <div className="pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-start">
                    {/* Left Column: Master Photo (Fixed 3:4 ratio, never stretched) */}
                    <div className="sm:col-span-5 w-full max-w-[280px] sm:max-w-none mx-auto">
                      <div className="overflow-hidden rounded-[1.5rem] border border-white/15 relative group aspect-[3/4] w-full bg-black/40 shadow-2xl">
                        <img
                          src={master.photo}
                          alt={master.name}
                          decoding="async"
                          className="size-full object-cover object-top grayscale-0 transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md border ${getRoleBadge(
                              master.role,
                            )}`}
                          >
                            {master.role === "VIP Barber" && <Sparkles className="size-3" />}
                            {master.role}
                          </span>
                        </div>
                      </div>

                      {/* Experience and hours under photo on desktop */}
                      <div className="mt-3.5 hidden sm:flex flex-col gap-2 rounded-2xl p-3.5 glass text-xs text-muted-foreground border border-white/10">
                        <span className="inline-flex items-center gap-2">
                          <Award className="size-3.5 text-foreground/80" />
                          <span>{L.experience}: <strong className="text-foreground font-semibold">{master.years} {L.years}</strong></span>
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Clock className="size-3.5 text-foreground/80" />
                          <span>10:00 — 21:00</span>
                        </span>
                      </div>
                    </div>

                    {/* Right Column: Name, Bio, Works, Action */}
                    <div className="sm:col-span-7 flex flex-col justify-between space-y-4">
                      {/* Name & role */}
                      <div>
                        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-wide">
                          {master.name}
                        </h3>
                        <p className="mt-1 text-[11px] tracking-[0.25em] text-muted-foreground uppercase font-medium">
                          {master.role} · ELEVEN SAMARKAND
                        </p>
                      </div>

                      {/* Mobile Experience/Hours */}
                      <div className="sm:hidden flex items-center justify-between rounded-xl p-3 glass text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Award className="size-3.5" />
                          {L.experience}: {master.years} {L.years}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="size-3.5" />
                          10:00 — 21:00
                        </span>
                      </div>

                      {/* Bio */}
                      <div className="rounded-2xl p-4 glass border border-white/10">
                        <p className="mb-2 text-[10px] tracking-[0.25em] text-muted-foreground uppercase font-semibold">
                          {L.bio}
                        </p>
                        <p className="text-sm leading-relaxed text-foreground/85">
                          {lang === "uz" ? master.bioUz : master.bio}
                        </p>
                      </div>

                      {/* Mini portfolio with clickable Lightbox */}
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <p className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase font-semibold">
                            {L.portfolio}
                          </p>
                          <span className="text-[10px] text-muted-foreground">
                            {master.portfolio.length} {lang === "uz" ? "ish" : "фото"}
                          </span>
                        </div>
                        <div
                          className={`grid gap-2 ${
                            master.portfolio.length === 4
                              ? "grid-cols-4"
                              : "grid-cols-3"
                          }`}
                        >
                          {master.portfolio.map((src, i) => (
                            <div
                              key={`${master.id}-${i}`}
                              onClick={() => setLightboxIndex(i)}
                              className="cursor-pointer overflow-hidden rounded-xl border border-white/10 transition-transform duration-300 hover:scale-105 active:scale-95 group relative aspect-square"
                            >
                              <img
                                src={src}
                                alt={`${master.name} — работа ${i + 1}`}
                                loading="lazy"
                                decoding="async"
                                className="size-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                              />
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Primary Book button */}
                      <div className="pt-2 space-y-2.5">
                        <button
                          onClick={() => setBooking(true)}
                          className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 sm:py-4 text-sm font-semibold tracking-wide text-primary-foreground transition hover:opacity-90 active:scale-[0.99] shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer"
                        >
                          <span>{L.book}</span>
                          <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                        </button>

                        {/* Phone */}
                        <a
                          href={PHONE_HREF}
                          className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground transition hover:text-foreground py-1"
                        >
                          <Phone className="size-3" /> {PHONE}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : (
              /* ─── General Booking View (All Masters & Services) ─── */
              <div className="space-y-4 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pr-8">
                  <div>
                    <p className="text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
                      ELEVEN BARBERSHOP · SAMARKAND
                    </p>
                    <h3 className="font-display text-2xl sm:text-3xl tracking-wide">
                      {L.bookingTitle}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {L.selectServiceAndMaster}
                    </p>
                  </div>
                  <Link
                    to="/team"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-medium transition py-1"
                  >
                    <Users className="size-3.5" />
                    <span>{L.viewMasters}</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>

                <iframe
                  key="general-widget"
                  src={widgetUrl()}
                  title={L.bookingTitle}
                  className="w-full h-[75vh] sm:h-[80vh] bg-white rounded-xl border border-white/10"
                  allow="payment; geolocation"
                />

                <div className="flex items-center justify-between pt-1 text-[11px] text-muted-foreground">
                  <a
                    href={PHONE_HREF}
                    className="inline-flex items-center gap-1.5 transition hover:text-foreground"
                  >
                    <Phone className="size-3" /> {PHONE}
                  </a>
                  <span className="hidden sm:inline">10:00 — 21:00</span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Fullscreen Lightbox for Master's Portfolio */}
      {master && (
        <LightboxModal
          photos={master.portfolio}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onSelectIndex={(idx) => setLightboxIndex(idx)}
        />
      )}
    </AnimatePresence>
  );
}
