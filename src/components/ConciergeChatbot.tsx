import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Coffee, UtensilsCrossed, HelpCircle, ArrowRight } from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'coffee' | 'kitchen' | 'allocations' | 'brewing';
  question: string;
  shortLabel: string;
  answer: string;
}

const FAQ_KNOWLEDGE_BASE: FAQItem[] = [
  {
    id: 'roast',
    category: 'coffee',
    question: 'How is Caffè Bellini espresso roasted?',
    shortLabel: 'Our Roasting Method',
    answer: 'We roast in micro-batches using restored cast-iron drum roasters in Milan. We carefully manage heat transfer to reach First Crack at precisely 205°C, preserving delicate floral and bergamot top-notes while developing a syrupy, caramelized dark chocolate body and dense crema.',
  },
  {
    id: 'sourcing',
    category: 'coffee',
    question: 'Where are your single-origin coffee beans sourced?',
    shortLabel: 'Bean Terroir & Origins',
    answer: 'All Bellini lots are 100% Grade 1 Arabica sourced from extreme altitude cloud forests at 2,200m+ in Yirgacheffe (Ethiopia) and Huila (Colombia). Cold mountain nights slow fruit maturation, concentrating intense natural sugars harvested at 21° Brix.',
  },
  {
    id: 'brewing',
    category: 'brewing',
    question: 'What grind size and extraction specs do you recommend?',
    shortLabel: 'Extraction & Brew Specs',
    answer: 'For Bellini Espresso: 18g in, 36g out in 27–30s at 93°C with a fine micrometric burr grind. For Pour-Over (V60/Kalita): medium-coarse kosher salt grind at 1:16 ratio with 92°C water and a 45s bloom.',
  },
  {
    id: 'matcha',
    category: 'kitchen',
    question: 'What makes your Ceremonial Uji Matcha special?',
    shortLabel: 'Ceremonial Matcha Specs',
    answer: 'Our matcha is sourced directly from historic tea gardens in Uji, Kyoto. Cultivated from single-cultivar tea leaves shade-grown for 30 days, it is stone-ground on granite mills into micro-powder and whisked with bamboo chasen into silky, umami-rich microfoam with zero bitterness.',
  },
  {
    id: 'pizza',
    category: 'kitchen',
    question: 'How is your artisanal wood-fired pizza crafted?',
    shortLabel: 'Wood-Fired Pizza Dough',
    answer: 'We naturally leaven Italian Tipo 00 flour with our 40-year-old mother sourdough, fermenting for 72 hours. It blisters in our volcanic stone oven at 480°C in just 90 seconds, topped with sweet San Marzano D.O.P. tomatoes, fresh buffalo fior di latte, and cold-pressed extra virgin olive oil.',
  },
  {
    id: 'burger',
    category: 'kitchen',
    question: 'What are the ingredients in The Bellini Smashed Burger?',
    shortLabel: 'Wagyu Burger Ingredients',
    answer: 'We use double caramelized smashed patties from an A5 Wagyu and prime brisket blend, melted 24-month cave-aged English cheddar, crispy shallots, and house-emulsified black winter truffle aioli on a toasted butter-glazed brioche bun.',
  },
  {
    id: 'allocation',
    category: 'allocations',
    question: 'How does the Private Allocation Club work?',
    shortLabel: 'Private Drops & Reserve Club',
    answer: 'Membership is complimentary. Members receive priority dispatch alerts 48 hours before each limited harvest micro-lot or kitchen pop-up. All coffees are roasted to order and dispatched within 48 hours in nitrogen-sealed recyclable tins.',
  },
  {
    id: 'shipping',
    category: 'allocations',
    question: 'Do you ship internationally and how is freshness preserved?',
    shortLabel: 'Shipping & Freshness',
    answer: 'Yes, we provide worldwide express shipping. Every tin features a one-way degassing valve and nitrogen flush to protect precious aromatic oils, ensuring peak cupping flavor for up to 8 weeks after dispatch.',
  },
  {
    id: 'menu',
    category: 'kitchen',
    question: 'What is on your full café menu?',
    shortLabel: 'Full Café Menu',
    answer: 'Our full menu features 5 handcrafted categories:\n• ☕ Hot Coffee & Espresso (Espresso, Americano, Cappuccino, Latte, Mocha, Flat White)\n• 🧋 Cold Coffees, Teas & Shakes (Cold Brew, Iced Latte, Uji Matcha, Masala Chai, Thick Shakes)\n• 🥪 Sandwiches & Wraps (Classic Veg, Paneer Tikka, Bombay Grilled, Club, Pesto Chicken Wrap)\n• 🍟 Snacks & Bites (Peri-Peri Fries, Loaded Nachos, Garlic Bread, Spring Rolls)\n• 🍰 Desserts (Belgian Brownie, Biscoff Cheesecake Jars, Butter Croissants, Traditional Tiramisu)\n\nTap "Menu" in the navigation bar to browse all items and prices!',
  },
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  timestamp: string;
  suggestedQuestions?: FAQItem[];
}

