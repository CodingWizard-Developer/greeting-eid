import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const MotionButton = motion.button;
const MotionSection = motion.section;

const getRandomOffset = () => {
  const horizontalRange = Math.min(window.innerWidth * 0.42, 430);
  const verticalRange = Math.min(window.innerHeight * 0.35, 280);

  return {
    x: Math.round((Math.random() * 2 - 1) * horizontalRange),
    y: Math.round((Math.random() * 2 - 1) * verticalRange),
  };
};

export default function EidiAskModal({ onConfirm }) {
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const confirmTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (confirmTimerRef.current) {
        window.clearTimeout(confirmTimerRef.current);
      }
    };
  }, []);

  const moveNoButton = () => {
    setAttempts((value) => value + 1);
    setNoOffset(getRandomOffset());
  };

  const handleWhenMeet = () => {
    setAccepted(true);
    if (confirmTimerRef.current) {
      window.clearTimeout(confirmTimerRef.current);
    }

    confirmTimerRef.current = window.setTimeout(() => {
      onConfirm?.();
    }, 2500);
  };

  return (
    <div className="eidi-popup-backdrop" role="dialog" aria-modal="true">
      <MotionSection
        className="eidi-popup-panel"
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        aria-label="Eidi request popup"
      >
        {accepted ? (
          <div className="eidi-popup-success">
            <img
              src="/cute-happy-eidi.svg"
              alt="Cute and happy character celebrating"
              className="eidi-popup-happy-svg"
            />
            <h3 className="eidi-popup-title">Yay, Eidi Confirmed!</h3>
            <p className="eidi-popup-success-copy">
              Thank you. Keep my eidi for meet!
            </p>
          </div>
        ) : (
          <>
            <div className="eidi-popup-header">
              <img
                src="/cute-angry-eidi.svg"
                alt="Cute angry character asking for Eidi"
                className="eidi-popup-svg"
              />
              <div>
                <h3 className="eidi-popup-title">Eidi Please</h3>
                <p className="eidi-popup-copy">Where is my eidi ?</p>
              </div>
            </div>

            <div className="eidi-popup-options">
              <button
                type="button"
                className="eidi-popup-when-btn"
                onClick={handleWhenMeet}
              >
                When meet
              </button>

              <MotionButton
                type="button"
                className="eidi-popup-no-btn"
                animate={{ x: noOffset.x, y: noOffset.y }}
                transition={{
                  type: "spring",
                  stiffness: 360,
                  damping: 22,
                  mass: 0.6,
                }}
                onClick={moveNoButton}
                onHoverStart={moveNoButton}
              >
                No Eidi
              </MotionButton>
            </div>

            {attempts > 0 ? (
              <p className="eidi-popup-status">
                But why 🧐. Btw Nice try to escape {attempts} times !  
              </p>
            ) : (
              <p className="eidi-popup-status">Choose wisely.</p>
            )}
          </>
        )}
      </MotionSection>
    </div>
  );
}
