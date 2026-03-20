import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MotionDiv = motion.div;

const Fireworks = ({ active = true, intensity = 8 }) => {
  const [bursts, setBursts] = useState([]);
  const nextIdRef = useRef(0);
  const isActiveRef = useRef(active);

  useEffect(() => {
    isActiveRef.current = active;
    if (!active) return;

    const interval = setInterval(() => {
      if (!isActiveRef.current) return;

      const id = nextIdRef.current++;
      const targetX = Math.random() * 100;
      const targetY = 20 + Math.random() * 40; // Target height (upper half of screen)
      const color = ["#2ee6b9", "#36c3ff", "#2b66f9", "#84e2ff"][
        Math.floor(Math.random() * 4)
      ];

      const newBurst = {
        id,
        targetX,
        targetY,
        color,
        particles: Array.from({ length: intensity }).map((_, i) => ({
          angle: (Math.PI * 2 * i) / intensity,
          distance: 12 + Math.random() * 8,
          size: 3 + Math.random() * 3,
          duration: 1 + Math.random() * 0.5,
        })),
      };

      setBursts((prev) => [...prev, newBurst]);

      // Cleanup burst after 4 seconds (launch + explosion + fade)
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id));
      }, 4000);
    }, 1200);

    return () => clearInterval(interval);
  }, [intensity, active]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 99,
      }}
    >
      {bursts.map((burst) => (
        <FireworkRocket key={burst.id} burst={burst} />
      ))}
    </div>
  );
};

const FireworkRocket = ({ burst }) => {
  const [exploded, setExploded] = useState(false);

  return (
    <>
      {/* PHASE 1: THE LAUNCH ROCKET */}
      {!exploded && (
        <MotionDiv
          initial={{ x: `${burst.targetX}vw`, y: "110vh", opacity: 1 }}
          animate={{ x: `${burst.targetX}vw`, y: `${burst.targetY}vh` }}
          transition={{ duration: 1, ease: "easeOut" }}
          onAnimationComplete={() => setExploded(true)}
          style={{
            position: "fixed",
            width: "4px",
            height: "15px",
            background: `linear-gradient(to top, transparent, ${burst.color})`,
            boxShadow: `0 0 10px ${burst.color}`,
            borderRadius: "2px",
            top: 0,
            left: 0,
          }}
        />
      )}

      {/* PHASE 2: THE EXPLOSION */}
      <AnimatePresence>
        {exploded &&
          burst.particles.map((p, i) => (
            <div key={`${burst.id}-p-${i}`}>
              {/* Explosion Trail Segments */}
              {[0.05, 0.1].map((delay, index) => (
                <MotionDiv
                  key={`${burst.id}-p-${i}-t-${index}`}
                  initial={{
                    x: `${burst.targetX}vw`,
                    y: `${burst.targetY}vh`,
                    opacity: 0.7,
                    scale: 0.8,
                  }}
                  animate={{
                    x: `${burst.targetX + Math.cos(p.angle) * p.distance}vw`,
                    y: `${burst.targetY + Math.sin(p.angle) * p.distance}vh`,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: p.duration,
                    delay: delay,
                    ease: "easeOut",
                  }}
                  style={{
                    position: "fixed",
                    width: p.size * 0.7,
                    height: p.size * 0.7,
                    borderRadius: "50%",
                    background: burst.color,
                    filter: "blur(1px)",
                    top: 0,
                    left: 0,
                  }}
                />
              ))}

              {/* Explosion Head */}
              <MotionDiv
                initial={{
                  x: `${burst.targetX}vw`,
                  y: `${burst.targetY}vh`,
                  opacity: 1,
                }}
                animate={{
                  x: `${burst.targetX + Math.cos(p.angle) * p.distance}vw`,
                  y: `${burst.targetY + Math.sin(p.angle) * p.distance}vh`,
                  opacity: 0,
                }}
                transition={{ duration: p.duration, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  width: p.size,
                  height: p.size,
                  borderRadius: "50%",
                  background: "#fff",
                  boxShadow: `0 0 ${p.size * 2}px ${burst.color}`,
                  top: 0,
                  left: 0,
                }}
              />
            </div>
          ))}
      </AnimatePresence>
    </>
  );
};

export default Fireworks;
