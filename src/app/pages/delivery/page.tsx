"use client";

import { motion } from "framer-motion";
import bgImage from "../../../../public/assets/images/allora-floor.jpg";

const headingText = "Consegna a domicilio in arrivo";
const letters = headingText.split("");

// Container variants for stagger effect (hero heading)
const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// Child variants for each letter (hero heading)
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

export default function Evenings() {
  return (
    <>
      {/* HERO SECTION */}
      <div
        className="
          relative
          w-full
          mx-auto
          h-[40vh]
          md:h-[85vh]
          overflow-hidden
          flex
          items-center
          justify-center
          bg-no-repeat
          bg-cover
          bg-center
          md:bg-fixed
        "
        style={{
          backgroundImage: `url(${bgImage.src})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <motion.div
          className="
            relative
            text-2xl
            md:text-6xl
            lg:text-8xl
            font-extrabold
            bg-clip-text
            text-transparent
            bg-gradient-to-r
            from-lightText
            to-lightBg
            flex
          "
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
      </div>
    </>
  );
}
