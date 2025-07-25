// components/VideoBubblePack.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { channels } from "./channels";

interface VideoBubblePackProps {
  limit?: number;
  shrinkOnEdge?: boolean;
  hideOnEdge?: boolean;
  withAnimation?: boolean;
  gap?: number;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  ox: number;
  oy: number;
  icon: string;
  name: string;
  subscribers: string;
  description: string;
  videoUrl: string;
}

export default function VideoBubblePack({
  hideOnEdge = false,
  withAnimation = true,
  gap = 20,
}: VideoBubblePackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [activeBubble, setActiveBubble] = useState<Bubble | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [search, setSearch] = useState("");

  useEffect(() => {
    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewport({ width, height });

      const radius = Math.min(width, height) * 0.3;
      const angleIncrement = (2 * Math.PI) / channels.length;

      const mapped = channels.map((channel, i) => {
        const angle = i * angleIncrement;
        const r = radius * (0.7 + Math.random() * 0.3);
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        const size = 60 + Math.random() * 20;

        return {
          id: channel.id,
          x,
          y,
          vx: 0,
          vy: 0,
          ox: x,
          oy: y,
          size,
          icon: channel.icon,
          name: channel.name,
          subscribers: channel.subscribers,
          description: channel.description,
          videoUrl: channel.videoUrl,
        };
      });

      setBubbles(mapped);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles((prev) => {
        const next = [...prev];

        for (let i = 0; i < next.length; i++) {
          let fx = 0;
          let fy = 0;

          const cx = viewport.width / 2 - offset.x;
          const cy = viewport.height / 2 - offset.y;
          const maxDist = Math.min(viewport.width, viewport.height) / 2;

          const dxToCenter = next[i].x + viewport.width / 2 - cx;
          const dyToCenter = next[i].y + viewport.height / 2 - cy;
          const distToCenter = Math.sqrt(
            dxToCenter * dxToCenter + dyToCenter * dyToCenter
          );

          const edgeRatio = 1 - Math.min(distToCenter / maxDist, 1);
          const scaleI = 0.5 + edgeRatio;

          const dxOrigin = next[i].ox - next[i].x;
          const dyOrigin = next[i].oy - next[i].y;
          fx += dxOrigin * 0.01;
          fy += dyOrigin * 0.01;

          for (let j = 0; j < next.length; j++) {
            if (i === j) continue;

            const dx = next[i].x - next[j].x;
            const dy = next[i].y - next[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const dxToCenterJ = next[j].x + viewport.width / 2 - cx;
            const dyToCenterJ = next[j].y + viewport.height / 2 - cy;
            const distToCenterJ = Math.sqrt(
              dxToCenterJ * dxToCenterJ + dyToCenterJ * dyToCenterJ
            );
            const edgeRatioJ = 1 - Math.min(distToCenterJ / maxDist, 1);
            const scaleJ = 0.5 + edgeRatioJ;

            const minDist =
              (next[i].size * scaleI + next[j].size * scaleJ) / 2 + gap;

            if (dist < minDist) {
              const force = (minDist - dist) * 0.12;
              fx += (dx / dist) * force;
              fy += (dy / dist) * force;
            }
          }

          next[i].vx += fx;
          next[i].vy += fy;
          next[i].vx *= 0.85;
          next[i].vy *= 0.85;
          next[i].x += next[i].vx;
          next[i].y += next[i].vy;
        }

        return next;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [gap, viewport, offset]);

  const filteredBubbles = bubbles.filter((bubble) =>
    bubble.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="absolute top-150 left-1/2  z-50">
        <input
          type="text"
          placeholder="Search bubble..."
          className="px-4 py-2 rounded-full border border-gray-300 shadow-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <motion.div
        ref={containerRef}
        className="absolute inset-0 touch-none"
        drag
        dragMomentum={false}
        dragElastic={0.2}
        onDrag={(event, info) => {
          setOffset((prev) => ({
            x: prev.x + info.delta.x,
            y: prev.y + info.delta.y,
          }));
        }}
      >
        {filteredBubbles.map((bubble) => {
          const cx = viewport.width / 2 - offset.x;
          const cy = viewport.height / 2 - offset.y;
          const dx = bubble.x + viewport.width / 2 - cx;
          const dy = bubble.y + viewport.height / 2 - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = Math.min(viewport.width, viewport.height) / 2;

          const edgeRatio = 1 - Math.min(dist / maxDist, 1);
          const scale = 0.5 + edgeRatio;
          const newSize = bubble.size * scale;
          const shouldHide = hideOnEdge && edgeRatio < 0.05;

          const left = bubble.x + offset.x + viewport.width / 2 - newSize / 2;
          const top = bubble.y + offset.y + viewport.height / 2 - newSize / 2;

          return (
            <motion.div
              key={bubble.id}
              className="absolute rounded-full overflow-hidden border border-black cursor-pointer"
              style={{
                width: newSize,
                height: newSize,
                left,
                top,
                opacity: shouldHide ? 0 : 1,
                pointerEvents: shouldHide ? "none" : "auto",
                zIndex: shouldHide ? 0 : 10,
                padding: gap / 3,
              }}
              animate={withAnimation ? { scale } : false}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              onClick={() => setActiveBubble(bubble)}
            >
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src={bubble.icon}
                  alt={`${bubble.name}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
          );
        })}

        <AnimatePresence>
          {activeBubble && (
            <motion.div
              key="zoom"
              className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveBubble(null)}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                className="relative z-10 rounded-2xl bg-black overflow-hidden shadow-xl w-full max-w-xl h-[70vh]"
              >
                <video
                  src={activeBubble.videoUrl}
                  autoPlay
                  muted
                  loop={false}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
                />

                <div className="absolute bottom-4 left-4 z-10 backdrop-blur-md bg-white/10 text-blue p-4 rounded-lg shadow-md max-w-[80%]">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={activeBubble.icon}
                      alt={activeBubble.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">
                        {activeBubble.name}
                      </h2>
                      <p className="text-sm text-white">
                        {activeBubble.subscribers} subscribers
                      </p>
                    </div>
                  </div>
                  <p className="text-white">{activeBubble.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

// import { VideoBubblePack } from "@/modules/subscription/VideoBubblePack";
// import { channels } from "./channels";

// export default function BubblePage() {
//   return (
//     <div className="w-full h-full max-w-screen overflow-hidden sm:px-2 md:px-4">
//       <VideoBubblePack data={channels} />
//     </div>
//   );
// }
