import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#004d3d] text-white/70 py-16 px-6 md:px-12 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <a
            href="#"
            className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-white hover:opacity-90 transition-opacity block mb-2"
          >
            Caffè Bellini
          </a>
          <p className="text-white/60 max-w-sm leading-relaxed text-xs">
            Milanese specialty roastery & artisanal kitchen. Dedicated to single-origin espresso terroir and culinary excellence.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-medium uppercase tracking-wider text-white/70">
          <a href="#scrollytelling" className="hover:text-white transition-colors">
            The Journey
          </a>
          <a href="#kitchen" className="hover:text-white transition-colors">
            The Kitchen
          </a>
          <a href="#menu" className="hover:text-white transition-colors">
            Menu
          </a>
          <a href="#origin" className="hover:text-white transition-colors">
            Terroir & Origin
          </a>
          <a href="#community" className="hover:text-white transition-colors">
            Culture & Drops
          </a>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
        <div>
          © {new Date().getFullYear()} Caffè Bellini Milano S.r.l. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <span>Direct Trade Verified</span>
          <span>·</span>
          <span>SCA Standard Grade 1</span>
          <span>·</span>
          <span>#00735C Emerald</span>
        </div>
      </div>
    </footer>
  );
};
