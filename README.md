<div align="center">

  <!-- Replace this with your Caffè Bellini logo URL -->
  <img src="YOUR_CAFFE_BELLINI_LOGO_URL" alt="Caffè Bellini Logo" width="150" />

  <h1>Caffè Bellini — Milanese Roastery &amp; Gastronomy</h1>

  <p>
    A luxury, interactive scrollytelling experience celebrating specialty coffee,
    artisanal gastronomy, and Milanese café culture.
  </p>

  <p>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-8.x-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" /></a>
    <a href="https://motion.dev/"><img src="https://img.shields.io/badge/Motion-12.x-111111?style=flat-square&logo=framer&logoColor=white" alt="Motion" /></a>
    <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=flat-square" alt="Apache 2.0 License" /></a>
  </p>

  <!-- Replace with your deployed website URL when available -->
  <strong>Live Demo: <a href="YOUR_LIVE_DEMO_URL">Caffè Bellini</a></strong>

</div>

<!-- Replace this with a screenshot of your website -->
![Caffè Bellini Website Preview](YOUR_WEBSITE_SCREENSHOT_URL)

---

## 📖 Table of Contents

<details>
  <summary>Click to expand</summary>

- [☕ About the Project](#-about-the-project)
- [✨ Key Features](#-key-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [🏗️ Project Structure](#️-project-structure)
- [🧰 Getting Started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [Installation](#-installation)
  - [Run Locally](#-run-locally)
- [🎞️ Scrollytelling Architecture](#️-scrollytelling-architecture)
- [⚙️ Available Scripts](#️-available-scripts)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [💎 Acknowledgements](#-acknowledgements)

</details>

---

## ☕ About the Project

**Caffè Bellini** is a luxury café website concept inspired by Milanese espresso culture, specialty coffee, and artisanal gastronomy. It combines editorial typography, a deep emerald-and-gold visual identity, interactive menus, and cinematic scroll-driven storytelling to create an immersive digital café experience.

The website uses **React 19, TypeScript, Vite, and Tailwind CSS v4**. Its signature feature is a custom HTML5 Canvas experience that scrubs through image sequences as visitors scroll, following the journey from coffee cherry to espresso and exploring a selection of signature food pairings.

---

## ✨ Key Features

### 🎞️ 1. Dual Scrollytelling Experiences

**The Coffee Journey (`#scrollytelling`)**
- Uses a 150-frame image sequence to tell the story of specialty coffee.
- Follows the journey from ruby-red coffee cherry harvest through roasting and grinding to espresso extraction and latte art.
- Pairs scroll progress with staged narrative content for a cinematic presentation.

**The Kitchen & Gastronomy (`#kitchen`)**
- Uses a separate 150-frame image sequence.
- Showcases three signature pairings:
  - **Stage 01 — Uji Matcha:** Ceremonial matcha prepared with a bamboo chasen.
  - **Stage 02 — Sourdough Pizza:** Naturally fermented sourdough finished in a wood-fired oven.
  - **Stage 03 — Bellini Burger:** A double-smashed Wagyu burger served on toasted buttered brioche.

### ⚡ 2. Custom HTML5 Canvas Engine
- Uses `requestAnimationFrame` to smoothly interpolate scroll progress.
- Applies a lerp factor of `0.085` for a more cinematic, responsive feel.
- Uses smoothstep easing to transition between narrative stages.
- Includes nearest-frame fallback handling to reduce visual flicker while frames load.
- Scales 16:9 imagery to fit different viewport sizes while preserving the image composition.

### 🍽️ 3. Interactive Café Menu (`#menu`)
- Categorized menu with responsive category tabs.
- Live search for finding items quickly.
- Includes five menu categories:
  - Hot Coffee & Espresso
  - Cold Coffees, Teas & Shakes
  - Sandwiches & Wraps
  - Snacks & Quick Bites
  - Desserts

### 💬 4. Interactive Concierge FAQ Chatbot
- Floating chat widget with a curated café knowledge base.
- Answers common questions about coffee roasting, extraction, bean origins, sourdough fermentation, matcha, and shipping.
- Includes free-text input and quick-question suggestions.

### 🌱 5. Origin Story & Allocation Club
- Presents the story behind high-altitude coffee lots from Yirgacheffe and Huila.
- Highlights terroir, microclimates, and direct-trade principles.
- Includes a private-release allocation form for visitors interested in priority coffee releases.

### 🎨 6. Milanese Editorial Design
- **Typography:** Cormorant Garamond paired with Plus Jakarta Sans.
- **Palette:** Deep emerald (`#00735C`) with roasted gold (`#E4A254`).
- **Responsive UI:** Mobile-friendly navigation, flexible typography, and touch-friendly controls.
- **Motion:** Scroll-based transitions and subtle animated interactions.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | Component-based user interface |
| [TypeScript](https://www.typescriptlang.org/) | Type safety and shared types |
| [Vite](https://vitejs.dev/) | Development server and production bundling |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Motion](https://motion.dev/) | Animations and transitions |
| [Lucide React](https://lucide.dev/) | Interface icons |
| HTML5 Canvas | Rendering scroll-controlled image sequences |
| Google Fonts | Cormorant Garamond and Plus Jakarta Sans |

---

## 🏗️ Project Structure

```text
caffe-bellini/
├── public/
│   ├── sequence/                  # 150 coffee journey frames
│   └── food/                      # 150 gastronomy sequence frames
├── src/
│   ├── components/
│   │   ├── CoffeeCanvasRenderer.ts
│   │   ├── CoffeeScroll.tsx
│   │   ├── CommunitySection.tsx
│   │   ├── ConciergeChatbot.tsx
│   │   ├── FoodScroll.tsx
│   │   ├── Footer.tsx
│   │   ├── FullMenuSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── OriginStory.tsx
│   │   └── Preloader.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

*The tree above reflects the project structure described for this repository. Individual filenames may vary if your local project has changed.*

---

## 🧰 Getting Started

Follow these steps to run the project locally.

### 📋 Prerequisites

Install the following before getting started:

- **Node.js:** v18 or higher (a current LTS release is recommended).
- **npm:** v9 or higher.
- **Git:** Required only if you plan to clone the repository.

### ⚙️ Installation

1. **Clone the repository**

   Replace the URL below with your repository URL if it differs.

   ```bash
   git clone https://github.com/YOUR_USERNAME/caffe-bellini.git
   cd caffe-bellini
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open the local URL**

   Vite will print the development URL in your terminal. Open that URL in your browser. If your Vite configuration uses port `3000`, visit `http://localhost:3000`.

---

## 🎞️ Scrollytelling Architecture

The scrollytelling experience maps the visitor's scroll progress to a frame in an image sequence. A Canvas renderer draws the selected frame, while interpolation smooths the transition between the current and target progress.

### Smooth interpolation

```ts
const diff = targetProgressRef.current - currentProgressRef.current;

if (Math.abs(diff) > 0.0001) {
  currentProgressRef.current += diff * 0.085;
} else {
  currentProgressRef.current = targetProgressRef.current;
}
```

### Smoothstep easing

```ts
const smoothstep = (min: number, max: number, value: number) => {
  const t = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return t * t * (3 - 2 * t);
};
```

These techniques help the image sequence and narrative stages feel continuous as users scroll. Actual frame rate and loading performance depend on the device, browser, image sizes, and network conditions.

---

## ⚙️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Builds the production app into `dist/` |
| `npm run preview` | Serves the production build locally for testing |
| `npm run lint` | Runs the configured TypeScript check (`tsc --noEmit`), as described in the project setup |

> Make sure the scripts in `package.json` match this table. If the project uses a different lint command, update the entry accordingly.

---

## 🚀 Deployment

Caffè Bellini can be deployed to a static hosting platform that supports Vite builds, such as **Vercel**, **Netlify**, or **Firebase Hosting**.

### Build for production

```bash
npm run build
```

The generated production files will be available in the `dist/` directory.

### Deploy with Vercel or Netlify

1. Push the project to GitHub.
2. Import the repository into your hosting provider.
3. Set the build command to `npm run build`.
4. Set the output directory to `dist`.
5. Deploy the site.

Check that the image sequences in `public/sequence/` and `public/food/` are included in the deployed build and that their filenames match the paths used by the application.

---

## 🤝 Contributing

Suggestions, bug reports, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

4. Push your branch:

   ```bash
   git push origin feature/your-feature
   ```

5. Open a pull request describing your changes.

---

## 📄 License

This project is described as being distributed under the **Apache License 2.0**. See the `LICENSE` file for the full license text.

---

## 💎 Acknowledgements

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Motion](https://motion.dev/)
- [Lucide](https://lucide.dev/)
- [Google Fonts](https://fonts.google.com/)
- [Shields.io](https://shields.io/)

---

<div align="center">
  <strong>Crafted with reverence in Milan &amp; powered by modern web standards. ☕</strong>
</div>
