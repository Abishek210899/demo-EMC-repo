import { useState } from "react";
import Hero from "./components/Hero.jsx";
import UploadCard from "./components/UploadCard.jsx";
import Results from "./components/Results.jsx";

export default function App() {
  const [file, setFile] = useState(null);   // the uploaded file
  const [result, setResult] = useState(null); // {score, present, missing}

  return (
    <>
      <nav className="navbar">
        <div className="container nav-inner">
          <a href="#" className="logo">0<span>→</span>Shipped</a>
        </div>
      </nav>

      <header className="hero">
        <Hero />
      </header>

      <section id="parser" className="parser-section">
        <div className="container">
          <h2>Upload your resume</h2>
          <p className="section-sub">PDF only. Nothing leaves your browser.</p>
          <UploadCard onAnalyzed={(f, r) => { setFile(f); setResult(r); }} />
          {result && <Results file={file} result={result} />}
        </div>
      </section>

      <section id="how" className="how-section">
        <div className="container">
          <h2>How it works</h2>
          <div className="steps">
            <div className="step"><span className="step-num">1</span><h3>Upload</h3><p>Drop in a PDF resume. No signup, no server.</p></div>
            <div className="step"><span className="step-num">2</span><h3>Parse</h3><p>The parser scans your skills and experience.</p></div>
            <div className="step"><span className="step-num">3</span><h3>Score</h3><p>Get a 0–100 score with present & missing skills.</p></div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>0→Shipped Resume Parser — mock demo, scores are simulated.</p>
        </div>
      </footer>
    </>
  );
}
