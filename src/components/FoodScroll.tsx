import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { ArrowDown, UtensilsCrossed, ChevronRight, Sparkles } from 'lucide-react';
import { drawContainImage, BG_COLOR } from './CoffeeCanvasRenderer.ts';

interface FoodScrollProps {
  foodFrames: HTMLImageElement[];
  isFoodLoaded: boolean;
  onExploreMenu?: () => void;
  onScrollToCoffee?: () => void;
}

export const FoodScroll: React.FC<FoodScrollProps> = ({
  foodFrames,
  isFoodLoaded,
  onExploreMenu,
  onScrollToCoffee,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Framer motion scroll progress targeting the food section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [currentProgress, setCurrentProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // Sync scroll motion value to target ref
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    targetProgressRef.current = Math.max(0, Math.min(1, latest));
  });

  // Cubic smoothstep easing helper for continuous, silky transitions
  const smoothstep = (min: number, max: number, v: number) => {
    const t = Math.max(0, Math.min(1, (v - min) / (max - min)));
    return t * t * (3 - 2 * t);
  };

  // Calculate mutually exclusive, clamped opacities for the 3 food stages:
  // 1. Matcha (0% to ~28%)
  const s1Opacity = currentProgress < 0.28
    ? (currentProgress <= 0.16 ? 1 : 1 - smoothstep(0.16, 0.28, currentProgress))
    : 0;
  const s1Y = currentProgress < 0.28 ? smoothstep(0, 0.28, currentProgress) * -25 : 0;

  // 2. Pizza (28% to ~66%)
  const s2Opacity = (currentProgress >= 0.28 && currentProgress <= 0.66)
    ? (currentProgress < 0.38
        ? smoothstep(0.28, 0.38, currentProgress)
        : currentProgress > 0.56
        ? 1 - smoothstep(0.56, 0.66, currentProgress)
        : 1)
    : 0;
  const s2Y = currentProgress < 0.38
    ? (1 - smoothstep(0.28, 0.38, currentProgress)) * 25
    : currentProgress > 0.56
    ? -smoothstep(0.56, 0.66, currentProgress) * 25
    : 0;

  // 3. Burger (66% to 100%)
  const s3Opacity = currentProgress >= 0.66
    ? smoothstep(0.66, 0.78, currentProgress)
    : 0;
  const s3Y = (1 - smoothstep(0.66, 0.78, currentProgress)) * 25;

  // Initial scroll indicator (fades out smoothly by 6%)
  const indicatorOpacity = currentProgress < 0.06 ? 1 - smoothstep(0, 0.06, currentProgress) : 0;

  // 60FPS lerp render loop for buttery-smooth image playback
  const renderCanvas = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Smooth inertia lerp
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

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    if (isFoodLoaded && foodFrames.length > 0) {
      const frameCount = foodFrames.length;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.max(0, Math.floor(prog * (frameCount - 1)))
      );

      let img = foodFrames[frameIndex];
      // Zero-flicker nearest loaded frame fallback
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < 12; offset++) {
          const prev = foodFrames[frameIndex - offset];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            img = prev;
            break;
          }
          const next = foodFrames[frameIndex + offset];
          if (next && next.complete && next.naturalWidth > 0) {
            img = next;
            break;
          }
        }
      }

      if (img && img.complete && img.naturalWidth > 0) {
        drawContainImage(ctx, img, width, height);
      } else {
        // Fallback emerald fill
        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(0, 0, width, height);
      }
    } else {
      // Clear emerald
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, height);
    }

    ctx.restore();

    animationFrameId.current = requestAnimationFrame(renderCanvas);
  }, [foodFrames, isFoodLoaded]);

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(renderCanvas);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [renderCanvas]);

  // Stage indicator badge calculation
  const getStageName = (p: number) => {
    if (p < 0.32) return '01 · Ceremonial Uji Matcha';
    if (p < 0.68) return '02 · Wood-Fired Sourdough Pizza';
    return '03 · Bellini Smashed Wagyu Burger';
  };

  return (
    <section
      id="kitchen"
      ref={containerRef}
      className="relative h-[480vh] w-full bg-[#097454]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#097454] flex items-center justify-center">
        {/* The 60FPS HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block bg-[#097454]"
        />

        {/* Subtle radial scrim for text legibility */}
        <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-[#097454]/20 to-[#097454]/60" />

        {/* Stage 1: MATCHA (0% - 28%) - Centered */}
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
            Stage 01 · Cerimonia Matcha
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white/95 leading-[1.08] text-balance">
            Ceremonial Uji Matcha.
          </h2>
          <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-white/80 max-w-md sm:max-w-xl font-normal leading-relaxed text-balance">
            Single-cultivar green tea from Kyoto, stone-ground into vibrant emerald powder and whipped into silky microfoam. Pure calm, focused energy.
          </p>
          <div className="mt-4 sm:mt-6 flex items-center gap-4 sm:gap-6 text-xs text-white/70">
            <div>
              <span className="block font-serif text-base sm:text-lg text-white">Uji, Kyoto</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50">Origin</span>
            </div>
            <div className="w-[1px] h-5 sm:h-6 bg-white/20" />
            <div>
              <span className="block font-serif text-base sm:text-lg text-white">First Harvest</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50">Grade</span>
            </div>
            <div className="w-[1px] h-5 sm:h-6 bg-white/20" />
            <div>
              <span className="block font-serif text-base sm:text-lg text-white">Bamboo Whisked</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50">Craft</span>
            </div>
          </div>
        </div>

        {/* Stage 2: PIZZA (28% - 66%) - Left Aligned on desktop, centered on mobile */}
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
            Stage 02 · Il Forno a Legna
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white/95 leading-[1.08] text-balance">
            Artisanal Sourdough Pizza.
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-white/80 leading-relaxed max-w-md font-sans">
            Naturally leavened dough fermented for 72 hours, blistered at 480°C in our stone oven. Topped with sweet San Marzano tomatoes and velvety fior di latte.
          </p>
          <div className="mt-4 sm:mt-5 flex items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs text-white/70">
            <div>
              <span className="block font-serif text-base sm:text-lg text-white">480°C</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50">Wood-Fired</span>
            </div>
            <div className="w-[1px] h-5 sm:h-6 bg-white/20" />
            <div>
              <span className="block font-serif text-base sm:text-lg text-white">72-Hour</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50">Ferment</span>
            </div>
            <div className="w-[1px] h-5 sm:h-6 bg-white/20" />
            <div>
              <span className="block font-serif text-base sm:text-lg text-white">San Marzano</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50">D.O.P</span>
            </div>
          </div>
        </div>

        {/* Stage 3: BURGER (66% - 100%) - Centered CTA */}
        <div
          style={{
            opacity: s3Opacity,
            transform: `translateY(${s3Y}px)`,
            display: s3Opacity > 0.01 ? 'flex' : 'none',
            visibility: s3Opacity > 0.01 ? 'visible' : 'hidden',
            pointerEvents: s3Opacity > 0.4 ? 'auto' : 'none',
          }}
          className="absolute inset-x-4 sm:inset-x-6 top-1/2 -translate-y-1/2 flex-col items-center text-center z-20 max-w-xl sm:max-w-2xl mx-auto drop-shadow-xl transition-opacity duration-150"
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#E4A254] mb-3 sm:mb-4 font-sans font-medium drop-shadow-sm">
            Stage 03 · La Cucina Bellini
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white/95 leading-[1.05] text-balance drop-shadow-md">
            The Bellini Smashed Burger.
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/80 max-w-md sm:max-w-lg font-sans leading-relaxed text-balance drop-shadow-sm">
            Caramelized double-smashed wagyu blend, melted cave-aged cheddar, crispy shallots, and house truffle emulsion in a toasted brioche bun.
          </p>

          <div className="mt-4 sm:mt-5 flex items-center justify-center gap-4 sm:gap-6 text-xs text-white/70">
            <div>
              <span className="block font-serif text-base sm:text-lg text-white">Wagyu Blend</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50">Double Smash</span>
            </div>
            <div className="w-[1px] h-5 sm:h-6 bg-white/20" />
            <div>
              <span className="block font-serif text-base sm:text-lg text-white">Aged Cheddar</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50">Melt</span>
            </div>
            <div className="w-[1px] h-5 sm:h-6 bg-white/20" />
            <div>
              <span className="block font-serif text-base sm:text-lg text-white">Brioche</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50">Butter Glazed</span>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={onExploreMenu}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 min-h-[44px] bg-white text-[#097454] text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Full Café Menu</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onScrollToCoffee}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 min-h-[44px] bg-black/30 hover:bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-medium uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-[#E4A254]" />
              <span>Back to Coffee Journey</span>
            </button>
          </div>
        </div>

        {/* Scroll Progress HUD (Left Vertical Bar - hidden on small mobile) */}
        <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-20 pointer-events-none">
          <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
            KITCHEN
          </span>
          <div className="relative w-[2px] h-32 bg-white/15">
            <div
              className="absolute top-0 left-0 w-full bg-[#E4A254] transition-all duration-75"
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
            <span>Scroll to explore food pairings</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-4 h-4 text-[#E4A254]" />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};
