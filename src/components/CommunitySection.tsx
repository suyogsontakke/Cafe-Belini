import React, { useState } from 'react';
import { Mail, Check, Users } from 'lucide-react';

export const CommunitySection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section id="community" className="relative py-28 px-6 md:px-12 bg-[#00735C] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Narrative */}
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#E4A254] font-medium mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>The Culture Behind The Cup</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white/95 leading-[1.15] text-balance">
              More than espresso. A Milanese ritual shared among connoisseurs.
            </h2>
            <p className="mt-6 text-sm sm:text-base text-white/70 leading-relaxed max-w-lg">
              Caffè Bellini was established with an uncompromising pursuit: translating timeless Italian barista heritage into progressive single-origin perfection. We believe true espresso culture should feel intimate, revered, and deeply welcoming.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <span className="font-serif text-3xl font-bold text-white tabular-nums">14k+</span>
                <span className="block text-[11px] uppercase tracking-wider text-white/50 mt-1">Espressi Poured</span>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-white tabular-nums">48h</span>
                <span className="block text-[11px] uppercase tracking-wider text-white/50 mt-1">Roast to Door</span>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-white tabular-nums">89+</span>
                <span className="block text-[11px] uppercase tracking-wider text-white/50 mt-1">SCA Score Rating</span>
              </div>
            </div>
          </div>

          {/* Right Column: Weekly Drop Club Box */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#005a48] border border-white/15">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E4A254] block mb-2">
              Private Release Allocations
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
              Join The Bellini Reserve List
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-8">
              Receive early allocation notifications on limited microlots, experimental anaerobic fermentations, and kitchen pairing pop-up dates.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 flex items-center gap-3 text-xs">
                <Check className="w-4 h-4 shrink-0" />
                <span>Benvenuto! You are confirmed on the Bellini allocation register.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address"
                    className="w-full px-5 py-3.5 pr-12 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-xs focus:outline-none focus:border-white transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white text-[#00735C] hover:bg-white/90 transition-colors cursor-pointer"
                    aria-label="Submit email"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-white/40 pl-3">
                  Zero spam. Strictly fresh roast notifications and harvest dispatches.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
