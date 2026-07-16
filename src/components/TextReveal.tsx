"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType } from "react";

const container: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.055, delayChildren: delay },
  }),
};

const word: Variants = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function TextReveal({
  text,
  as = "span",
  className,
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const Comp = motion.create(as);
  const words = text.split(" ");

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
      custom={delay}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.15em] align-bottom">
          <motion.span variants={word} className="inline-block">
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}
