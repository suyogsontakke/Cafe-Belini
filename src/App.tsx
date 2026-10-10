/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Preloader } from './components/Preloader.tsx';
import { CoffeeScroll } from './components/CoffeeScroll.tsx';
import { FoodScroll } from './components/FoodScroll.tsx';
import { FullMenuSection } from './components/FullMenuSection.tsx';
import { OriginStory } from './components/OriginStory.tsx';
import { CommunitySection } from './components/CommunitySection.tsx';
import { Footer } from './components/Footer.tsx';
import { ConciergeChatbot } from './components/ConciergeChatbot.tsx';

export default function App() {
  // Preloader state
  const [preloadProgress, setPreloadProgress] = useState(15);
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const [isPreloaderFinished, setIsPreloaderFinished] = useState(false);

  // Concierge Chatbot state
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  // Coffee frame sequence state (150 frames)
  const [customFrames, setCustomFrames] = useState<HTMLImageElement[]>([]);
  const [isCustomLoaded, setIsCustomLoaded] = useState(false);

  // Food frame sequence state (Matcha -> Pizza -> Burger, 150 frames)
  const [foodFrames, setFoodFrames] = useState<HTMLImageElement[]>([]);
  const [isFoodLoaded, setIsFoodLoaded] = useState(false);

  // Preload initialization: automatically load both coffee (150 frames) and food (150 frames) sequences
  useEffect(() => {
    let cancelled = false;
    const totalCoffeeFrames = 150;
    const totalFoodFrames = 150;
    const totalAllFrames = totalCoffeeFrames + totalFoodFrames;

    const loadedCoffeeImages: HTMLImageElement[] = new Array(totalCoffeeFrames);
    const loadedFoodImages: HTMLImageElement[] = new Array(totalFoodFrames);

    let coffeeLoadedCount = 0;
    let foodLoadedCount = 0;

    const updateCombinedProgress = () => {
      if (cancelled) return;
      const totalLoaded = coffeeLoadedCount + foodLoadedCount;
      const pct = Math.round((totalLoaded / totalAllFrames) * 100);
      setPreloadProgress(Math.min(100, Math.max(10, pct)));

      // If at least 90% of coffee frames are ready, activate coffee
      if (coffeeLoadedCount >= Math.floor(totalCoffeeFrames * 0.9) && !cancelled) {
        setCustomFrames(loadedCoffeeImages.filter(Boolean));
        setIsCustomLoaded(true);
      }

      // If at least 90% of food frames are ready, activate food
      if (foodLoadedCount >= Math.floor(totalFoodFrames * 0.9) && !cancelled) {
        setFoodFrames(loadedFoodImages.filter(Boolean));
        setIsFoodLoaded(true);
      }

      // Complete preloader once majority of both sets are ready
      if (totalLoaded >= Math.floor(totalAllFrames * 0.85)) {
        setIsPreloaderComplete(true);
      }
    };

    // 1. Parallel preload for 150 Coffee Frames
    for (let i = 1; i <= totalCoffeeFrames; i++) {
      const idx = i - 1;
      const numStr = String(i).padStart(3, '0');
      const img = new Image();

      img.onload = () => {
        loadedCoffeeImages[idx] = img;
        coffeeLoadedCount++;
        updateCombinedProgress();
      };

      img.onerror = () => {
        // Fallback to /src/sequence/
        const fb = new Image();
        fb.onload = () => {
          loadedCoffeeImages[idx] = fb;
          coffeeLoadedCount++;
          updateCombinedProgress();
        };
        fb.onerror = () => {
          coffeeLoadedCount++;
          updateCombinedProgress();
        };
        fb.src = `/src/sequence/ezgif-frame-${numStr}.jpg`;
      };

      img.src = `/sequence/ezgif-frame-${numStr}.jpg`;
    }

    // 2. Parallel preload for 150 Food Frames (Matcha -> Pizza -> Burger)
    for (let j = 1; j <= totalFoodFrames; j++) {
      const idx = j - 1;
      const numStr = String(j).padStart(3, '0');
      const fImg = new Image();

      fImg.onload = () => {
        loadedFoodImages[idx] = fImg;
        foodLoadedCount++;
        updateCombinedProgress();
      };

      fImg.onerror = () => {
        // Fallback to /src/components/food/
        const fbFood = new Image();
        fbFood.onload = () => {
          loadedFoodImages[idx] = fbFood;
          foodLoadedCount++;
          updateCombinedProgress();
        };
        fbFood.onerror = () => {
          foodLoadedCount++;
          updateCombinedProgress();
        };
        fbFood.src = `/src/components/food/ezgif-frame-${numStr}.jpg`;
      };

      fImg.src = `/food/ezgif-frame-${numStr}.jpg`;
    }

    // Safety timeout: ensure site never hangs if network slows down
    const safetyTimer = setTimeout(() => {
      if (!cancelled) {
        const validCoffee = loadedCoffeeImages.filter(Boolean);
        if (validCoffee.length > 0) {
          setCustomFrames(validCoffee);
          setIsCustomLoaded(true);
        }
        const validFood = loadedFoodImages.filter(Boolean);
        if (validFood.length > 0) {
          setFoodFrames(validFood);
          setIsFoodLoaded(true);
        }
        setPreloadProgress(100);
        setIsPreloaderComplete(true);
      }
    }, 4000);

    return () => {
      cancelled = true;
      clearTimeout(safetyTimer);
    };
  }, []);

  const scrollToKitchen = () => {
    const el = document.getElementById('kitchen');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCoffee = () => {
    const el = document.getElementById('scrollytelling');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToStory = () => {
    const el = document.getElementById('origin');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#00735C] text-white font-sans antialiased selection:bg-white/20 selection:text-white">
      {/* Preloader */}
      {!isPreloaderFinished && (
        <Preloader
          progress={preloadProgress}
          isComplete={isPreloaderComplete}
          onFinished={() => setIsPreloaderFinished(true)}
        />
      )}

      {/* Top Bar Navigation */}
      <Navbar
        onOpenConcierge={() => setIsConciergeOpen(true)}
      />

      <main>
        {/* 1. Core Coffee Scrollytelling Experience */}
        <CoffeeScroll
          customFrames={customFrames}
          isCustomLoaded={isCustomLoaded}
          onExploreStory={scrollToKitchen}
        />

        {/* 2. Kitchen & Food Pairings Scrollytelling (Matcha -> Pizza -> Burger) */}
        <FoodScroll
          foodFrames={foodFrames}
          isFoodLoaded={isFoodLoaded}
          onExploreMenu={scrollToMenu}
          onScrollToCoffee={scrollToCoffee}
        />

        {/* 3. The Full Bellini Menu (Hot Coffee, Cold Drinks, Sandwiches, Snacks, Desserts) */}
        <FullMenuSection />

        {/* 4. Terroir & Origin Story */}
        <OriginStory />

        {/* 5. Community & Drop Club */}
        <CommunitySection />
      </main>

      {/* Luxury Minimalist Footer */}
      <Footer />

      {/* Interactive Concierge & Help FAQ Chatbot */}
      <ConciergeChatbot
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        onOpen={() => setIsConciergeOpen(true)}
      />
    </div>
  );
}

