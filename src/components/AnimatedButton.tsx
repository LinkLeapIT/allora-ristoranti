"use client";

import { motion } from "framer-motion";

interface AnimatedButtonProps {
  label?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  label,
  onClick,
  className = "",
}) => {
  const buttonVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.button
      className={`py-6 px-3 h-10 md:h-14 text-white text-center flex items-center justify-center rounded-lg uppercase font-extrabold md:text-4xl bg-gradient-to-r from-text to-button  ${className}`}
      variants={buttonVariants}
      animate="animate"
      onClick={onClick}
    >
      {label}
    </motion.button>
  );
};

export default AnimatedButton;
