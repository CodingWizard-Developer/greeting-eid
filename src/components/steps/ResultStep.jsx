export default function ResultStep({ name, isYoungerGuest, onRestart }) {
  return (
    <>
      <h2 className="step-title">Eid Mubarak, {name.trim()}!</h2>
        <p className="step-copy">
          Wishing you and your loved ones a blessed Eid-ul-Fitr! May your home
          be filled with laughter, your heart with gratitude, and your life with
          endless peace. <b> Eid Mubarak! </b>
        </p>
      
      {/* <button className="secondary-btn" type="button" onClick={onRestart}>
        Celebrate Again
      </button> */}
    </>
  );
}
