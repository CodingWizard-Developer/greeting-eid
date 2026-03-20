export default function DetailsStep({
  name,
  dob,
  error,
  onNameChange,
  onDobChange,
  onSubmit,
}) {
  return (
    <>
      <h2 className="step-title">Tell Us About You</h2>
      <p className="step-copy">
        Please be honest!
      </p>
      <form className="form-grid" onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={onNameChange}
          placeholder="Your sweet name"
        />

        <label htmlFor="dob">Date of Birth</label>
        <input
          id="dob"
          name="dob"
          type="date"
          value={dob}
          onChange={onDobChange}
        />

        {error ? (
          <p className="error-text" role="alert">
            {error}
          </p>
        ) : null}

        <button className="primary-btn" type="submit">
          Continue
        </button>
      </form>
    </>
  );
}
