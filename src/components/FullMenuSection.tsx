import React, { useState, useMemo } from 'react';
import { Search, Coffee, Sparkles, Utensils, Sandwich, Cookie, Flame, Check } from 'lucide-react';

export interface MenuItem {
  name: string;
  description: string;
  category: 'hot-coffee' | 'cold-drinks' | 'sandwiches' | 'snacks' | 'desserts';
  price: string;
  tag?: string;
}

export interface MenuCategory {
  id: 'hot-coffee' | 'cold-drinks' | 'sandwiches' | 'snacks' | 'desserts';
  name: string;
  icon: string;
  description: string;
  items: MenuItem[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'hot-coffee',
    name: 'Hot Coffee & Espresso',
    icon: '☕',
    description: 'The foundation of any cafe menu focuses on classic espresso extractions and warm milk pairings',
    items: [
      {
        name: 'Espresso',
        description: 'A concentrated shot of pure coffee; the foundation for most specialty drinks.',
        category: 'hot-coffee',
        price: '€3.20',
        tag: 'Bellini Classic',
      },
      {
        name: 'Americano',
        description: 'A rich espresso shot diluted with hot water for clean, lingering origin aromatics.',
        category: 'hot-coffee',
        price: '€4.00',
      },
      {
        name: 'Cappuccino',
        description: 'Equal parts espresso, steamed milk, and heavy milk foam with dusted cocoa.',
        category: 'hot-coffee',
        price: '€4.80',
        tag: 'Milanese Favorite',
      },
      {
        name: 'Café Latte',
        description: 'Espresso blended with plenty of steamed milk and a thin layer of micro-foam.',
        category: 'hot-coffee',
        price: '€5.20',
      },
      {
        name: 'Café Mocha',
        description: 'A sweet combination of espresso, steamed milk, and rich artisanal chocolate syrup.',
        category: 'hot-coffee',
        price: '€5.80',
      },
      {
        name: 'Flat White',
        description: 'A velvety espresso drink with steamed micro-foam, offering a stronger, punchier coffee flavor.',
        category: 'hot-coffee',
        price: '€5.00',
        tag: 'Barista Choice',
      },
    ],
  },
  {
    id: 'cold-drinks',
    name: 'Cold Coffees, Teas, & Shakes',
    icon: '🧋',
    description: 'Essential refreshing choices that drive high volume throughout the day',
    items: [
      {
        name: 'Classic Cold Coffee',
        description: 'Chilled milk blended with slow-roasted coffee, brown sugar, and artisan vanilla ice cream.',
        category: 'cold-drinks',
        price: '€6.20',
        tag: 'Best Seller',
      },
      {
        name: 'Cold Brew',
        description: 'Smooth, 18-hour slowly steeped single-origin iced coffee with naturally low acidity.',
        category: 'cold-drinks',
        price: '€5.50',
        tag: 'Single Origin',
      },
      {
        name: 'Iced Latte / Iced Mocha',
        description: 'Traditional handcrafted espresso drinks poured over crystal ice cubes and chilled whole milk.',
        category: 'cold-drinks',
        price: '€5.80',
      },
      {
        name: 'Matcha Latte',
        description: 'Whisked ceremonial first-harvest Uji green tea matcha powder served hot or iced with velvety milk.',
        category: 'cold-drinks',
        price: '€6.50',
        tag: 'Uji Kyoto',
      },
      {
        name: 'Masala Chai',
        description: 'Traditional spiced whole-leaf black tea brewed slow with whole milk, cardamom, ginger, and cinnamon.',
        category: 'cold-drinks',
        price: '€4.50',
      },
      {
        name: 'Thick Shakes',
        description: 'Rich, thick blended gourmet milkshakes in flavors like Oreo Crunch, Belgian Chocolate, and Peanut Butter.',
        category: 'cold-drinks',
        price: '€6.80',
        tag: 'Artisan Blend',
      },
    ],
  },
  {
    id: 'sandwiches',
    name: 'Sandwiches & Wraps',
    icon: '🥪',
    description: 'High-margin lunch and midday snacks that require minimal kitchen equipment',
    items: [
      {
        name: 'Classic Veg Sandwich',
        description: 'Sliced crisp market vegetables with house-made mint green chutney and herb mayonnaise spread.',
        category: 'sandwiches',
        price: '€6.50',
        tag: 'Vegetarian',
      },
      {
        name: 'Paneer Tikka Sandwich',
        description: 'Char-spiced, grilled cottage cheese paneer chunks loaded with pickled onions and crisp capsicum.',
        category: 'sandwiches',
        price: '€7.80',
        tag: 'Chef Special',
      },
      {
        name: 'Bombay Grilled Sandwich',
        description: 'A multilayered toasted vegetable sandwich packed with spiced potatoes, tangy chutneys, and melted cheese.',
        category: 'sandwiches',
        price: '€7.50',
        tag: 'Street Classic',
      },
      {
        name: 'Club Sandwich',
        description: 'A double-decker golden toasted sandwich filled with crisp greens, vine tomatoes, and choice proteins.',
        category: 'sandwiches',
        price: '€8.80',
      },
      {
        name: 'Pesto Chicken Wrap',
        description: 'Tender pulled chicken tossed in fragrant basil pine-nut pesto sauce wrapped in a warm tortilla.',
        category: 'sandwiches',
        price: '€9.20',
        tag: 'House Favorite',
      },
    ],
  },
  {
    id: 'snacks',
    name: 'Snacks & Quick Bites',
    icon: '🍟',
    description: 'Perfect side items designed to accompany beverage orders',
    items: [
      {
        name: 'Peri-Peri / Masala Fries',
        description: 'Crispy hand-cut potato fries tossed in aromatic spicy peri-peri and smoked masala seasoning blends.',
        category: 'snacks',
        price: '€4.80',
        tag: 'Spicy & Crispy',
      },
      {
        name: 'Loaded Nachos',
        description: 'Crispy stone-ground tortilla chips topped with warm aged cheese sauce, roasted tomato salsa, and jalapenos.',
        category: 'snacks',
        price: '€7.20',
        tag: 'To Share',
      },
      {
        name: 'Garlic Bread',
        description: 'Crispy toasted artisanal baguette slices generously brushed with roasted garlic butter and melted mozzarella.',
        category: 'snacks',
        price: '€5.50',
      },
      {
        name: 'Veg Spring Rolls',
        description: 'Golden, crackling wrappers filled with seasoned stir-fried wok vegetables, served with sweet chili dip.',
        category: 'snacks',
        price: '€6.00',
        tag: 'Golden Crisp',
      },
    ],
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: '🍰',
    description: 'Sweet additions to display in bakery cases to increase order sizes',
    items: [
      {
        name: 'Chocolate Brownie',
        description: 'Fudgy, rich Belgian chocolate squares served warm, optionally topped with vanilla bean gelato.',
        category: 'desserts',
        price: '€5.80',
        tag: 'Decadent',
      },
      {
        name: 'Cheesecake Jars',
        description: 'Individual layered dessert jars in decadent flavors like Lotus Biscoff speculoos or wild Maine Blueberry.',
        category: 'desserts',
        price: '€6.50',
        tag: 'Handcrafted',
      },
      {
        name: 'Butter Croissants',
        description: 'Classic, flaky multi-layered French laminated butter pastries baked fresh each morning; pairs perfectly with espresso.',
        category: 'desserts',
        price: '€3.80',
        tag: 'Baked Daily',
      },
      {
        name: 'Tiramisu',
        description: 'An elegant Italian classic layered with espresso-soaked Savoiardi ladyfingers and whipped mascarpone cream.',
        category: 'desserts',
        price: '€7.20',
        tag: 'Milanese Signature',
      },
    ],
  },
];

