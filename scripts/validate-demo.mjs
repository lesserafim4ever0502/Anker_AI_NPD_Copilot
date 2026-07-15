import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const failures = [];
const checks = [];

function assert(condition, message) {
  if (condition) checks.push(message);
  else failures.push(message);
}

async function readJson(name) {
  const file = path.join(root, "src", "data", name);
  return JSON.parse(await readFile(file, "utf8"));
}

async function findEmptyFiles(directory) {
  const empty = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) empty.push(...await findEmptyFiles(target));
    else if ((await stat(target)).size === 0) empty.push(path.relative(root, target));
  }
  return empty;
}

const appSource = await readFile(path.join(root, "src", "App.tsx"), "utf8");
const requiredRoutes = [
  "/project-workspace",
  "/evidence-pool",
  "/pain-radar",
  "/competitor-matrix",
  "/evaluation",
  "/proposal-prd",
  "/feishu-workflow",
];
for (const route of requiredRoutes) assert(appSource.includes(`path="${route}"`), `route ${route}`);

const projects = await readJson("projects.json");
const runs = await readJson("npdRuns.json");
const snapshots = await readJson("runSnapshots.json");
const products = await readJson("products.json");
const competitors = await readJson("competitorProducts.json");
const feedback = await readJson("feedback.json");
const painPoints = await readJson("painPoints.json");
const candidates = await readJson("candidates.json");
const gates = await readJson("gateEvaluations.json");
const committee = await readJson("agentEvaluations.json");
const summaries = await readJson("evaluationSummary.json");
const confirmations = await readJson("pendingConfirmations.json");
const proposal = await readJson("proposalPrd.json");

const expectedCounts = [
  [projects, 3, "projects"],
  [products, 12, "Anker products"],
  [competitors, 18, "competitor products"],
  [feedback, 13, "reviewed feedback records"],
  [painPoints, 5, "pain clusters"],
  [candidates, 3, "candidates"],
  [gates, 18, "Gate evaluations"],
  [committee, 6, "committee reviews"],
  [confirmations, 5, "pending confirmations"],
];
for (const [data, expected, label] of expectedCounts) {
  assert(Array.isArray(data) && data.length === expected, `${label}: ${expected}`);
}

const mainProject = projects.find((item) => item.id === "project-desktop-energy");
const mainRun = runs.find((item) => item.id === "run-anker-001");
const mainCandidate = candidates.find((item) => item.id === "candidate-compatibility-preflight");
const mainSummary = summaries.find((item) => item.candidateId === mainCandidate?.id);
assert(mainProject?.currentRunId === mainRun?.id, "main project and Run binding");
assert(mainRun?.status === "prd_drafted_need_confirmation", "frozen Run status");
assert(mainRun?.confidence === "medium", "frozen Run confidence");
assert(mainCandidate?.name === "跨平台 Dock 兼容预检助手", "frozen recommended candidate");
assert(mainSummary?.decision === "recommended_with_warning", "frozen decision state");
assert(proposal.candidateId === mainCandidate?.id && proposal.version === "v0.2", "Proposal PRD v0.2 binding");
assert(proposal.successMetrics?.length === 4, "Proposal PRD metrics: 4");
assert(proposal.risks?.length === 4, "Proposal PRD risks: 4");
assert(proposal.validationPlan?.length === 3, "Proposal PRD validation methods: 3");
assert(summaries.filter((item) => item.gateResult === "fail_evidence_gate").length === 1, "Fail Gate count: 1");

for (const snapshot of snapshots) {
  const project = projects.find((item) => item.id === snapshot.projectId);
  const run = runs.find((item) => item.id === snapshot.runId);
  assert(Boolean(project && run && run.projectId === project.id), `snapshot binding ${snapshot.runId}`);
}
assert(snapshots.filter((item) => item.status === "loaded").length === 1, "loaded Run snapshots: 1");

const sourceRecords = [...products, ...competitors, ...feedback];
const invalidUrls = sourceRecords.filter((item) => item.sourceUrl && !/^https:\/\//.test(item.sourceUrl));
assert(invalidUrls.length === 0, "all public source URLs use HTTPS");

const gitignore = await readFile(path.join(root, ".gitignore"), "utf8");
assert(gitignore.split(/\r?\n/).includes("data_workbench/feishu_workspace_manifest.local.json"), "local Feishu manifest is ignored");

const requiredDocs = [
  "README.md",
  "SPEC.md",
  "STATE.md",
  "DESIGN.md",
  "docs/DEMO_SCRIPT.md",
  "docs/SITES_HANDOFF.md",
  "submission_templates/README_评审材料导读.md",
  "submission_templates/Demo链接说明.md",
];
for (const file of requiredDocs) assert((await stat(path.join(root, file))).size > 0, `non-empty ${file}`);

const emptyFiles = [
  ...await findEmptyFiles(path.join(root, "src")),
  ...await findEmptyFiles(path.join(root, "docs")),
  ...await findEmptyFiles(path.join(root, "submission_templates")),
];
assert(emptyFiles.length === 0, "no empty source, docs, or submission template files");

if (failures.length) {
  console.error(`Demo validation failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Demo validation passed (${checks.length} checks).`);
for (const check of checks) console.log(`- ${check}`);
