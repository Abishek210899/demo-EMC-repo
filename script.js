// Mock resume parser — no backend, everything simulated in the browser.

const SKILL_POOL = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL",
  "Git", "REST APIs", "Docker", "HTML & CSS", "PostgreSQL",
  "AWS", "CI/CD", "Testing", "MongoDB", "GraphQL",
];

const uploadCard = document.getElementById("upload-card");
const fileInput = document.getElementById("file-input");
const fileNameEl = document.getElementById("file-name");
const resultsEl = document.getElementById("results");
const scoreValueEl = document.getElementById("score-value");
const scoreRing = document.querySelector(".score-ring");
const verdictEl = document.getElementById("score-verdict");
const presentEl = document.getElementById("skills-present");
const missingEl = document.getElementById("skills-missing");
const resetBtn = document.getElementById("reset-btn");

// Open file picker when the card is clicked
uploadCard.addEventListener("click", () => fileInput.click());

// Highlight card while dragging a file over it
["dragover", "dragleave", "drop"].forEach((evt) =>
  uploadCard.addEventListener(evt, (e) => {
    e.preventDefault();
    uploadCard.classList.toggle("dragover", evt === "dragover");
    if (evt === "drop") handleFile(e.dataTransfer.files[0]);
  })
);

fileInput.addEventListener("change", () => handleFile(fileInput.files[0]));

resetBtn.addEventListener("click", () => {
  resultsEl.classList.add("hidden");
  uploadCard.parentElement.querySelector("#file-name").textContent = "";
  fileInput.value = "";
  uploadCard.scrollIntoView({ behavior: "smooth" });
});

function handleFile(file) {
  if (!file) return;
  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    fileNameEl.textContent = "⚠️ Please upload a PDF file.";
    fileNameEl.style.color = "var(--danger)";
    return;
  }

  fileNameEl.style.color = "var(--accent-2)";
  fileNameEl.textContent = `Analyzing ${file.name}…`;
  uploadCard.classList.add("hidden");
  resultsEl.classList.remove("hidden");

  // Simulate parsing delay
  setTimeout(() => showResults(file.name), 1200);
}

function showResults(name) {
  const { score, present, missing } = mockAnalyze();

  fileNameEl.textContent = `✅ ${name} analyzed`;
  scoreValueEl.textContent = score;
  scoreRing.style.setProperty("--score", score);
  verdictEl.textContent =
    score >= 75 ? "Strong resume — nearly shipped!" :
    score >= 50 ? "Decent — a few skills are missing." :
    "Needs work — key skills are missing.";

  presentEl.innerHTML = present.map((s) => `<span>${s}</span>`).join("");
  missingEl.innerHTML = missing.map((s) => `<span>${s}</span>`).join("");
}

// Deterministic-ish mock: pick a random score and split the skill pool
function mockAnalyze() {
  const score = Math.floor(35 + Math.random() * 60); // 35–95
  const shuffled = [...SKILL_POOL].sort(() => Math.random() - 0.5);
  const cut = Math.round((score / 100) * shuffled.length);
  return {
    score,
    present: shuffled.slice(0, cut),
    missing: shuffled.slice(cut),
  };
}
