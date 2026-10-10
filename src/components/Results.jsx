const verdict = (score) =>
  score >= 75 ? "Strong resume — nearly shipped!"
  : score >= 50 ? "Decent — a few skills are missing."
  : "Needs work — key skills are missing.";

export default function Results({ file, result }) {
  const { score, present, missing } = result;

  const reset = () => window.location.reload(); // simplest reset for the mock

  return (
    <div className="results">
      <div className="score-card">
        <div className="score-ring" style={{ "--score": score }}>
          <span>{score}</span>
          <span className="score-suffix">/100</span>
        </div>
        <div className="score-label">
          <h3>Resume Score</h3>
          <p>{verdict(score)}</p>
        </div>
      </div>

      <div className="skills-grid">
        <div className="skill-card present">
          <h3>✅ Skills present</h3>
          <div className="skill-tags">
            {present.map((s) => <span key={s}>{s}</span>)}
          </div>
        </div>
        <div className="skill-card missing">
          <h3>🚩 Skills missing</h3>
          <div className="skill-tags">
            {missing.map((s) => <span key={s}>{s}</span>)}
          </div>
        </div>
      </div>

      <p className="file-name">✅ {file.name} analyzed</p>
      <button className="btn ghost" onClick={reset}>Analyze another resume</button>
    </div>
  );
}