interface ConciergeChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const ConciergeChatbot: React.FC<ConciergeChatbotProps> = ({
  isOpen,
  onClose,
  onOpen,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'concierge',
      text: 'Benvenuto to Caffè Bellini Milano. I am your concierge. How may I assist you with our single-origin roasts, extraction techniques, or kitchen pairings today?',
      timestamp: 'Just now',
      suggestedQuestions: FAQ_KNOWLEDGE_BASE.slice(0, 4),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSelectFAQ = (item: FAQItem) => {
    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: item.question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const remainingFAQs = FAQ_KNOWLEDGE_BASE.filter((f) => f.id !== item.id).slice(0, 3);
      const botMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'concierge',
        text: item.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: remainingFAQs,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      // Match query against FAQ knowledge base
      let matched = FAQ_KNOWLEDGE_BASE.find(
        (faq) =>
          lower.includes(faq.id) ||
          faq.question.toLowerCase().split(' ').some((word) => word.length > 3 && lower.includes(word)) ||
          faq.answer.toLowerCase().split(' ').some((word) => word.length > 4 && lower.includes(word))
      );

      // Contextual fallbacks
      let responseText = '';
      if (lower.includes('matcha') || lower.includes('green tea')) {
        matched = FAQ_KNOWLEDGE_BASE.find((f) => f.id === 'matcha');
      } else if (lower.includes('pizza') || lower.includes('dough') || lower.includes('crust')) {
        matched = FAQ_KNOWLEDGE_BASE.find((f) => f.id === 'pizza');
      } else if (lower.includes('burger') || lower.includes('wagyu') || lower.includes('food')) {
        matched = FAQ_KNOWLEDGE_BASE.find((f) => f.id === 'burger');
      } else if (lower.includes('roast') || lower.includes('crack') || lower.includes('temperature')) {
        matched = FAQ_KNOWLEDGE_BASE.find((f) => f.id === 'roast');
      } else if (lower.includes('origin') || lower.includes('bean') || lower.includes('ethiopia') || lower.includes('colombia')) {
        matched = FAQ_KNOWLEDGE_BASE.find((f) => f.id === 'sourcing');
      } else if (lower.includes('brew') || lower.includes('grind') || lower.includes('ratio') || lower.includes('espresso')) {
        matched = FAQ_KNOWLEDGE_BASE.find((f) => f.id === 'brewing');
      } else if (lower.includes('ship') || lower.includes('delivery') || lower.includes('order')) {
        matched = FAQ_KNOWLEDGE_BASE.find((f) => f.id === 'shipping');
      } else if (lower.includes('join') || lower.includes('club') || lower.includes('drop') || lower.includes('reserve')) {
        matched = FAQ_KNOWLEDGE_BASE.find((f) => f.id === 'allocation');
      }

      if (matched) {
        responseText = matched.answer;
      } else {
        responseText = `At Caffè Bellini, our master roasters in Milan prioritize precision single-origin terroir (2,200m elevation), 205°C cast-iron drum roasting, and hand-selected lots. If you'd like more details on our coffee profiles, culinary pairings, or private releases, explore our curated topics below.`;
      }

      const botMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'concierge',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: FAQ_KNOWLEDGE_BASE.slice(0, 3),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <>
      {/* Floating Concierge Action Trigger */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpen}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-[#005a48]/95 hover:bg-[#004d3d] text-white border border-white/20 rounded-full shadow-2xl backdrop-blur-md cursor-pointer transition-colors group"
          aria-label="Open Caffè Bellini Concierge FAQ"
        >
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#E4A254] group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-left pr-1">
            <span className="font-serif text-sm font-semibold tracking-wide">Concierge FAQ</span>
            <span className="text-[10px] text-white/60 tracking-wider uppercase font-sans">Ask Bellini</span>
          </div>
        </motion.button>
      )}

      {/* Floating Chat Modal Panel */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 flex items-end sm:items-auto justify-center sm:justify-auto">
            {/* Backdrop on mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="sm:hidden fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full sm:w-[420px] max-h-[85vh] sm:max-h-[640px] h-[80vh] sm:h-[620px] bg-[#005542] border border-white/20 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white font-sans"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-white/10 bg-[#004737] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#E4A254]">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold tracking-wide text-white leading-tight">
                      Caffè Bellini Concierge
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Milanese Atelier Assistant · Online</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close concierge"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Topic Chips */}
              <div className="px-4 py-2.5 bg-black/15 border-b border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-xs">
                <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 shrink-0">
                  Topics:
                </span>
                {FAQ_KNOWLEDGE_BASE.slice(0, 5).map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => handleSelectFAQ(faq)}
                    className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-[11px] text-white/90 whitespace-nowrap transition-colors cursor-pointer shrink-0"
                  >
                    {faq.shortLabel}
                  </button>
                ))}
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 sm:p-4 leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-white text-[#00735C] font-medium shadow-md rounded-br-xs'
                          : 'bg-[#004737] text-white/95 border border-white/10 rounded-bl-xs shadow-sm'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>

                    <span className="text-[10px] font-mono text-white/40 mt-1 px-1">
                      {msg.timestamp}
                    </span>

                    {/* Suggested Questions below Bot responses */}
                    {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                      <div className="mt-2.5 space-y-1.5 w-full max-w-[90%]">
                        <span className="text-[10px] uppercase tracking-wider text-white/40 block font-mono pl-1">
                          Frequently Asked Questions:
                        </span>
                        {msg.suggestedQuestions.map((q) => (
                          <button
                            key={q.id}
                            onClick={() => handleSelectFAQ(q)}
                            className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] sm:text-xs text-white/90 transition-colors flex items-center justify-between gap-2 cursor-pointer group"
                          >
                            <span>{q.question}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#E4A254] shrink-0 opacity-70 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#004737] border border-white/10 max-w-[80px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Bar */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 sm:p-4 border-t border-white/10 bg-[#004737] flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about roasts, brewing, kitchen menu..."
                  className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white disabled:opacity-40 text-[#00735C] flex items-center justify-center shrink-0 hover:bg-white/90 transition-all cursor-pointer shadow-md disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
