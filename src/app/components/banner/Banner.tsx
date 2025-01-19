"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { BannerData } from "./BannerData";
import Link from "next/link";

// The heading we want to animate letter by letter
const headingText = "Allora Ristorante";

// Split text into an array of letters
const letters = headingText.split("");

// Container variants for stagger effect
const containerVariants = {
  hidden: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      // Each letter will appear one after the other
      staggerChildren: 0.08, // adjust to speed up/slow down
    },
  },
};

// Child variants for each letter
const letterVariants = {
  hidden: { opacity: 0, y: "100%" },
  show: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.1,
      ease: "easeOut",
    },
  },
};

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
    <div className="relative w-screen mx-auto h-[40vh] md:h-[85vh] overflow-hidden flex items-center justify-center">
      {/* Previous Arrow */}
      <div
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 md:left-8 z-20 cursor-pointer text-3xl text-white/80 hover:text-white transition-colors duration-300"
        aria-label="Previous Slide"
      >
        <IoIosArrowBack size={35} />
      </div>

      {/* Next Arrow */}
      <div
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 md:right-8 z-20 cursor-pointer text-3xl text-white/80 hover:text-white transition-colors duration-300"
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

      <div className="absolute inset-0 bg-black/50" />
      <div className="flex flex-col items-center justify-center z-10">
        {/* The animated heading container */}
        <motion.div
            className="relative text-4xl md:text-7xl lg:text-9xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-lightText to-lightBg flex"
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            {letters.map((letter, index) => (
            <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
            >
                {letter === " " ? "\u00A0" : letter}
            </motion.span>
            ))}
        </motion.div>
        <h2 className="text-2xl md:text-5xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-lightText to-lightBg flex">Cucina siriana - libanese</h2>
        <div className="flex space-x-4 mt-4">
          <button className="px-3 md:px-6 py-1 md:py-2 rounded-lg md:bg-white/60 hover:bg-white/80 transition-colors duration-300 text-white/80 md:text-darkText">
            <Link href="#about-us" className="transition-colors duration-300">
              Scopri di più
            </Link>
          </button>
          <button className="px-3 md:px-6 py-1 md:py-2 rounded-lg md:bg-white/60 hover:bg-white/80 transition-colors duration-300 text-white/80 md:text-darkText">
            <Link href="#about-us" className="transition-colors duration-300">
              Scopri di più
            </Link>
          </button>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-44 bg-gradient-to-t from-black/50 to-transparent z-10" />
    </div>
  );
};

export default Banner;
