"use client";

import React from "react";
import { motion } from "framer-motion";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
import alloraLogo from "@/../public/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import Container from "../navbar/Container";

// Basic fade-up variants
const fadeVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Footer() {

  const whatsappLink = "https://wa.me/393497068208?text=Salve%20Allora!";

  return (
    <motion.div
      className=" bg-darkBg"
      // Animate the entire footer as it comes into view
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        show: {
          transition: {
            // Stagger children for a nice cascading effect
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <Container className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Logo + Contact */}
        <motion.div
          variants={fadeVariants}
          className="flex flex-col items-center gap-y-4"
        >
          <Image
            className="w-44 h-auto"
            src={alloraLogo}
            alt="Allora Ristorante Logo"
            width={176}
            height={80}
            priority={false}
          />
          {/* Make the phone number clickable for WhatsApp */}
          <p className="text-lg md:text-xl">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              alloraristorante2021@gmail.com
            </a>
          </p>

          <p className="text-lg md:text-xl">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              +39 349 706 8208
            </a>
          </p>

          <div className="flex items-center gap-x-4">
            {/* Facebook */}
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsFacebook className="text-2xl text-lightText transition-transform duration-300 hover:scale-110 hover:text-hoverBg md:text-3xl" />
            </a>

            {/* Instagram */}
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsInstagram className="text-2xl text-lightText transition-transform duration-300 hover:scale-110 hover:text-hoverBg md:text-3xl" />
            </a>

            {/* WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsWhatsapp className="text-2xl text-lightText transition-transform duration-300 hover:scale-110 hover:text-hoverBg md:text-3xl" />
            </a>
          </div>
        </motion.div>

        {/* Address */}
        <motion.div
          variants={fadeVariants}
          className="flex flex-col items-center justify-between gap-y-4"
        >
          <h2 className="bg-gradient-to-r from-darkText to-lightText bg-clip-text text-2xl font-extrabold text-transparent md:text-4xl">
            Indirizzo
          </h2>
          <ul className="mt-2 flex flex-col gap-y-2 text-sm font-light">
            <li className="flex flex-row items-center justify-center gap-4 text-lg md:text-xl">
              Allora Ristorante
            </li>
            <li className="flex flex-row items-center justify-center gap-4 text-lg md:text-xl">
              Salita di Santa Maria
            </li>
            <li className="flex flex-row items-center justify-center gap-4 text-lg md:text-xl">
              di Castello, 32r, 16123 Genova
            </li>
            <li className="flex flex-row items-center justify-center gap-4 text-lg md:text-xl">
              GE, Italia
            </li>
          </ul>
        </motion.div>

        {/* Hours */}
        <motion.div
          variants={fadeVariants}
          className="flex flex-col items-center justify-between gap-y-4"
        >
          <h2 className="bg-gradient-to-r from-darkText to-lightText bg-clip-text text-2xl font-extrabold text-transparent md:text-4xl">
            Orari
          </h2>
          <ul className="mt-2 flex flex-col gap-y-2 text-sm font-light">
            <li className="flex flex-row items-center justify-between gap-4 text-lg md:text-xl">
              <span>Martedì:</span>
              <span className="text-lightText">19:30 - 22:30</span>
            </li>
            <li className="flex flex-row items-center justify-between gap-4 text-lg md:text-xl">
              <span>Mercoledì:</span>
              <span className="text-lightText">19:30 - 22:30</span>
            </li>
            <li className="flex flex-row items-center justify-between gap-4 text-lg md:text-xl">
              <span>Giovedì:</span>
              <span className="text-lightText">19:30 - 22:30</span>
            </li>
            <li className="flex flex-row items-center justify-between gap-4 text-lg md:text-xl">
              <span>Venerdì:</span>
              <span className="text-lightText">19:30 - 22:30</span>
            </li>
            <li className="flex flex-row items-center justify-between gap-4 text-lg md:text-xl">
              <span>Sabato:</span>
              <span className="text-lightText">19:30 - 22:30</span>
            </li>
            <li className="flex flex-row items-center justify-between gap-4 text-lg md:text-xl">
              <span>Domenica:</span>
              <span className="text-lightText">19:30 - 22:30</span>
            </li>
            <li className="flex flex-row items-center justify-between gap-4 text-lg md:text-xl">
              <span>Lunedì:</span>
              <span className="text-lightText">Chiuso</span>
            </li>
          </ul>
        </motion.div>

        {/* Links */}
        <motion.div
          variants={fadeVariants}
          className="flex flex-col items-center justify-between gap-y-4"
        >
          <h2 className="bg-gradient-to-r from-darkText to-lightText bg-clip-text text-2xl font-extrabold text-transparent md:text-4xl">
            Links
          </h2>
          <ul className="flex flex-col items-center justify-between gap-4 text-lg md:text-xl">
            <Link href={"/"}>
              <li className="cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-lightText">
                Home
              </li>
            </Link>
            <Link href={"/pages/who-we-are"}>
              <li className="cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-lightText">
                Chi Siamo
              </li>
            </Link>
            <Link href={"/cart"}>
              <li className="cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-lightText">
                Servizi
              </li>
            </Link>
            <Link href={"/menu"}>
              <li className="cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-lightText">
                Menu
              </li>
            </Link>
            <Link href={"/cart"}>
              <li className="cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-lightText">
                Contatti
              </li>
            </Link>
            <Link href={"/cart"}>
              <li className="cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-lightText">
                Prenota subito il tuo tavolo
              </li>
            </Link>
          </ul>
        </motion.div>
      </Container>

      {/* FOOTER BOTTOM */}
      <footer>
        <div className="border-t border-lightText py-4 text-center text-lightText">
          <Link href={"/"} className="text-sm md:text-lg">
            <p className="transition-transform hover:scale-110">
              Creato da LinkLeap — app web e mobile personalizzate.
            </p>
          </Link>
          <p className="text-sm md:text-base mt-1">
          <small>&copy; {new Date().getFullYear()} Allora Ristorante</small>, P.IVA 02732810995. Tutti i diritti
            riservati.
          </p>
        </div>
      </footer>
    </motion.div>
  );
}
