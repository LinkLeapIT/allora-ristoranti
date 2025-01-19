"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import BackgroundImage2 from "../backgroundImage";

import allora_bbq from "../../../public/assets/images/allora-bbq.jpg";
import aalora_appetizers from "../../../public/assets/images/allora-appetizers.jpg";
import allora_delivery from "../../../public/assets/images/allora-delivery.jpg";
import allora_live_music from "../../../public/assets/images/allora-live-music.jpg";


// ANIMATION VARIANTS
const containerVariants = {
  hidden: {}, // No initial animations needed for the container
  show: {
    transition: {
      // Stagger each child card by 0.2s
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function WhatWeOffer() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Image */}
      <BackgroundImage2 />

      <div className="flex flex-col items-center justify-center w-full lg:h-screen bg-white bg-opacity-50">
        <h1
            className="mt-4 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-darkText to-lightText md:text-5xl"
        >
            Cosa Offriamo
        </h1>

        {/* MOTION WRAPPER for scrolling animation */}
        <motion.div
          className="grid w-full max-w-contentContainer grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4"
          // Framer Motion props:
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* CARD 1 */}
          <motion.div
            variants={itemVariants}
            className="relative p-4 bg-white rounded-lg bg-opacity-80"
          >
            <Image
              src={allora_bbq}
              alt="allora BBQ"
              width={600}
              height={600}
              // If you want to lazy-load (though Next.js does this automatically)
              // loading="lazy"
              className="w-full h-auto"
            />
            <h2 className="flex flex-col items-center justify-center min-h-[70px] text-2xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-darkText to-lightText md:text-3xl">
              Ristorante
            </h2>
            <p className="p-1 text-xl text-center md:text-2xl">
              La cucina del Medio Oriente e in particolare quella siriana e
              libanese sono la base e il punto di partenza per tantissime ...
            </p>
            <Link
              href="/pages/ristorante"
              className="absolute p-2 text-lightText hover:text-hoverBg bottom-0 right-0"
            >
              Scopri di più
            </Link>
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            variants={itemVariants}
            className="relative p-4 bg-white rounded-lg bg-opacity-80"
          >
            <Image
              src={aalora_appetizers}
              alt="allora appetizers"
              width={600}
              height={600}
              className="w-full h-auto"
            />
            <h2 className="flex flex-col items-center justify-center min-h-[70px] text-2xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-darkText to-lightText md:text-3xl">
              Cucina siriana e libanese
            </h2>
            <p className="p-1 text-xl text-center md:text-2xl">
              Quando si parla genericamente di cucina mediorientale, in realtà ci
              si riferisce proprio alla tradizione siriana e libanese...
            </p>
            <Link
              href="/pages/cuisine"
              className="absolute p-2 text-lightText hover:text-hoverBg bottom-0 right-0"
            >
              Scopri di più
            </Link>
          </motion.div>

          {/* CARD 3 */}
          <motion.div
            variants={itemVariants}
            className="relative p-4 bg-white rounded-lg bg-opacity-80"
          >
            <Image
              src={allora_delivery}
              alt="allora delivery"
              width={600}
              height={600}
              className="w-full h-auto"
            />
            <h2 className="flex flex-col items-center justify-center min-h-[70px] text-2xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-darkText to-lightText md:text-3xl">
              Consegne a domicilio
            </h2>
            <p className="p-1 text-xl text-center md:text-2xl">
              Per chi vuol gustare la cucina siriana e libanese comodamente a
              casa propria, senza doversi preoccupare di prenotare un posto...
            </p>
            <Link
              href="/pages/delivery"
              className="absolute p-2 text-lightText hover:text-hoverBg bottom-0 right-0"
            >
              Scopri di più
            </Link>
          </motion.div>

          {/* CARD 4 */}
          <motion.div
            variants={itemVariants}
            className="relative p-4 bg-white rounded-lg bg-opacity-80"
          >
            <Image
              src={allora_live_music}
              alt="allora live music"
              width={600}
              height={600}
              className="w-full h-auto"
            />
            <h2 className="flex flex-col items-center justify-center min-h-[70px] text-2xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-darkText to-lightText md:text-3xl">
              Serate di musica cibo e libri
            </h2>
            <p className="p-1 text-xl text-center md:text-2xl">
              La tradizione mediorientale vede da sempre il momento del pasto
              come una gioia e un&#39;occasione per incontrarsi. Ti offriamo
              serate...
            </p>
            <Link
              href="/pages/evenings"
              className="absolute p-2 text-lightText hover:text-hoverBg bottom-0 right-0"
            >
              Scopri di più
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
