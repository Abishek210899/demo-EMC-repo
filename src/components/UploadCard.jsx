import { useRef, useState } from "react";
import { mockAnalyze } from "../mockParser.js";

export default function UploadCard({ onAnalyzed }) {
  const inputRef = useRef(null);
  const [status, setStatus] = useState(null); // "idle" | "analyzing" | "error"
  const [message, setMessage] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    const isPdf =
      file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setStatus("error");
      setMessage("⚠️ Please upload a PDF file.");
      return;
    }

    setStatus("analyzing");
    setMessage(`Analyzing ${file.name}…`);

    // Simulate parsing delay, then hand the result up to App
    setTimeout(() => {
      setStatus("idle");
      setMessage("");
      onAnalyzed(file, mockAnalyze());
    }, 1200);
  };

  return (
    <>
      <div
        className={`upload-card${dragging ? " dragover" : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files[0]);
        }}
      >
        <div className="upload-icon">📄</div>
        <p className="upload-title">Drop your resume here</p>
        <p className="upload-hint">or click to browse</p>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          hidden
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>
      {message && (
        <p
          className="file-name"
          style={status === "error" ? { color: "var(--danger)" } : undefined}
        >
          {message}
        </p>
      )}
    </>
  );
}
