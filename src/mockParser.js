// Mock resume parser — no backend, everything simulated in the browser.

export const SKILL_POOL = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL",
  "Git", "REST APIs", "Docker", "HTML & CSS", "PostgreSQL",
  "AWS", "CI/CD", "Testing", "MongoDB", "GraphQL",
];

// Pick a random score and split the skill pool to match it.
export function mockAnalyze() {
  const score = Math.floor(35 + Math.random() * 60); // 35–95
  const shuffled = [...SKILL_POOL].sort(() => Math.random() - 0.5);
  const cut = Math.round((score / 100) * shuffled.length);
  return {
    score,
    present: shuffled.slice(0, cut),
    missing: shuffled.slice(cut),
  };
}
