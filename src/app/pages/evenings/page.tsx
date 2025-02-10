"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import bgImage from "../../../../public/assets/images/allora-floor.jpg";
import bgImage2 from "../../../../public/assets/images/allora-live-music.jpg";

const headingText = "Serate di musica cibo e libri";
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

export default function Evenings() {
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
            className="relative w-full h-full cursor-zoom-in flex items-center justify-center"
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
                La tradizione mediorientale vede da sempre il momento del pasto come una gioia e un&apos;occasione per incontrarsi.
              </h3>
              <p>
                Ti offriamo serate dove oltre al buon cibo preparato dei nostri chef, si alternano anche incontri culturali, con proposte culinarie speciali per celebrare occasioni o per consentire ai veri appassionati di esplorare gusti che non potrebbero trovare da nessun&apos;altra parte. Organizziamo serate di lettura con presentazione di libri, poesie e piccoli spettacoli tradizionali e non, dibattiti e cultura. Quello che vogliamo è semplicemente permettere a chi ama vivere in un mondo aperto e senza limiti di poterlo fare e di riscoprire tutta l&apos;importanza dello scambio. Ci piace vivere nella tradizione del Mar Mediterraneo, unendo due terre apparentemente lontane come la Liguria e il Medio Oriente, che da sempre comunicano tra loro attraverso le proprie flotte commerciali e che finalmente possono convivere in pace, imparando l&apos;una dall&apos;altra.
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
