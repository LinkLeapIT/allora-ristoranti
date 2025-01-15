"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Teresa F",
    testimonial:
      "Non avevo mai provato la cucina mediorientale. Per un brutto pregiudizio, infatti, pensavo fosse semplicemente cibo affogato nelle spezie e tutto uguale. In un ambiente così rilassante e con la cucina a pochi passi dal nostro posto mi sono resa conto di quanto mi sbagliassi. Ci sono tantissimi gusti da esplorare e tradizioni semplicemente uniche, che da sempre hanno unito i due versanti del Mediterraneo.Un posto consigliatissimo per chi vuol scoprire qualcosa di nuovo.",
  },
  {
    name: "Claudio G",
    testimonial:
      "Sono venuto qua per la prima volta perché mi ci ha portato un collega che lavora per l'import-export con l'oriente. Ho scoperto un ambiente incredibilmente coinvolgente, dove i profumi e i sapori sono unici e inconfondibili e ho potuto gustare pietanze che fino ad ora avevo sempre ignorato, scoprendo quanto la cucina libanese e quella siriana possono essere al tempo stesso vicinissime e lontanissime dalla nostra. Un locale splendido, tutto da vivere, anche con belleserate di musica etnica dal vivo.",
  },
  {
    name: "Alessandro Verdi",
    testimonial:
      "Veniamo qua spessissimo, perché è un posto che ci ha sempre coinvolto tanto.Bella gente, ottima cucina e tanta buona musica con ospiti molto interessanti sia tradizionali del Medio Oriente, live acustici e innovatori. Si trova sempre un posto, anche quando è pienissimo. Davvero un locale consigliato.",
  },
];

// Animation for each testimonial card
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -40,
    transition: { duration: 0.5, ease: "easeIn" },
  },
};

export default function TestimonianzePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handler for clicking on a dot to navigate to that testimonial
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-tr from-lightBg via-hoverBg to-lightBg">
      <section className="max-w-4xl w-full px-4 py-8 md:py-16 mx-auto text-center">
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-darkText to-lightText  mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Testimonianze
        </motion.h1>

        {/* AnimatePresence for the single testimonial card */}
        <div className="relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex} // important for AnimatePresence to track
              variants={cardVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="p-6 shadow-[0px_0px_10px_#967d48] rounded-lg w-full max-w-4xl flex flex-col items-center"
            >
              {/* User Name & Location */}
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-darkText to-lightText bg-clip-text text-transparent">
                  {currentTestimonial.name}
                </h2>
              </div>

              {/* Testimonial Text */}
              <p className="mt-4 text-xl md:text-2xl">
                {currentTestimonial.testimonial}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-colors
                ${index === currentIndex ? "bg-lightText" : "bg-hoverBg"}
              `}
              aria-label={`Show testimonial ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
