import { AnimatePresence, motion } from "motion/react";
import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  photos: string[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
};

export function LightboxModal({ photos, currentIndex, onClose, onSelectIndex }: Props) {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < photos.length;
  const currentSrc = isOpen ? photos[currentIndex] : null;

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (currentIndex !== null && currentIndex > 0) {
        onSelectIndex(currentIndex - 1);
      } else if (currentIndex === 0) {
        onSelectIndex(photos.length - 1);
      }
    },
    [currentIndex, onSelectIndex, photos.length]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (currentIndex !== null && currentIndex < photos.length - 1) {
        onSelectIndex(currentIndex + 1);
      } else if (currentIndex === photos.length - 1) {
        onSelectIndex(0);
      }
    },
    [currentIndex, onSelectIndex, photos.length]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  return (
    <AnimatePresence>
      {isOpen && currentSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl select-none"
        >
          {/* Top bar with count & close button */}
          <div className="absolute top-4 inset-x-4 sm:top-6 sm:inset-x-8 z-30 flex items-center justify-between pointer-events-none">
            <span className="rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest text-white/80 bg-black/60 border border-white/10 backdrop-blur-md">
              {currentIndex + 1} / {photos.length}
            </span>

            <button
              onClick={onClose}
              className="pointer-events-auto grid size-11 place-items-center rounded-full bg-black/60 border border-white/15 text-white transition hover:bg-white/20 active:scale-95 cursor-pointer"
              aria-label="Закрыть"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Prev button */}
          {photos.length > 1 && (
            <button
              onClick={handlePrev}
              aria-label="Предыдущее фото"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 grid size-12 place-items-center rounded-full bg-black/60 border border-white/15 text-white transition hover:bg-white/20 hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.8)] cursor-pointer"
            >
              <ChevronLeft className="size-6" />
            </button>
          )}

          {/* Next button */}
          {photos.length > 1 && (
            <button
              onClick={handleNext}
              aria-label="Следующее фото"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 grid size-12 place-items-center rounded-full bg-black/60 border border-white/15 text-white transition hover:bg-white/20 hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.8)] cursor-pointer"
            >
              <ChevronRight className="size-6" />
            </button>
          )}

          {/* Image container */}
          <motion.div
            key={currentSrc}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative max-h-[82vh] max-w-[90vw] sm:max-w-4xl overflow-hidden rounded-3xl border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentSrc}
              alt={`ELEVEN Фото ${currentIndex + 1}`}
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-3xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
