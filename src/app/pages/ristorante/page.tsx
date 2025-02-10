"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import bgImage from "../../../../public/assets/images/allora-floor.jpg";
import bgImage2 from "../../../../public/assets/images/restorante.jpg";

const headingText = "Ristorante";
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

export default function Ristorante() {
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
            text-4xl
            md:text-7xl
            lg:text-9xl
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
            <div className="space-y-4 bg-white/80 p-4 rounded-lg text-justify shadow-[0px_0px_10px_#967d48]">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-darkText to-lightText">
                Tradizioni Mediterranee
              </h3>
              <p>
                La cucina del Medio Oriente e in particolare quella siriana e
                libanese sono la base e il punto di partenza per tantissime
                tradizioni mediterranee, perché è dai porti di questi posti che
                per secoli sono transitate le spezie che hanno caratterizzato il
                gusto di tante terre ed è per questo motivo che per quanto
                esotica, risulta essere familiare e godibile, con sapori che
                sono vicini a quelli che conosci già, ma con qualcosa in più.
              </p>
              <p>
                I nostri chef ti offrono un viaggio culinario nella culla della
                cultura mediterranea, con uno scambio di suggestioni, in
                un&apos;atmosfera rilassante di un locale in stile tradizionale
                siriano, con un grande spazio aperto fatto proprio per chi a
                tavola vuole sempre conoscere qualcosa di nuovo e godere di
                sapori unici. Ti proponiamo un misto di cucine mediorientali,
                siriana e libanese, con ricette che sanno rappresentare queste
                terre, preparate secondo la tradizione dei nostri chef esperti.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-4 bg-white/80 p-4 rounded-lg text-justify shadow-[0px_0px_10px_#967d48]">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-darkText to-lightText">
                Condivisione e Armomia
              </h3>
              <p>
                Ti condurremo in un viaggio sensoriale fatto di spezie, gusti
                aciduli e dolci, carni preparate in maniera unica e tante idee
                da provare. La nostra tradizione è fatta di condivisione. Te ne
                accorgerai immediatamente quando vedrai come sono distribuiti i
                posti a sedere, con un grande spazio aperto per poter parlare e
                vivere in armonia tutti insieme.
              </p>
              <p>
                Questo clima di scambio e convivialità è ciò che rende l&apos;esperienza
                veramente unica: noi non serviamo soltanto piatti, ma un contesto
                in cui le persone possano rilassarsi e scoprire qualcosa di nuovo,
                dal cibo alla cultura. Che tu voglia assaggiare piatti di pollo,
                agnello, verdure, cereali o esplorare sapori antichi, troverai
                sempre una fusione di ingredienti che raccontano storie di terre
                lontane. Benvenuto in un posto speciale, dove ogni boccone è
                un passo in un viaggio.
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
