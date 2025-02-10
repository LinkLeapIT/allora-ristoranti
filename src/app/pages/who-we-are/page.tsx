"use client";

import React from "react";
import { motion } from "framer-motion";
import bgImage from "../../../../public/assets/images/allora-floor.jpg";
import bgImage2 from "../../../../public/assets/images/allora-wall.jpg"

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

export default function WhoWeAre() {
  return (
    <>
        <div
            className="relative w-full mx-auto h-[40vh] md:h-[85vh] overflow-hidden flex items-center justify-center
            bg-no-repeat bg-cover bg-center md:bg-fixed"
            style={{
                backgroundImage: `url(${bgImage.src})`,
            }}
        >

            <div className="absolute inset-0 bg-black/50" />

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
        </div>

        {/* Main Content */}
        <div 
            className="w-full bg-gradient-to-tr from-lightBg via-hoverBg to-lightBg px-4 py-8"
        >
            <div 
                className="max-w-contentContainer mx-auto border rounded-lg px-4 py-8 shadow-[0px_0px_10px_#967d48] flex flex-col items-center justify-center text-center space-y-8"
            >
                {/* Heading */}
                <h2
                    className="text-2xl md:text-4xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-darkText to-lightText flex"
                >
                    CHI SIAMO
                </h2>

                {/* Intro Paragraphs */}
                <div className="max-w-3xl flex flex-col space-y-6 text-2xl md:text-3xl lg:text-5xl leading-relaxed">
                    <p>
                        La Siria è una terra che da sempre ha influenzato tantissimo la cultura di
                        tutta l&apos;area Mediterranea e ha saputo fare suoi profumi e sapori unici che
                        provengono da terre lontane, facendoli arrivare in tanti porti con i suoi
                        marinai e le grandi navi che venivano a caricare le spezie lungo le
                        coste.
                    </p>
                </div>
            </div>
        </div>

        <div
            className="relative w-full mx-auto h-[40vh] md:h-[85vh] overflow-hidden flex items-center justify-center
            bg-no-repeat bg-cover bg-center md:bg-fixed"
            style={{
                backgroundImage: `url(${bgImage2.src})`,
            }}
        >

            <div className="absolute inset-0 bg-black/50" />
        </div>

        <div 
            className="w-full bg-gradient-to-tr from-lightBg via-hoverBg to-lightBg px-4 py-8 "
        >
            <div className="max-w-contentContainer mx-auto flex flex-col items-center justify-center text-center space-y-8">
                <div className="flex flex-col space-y-6 text-xl md:text-2xl lg:text-3xl leading-relaxed">
                    <p className="font-bold">
                        Profumi esotici, ingredienti ricercati e tanta tradizione sono al centro
                        della cucina di questi territori e che noi abbiamo deciso di far
                        assaggiare a tutti gli appassionati del mangiare bene.
                    </p>
                    <p>
                        Come tutta la cucina mediorientale, a dominare sono i sapori spiccati e i
                        profumi delle spezie, la cottura tradizionale, con tecniche diverse
                        rispetto a quelle che si usano in Italia e tanti ingredienti accostati in
                        una maniera unica.
                    </p>
                </div>

                {/* Two-Column Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:text-left w-full mt-6">
                    <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed">
                        Il nostro ristorante nel cuore di Genova ti permette un viaggio in
                        un&apos;atmosfera inconfondibile, che al tempo stesso è esotica e familiare
                        perché rappresenta tutto il Mediterraneo. Siria e Libano con i loro porti,
                        infatti, per millenni hanno fatto arrivare le spezie sulle tavole di tutti
                        i paesi che si affacciano sul nostro grande mare e le navi hanno portato
                        in giro tradizioni di paesi lontani. I nostri chef le hanno sapute
                        mescolare fra loro, per offrire un gusto inconfondibile e spiccato. Un
                        ristorante in bilico fra due paesi con una cultura millenaria che ha
                        saputo crescere e influenzare tantissimo quella anche di posti lontani. In
                        un ambiente tranquillo e rilassante in puro stile mediorientale ti potrai
                        godere alcune fra le migliori pietanze della nostra tradizione, preparate
                        con l&apos;idea di farti viaggiare con il pensiero attraverso terre lontane per
                        capire che non sono così diverse dalla tua. Puoi scoprire tantissimi gusti
                        basati su carne di pollo e agnello, verdure, legumi e cereali, preparati
                        secondo una tradizione antica, dove a incontrarsi sono i sapori acidi
                        degli agrumi, la dolcezza del miele e la sostanza dei ceci.
                    </p>

                    <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed">
                        Il nostro menu ti offre tante soluzioni differenti per sperimentare, con
                        la possibilità di scegliere piatti unici, oppure assaggi al tavolo con gli
                        amici. La nostra idea non è quella soltanto di un ristorante, ma di un
                        ambiente da vivere dove ti offriamo letture, musica tradizionale live, per
                        creare l&apos;atmosfera e tanto scambio culturale, anche con idee proposte dai
                        nostri ospiti che vengono da posti lontani. Lasciati affascinare dal
                        profumo coinvolgente della nostra cucina, dall&apos;atmosfera calda e informale
                        di uno spazio in cui si chiacchiera e si mangia, oppure gusta un tè
                        speziato mentre ti godi l&apos;ambiente, nelle serate speciali dedicate alla
                        cultura. Il nostro è uno spazio fatto di condivisione e di crescita dove
                        sentirsi a casa dal primo momento in cui entri, scoprendo il gusto di
                        mescolare idee vecchie e nuove per creare un posto pacifico in cui vivere
                        insieme in armonia. Un locale aperto a chi ama conoscere il prossimo,
                        condividere il desco e scoprire cose nuove, senza lasciarsi guidare da
                        pregiudizi, ma con la naturale curiosità del viaggiatore.
                    </p>
                </div>
            </div>
        </div>
    </>
  );
}
