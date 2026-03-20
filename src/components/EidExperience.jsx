import { useMemo, useState } from "react";
import DetailsStep from "./steps/DetailsStep";
import ResultStep from "./steps/ResultStep";
import {
  calculateAge,
  formatDate,
  isAfterCutoff,
  parseDateInput,
} from "../utils/appLogic";
import EidiAskModal from "./steps/EidiAskModal";

export default function EidExperience() {
  const [step, setStep] = useState("details");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [eidiWish, setEidiWish] = useState("");
  const [detailsError, setDetailsError] = useState("");
  const [wishError, setWishError] = useState("");

  const parsedDob = useMemo(() => parseDateInput(dob), [dob]);
  const isYoungerGuest = useMemo(() => !isAfterCutoff(parsedDob), [parsedDob]);
  const age = useMemo(() => calculateAge(dob), [dob]);
  const formattedDob = useMemo(() => formatDate(dob), [dob]);

  const handleDetailsSubmit = (event) => {
    event.preventDefault();

    if (!name.trim() || !parsedDob) {
      setDetailsError("Please enter your name and a valid date of birth.");
      return;
    }

    setDetailsError("");
    if (isAfterCutoff(parsedDob)) {
      setStep("eidi");
      return;
    }

    setStep("result");
  };

  const handleEidiConfirmed = () => setStep("result");

  const restart = () => {
    setStep("details");
    setName("");
    setDob("");
    setEidiWish("");
    setDetailsError("");
    setWishError("");
  };

  let panelContent = null;

  if (step === "details") {
    panelContent = (
      <DetailsStep
        name={name}
        dob={dob}
        error={detailsError}
        onNameChange={(event) => setName(event.target.value)}
        onDobChange={(event) => setDob(event.target.value)}
        onSubmit={handleDetailsSubmit}
      />
    );
  } else if (step === "eidi") {
    panelContent = <EidiAskModal onConfirm={handleEidiConfirmed} />;
  } else {
    panelContent = (
      <ResultStep
        name={name}
        formattedDob={formattedDob}
        age={age}
        isYoungerGuest={isYoungerGuest}
        eidiWish={eidiWish}
        onRestart={restart}
      />
    );
  }

  return (
    <div className="eid-app">
      <div className="background-glow" aria-hidden="true">
        <span className="blob blob-one"></span>
        <span className="blob blob-two"></span>
        <span className="blob blob-three"></span>
      </div>

      <main className="card-shell">
        <header className="hero-header">
          <p className="kicker">Joyful Eid Journey</p>
          <h1>Eid Mubarak</h1>
        </header>

        <div className="image-strip" aria-hidden="true">
          <img src="/cute-moon.svg" alt="Cute moon" className="float-item" />
          <img
            src="/cute-lantern.svg"
            alt="Cute lantern"
            className="float-item"
          />
          <img src="/cute-gift.svg" alt="Cute gift" className="float-item" />
        </div>
        {step === "eidi" ? (
          panelContent
        ) : (
          <section key={step} className="step-panel">
            {panelContent}
          </section>
        )}
      </main>
    </div>
  );
}
