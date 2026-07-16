"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

function parseValue(raw: string) {
  const match = raw.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!match) return null;
  const [, prefix, numberPart, suffix] = match;
  const digitsOnly = numberPart.replace(/[.,]/g, "");
  const target = parseInt(digitsOnly, 10);
  if (Number.isNaN(target)) return null;
  const separator = numberPart.includes(".") ? "." : numberPart.includes(",") ? "," : "";
  return { prefix, target, suffix, separator };
}

function format(n: number, separator: string) {
  const str = Math.round(n).toString();
  if (!separator) return str;
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const parsed = useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = useState(parsed ? `${parsed.prefix}0${parsed.suffix}` : value);

  useEffect(() => {
    if (!parsed || !inView) return;
    const controls = animate(0, parsed.target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        setDisplay(`${parsed.prefix}${format(v, parsed.separator)}${parsed.suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, parsed]);

  return (
    <motion.span ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
      {parsed ? display : value}
    </motion.span>
  );
}
