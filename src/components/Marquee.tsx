"use client";

import type { ReactNode } from "react";

export function Marquee({ items }: { items: ReactNode[] }) {
  const loop = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      <div className="flex w-max animate-marquee">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center px-10 shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
