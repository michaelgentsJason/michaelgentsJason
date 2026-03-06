const fs = require("fs");
const path = require("path");

const readmePath = path.join(__dirname, "..", "README.md");
const readme = fs.readFileSync(readmePath, "utf8");

const thisYear = new Date().getUTCFullYear();
const startTime = Date.parse(`${thisYear}-01-01T00:00:00Z`);
const endTime = Date.parse(`${thisYear + 1}-01-01T00:00:00Z`);
const now = Date.now();

const progress = Math.min(1, Math.max(0, (now - startTime) / (endTime - startTime)));
const barCapacity = 30;
const passed = Math.floor(progress * barCapacity);
const bar = `{ ${"█".repeat(passed)}${"▁".repeat(barCapacity - passed)} }`;

const section = `${bar} ${(progress * 100).toFixed(2)}%\nUpdated: ${new Date(now).toUTCString()}`;
const updated = readme.replace(
  /<!-- YEAR_PROGRESS_START -->[\s\S]*?<!-- YEAR_PROGRESS_END -->/m,
  `<!-- YEAR_PROGRESS_START -->\n${section}\n<!-- YEAR_PROGRESS_END -->`
);

if (updated !== readme) {
  fs.writeFileSync(readmePath, updated, "utf8");
  console.log("README updated.");
} else {
  console.log("No changes.");
}
