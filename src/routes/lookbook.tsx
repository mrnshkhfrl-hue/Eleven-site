import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Image as ImageIcon, X, ArrowRight } from "lucide-react";

import { LOOKBOOK, BARBERS, type Barber } from "@/lib/eleven-data";
import { Navbar } from "@/components/eleven/Navbar";
import { Footer } from "@/components/eleven/Footer";
import { MasterModal } from "@/components/eleven/MasterModal";
import { t, type Lang } from "@/lib/eleven-i18n";

export const Route = createFileRoute("/lookbook")({
  component: LookbookPage,
  head: () => ({
    meta: [
      { title: "Lookbook — ELEVEN Барбершоп Самарканд" },
      {
        name: "description",
        content:
          "Фотогалерея лучших мужских стрижек, бороды и стайлинга от мастеров ELEVEN в Самарканде.",
      },
      { property: "og:title", content: "Lookbook — ELEVEN Барбершоп" },
      {
        property: "og:description",
        content: "Галерея работ премиум барбершопа ELEVEN. Вдохновитесь стилем.",
      },
    ],
  }),
});

export function LookbookPage() {
  const [lang, setLang] = useState<Lang>("ru");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [master, setMaster] = useState<Barber | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const L = t(lang);

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
            <ImageIcon className="size-3 text-muted-foreground" />
            <span>PORTFOLIO & GALLERY</span>
          </div>
          <h1 className="font-display text-4xl tracking-tight sm:text-6xl md:text-7xl">
            {L.lookbookTitle}
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            {L.lookbookSubtitle}
          </p>
        </motion.div>
      </div>

      {/* Gallery Masonry */}
      <div className="mx-auto w-[92%] max-w-6xl pb-24">
        <div className="columns-2 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
          {LOOKBOOK.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => setSelectedPhoto(src)}
              className={`mb-4 cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 glass group relative ${
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
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-white">
                  ELEVEN Style #{i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 grid size-11 place-items-center rounded-full glass text-white transition hover:bg-white/20"
              aria-label="Закрыть"
            >
              <X className="size-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-h-[85vh] max-w-4xl overflow-hidden rounded-3xl border border-white/15"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto}
                alt="Просмотр фотографии"
                className="max-h-[80vh] w-auto object-contain rounded-3xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
