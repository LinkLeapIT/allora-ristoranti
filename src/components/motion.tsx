"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "p" | "h2";
};

// Fades and lifts content into place the first time it scrolls into view.
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

// Heading that rises in word by word. Words (not letters) keep Arabic joined.
export function AnimatedTitle({
  text,
  className,
  as = "h1",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  const reduce = useReducedMotion();
  const Tag = as;

  if (reduce) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {" "}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// A short gold rule that draws itself under a heading.
export function GoldRule({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={`block h-0.5 w-16 origin-left rounded bg-lightText rtl:origin-right ${className}`}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    />
  );
}
