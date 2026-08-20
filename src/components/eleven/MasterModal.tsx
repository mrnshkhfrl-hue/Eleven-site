import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, Phone, X, Clock, Award } from "lucide-react";

import { widgetUrl, type Barber } from "@/lib/eleven-data";
import { t, PHONE, PHONE_HREF, type Lang } from "@/lib/eleven-i18n";

type Props = {
  master: Barber | null;
  onClose: () => void;
  lang: Lang;
};

export function MasterModal({ master, onClose, lang }: Props) {
  const L = t(lang);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    if (master) setBooking(false);
  }, [master]);

  /* Lock body scroll when modal is open */
  useEffect(() => {
    if (!master) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [master]);

  return (
    <AnimatePresence>
      {master && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={master.name}
            initial={{ y: 40, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="max-h-[90vh] overflow-y-auto w-full max-w-2xl mt-auto mb-auto relative rounded-[2rem] glass-strong p-6 scrollbar-thin"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Закрыть"
              className="glass absolute top-5 right-5 z-10 grid size-9 place-items-center rounded-full text-foreground/70 transition hover:text-foreground"
            >
              <X className="size-4" />
            </button>

            {booking ? (
              /* ─── Booking iframe view ─── */
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] tracking-[0.35em] text-muted-foreground uppercase">
                    {master.name}
                  </p>
                  <h3 className="font-display text-3xl tracking-wide">{L.bookingTitle}</h3>
                </div>
                <iframe
                  key={master.id}
                  src={widgetUrl(master.id)}
                  title={`${L.bookingTitle} — ${master.name}`}
                  className="w-full h-[80vh] bg-white rounded-xl"
                />
                <button
                  onClick={() => setBooking(false)}
                  className="w-full rounded-2xl border border-white/15 py-3 text-xs tracking-[0.2em] text-muted-foreground uppercase transition hover:text-foreground"
                >
                  {L.portfolio}
                </button>
              </div>
            ) : (
              /* ─── Portfolio / bio view ─── */
              <div className="space-y-5">
                {/* Master photo */}
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
                  <img
                    src={master.photo}
                    alt={master.name}
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover object-top grayscale"
                  />
                </div>

                {/* Name & role */}
                <div>
                  <h3 className="font-display text-4xl tracking-wide">{master.name}</h3>
                  <p className="mt-1 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
                    {master.role}
                  </p>
                </div>

                {/* Bio & experience */}
                <div className="rounded-2xl p-4 glass">
                  <p className="mb-3 text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                    {L.bio}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/85">
                    {lang === "uz" ? master.bioUz : master.bio}
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Award className="size-3.5" />
                      {L.experience}: {master.years} {L.years}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3.5" />
                      10:00 — 21:00
                    </span>
                  </div>
                </div>

                {/* Mini portfolio */}
                <div>
                  <p className="mb-2 text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                    {L.portfolio}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {master.portfolio.map((src, i) => (
                      <div
                        key={`${master.id}-${i}`}
                        className="overflow-hidden rounded-2xl border border-white/10"
                      >
                        <img
                          src={src}
                          alt={`${master.name} — работа ${i + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="aspect-square w-full object-cover grayscale transition duration-700 hover:grayscale-0"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Book button */}
                <button
                  onClick={() => setBooking(true)}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-semibold tracking-wide text-primary-foreground transition hover:opacity-90"
                >
                  {L.bookWith} {master.name}
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </button>

                {/* Phone */}
                <a
                  href={PHONE_HREF}
                  className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground transition hover:text-foreground"
                >
                  <Phone className="size-3" /> {PHONE}
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
