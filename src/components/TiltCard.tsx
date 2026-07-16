"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import type { ReactNode } from "react";

export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 300, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 25 });
  const glareX = useSpring(50, { stiffness: 300, damping: 25 });
  const glareY = useSpring(50, { stiffness: 300, damping: 25 });
  const transform = useMotionTemplate`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.16), transparent 55%)`;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 14);
    rotateX.set((0.5 - py) * 14);
    glareX.set(px * 100);
    glareY.set(py * 100);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
      <motion.div
        style={{ background: glareBg }}
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
      />
    </motion.div>
  );
}
