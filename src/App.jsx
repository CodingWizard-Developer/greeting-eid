import { useEffect, useState } from "react";
import "./App.css";
import EidExperience from "./components/EidExperience";
import IntegrationIntro from "./components/IntegrationIntro";
import Fireworks from "./components/Fireworks";
import { INTRO_FRAME_COUNT } from "./data/integrationFrames";
import { INTRO_END_DELAY, INTRO_STEP_DURATION } from "./utils/appLogic";

function App() {
  const [showIntegrationIntro, setShowIntegrationIntro] = useState(true);
  const [introStepIndex, setIntroStepIndex] = useState(0);

  useEffect(() => {
    if (!showIntegrationIntro) {
      return undefined;
    }

    if (introStepIndex >= INTRO_FRAME_COUNT - 1) {
      const endTimer = window.setTimeout(() => {
        setShowIntegrationIntro(false);
      }, INTRO_END_DELAY);

      return () => {
        window.clearTimeout(endTimer);
      };
    }

    const stepTimer = window.setTimeout(() => {
      setIntroStepIndex((currentIndex) => currentIndex + 1);
    }, INTRO_STEP_DURATION);

    return () => {
      window.clearTimeout(stepTimer);
    };
  }, [introStepIndex, showIntegrationIntro]);

  return (
    <>
      {showIntegrationIntro ? (
        <IntegrationIntro stepIndex={introStepIndex} />
      ) : (
        <EidExperience />
      )}
      {!showIntegrationIntro && <Fireworks active={true} intensity={8} />}
    </>
  );
}

export default App;
