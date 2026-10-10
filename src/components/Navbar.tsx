import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquareQuote } from 'lucide-react';

interface NavbarProps {
  onOpenConcierge: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConcierge,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-[#097454]/90 backdrop-blur-xl border-b border-white/10 shadow-lg py-3 sm:py-3.5'
          : 'bg-gradient-to-b from-black/25 via-[#097454]/20 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-4 sm:gap-8">
        {/* Brand Wordmark & Heritage Subtitle */}
        <a
          href="#"
          className="group flex flex-col items-start select-none"
        >
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-white group-hover:opacity-95 transition-opacity italic">
              Caffè Bellini
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-white/50 font-sans font-medium -mt-0.5">
            Milano · Atelier di Torrefazione
          </span>
        </a>

        {/* Desktop Single-Line Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 font-sans">
          <a
            href="#scrollytelling"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 hover:text-[#E4A254]"
          >
            The Journey
          </a>
          <a
            href="#kitchen"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 hover:text-[#E4A254]"
          >
            The Kitchen
          </a>
          <a
            href="#menu"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 hover:text-[#E4A254]"
          >
            Menu
          </a>
          <a
            href="#origin"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 hover:text-[#E4A254]"
          >
            Terroir
          </a>
          <a
            href="#community"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 hover:text-[#E4A254]"
          >
            Reserve Club
          </a>
        </nav>

        {/* Right Luxury Controls: Concierge Trigger & Allocation CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            onClick={onOpenConcierge}
            title="Ask Concierge & Common FAQs"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-[36px] text-[11px] font-medium tracking-wider uppercase text-white/90 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-full transition-all duration-200 backdrop-blur-md cursor-pointer group"
          >
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#E4A254] group-hover:scale-110 transition-transform" />
            <span>Concierge & FAQ</span>
          </button>

          <a
            href="#community"
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2 min-h-[38px] text-xs font-semibold uppercase tracking-wider text-[#097454] bg-white hover:bg-white/90 active:scale-95 rounded-full transition-all duration-200 shadow-md whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Join Reserve</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-11 h-11 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#075c42]/98 backdrop-blur-xl px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3.5 text-xs font-medium tracking-widest uppercase text-white/80 font-sans">
            <a
              href="#scrollytelling"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 hover:text-white transition-colors"
            >
              The Coffee Journey
            </a>
            <a
              href="#kitchen"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 hover:text-white transition-colors"
            >
              The Kitchen (Matcha · Pizza · Burger)
            </a>
            <a
              href="#menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 hover:text-white transition-colors"
            >
              Full Café Menu
            </a>
            <a
              href="#origin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 hover:text-white transition-colors"
            >
              Terroir & Stewardship
            </a>
            <a
              href="#community"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 hover:text-white transition-colors"
            >
              Private Allocation Club
            </a>
          </nav>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConcierge();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-xs font-medium text-white bg-white/15 hover:bg-white/20 border border-white/20 rounded-full cursor-pointer"
            >
              <MessageSquareQuote className="w-3.5 h-3.5 text-[#E4A254]" />
              <span>Ask Concierge FAQ</span>
            </button>
            <span className="text-[10px] font-mono text-white/40">Milano 1984</span>
          </div>
        </div>
      )}
    </header>
  );
};
