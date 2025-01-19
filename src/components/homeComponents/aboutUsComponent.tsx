"use client";
import Image from "next/image";
import allora_window from "../../../public/assets/images/allora-window.jpg";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { animate, motion, useMotionTemplate, useMotionValue, ValueAnimationTransition } from "framer-motion";
import { memo } from "react";
import Link from "next/link";

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeInOut" } },
};

const imageVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeInOut" } },
};

const AboutUsComponent = () => {
  const xPercentage = useMotionValue(0);
  const yPercentage = useMotionValue(0);

  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const imageRef = useRef<HTMLDivElement>(null);
  const { ref: imageInViewRef, inView: imageInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
      if (!imageRef.current) return;
  
      xPercentage.set(0);
      yPercentage.set(0);
  
      const { height, width } = imageRef.current.getBoundingClientRect();
      const circumference = 2 * (height + width);
      const times = [0, width / circumference, (width + height) / circumference, (2 * width + height) / circumference, 1];
      const animationOptions: ValueAnimationTransition = {
        times,
        duration: 10,
        repeat: Infinity,
        ease: 'linear',
        repeatType: 'loop',
      };
  
      animate(xPercentage, [0, 100, 100, 0, 0], animationOptions);
      animate(yPercentage, [0, 0, 100, 100, 0], animationOptions);
  }, [imageRef, xPercentage, yPercentage]);

  useEffect(() => {
    if (imageRef.current) {
      imageInViewRef(imageRef.current);
    }
  }, [imageInViewRef]);

  return (
    <section className="w-full relative bg-gradient-to-tr from-lightBg via-hoverBg to-lightBg">
      <div className=" max-w-contentContainer mx-auto flex flex-col gap-5 lg:grid lg:grid-cols-2 text-center py-4 md:py-8 px-4">
        {/* Text Section */}
        <motion.div
          ref={textRef}
          className="flex flex-col justify-center gap-8 lg:flex-1 relative border rounded-lg shadow-[0px_0px_10px_#967d48] p-4 lg:p-8"
          initial="hidden"
          animate={textInView ? "visible" : "hidden"}
          variants={textVariants}
        >
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-darkText to-lightText bg-clip-text text-transparent">SU DI NOI</h1>
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-darkText to-lightText bg-clip-text text-transparent">Allora Ristorante</h2>
          <p className="text-xl md:text-2xl max-w-lg mx-auto">
          La Siria è una terra che da sempre ha influenzato tantissimo la cultura di tutta l&apos;area Mediterranea e ha saputo fare suoi profumi e sapori unici che provengono da terre lontane, facendoli arrivare in tanti porti con i suoi marinai e le grandi navi che venivano a caricare le spezie lungo le coste.
          </p>
          <Link href="/pages/who-we-are" className="hover:text-hoverBg text-lightText duration-300">SCOPRI DI PIÙ</Link>
        </motion.div>

        {/* Image Section */}
        <motion.div
          ref={imageRef}
          className="flex flex-col rounded-lg gap-3 lg:flex-1 shadow-[0px_0px_10px_#967d48] relative"
          initial="hidden"
          animate={imageInView ? "visible" : "hidden"}
          variants={imageVariants}
          style={{
          backgroundPositionX: 0,
          backgroundPositionY: 0,
          backgroundSize: 150,
          }}
        >
          <Image src={allora_window} alt="OTS Partners" width={1024} height={1024} className="w-full rounded-lg" />
        </motion.div>
      </div>
    </section>
  );
};

export default memo(AboutUsComponent);
