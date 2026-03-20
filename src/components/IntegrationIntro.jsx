import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import katex from "katex";
import "katex/dist/katex.min.css";
import { INTEGRATION_FRAMES } from "../data/integrationFrames";

const textIntroAnimation = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const frameTransition = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1],
};

const MotionParagraph = motion.p;
const MotionFrame = motion.div;
const MotionSpan = motion.span;

// MathFragment creates smooth morphing transitions between equation parts
const MathFragment = ({ latex, layoutId, className = "" }) => {
  const html = useMemo(
    () =>
      katex.renderToString(latex, {
        throwOnError: false,
        displayMode: false,
      }),
    [latex],
  );

  if (!latex) return null;

  return (
    <MotionSpan
      layoutId={layoutId}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ display: "inline-block", marginInline: "0.15em" }}
    />
  );
};

export default function IntegrationIntro({ stepIndex }) {
  const boundedIndex = Math.min(stepIndex, INTEGRATION_FRAMES.length - 1);
  const activeFrame = INTEGRATION_FRAMES[boundedIndex];

  return (
    <section className="integration-intro" aria-live="polite">
      <div className="intro-content">
        <MotionParagraph
          className="intro-wish"
          variants={textIntroAnimation}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Wishing You...
        </MotionParagraph>
        <MotionParagraph
          className="intro-blessing"
          variants={textIntroAnimation}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.55, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Happy and Blessed..
        </MotionParagraph>

        <AnimatePresence mode="popLayout">
          <MotionFrame
            key={activeFrame.id}
            className="intro-equation-stage"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={frameTransition}
          >
            <div
              className={`intro-katex-shell${activeFrame.accent ? " intro-katex-shell--accent" : ""}`}
            >
              <AnimatePresence mode="popLayout">
                {activeFrame.integral && (
                  <MathFragment
                    key={`integral-${activeFrame.id}`}
                    latex={activeFrame.integral}
                    layoutId="integral-anchor"
                    className="math-integral"
                  />
                )}
              </AnimatePresence>

              {activeFrame.denominator ? (
                <div className="fraction-container">
                  <div className="fraction-numerator">
                    <AnimatePresence mode="popLayout">
                      <MathFragment
                        key={`num-${activeFrame.id}`}
                        latex={activeFrame.numerator}
                        layoutId="content-morph"
                      />
                    </AnimatePresence>
                  </div>
                  <div className="fraction-line" />
                  <div className="fraction-denominator">
                    <AnimatePresence mode="popLayout">
                      <MathFragment
                        key={`denom-${activeFrame.id}`}
                        latex={activeFrame.denominator}
                        layoutId="denominator-morph"
                      />
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  <MathFragment
                    key={`standalone-${activeFrame.id}`}
                    latex={activeFrame.numerator}
                    layoutId="content-morph"
                  />
                </AnimatePresence>
              )}

              <AnimatePresence mode="popLayout">
                {activeFrame.suffix && (
                  <MathFragment
                    key={`suffix-${activeFrame.id}`}
                    latex={activeFrame.suffix}
                    layoutId="suffix-anchor"
                    className="math-suffix"
                  />
                )}
              </AnimatePresence>
            </div>
          </MotionFrame>
        </AnimatePresence>
      </div>
    </section>
  );
}
