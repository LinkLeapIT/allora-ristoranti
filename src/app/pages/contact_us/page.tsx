"use client";

import React from "react";
import bgImage from "../../../../public/assets/images/allora-floor.jpg";
import { motion } from "framer-motion";

const headingText = "Contatti";
const letters = headingText.split("");
const whatsappLink = "https://wa.me/393497068208?text=Salve%20Allora!";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

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

export default function ContactUs() {
  return (
    <div className="w-full bg-darkBg">
      {/* SECTION: Herro */}
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
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            show: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          <motion.div
            className="p-4 flex flex-col items-center justify-center gap-4"
            variants={fadeUp}
          >
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
            <div
              className="
                  relative
                  text-xl
                  md:text-4xl
                  lg:text-5xl
                  font-extrabold
                  bg-clip-text
                  text-transparent
                  bg-gradient-to-r
                  from-lightText
                  to-lightBg
                  flex
                  flex-col
                  items-center
                  gap-4
              "
            >
              <span className="font-bold">Telefono</span>
              <a 
                href={whatsappLink} 
                className="text-link hover:text-hoverBg"
                target="_blank" 
                rel="noopener noreferrer"
              >
                +39 349 706 8208
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* SECTION: Info + Form */}
      <motion.div
        className="
          grid
          grid-cols-1
          gap-8
          p-4
          sm:grid-cols-2
          lg:grid-cols-4
          max-w-6xl
          mx-auto
          mt-8
        "
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          show: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {/* LEFT COLUMN: Info */}
        <motion.div
          className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-4 md:space-y-9"
          variants={fadeUp}
        >
          <h2 className="text-2xl md:text-3xl text-lightText font-bold">Orario di apertura</h2>
          <div className="text-xl flex flex-col gap-2 md:gap-4 text-hoverBg">
            <p className="flex flex-col">
              <span className="font-semibold">Lunedì: </span>
              Chiuso
            </p>
            <p className="flex flex-col">
              <span className="font-semibold">Martedì - Domenica: </span>
              19:30 - 22:30
            </p>
          </div>

          <hr />

          <h2 className="text-2xl md:text-3xl text-lightText font-bold">E-mail</h2>
          <p className="text-xl flex flex-col gap-2 md:gap-4 text-hoverBg">
            alloraristorante2021@gmail.com
          </p>

          <hr />

          <h2 className="text-2xl md:text-3xl text-lightText font-bold">Indirizzo</h2>
          {/* Link to Google Maps */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Salita+di+Santa+Maria+di+Castello%2C+32r%2C+16123+Genova+GE%2C+Italia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg flex flex-col gap-2 md:gap-4 text-link hover:text-lightText duration-300"
          >
            Salita di Santa Maria di Castello, 32r, 16123 Genova GE, Italia
          </a>
        </motion.div>

        {/* RIGHT COLUMN: Form */}
        <motion.form
          className="
            col-span-1 
            sm:col-span-2 
            lg:col-span-3
            flex
            flex-col
            gap-4
            p-4
            text-hoverBg
            text-xl
          "
          action=""
          variants={fadeUp}
        >
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium text-lightText">
              Nome:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="
                border-b 
                border-gray-300 
                p-2 
                outline-none
                focus:border-lightText
                bg-darkBg
              "
              placeholder="Inserisci il tuo nome"
            />
          </div>

          {/* Surname */}
          <div className="flex flex-col">
            <label htmlFor="surname" className="font-medium text-lightText">
              Cognome:
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              className="
                border-b 
                border-gray-300 
                p-2 
                outline-none
                focus:border-lightText
                bg-darkBg
              "
              placeholder="Inserisci il tuo cognome"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-lightText">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="
                border-b 
                border-gray-300 
                p-2 
                outline-none
                focus:border-lightText
                bg-darkBg
              "
              placeholder="Inserisci la tua email"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label htmlFor="message" className="font-medium text-lightText">
              Messaggio:
            </label>
            <textarea
              name="message"
              id="message"
              rows={5}
              className="
                border-b 
                border-gray-300 
                p-2 
                outline-none
                focus:border-lightText
                bg-darkBg
              "
              placeholder="Inserisci il tuo messaggio"
            ></textarea>
          </div>

          {/* Terms Checkbox */}
          <label className="flex items-center gap-2 text-sm md:text-base">
            <input type="checkbox" name="terms" className="accent-blue-600" />
            Accetto le condizioni di utilizzo del sito e l’informativa sul
            trattamento dei dati personali.*
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="
              bg-lightText
              text-white 
              py-2 
              px-4 
              rounded
              hover:bg-link
              hover:text-darkBg 
              focus:outline-none 
              focus:ring-2 
              focus:ring-lightText 
              transition-colors
              duration-300
            "
          >
            Invia
          </button>
        </motion.form>
      </motion.div>

      {/* MAP SECTION */}
      <motion.div
        className="max-w-6xl mx-auto mt-8 p-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <h2 className="text-2xl md:text-3xl text-lightText font-bold mb-4">
          Dove Siamo
        </h2>
        {/* Embedded Google Map Example */}
        <div className="relative w-full h-80 md:h-96 rounded overflow-hidden shadow-md">
          <iframe
            title="Allora Ristorante Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d558.7076052364364!2d8.931967621537141!3d44.40725958375206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d343dce1c02a49%3A0x4fbabdf478d8ce9!2sSalita%20di%20S.%20Maria%20di%20Castello%2C%2032r%2C%2016123%20Genova%20GE%2C%20Italia!5e0!3m2!1sit!2sus!4v1694035826325!5m2!1sit!2sus"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>
    </div>
  );
}
