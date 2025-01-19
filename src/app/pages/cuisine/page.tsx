"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import bgImage from "../../../../public/assets/images/allora-floor.jpg";
import bgImage2 from "../../../../public/assets/images/Cucina.jpg";

const headingText = "Cucina siriana e libanese";
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

// Fade-up animation for the second section
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Cuisine() {
  // State for zoom modal
  const [zoomed, setZoomed] = useState(false);

  const handleOpenZoom = () => setZoomed(true);
  const handleCloseZoom = () => setZoomed(false);

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
            text-3xl
            md:text-7xl
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

      {/* CONTENT SECTION */}
      <div
        className="
          w-full
          bg-gradient-to-tr
          from-lightBg
          via-hoverBg
          to-lightBg
          px-4
          py-8
        "
      >
        {/* Animated container for the second section */}
        <motion.div
          className="
            w-full
            mx-auto
            h-auto
            overflow-hidden
            grid
            grid-cols-1
            md:grid-cols-2
            gap-8
          "
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {/* LEFT COLUMN - Image with Zoom */}
          <motion.div
            className="relative w-full h-full cursor-zoom-in flex items-center md:justify-center"
            variants={fadeUpVariants}
          >
            <Image
              src={bgImage2}
              alt="appetizers"
              className="object-cover w-full h-full rounded-lg shadow-md"
              priority={false}
              onClick={handleOpenZoom}
            />
          </motion.div>

          {/* RIGHT COLUMN - Split text into two smaller sections */}
          <motion.div
            className="flex flex-col justify-center gap-6 text-xl md:text-2xl lg:text-3xl leading-relaxed"
            variants={fadeUpVariants}
          >
            {/* Section 1 */}
            <div className="space-y-4 bg-white/80 p-4 rounded-lg md:text-justify shadow-[0px_0px_10px_#967d48]">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-darkText to-lightText">
                Tradizione Siriana e Libanese
              </h3>
              <p>
                Quando si parla genericamente di cucina mediorientale, in realtà ci si riferisce proprio alla tradizione siriana e libanese, perché per la vocazione di questi popoli i sapori e gli accostamenti delle loro ricette hanno saputo viaggiare attraverso tutta l&apos;area del Mediterraneo e oltre, contaminando il gusto di tutte le terre che si affacciano su questo mare e prendendo sempre qualche cosa qua e là.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-4 bg-white/80 p-4 rounded-lg text-justify shadow-[0px_0px_10px_#967d48]">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-darkText to-lightText">
                Sapori e Scambio Culturale
              </h3>
              <p>
                Si tratta di una cucina fatta di ingredienti semplici, come carne di agnello e di pollo, ceci, verdure e cereali, sapori aciduli e spezie dolci che messe insieme creano un&apos;atmosfera unica e deliziano il palato. I nostri chef hanno fatto una selezione delle migliori tradizioni di queste terre e ve le propongono ogni giorno, per condurvi attraverso un percorso culinario e alimentare fatto di cultura e di scambio. Sono gusti che ti porteranno lontano, ma che fanno anche parte della tua tradizione, perché sin dai tempi antichi le nostre genti hanno saputo incontrare gli altri mercanti del mare e creare una cultura unica.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ZOOM MODAL OVERLAY */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 cursor-zoom-out"
          onClick={handleCloseZoom}
        >
          <div className="relative max-w-4xl w-full h-auto">
            <Image
              src={bgImage2}
              alt="Zoomed Image"
              className="object-contain w-full max-h-[90vh]"
              priority={false}
            />
          </div>
        </div>
      )}
    </>
  );
}
