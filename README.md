# Caffè Bellini — Milanese Roastery & Gastronomy

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-12.x-black?logo=framer&logoColor=white)](https://motion.dev/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

A luxury interactive scrollytelling web experience celebrating Milanese specialty espresso terroir and artisanal gastronomy. Built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and a custom **60 FPS HTML5 Canvas engine** capable of seamlessly scrubbing across 300 4K UHD image sequence frames.

---

## ✨ Features

### 1. Dual Scrollytelling Visual Odysseys (300 4K Frames)
- **☕ The Coffee Journey (`#scrollytelling`)**:
  - 150-frame sequence tracking the complete lifecycle of specialty single-origin coffee.
  - From raw ruby-red cherry harvest at 2,200m elevation, to cast-iron drum roasting (205°C First Crack), precision micrometric flat burr grinding, and pressure extraction into velvety latte art.
- **🍵 The Kitchen & Gastronomy (`#kitchen`)**:
  - 150-frame transition showcasing three signature culinary pairings:
    - **Stage 01**: Ceremonial first-harvest Uji Matcha whipped with bamboo chasen.
    - **Stage 02**: 72-hour naturally fermented sourdough pizza blistered in a 480°C wood-fired oven.
    - **Stage 03**: The signature Bellini double smashed Wagyu burger on toasted buttered brioche.

### 2. High-Performance 60 FPS HTML5 Canvas Engine
- **Inertial Lerp Interpolation**: A calibrated `requestAnimationFrame` lerp loop (`factor = 0.085`) providing buttery, cinematic momentum on both desktop mouse wheels and mobile touch scrubbing.
- **Mathematical Smoothstep Clamping**: Eliminates abrupt cuts using cubic `t² × (3 - 2t)` easing curves, ensuring stages smoothly crossfade with zero text overlapping.
- **Zero-Flicker Nearest-Frame Fallback**: Guarantees zero dropped frames even on fluctuating network speeds.
- **Responsive Contain Scaling**: Uses aspect-ratio math to center 16:9 4K frames on all viewports without cropping key elements on vertical mobile screens.

### 3. The Complete Café Menu (`#menu`)
An interactive, categorized digital menu with instant live search and responsive category tabs:
- ☕ **Hot Coffee & Espresso**: Espresso, Americano, Cappuccino, Café Latte, Café Mocha, Flat White.
- 🧋 **Cold Coffees, Teas, & Shakes**: Classic Cold Coffee, 18-hour Cold Brew, Iced Latte, Ceremonial Matcha Latte, Masala Chai, Thick Shakes (Oreo, Belgian Chocolate, Peanut Butter).
- 🥪 **Sandwiches & Wraps**: Classic Veg Sandwich, Paneer Tikka Sandwich, Bombay Grilled Sandwich, Club Sandwich, Pesto Chicken Wrap.
- 🍟 **Snacks & Quick Bites**: Peri-Peri / Masala Fries, Loaded Nachos, Garlic Baguette, Veg Spring Rolls.
- 🍰 **Desserts**: Warm Chocolate Brownie, Lotus Biscoff & Blueberry Cheesecake Jars, Butter Croissants, Traditional Milanese Tiramisu.

### 4. Interactive Concierge FAQ Chatbot
- Floating luxury widget powered by a curated Milanese roastery knowledge base.
- Provides instant answers to common questions about roasting temperatures, extraction ratios, farm elevations, sourdough fermentation, matcha grades, and international shipping.
- Interactive free-text input and one-click quick question suggestions.

### 5. Terroir, Stewardship & Allocation Club
- Highlights 2,200m single-estate lots from Yirgacheffe and Huila, micro-climate diurnal shifts, and direct producer equity (paying 3.2x over the C-market benchmark).
- **Private Release Allocation Form**: Allows coffee connoisseurs to register for priority release dispatches.

### 6. Milanese Editorial Aesthetic
- **Typography**: Paired display serif **Cormorant Garamond** (optical kerning, italic accents) with modern sans-serif **Plus Jakarta Sans**.
- **Color Palette**: Deep emerald `#00735C`, accented with roasted gold `#E4A254`, and crisp typography.
- **Full Mobile Responsiveness**: Touch-optimized drawer navigation, flexible font scaling, and touch targets $\ge 44\text{px}$.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Bundler & Tooling** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) |
| **Animation & Scroll** | [Motion](https://motion.dev/) (`motion/react`) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Fonts** | Cormorant Garamond & Plus Jakarta Sans via Google Fonts |

---

## 📁 Project Structure

```text
caffe-bellini/
├── public/
│   ├── sequence/               # 150 Coffee sequence frames (ezgif-frame-001..150.jpg)
│   └── food/                   # 150 Food sequence frames (Matcha -> Pizza -> Burger)
├── src/
│   ├── components/
│   │   ├── CoffeeCanvasRenderer.ts   # Canvas draw containment & procedural fallback math
│   │   ├── CoffeeScroll.tsx          # 600vh Coffee scrollytelling canvas & text stages
│   │   ├── CommunitySection.tsx      # Private Drop List & Milanese allocation form
│   │   ├── ConciergeChatbot.tsx      # Floating Concierge FAQ Chatbot & knowledge base
│   │   ├── FoodScroll.tsx            # 480vh Food scrollytelling canvas & stages
│   │   ├── Footer.tsx                # Clean brand footer & copyright
│   │   ├── FullMenuSection.tsx       # 5-category complete menu with live search & filters
│   │   ├── Navbar.tsx                # Aesthetic glassmorphism header & mobile drawer
│   │   ├── OriginStory.tsx           # Terroir, elevation, and direct trade equity
│   │   └── Preloader.tsx             # 300-frame concurrent preloader with progress bar
│   ├── App.tsx                       # Root application container & frame loader
│   ├── index.css                     # Tailwind CSS v4 directives & typography
│   ├── main.tsx                      # React root entry point
│   └── types.ts                      # Shared TypeScript definitions
├── index.html                        # HTML entry point with metadata & Google Fonts
├── metadata.json                     # AI Studio / App metadata
├── package.json                      # Project dependencies & npm scripts
├── tsconfig.json                     # TypeScript configuration
└── vite.config.ts                    # Vite configuration with Tailwind CSS v4 plugin
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/caffe-bellini.git
   cd caffe-bellini
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite dev server at `http://localhost:3000` |
| `npm run build` | Bundles the production application to `/dist` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs the TypeScript compiler check (`tsc --noEmit`) |

---

## 🧪 Architecture Highlights

### 1. 60 FPS Canvas Lerp Engine
Rather than relying on heavy DOM video playback or unoptimized GIF renders, the experience decodes 300 individual JPEG frames directly into memory:
```ts
// Smooth inertia lerp calculation
const diff = targetProgressRef.current - currentProgressRef.current;
if (Math.abs(diff) > 0.0001) {
  currentProgressRef.current += diff * 0.085;
} else {
  currentProgressRef.current = targetProgressRef.current;
}
```

### 2. Smoothstep Narrative Boundaries
To prevent DOM text collisions as scroll progress moves from 0% to 100%, each stage is mathematically isolated:
```ts
const smoothstep = (min: number, max: number, v: number) => {
  const t = Math.max(0, Math.min(1, (v - min) / (max - min)));
  return t * t * (3 - 2 * t);
};
```
Elements outside their designated scroll window are automatically unmounted with `display: none` and `visibility: hidden`.

---

## 📄 License

Distributed under the Apache 2.0 License. See `LICENSE` for more information.

---

Crafted with reverence in Milan & powered by modern web standards.