export const FullMenuSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderNotification, setOrderNotification] = useState<string | null>(null);

  // Filter items based on activeTab and searchQuery
  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return MENU_CATEGORIES.map((cat) => {
      // Category tab match
      if (activeTab !== 'all' && cat.id !== activeTab) {
        return null;
      }

      // Search match
      const matchingItems = cat.items.filter(
        (item) =>
          !q ||
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          (item.tag && item.tag.toLowerCase().includes(q))
      );

      if (matchingItems.length === 0) return null;

      return {
        ...cat,
        items: matchingItems,
      };
    }).filter(Boolean) as MenuCategory[];
  }, [activeTab, searchQuery]);

  const handleSelectItem = (item: MenuItem) => {
    setOrderNotification(`Added ${item.name} to inquiry bag`);
    setTimeout(() => {
      setOrderNotification(null);
    }, 2800);
  };

  return (
    <section id="menu" className="relative py-28 px-4 sm:px-6 md:px-12 bg-[#00604d] text-white">
      {/* Decorative background glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#E4A254] font-medium block mb-3 font-sans">
            La Carta Completa · Caffè & Gastronomia
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white/95 leading-[1.08] text-balance">
            The Complete Bellini Menu
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/70 max-w-xl mx-auto font-sans leading-relaxed text-balance">
            Handcrafted espresso extractions, refreshing iced brews, artisanal grilled toasts, golden appetizers, and decadent Milanese patisserie.
          </p>
        </div>

        {/* Filter Bar & Live Search */}
        <div className="max-w-4xl mx-auto mb-12 space-y-4">
          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coffee, matcha, sandwiches, tiramisu..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-black/20 border border-white/15 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                activeTab === 'all'
                  ? 'bg-white text-[#00735C] shadow-md font-semibold'
                  : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white'
              }`}
            >
              All Items
            </button>
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  activeTab === cat.id
                    ? 'bg-white text-[#00735C] shadow-md font-semibold'
                    : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name.split('&')[0].trim()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Temporary Order Toast Notification */}
        {orderNotification && (
          <div className="fixed bottom-24 right-6 z-50 p-4 rounded-2xl bg-white text-[#00735C] shadow-2xl border border-black/10 flex items-center gap-3 text-xs font-semibold animate-fade-in">
            <div className="w-6 h-6 rounded-full bg-[#00735C] text-white flex items-center justify-center">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span>{orderNotification}</span>
          </div>
        )}

        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10 max-w-xl mx-auto">
            <p className="text-white/60 text-sm">No menu items found matching &quot;{searchQuery}&quot;</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
              }}
              className="mt-4 px-5 py-2 bg-white/15 hover:bg-white/20 text-xs font-medium rounded-full text-white uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {filteredCategories.map((category) => (
              <div key={category.id} className="scroll-mt-24">
                {/* Category Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 mb-6 border-b border-white/15">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl">{category.icon}</span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {category.name}
                    </h3>
                  </div>
                  <span className="text-xs text-white/50 font-sans italic max-w-md sm:text-right">
                    {category.description}
                  </span>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="group p-5 sm:p-6 rounded-2xl bg-[#005241]/70 hover:bg-[#005241] border border-white/10 hover:border-white/20 transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-md"
                    >
                      <div>
                        {/* Title & Price Header */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h4 className="font-serif text-lg sm:text-xl font-bold text-white/95 group-hover:text-white transition-colors">
                            {item.name}
                          </h4>
                          <span className="font-serif text-base font-semibold text-[#E4A254] whitespace-nowrap shrink-0">
                            {item.price}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans font-normal">
                          {item.description}
                        </p>
                      </div>

                      {/* Tag & Action */}
                      <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-[11px]">
                        {item.tag ? (
                          <span className="font-mono text-[#E4A254] uppercase tracking-wider text-[10px]">
                            {item.tag}
                          </span>
                        ) : (
                          <span className="text-white/40 font-mono text-[10px]">Caffè Bellini</span>
                        )}

                        <button
                          onClick={() => handleSelectItem(item)}
                          className="text-white/70 hover:text-white hover:underline transition-all cursor-pointer font-medium tracking-wide uppercase text-[10px]"
                        >
                          Select +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Menu Notice */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 text-center sm:text-left">
          <p>
            All dairy drinks can be crafted with Oat, Almond, or Lactose-Free milk upon request (+€0.60).
          </p>
          <div className="flex items-center gap-6">
            <span>Specialty Grade Arabica</span>
            <span>·</span>
            <span>Made Fresh Daily</span>
            <span>·</span>
            <span>Milanese Standards</span>
          </div>
        </div>
      </div>
    </section>
  );
};
