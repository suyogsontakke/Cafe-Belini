import React from 'react';
import { Compass, ThermometerSun, Mountain, HeartHandshake } from 'lucide-react';

export const OriginStory: React.FC = () => {
  return (
    <section id="origin" className="relative py-28 px-6 md:px-12 bg-[#00735C] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Lead */}
        <div className="max-w-3xl mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-[#E4A254] font-medium block mb-3">
            Terroir & Stewardship
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white/95 leading-[1.1] text-balance">
            Great coffee is grown, not made. We simply protect what nature crafted.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl text-balance">
            Caffè Bellini partners exclusively with smallholder multi-generational estates in the cloud forests of Ethiopia, Colombia, and Central America. At these altitudes, cold nights slow maturation, compressing complex floral sugars into dense, hard beans.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-8 rounded-2xl bg-[#005f4c] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#E4A254] mb-6">
                <Mountain className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                2,200m Elevation
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Volcanic nitrogen-dense soil and mist canopies produce extreme bean density and lively acidity.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 text-[11px] font-mono text-white/50">
              YIRGACHEFFE & HUILA
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#005f4c] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#E4A254] mb-6">
                <ThermometerSun className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Micro-Climate Maturation
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                30-degree diurnal shifts force the coffee cherries to concentrate nectar before harvest.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 text-[11px] font-mono text-white/50">
              SLOW HARVEST CYCLE
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#005f4c] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#E4A254] mb-6">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Single Estate Lots
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                100% traceable to individual farm blocks. No bulk commoditization, zero blending masks.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 text-[11px] font-mono text-white/50">
              TRACEABILITY 100%
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#005f4c] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#E4A254] mb-6">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Direct Trade Living Wage
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                We pay 3.2x over the C-market benchmark directly to farming cooperatives and harvesters.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 text-[11px] font-mono text-white/50">
              DIRECT PRODUCER EQUITY
            </div>
          </div>
        </div>

        {/* Sensory Flavor Map Quote */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#004d3d] to-[#005a48] border border-white/15 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#E4A254] mb-2 font-mono">
              The Bellini Cupping Standard
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-semibold text-white/95 max-w-2xl leading-snug">
              &ldquo;We evaluate espresso not merely for intensity, but for clarity, floral sweetness, and the lingering tactile memory on the palate.&rdquo;
            </p>
          </div>
          <div className="shrink-0 text-left lg:text-right">
            <span className="block font-medium text-white text-sm">Gianluigi Bellini</span>
            <span className="text-xs text-white/60">Master Roaster & Q-Grader, Caffè Bellini Milano</span>
          </div>
        </div>
      </div>
    </section>
  );
};
