import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { ArrowDown, ChevronRight } from 'lucide-react';
import { drawContainImage, drawProceduralStage, BG_COLOR } from './CoffeeCanvasRenderer.ts';
import frameColorsData from '../frameColors.json';

interface CoffeeScrollProps {
  customFrames: HTMLImageElement[];
  isCustomLoaded: boolean;
  onExploreStory: () => void;
}

export const CoffeeScroll: React.FC<CoffeeScrollProps> = ({
  customFrames,
  isCustomLoaded,
  onExploreStory,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Framer Motion scroll hook targeting the 600vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [currentProgress, setCurrentProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // Sync motion value to target ref
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    targetProgressRef.current = Math.max(0, Math.min(1, latest));
  });

  // Cubic smoothstep easing helper for cinema-grade continuous transitions
  const smoothstep = (min: number, max: number, v: number) => {
    const t = Math.max(0, Math.min(1, (v - min) / (max - min)));
    return t * t * (3 - 2 * t);
  };

  // Current progress synced to lerped canvas value (0 to 1)
  // Calculate strictly mutually exclusive, silky-smooth clamped opacities
  const s1Opacity = currentProgress < 0.18
    ? (currentProgress <= 0.08 ? 1 : 1 - smoothstep(0.08, 0.18, currentProgress))
    : 0;
  const s1Y = currentProgress < 0.18 ? smoothstep(0, 0.18, currentProgress) * -25 : 0;

  const s2Opacity = (currentProgress >= 0.18 && currentProgress <= 0.46)
    ? (currentProgress < 0.28
        ? smoothstep(0.18, 0.28, currentProgress)
        : currentProgress > 0.36
        ? 1 - smoothstep(0.36, 0.46, currentProgress)
        : 1)
    : 0;
  const s2Y = currentProgress < 0.28
    ? (1 - smoothstep(0.18, 0.28, currentProgress)) * 25
    : currentProgress > 0.36
    ? -smoothstep(0.36, 0.46, currentProgress) * 25
    : 0;

  const s3Opacity = (currentProgress >= 0.46 && currentProgress <= 0.72)
    ? (currentProgress < 0.54
        ? smoothstep(0.46, 0.54, currentProgress)
        : currentProgress > 0.64
        ? 1 - smoothstep(0.64, 0.72, currentProgress)
        : 1)
    : 0;
  const s3Y = currentProgress < 0.54
    ? (1 - smoothstep(0.46, 0.54, currentProgress)) * 25
    : currentProgress > 0.64
    ? -smoothstep(0.64, 0.72, currentProgress) * 25
    : 0;

  const s4Opacity = currentProgress >= 0.72
    ? smoothstep(0.72, 0.82, currentProgress)
    : 0;
  const s4Y = (1 - smoothstep(0.72, 0.82, currentProgress)) * 25;

  const indicatorOpacity = currentProgress < 0.06 ? 1 - smoothstep(0, 0.06, currentProgress) : 0;

  // Render loop with ultra-smooth lerp (0.085) for buttery-smooth inertial playback
  const renderCanvas = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Silkier inertia lerp
    const diff = targetProgressRef.current - currentProgressRef.current;
    if (Math.abs(diff) > 0.0001) {
      currentProgressRef.current += diff * 0.085;
    } else {
      currentProgressRef.current = targetProgressRef.current;
    }

    const prog = currentProgressRef.current;
    setCurrentProgress(prog);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Check size change
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // If user provided custom image frames
    if (isCustomLoaded && customFrames.length > 0) {
      const frameCount = customFrames.length;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.max(0, Math.floor(prog * (frameCount - 1)))
      );
      
      let img = customFrames[frameIndex];
      // Nearest loaded frame fallback to guarantee zero flicker
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < 12; offset++) {
          const prev = customFrames[frameIndex - offset];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            img = prev;
            break;
          }
          const next = customFrames[frameIndex + offset];
          if (next && next.complete && next.naturalWidth > 0) {
            img = next;
            break;
          }
        }
      }

      const activeColor = frameColorsData.coffeeColors[frameIndex] || BG_COLOR;

      if (img && img.complete && img.naturalWidth > 0) {
        drawContainImage(ctx, img, width, height, activeColor);
      } else {
        // Fallback procedural
        drawProceduralStage(ctx, prog, width, height, time);
      }

      // Keep sticky background in sync with canvas frame border
      if (canvas.parentElement) {
        canvas.parentElement.style.backgroundColor = activeColor;
      }
    } else {
      // Procedural 60fps coffee morphing stage
      drawProceduralStage(ctx, prog, width, height, time);
    }

    ctx.restore();

    animationFrameId.current = requestAnimationFrame(renderCanvas);
  }, [customFrames, isCustomLoaded]);

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(renderCanvas);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [renderCanvas]);

  // Current stage label calculation
  const getStageName = (p: number) => {
    if (p < 0.22) return '01 · Harvest Cherry';
    if (p < 0.48) return '02 · Milanese Roast';
    if (p < 0.72) return '03 · Precision Grind';
    if (p < 0.85) return '04 · Extraction';
    return '05 · Bellini Espresso & Latte';
  };

  return (
    <section
      id="scrollytelling"
      ref={containerRef}
      className="relative h-[600vh] w-full bg-[#097454]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#097454] flex items-center justify-center">
        {/* The 60FPS HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block bg-[#097454]"
        />

        {/* Narrative Stage 1: 0% - 15% (Centered) */}
        <div
          style={{
            opacity: s1Opacity,
            transform: `translateY(${s1Y}px)`,
            display: s1Opacity > 0.01 ? 'flex' : 'none',
            visibility: s1Opacity > 0.01 ? 'visible' : 'hidden',
          }}
          className="pointer-events-none absolute inset-x-4 sm:inset-x-8 top-1/2 -translate-y-1/2 flex-col items-center text-center z-10 max-w-2xl sm:max-w-3xl mx-auto drop-shadow-md transition-opacity duration-150"
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#E4A254] mb-3 sm:mb-4 font-sans font-medium">
            Fondata a Milano · Single Origin Terroir
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white/95 leading-[1.06] text-balance">
            Caffè Bellini. Pure Origin.
          </h1>
          <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-white/80 max-w-md sm:max-w-xl font-normal leading-relaxed text-balance">
            Rooted in alpine mist and volcanic mineral soil. The sacred ritual of Italian espresso, elevated to an artisanal art form.
          </p>
        </div>

        {/* Narrative Stage 2: 25% - 40% (Left Aligned on desktop, centered on mobile) */}
        <div
          style={{
            opacity: s2Opacity,
            transform: `translateY(${s2Y}px)`,
            display: s2Opacity > 0.01 ? 'block' : 'none',
            visibility: s2Opacity > 0.01 ? 'visible' : 'hidden',
          }}
          className="pointer-events-none absolute inset-x-4 sm:left-12 md:left-24 lg:left-32 sm:right-auto top-1/2 -translate-y-1/2 z-10 max-w-md sm:max-w-lg text-center sm:text-left drop-shadow-md transition-opacity duration-150 mx-auto sm:mx-0"
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#E4A254] mb-2 sm:mb-3 block font-sans font-medium">
            Stage 01 · Hand-Selected Harvest
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white/95 leading-[1.08] text-balance">
            The journey begins with the cherry.
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-white/80 leading-relaxed font-sans max-w-md">
            Picked by hand at precisely 21° Brix sugar concentration at 2,200 meters. Only vibrant ruby-red cherries make the cut for Bellini single-origins.
          </p>
          <div className="mt-4 sm:mt-5 flex items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs text-white/70">
            <div>
              <span className="block font-serif text-base sm:text-lg text-white/90">2,200m</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50">Elevation</span>
            </div>
            <div className="w-[1px] h-5 sm:h-6 bg-white/20" />
            <div>
              <span className="block font-serif text-base sm:text-lg text-white/90">Grade 1</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50">Sorting</span>
            </div>
            <div className="w-[1px] h-5 sm:h-6 bg-white/20" />
            <div>
              <span className="block font-serif text-base sm:text-lg text-white/90">Zero Defect</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50">Standard</span>
            </div>
          </div>
        </div>

        {/* Narrative Stage 3: 50% - 65% (Right Aligned on desktop, centered on mobile) */}
        <div
          style={{
            opacity: s3Opacity,
            transform: `translateY(${s3Y}px)`,
            display: s3Opacity > 0.01 ? 'block' : 'none',
            visibility: s3Opacity > 0.01 ? 'visible' : 'hidden',
          }}
          className="pointer-events-none absolute inset-x-4 sm:right-12 md:right-24 lg:right-32 sm:left-auto top-1/2 -translate-y-1/2 z-10 max-w-md sm:max-w-lg text-center sm:text-right drop-shadow-md transition-opacity duration-150 mx-auto sm:mx-0 sm:ml-auto"
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#E4A254] mb-2 sm:mb-3 block font-sans font-medium">
            Stage 02 & 03 · Milanese Roastery & Milling
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white/95 leading-[1.08] text-balance">
            Roasted for Depth. Ground for Nuance.
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-white/80 leading-relaxed max-w-md mx-auto sm:ml-auto font-sans">
            Small-batch cast iron drum roasting preserves delicate floral top-notes and deep caramel body. Micrometrically burr-ground to unlock maximum extraction surface.
          </p>
          <div className="mt-4 sm:mt-5 flex items-center justify-center sm:justify-end gap-4 sm:gap-6 text-xs text-white/70">
            <div>
              <span className="block font-serif text-base sm:text-lg text-white/90">Cast Iron</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50">Roaster</span>
            </div>
            <div className="w-[1px] h-5 sm:h-6 bg-white/20" />
            <div>
              <span className="block font-serif text-base sm:text-lg text-white/90">205°C</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50">First Crack</span>
            </div>
            <div className="w-[1px] h-5 sm:h-6 bg-white/20" />
            <div>
              <span className="block font-serif text-base sm:text-lg text-white/90">98.4mm</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50">Flat Burrs</span>
            </div>
          </div>
        </div>

        {/* Narrative Stage 4: 80% - 100% (Centered CTA) */}
        <div
          style={{
            opacity: s4Opacity,
            transform: `translateY(${s4Y}px)`,
            display: s4Opacity > 0.01 ? 'flex' : 'none',
            visibility: s4Opacity > 0.01 ? 'visible' : 'hidden',
            pointerEvents: s4Opacity > 0.4 ? 'auto' : 'none',
          }}
          className="absolute inset-x-4 sm:inset-x-6 top-1/2 -translate-y-1/2 flex-col items-center text-center z-20 max-w-xl sm:max-w-2xl mx-auto drop-shadow-xl transition-opacity duration-150"
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#E4A254] mb-3 sm:mb-4 font-sans font-medium drop-shadow-sm">
            Stage 04 · Il Rituale Bellini
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white/95 leading-[1.05] text-balance drop-shadow-md">
            Crafted by Caffè Bellini.
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/80 max-w-md sm:max-w-lg font-sans leading-relaxed text-balance drop-shadow-sm">
            Silky microfoam meets single-origin espresso. Handcrafted for slow Milanese mornings and contemplative conversation.
          </p>
          <div className="mt-6 sm:mt-8 flex items-center justify-center w-full sm:w-auto">
            <button
              onClick={onExploreStory}
              className="w-full sm:w-auto px-8 py-3.5 min-h-[44px] bg-white text-[#097454] text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Discover Kitchen Pairings</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scroll Progress HUD (Left Vertical Bar - hidden on small mobile to give full screen to video) */}
        <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-20 pointer-events-none">
          <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
            PROGRESS
          </span>
          <div className="relative w-[2px] h-32 bg-white/15">
            <div
              className="absolute top-0 left-0 w-full bg-white transition-all duration-75"
              style={{ height: `${Math.round(currentProgress * 100)}%` }}
            />
          </div>
          <span className="text-[11px] font-mono tabular-nums text-white/70">
            {Math.round(currentProgress * 100)}%
          </span>
        </div>

        {/* Initial Scroll Prompt */}
        {indicatorOpacity > 0.01 && (
          <div
            style={{ opacity: indicatorOpacity }}
            className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/60 text-[11px] sm:text-xs tracking-widest uppercase pointer-events-none z-20 transition-opacity duration-150"
          >
            <span>Scroll to explore the journey</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-4 h-4 text-white/70" />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};
