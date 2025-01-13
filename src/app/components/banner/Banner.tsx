"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { BannerData } from "./BannerData";

const Banner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = BannerData.length;
  const autoScroll = true;
  const intervalTime = 5000;
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  // Wrap nextSlide in useCallback, so it is stable across renders.
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slideLength - 1 ? 0 : prev + 1));
  }, [slideLength]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slideLength - 1 : prev - 1));
  }, [slideLength]);

  // Also wrap "auto" in useCallback, so we can include it in effect deps.
  const auto = useCallback(() => {
    slideInterval.current = setInterval(nextSlide, intervalTime);
  }, [nextSlide, intervalTime]);

  useEffect(() => {
    setCurrentSlide(0); // set initial slide to 0 on mount
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto(); // start auto-scroll
    }
    // Cleanup on unmount or re-run
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
    // Now we include `auto` and `autoScroll` in the dependency array
  }, [auto, autoScroll]);

  return (
    <div className="relative max-w-[1400px] mx-auto h-[75vh] overflow-hidden flex items-center justify-center">
      {/* Previous Arrow */}
      <div
        onClick={prevSlide}
        className="absolute left-4 md:left-8 z-20 cursor-pointer text-3xl text-white/80 hover:text-white transition-colors duration-300"
        aria-label="Previous Slide"
      >
        <IoIosArrowBack size={35} />
      </div>

      {/* Next Arrow */}
      <div
        onClick={nextSlide}
        className="absolute right-4 md:right-8 z-20 cursor-pointer text-3xl text-white/80 hover:text-white transition-colors duration-300"
        aria-label="Next Slide"
      >
        <IoIosArrowForward size={35} />
      </div>

      {/* Slides */}
      <AnimatePresence mode="wait">
        {BannerData.map((slide, index) =>
          index === currentSlide ? (
            <motion.div
              key={index}
              className="absolute top-0 left-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={slide.image}
                alt={`slide-${index}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Bottom Gradient Overlay */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-44 bg-gradient-to-t from-black/50 to-transparent z-10" />
    </div>
  );
};

export default Banner;
