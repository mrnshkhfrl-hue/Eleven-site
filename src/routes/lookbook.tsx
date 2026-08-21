import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

import { LOOKBOOK, type Barber } from "@/lib/eleven-data";
import { Navbar } from "@/components/eleven/Navbar";
import { Footer } from "@/components/eleven/Footer";
import { MasterModal } from "@/components/eleven/MasterModal";
import { LightboxModal } from "@/components/eleven/LightboxModal";
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
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
              onClick={() => setLightboxIndex(i)}
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
      </div>

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        photos={LOOKBOOK}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />

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
