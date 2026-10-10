import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  progress: number; // 0 - 100
  isComplete: boolean;
  onFinished: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({
  progress,
  isComplete,
  onFinished,
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    // Smooth progress interpolation
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev < progress) {
          const step = Math.max(1, Math.round((progress - prev) * 0.2));
          return Math.min(progress, prev + step);
        }
        return prev;
      });
    }, 25);
    return () => clearInterval(timer);
  }, [progress]);

  useEffect(() => {
    if (isComplete && displayProgress >= 99) {
      const timeout = setTimeout(() => {
        onFinished();
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [isComplete, displayProgress, onFinished]);

  return (
    <AnimatePresence>
      {!isComplete || displayProgress < 100 ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#097454] p-8 md:p-12 text-white selection:bg-transparent"
        >
          {/* Header mark */}
          <div className="w-full flex items-center justify-between text-xs tracking-widest text-white/50 uppercase">
            <span>Specialty Single Origin</span>
            <span>Est. 2024</span>
          </div>

          {/* Central Brand Narrative */}
          <div className="flex flex-col items-center text-center max-w-lg">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-4"
            >
              <h1 className="font-serif text-5xl sm:text-7xl font-semibold tracking-tight text-white/95 italic">
                Caffè Bellini
              </h1>
              <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/60 mt-2 font-sans font-medium">
                Milano · Roastery & Gastronomy
              </p>
            </motion.div>

            <p className="text-xs sm:text-sm text-white/60 max-w-xs mt-2 leading-relaxed">
              Curating harvest & kitchen sequences · 60 FPS visual odyssey
            </p>
          </div>

          {/* Bottom Progress Bar & Percentage */}
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between text-xs font-mono text-white/70 mb-2">
              <span className="tracking-wider">SYNCHRONIZING FRAMES</span>
              <span className="tabular-nums font-semibold">{Math.min(100, Math.round(displayProgress))}%</span>
            </div>

            {/* Hairline track */}
            <div className="relative h-[2px] w-full bg-white/15 overflow-hidden">
              <motion.div
                className="absolute top-0 bottom-0 left-0 bg-white"
                style={{ width: `${Math.min(100, displayProgress)}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-white/40">
              <span>Cherry · Bean · Grind · Cup</span>
              <span>100% Arabica</span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
