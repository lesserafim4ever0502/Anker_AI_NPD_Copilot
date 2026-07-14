# CHANGELOG.md

## [Unreleased]

### Changed

- Timestamp: 2026-07-14T14:10:36+08:00.
- Refined the seven-page demo as a desktop-first decision workspace with guarded Run snapshot activation, persistent desktop decision context, clearer Feishu state boundaries, and accessible selection controls.
- Modified paths and implementation metrics:
  - `DESIGN.md`: L1-471 -> L1-481, +10 -0.
  - `STATE.md`: L1-235 -> L1-241, +10 -4.
  - `docs/UX_PAGE_DETAILS.md`: L1-127 -> L1-131, +5 -1.
  - `src/components/Header.tsx`: L1-28 -> L1-24, +2 -6.
  - `src/components/PageDataLineage.tsx`: L1-22 -> L1-25, +4 -1.
  - `src/components/StatusBadge.tsx`: L1-72 -> L1-84, +13 -1.
  - `src/context/ProjectRunContext.tsx`: L1-38 -> L1-56, +22 -4.
  - `src/data/feishuArtifacts.json`: L1-98 -> L1-98, +5 -5.
  - `src/data/runSnapshots.json`: new file, L1-0 -> L1-19, +19 -0.
  - `src/index.css`: L1-112 -> L1-113, +1 -0.
  - `src/pages/CompetitorMatrix.tsx`: L1-60 -> L1-60, +2 -2.
  - `src/pages/Evaluation.tsx`: L1-56 -> L1-56, +4 -4.
  - `src/pages/EvidencePool.tsx`: L1-70 -> L1-70, +2 -2.
  - `src/pages/FeishuWorkflow.tsx`: L1-39 -> L1-39, +5 -5.
  - `src/pages/PainRadar.tsx`: L1-61 -> L1-61, +2 -2.
  - `src/pages/ProjectWorkspace.tsx`: L1-80 -> L1-75, +8 -13.
  - `src/pages/ProposalPrd.tsx`: L1-50 -> L1-50, +2 -2.
  - `src/types/index.ts`: L1-246 -> L1-256, +11 -1.
- Validation: TypeScript build and `npm run build` passed; frozen business counts and recommendation remain unchanged.
- Visual QA: all seven routes were checked at 1280 x 800 and 1920 x 1080, with additional 1440 x 900 checks for Project Workspace, Evaluation, and Feishu Workflow; mobile-specific acceptance is explicitly deferred.
- Cleanup: removed the confirmed untracked `artifacts/ui-audit/` screenshot directory; verification screenshots remain under the gitignored `artifacts/ui-review/` path.
- `docs/CHANGELOG.md`: L1-319 -> L1-345, +26 -0 including this entry.

- Timestamp: 2026-07-14T10:46:31+08:00.
- Integrated project/Run context and Feishu data lineage across the seven-page frontend, while resolving the annotated layout and branding issues.
- Modified paths and implementation metrics:
  - `.gitignore`: L1-11 -> L1-12, +1 -0.
  - `DESIGN.md`: L1-455 -> L1-471, +16 -0.
  - `STATE.md`: L1-224 -> L1-235, +13 -2.
  - `docs/SITES_HANDOFF.md`: L1-84 -> L1-88, +6 -2.
  - `docs/UX_PAGE_DETAILS.md`: L1-124 -> L1-127, +6 -3.
  - `src/App.tsx`: L1-26 -> L1-27, +3 -2.
  - `src/components/DecisionPanel.tsx`: L1-48 -> L1-46, +2 -4.
  - `src/components/FeishuWorkspaceBar.tsx`: new file, L1-0 -> L1-21, +21 -0.
  - `src/components/Header.tsx`: L1-28 -> L1-28, +2 -2.
  - `src/components/Layout.tsx`: L1-31 -> L1-29, +6 -8.
  - `src/components/PageDataLineage.tsx`: new file, L1-0 -> L1-22, +22 -0.
  - `src/components/PageHeader.tsx`: L1-24 -> L1-24, +2 -2.
  - `src/components/StatusBadge.tsx`: L1-72 -> L1-72, +1 -1.
  - `src/context/ProjectRunContext.tsx`: new file, L1-0 -> L1-38, +38 -0.
  - `src/data/feishuLineage.json`: new file, L1-0 -> L1-51, +51 -0.
  - `src/index.css`: L1-97 -> L1-112, +23 -8.
  - `src/pages/CompetitorMatrix.tsx`: L1-58 -> L1-60, +5 -3.
  - `src/pages/Evaluation.tsx`: L1-53 -> L1-56, +8 -5.
  - `src/pages/EvidencePool.tsx`: L1-67 -> L1-70, +4 -1.
  - `src/pages/FeishuWorkflow.tsx`: L1-38 -> L1-39, +6 -5.
  - `src/pages/PainRadar.tsx`: L1-58 -> L1-61, +6 -3.
  - `src/pages/ProjectWorkspace.tsx`: L1-66 -> L1-80, +25 -11.
  - `src/pages/ProposalPrd.tsx`: L1-47 -> L1-50, +3 -0.
  - `public/anker-innovations-logo.svg`: new file, L1-0 -> L1-4, +4 -0.
- Validation: `npm run build` passed; frozen counts remain 3 projects, 12 Anker products, 18 competitors, 18 Gate evaluations, 6 committee roles, and 5 open confirmations.
- Visual QA: desktop checks covered Pages 1, 3, 4, 5, and 7; a 390 px viewport check covered Page 1; status badges remain single-line and the frontend Automation Roadmap is no longer rendered.
- `docs/CHANGELOG.md`: L1-288 -> L1-319, +31 -0 including this entry.

- Timestamp: 2026-07-13T22:32:38+08:00.
- Withdrew both public demo entry points while frontend optimization continues.
- Modified paths and hosting-status metrics:
  - `STATE.md`: L1-222 -> L1-224, +8 -6.
  - `submission_templates/Demo链接说明.md`: L1-25 -> L1-25, +3 -3.
- Hosting: GitHub Pages was removed and its deployment workflow disabled; Sites access was changed from public to owner-only custom access.
- Verification: the Pages API returns HTTP 404 and the Sites access policy reports `custom` with no additional user or group allowlists.
- `docs/CHANGELOG.md`: L1-279 -> L1-288, +9 -0 including this entry.

- Timestamp: 2026-07-13T21:51:45+08:00.
- Published the public GitHub Pages fallback and documented it as the primary team demo entry point.
- Modified paths and deployment documentation metrics:
  - `STATE.md`: L1-214 -> L1-222, +12 -4.
  - `submission_templates/Demo链接说明.md`: L1-23 -> L1-25, +4 -2.
- Deployment: GitHub Actions run `29255347383` completed successfully.
- Verification: the public root URL and `#/evaluation` both returned HTTP 200 with the expected title.
- `docs/CHANGELOG.md`: L1-270 -> L1-279, +9 -0 including this entry.

- Timestamp: 2026-07-13T21:46:26+08:00.
- Fixed the Pages CI build by replacing an untyped Node environment lookup with Vite's explicit `pages` mode.
- Modified paths and CI fix metrics:
  - `.github/workflows/deploy-pages.yml`: L1-50 -> L1-48, +1 -3.
  - `package.json`: L1-27 -> L1-28, +1 -0.
  - `vite.config.ts`: L1-7 -> L1-7, +3 -3.
- Validation: `npm run build:pages` passed locally and emitted the expected repository-prefixed asset URLs.
- `docs/CHANGELOG.md`: L1-261 -> L1-270, +9 -0 before this entry.

- Timestamp: 2026-07-13T21:44:12+08:00.
- Configured a GitHub Pages fallback deployment with repository-aware asset paths and hash-based client routing.
- Modified paths and deployment metrics:
  - `.github/workflows/deploy-pages.yml`: L1-0 -> L1-50, +50 -0.
  - `vite.config.ts`: L1-6 -> L1-7, +1 -0.
  - `src/main.tsx`: L1-13 -> L1-13, +3 -3.
  - `src/components/DecisionPanel.tsx`: L1-47 -> L1-48, +2 -1.
  - `src/pages/ProjectWorkspace.tsx`: L1-65 -> L1-66, +2 -1.
- Validation: normal and `GITHUB_PAGES=true` production builds passed; generated assets use `/Anker_AI_NPD_Copilot/` and all seven routes remain JSON-driven.
- `docs/CHANGELOG.md`: L1-250 -> L1-261, +11 -0 before this entry.

- Timestamp: 2026-07-13T21:10:30+08:00.
- Implemented and privately deployed the seven-page Sites demo without changing frozen business JSON conclusions.
- Modified paths and implementation metrics:
  - `.openai/hosting.json`: L1-0 -> L1-3, +3 -0.
  - `package-lock.json`: L1-0 -> L1-2683, +2683 -0.
  - `package.json`: L1-26 -> L1-27, +2 -1.
  - `scripts/prepare-sites-build.mjs`: L1-0 -> L1-18, +18 -0.
  - `src/components/DecisionPanel.tsx`: L1-37 -> L1-47, +25 -15.
  - `src/components/Header.tsx`: L1-24 -> L1-28, +17 -13.
  - `src/components/Layout.tsx`: L1-31 -> L1-31, +4 -4.
  - `src/components/MetricCard.tsx`: L1-17 -> L1-17, +2 -2.
  - `src/components/PageHeader.tsx`: L1-0 -> L1-24, +24 -0.
  - `src/components/RunStatusBar.tsx`: L1-38 -> L1-30, +17 -25.
  - `src/components/StatusBadge.tsx`: L1-62 -> L1-72, +10 -0.
  - `src/components/StepNav.tsx`: L1-36 -> L1-31, +14 -19.
  - `src/index.css`: L1-22 -> L1-97, +87 -12.
  - `src/pages/CompetitorMatrix.tsx`: L1-78 -> L1-58, +35 -55.
  - `src/pages/Evaluation.tsx`: L1-94 -> L1-53, +30 -71.
  - `src/pages/EvidencePool.tsx`: L1-67 -> L1-67, +43 -43.
  - `src/pages/FeishuWorkflow.tsx`: L1-82 -> L1-38, +20 -64.
  - `src/pages/PainRadar.tsx`: L1-60 -> L1-58, +37 -39.
  - `src/pages/ProjectWorkspace.tsx`: L1-61 -> L1-65, +46 -42.
  - `src/pages/ProposalPrd.tsx`: L1-106 -> L1-47, +31 -90.
  - `STATE.md`: L1-207 -> L1-214, +15 -8.
  - `submission_templates/Demo链接说明.md`: L1-19 -> L1-23, +5 -1.
- Validation: production build passed; 7 routes, 3 projects, 12 Anker products, 18 competitor products, 18 Gate evaluations, 6 committee roles, 1 Fail Gate, 4 metrics, 4 risks, 3 validation methods, and 5 open confirmations verified.
- Deployment: private Sites production URL `https://anker-ai-npd-copilot.yingpengzhuo69.chatgpt.site` succeeded.
- `docs/CHANGELOG.md`: L1-221 -> L1-250, +29 -0 before this entry.

- Timestamp: 2026-07-13T12:03:59+08:00.
- Repository completeness audit found zero zero-byte files, zero files of five bytes or fewer, and no empty Markdown links. Instructional CSV rows are explicitly excluded from demo evidence.
- Modified paths and current working-tree metrics relative to `HEAD`:
  - `README.md`: L1-164 -> L1-173, +22 -13.
  - `STATE.md`: L1-206 -> L1-207, +18 -17.
  - `assets_placeholder/README.md`: L1-10 -> L1-12, +5 -3.
  - `data_templates/products.json`: L1-49 -> L1-14, +13 -48.
  - `data_templates/raw_evidence_intake.csv`: L1-2 -> L1-2, +2 -2.
  - `data_templates/structured_evidence_template.csv`: L1-1 -> L1-2, +2 -1.
  - `data_workbench/README.md`: L1-14 -> L1-22, +10 -2.
  - `docs/DATA_INTAKE.md`: L1-333 -> L1-337, +4 -0.
  - `docs/DATA_SCHEMA.md`: L1-175 -> L1-46, +33 -162.
  - `docs/DEVELOPMENT_PLAN.md`: L1-68 -> L1-60, +10 -18.
  - `docs/FEISHU_COLLABORATION.md`: L1-75 -> L1-77, +6 -4.
  - `docs/ROLE_JOURNEYS.md`: L1-49 -> L1-49, +5 -5.
  - `docs/START_HERE_DEV.md`: L1-57 -> L1-48, +15 -24.
  - `public/README.md`: L1-3 -> L1-5, +3 -1.
  - `scripts/README.md`: L1-3 -> L1-5, +3 -1.
  - `src/README.md`: L1-3 -> L1-5, +3 -1.
  - `submission_templates/Demo链接说明.md`: L1-17 -> L1-19, +3 -1.
  - `submission_templates/Feishu协同说明.md`: L1-9 -> L1-13, +4 -0.
  - `submission_templates/README_评审材料导读.md`: L1-14 -> L1-16, +2 -0.
  - `docs/CHANGELOG.md`: L1-195 -> L1-222, +27 -0 before this entry.

### Added

- Timestamp: 2026-07-13T11:51:49+08:00.
- Modified paths:
  - `src/data/proposalPrd.json`: L1-99 -> L1-83, +65 -81.
  - `src/data/validationTasks.json`: L1-38 -> L1-7, +6 -37.
  - `src/data/projects.json`: L1-71 -> L1-71, +5 -5.
  - `src/data/npdRuns.json`: L1-57 -> L1-57, +5 -5.
  - `src/data/feishuArtifacts.json`: L1-96 -> L1-98, +10 -8.
  - `src/data/feishuWorkflow.json`: L1-61 -> L1-61, +3 -3.
  - `src/pages/ProposalPrd.tsx`: L1-71 -> L1-106, +35 -0.
  - `docs/SITES_HANDOFF.md`: new file, L1-0 -> L1-84, +84 -0.
  - `docs/DEMO_SCRIPT.md`: L1-31 -> L1-45, +29 -15.
  - `docs/DECISION_LOGIC.md`: L1-58 -> L1-58, +1 -1.
  - `README.md`: L1-164 -> L1-164, +1 -1.
  - `SPEC.md`: L1-164 -> L1-164, +1 -1.
  - `DESIGN.md`: L1-455 -> L1-455, +1 -1.
  - `review_index.json`: L1-125 -> L1-127, +3 -1.
  - `data_workbench/feishu_workspace_manifest.json`: L1-164 -> L1-171, +7 -0.
  - `data_workbench/feishu_workspace_manifest.local.json`: L1-62 -> L1-69, +7 -0; file remains gitignored.
  - `STATE.md`: L1-206 -> L1-209, +6 -3.
  - `docs/CHANGELOG.md`: L1-174 -> L1-195, +21 -0.

- Timestamp: 2026-07-13T11:06:10+08:00.
- Modified paths:
  - `src/data/evaluationRubric.json`: new file, L1-0 -> L1-23, +23 -0.
  - `src/data/gateEvaluations.json`: L1-1 -> L1-22, +22 -1.
  - `src/data/evaluationSummary.json`: new file, L1-0 -> L1-7, +7 -0.
  - `src/data/agentEvaluations.json`: L1-1 -> L1-80, +80 -1.
  - `src/data/pendingConfirmations.json`: L1-38 -> L1-62, +24 -0.
  - `src/data/decisionLedger.json`: L1-35 -> L1-46, +11 -0.
  - `src/types/index.ts`: L1-230 -> L1-246, +16 -0.
  - `src/components/StatusBadge.tsx`: L1-59 -> L1-62, +3 -0.
  - `src/pages/Evaluation.tsx`: L1-88 -> L1-94, +19 -13.
  - `data_workbench/feishu_workspace_manifest.json`: L1-154 -> L1-164, +10 -0.
  - `data_workbench/feishu_workspace_manifest.local.json`: L1-56 -> L1-62, +6 -0; file remains gitignored.
  - `STATE.md`: L1-203 -> L1-206, +9 -6.
  - `docs/CHANGELOG.md`: L1-158 -> L1-174, +16 -0.

- Timestamp: 2026-07-13T10:56:03+08:00.
- Modified paths:
  - `src/data/candidates.json`: L1-82 -> L1-56, +49 -75.
  - `src/data/candidateScreening.json`: new file, L1-0 -> L1-26, +26 -0.
  - `src/data/gateEvaluations.json`: L1-34 -> L1-1, +1 -34.
  - `src/data/agentEvaluations.json`: L1-24 -> L1-1, +1 -24.
  - `src/data/killCriteria.json`: L1-18 -> L1-26, +17 -9.
  - `src/data/pendingConfirmations.json`: L1-47 -> L1-38, +23 -32.
  - `src/data/decisionLedger.json`: L1-35 -> L1-35, +8 -8.
  - `src/types/index.ts`: L1-211 -> L1-230, +22 -3.
  - `src/components/StatusBadge.tsx`: L1-53 -> L1-59, +6 -0.
  - `src/pages/Evaluation.tsx`: L1-77 -> L1-88, +14 -3.
  - `data_workbench/feishu_workspace_manifest.json`: L1-149 -> L1-154, +5 -0.
  - `data_workbench/feishu_workspace_manifest.local.json`: L1-53 -> L1-56, +3 -0; file remains gitignored.
  - `STATE.md`: L1-201 -> L1-203, +4 -2.
  - `docs/CHANGELOG.md`: L1-141 -> L1-158, +17 -0.

- Timestamp: 2026-07-12T20:12:35+08:00.
- Modified paths:
  - `src/data/capabilityMatrix.json`: new file, L1-0 -> L1-32, +32 -0.
  - `src/data/products.json`: L1-49 -> L1-14, +13 -48.
  - `src/data/competitorProducts.json`: L1-38 -> L1-20, +18 -36.
  - `src/data/opportunityGaps.json`: L1-31 -> L1-6, +5 -30.
  - `src/data/productOverlapWarnings.json`: L1-11 -> L1-5, +4 -10.
  - `src/types/index.ts`: L1-178 -> L1-195, +18 -0.
  - `src/pages/CompetitorMatrix.tsx`: L1-71 -> L1-72, +2 -1.
  - `data_workbench/feishu_workspace_manifest.json`: L1-139 -> L1-149, +10 -0.
  - `data_workbench/feishu_workspace_manifest.local.json`: L1-47 -> L1-53, +6 -0; file remains gitignored.
  - `STATE.md`: L1-137 -> L1-146, +13 -0.
  - `docs/CHANGELOG.md`: L1-127 -> L1-141, +14 -0.

- Timestamp: 2026-07-12T19:38:25+08:00.
- Modified paths:
  - `src/types/index.ts`: L1-184 -> L1-192, +9 -1.
  - `src/data/feedback.json`: L1-18 -> L1-249, +243 -12.
  - `src/data/painPoints.json`: L1-58 -> L1-77, +67 -48.
  - `src/data/evidenceCards.json`: L1-52 -> L1-57, +47 -42.
  - `src/data/evidenceSummary.json`: L1-11 -> L1-8, +6 -9.
  - `data_workbench/feishu_workspace_manifest.json`: L1-134 -> L1-139, +5 -0.
  - `data_workbench/feishu_workspace_manifest.local.json`: L1-44 -> L1-47, +3 -0; file remains gitignored.
  - `STATE.md`: L1-185 -> L1-188, +3 -0.
  - `docs/CHANGELOG.md`: L1-115 -> L1-127, +12 -0.

- Timestamp: 2026-07-12T18:54:38+08:00.
- Modified paths:
  - `data_workbench/feishu_workspace_manifest.json`: L1-134 -> L1-134, +1 -1.
  - `STATE.md`: L1-184 -> L1-185, +1 -0.
  - `docs/CHANGELOG.md`: L1-109 -> L1-115, +6 -0.

- Timestamp: 2026-07-12T10:34:50+08:00.
- Modified paths:
  - `data_workbench/feishu_workspace_manifest.json`: L1-124 -> L1-134, +10 -0.
  - `data_workbench/feishu_workspace_manifest.local.json`: L1-37 -> L1-44, +7 -0; file remains gitignored.
  - `STATE.md`: L1-175 -> L1-184, +9 -0.
  - `docs/CHANGELOG.md`: L1-102 -> L1-109, +7 -0.

- Timestamp: 2026-07-08T16:02:12+08:00.
- Modified paths:
  - `package.json`: new file, L1-0 -> L1-26, +26 -0.
  - `index.html`: new file, L1-0 -> L1-12, +12 -0.
  - `vite.config.ts`: new file, L1-0 -> L1-6, +6 -0.
  - `tsconfig.json`: new file, L1-0 -> L1-11, +11 -0.
  - `tsconfig.app.json`: new file, L1-0 -> L1-21, +21 -0.
  - `tsconfig.node.json`: new file, L1-0 -> L1-14, +14 -0.
  - `postcss.config.js`: new file, L1-0 -> L1-6, +6 -0.
  - `tailwind.config.js`: new file, L1-0 -> L1-19, +19 -0.
  - `src/main.tsx`: new file, L1-0 -> L1-13, +13 -0.
  - `src/App.tsx`: new file, L1-0 -> L1-26, +26 -0.
  - `src/index.css`: new file, L1-0 -> L1-22, +22 -0.
  - `src/vite-env.d.ts`: new file, L1-0 -> L1-1, +1 -0.
  - `src/types/index.ts`: new file, L1-0 -> L1-184, +184 -0.
  - `src/components/Layout.tsx`: new file, L1-0 -> L1-31, +31 -0.
  - `src/components/Header.tsx`: new file, L1-0 -> L1-24, +24 -0.
  - `src/components/StepNav.tsx`: new file, L1-0 -> L1-36, +36 -0.
  - `src/components/RunStatusBar.tsx`: new file, L1-0 -> L1-38, +38 -0.
  - `src/components/DecisionPanel.tsx`: new file, L1-0 -> L1-37, +37 -0.
  - `src/components/StatusBadge.tsx`: new file, L1-0 -> L1-53, +53 -0.
  - `src/components/MetricCard.tsx`: new file, L1-0 -> L1-17, +17 -0.
  - `src/pages/ProjectWorkspace.tsx`: new file, L1-0 -> L1-61, +61 -0.
  - `src/pages/EvidencePool.tsx`: new file, L1-0 -> L1-67, +67 -0.
  - `src/pages/PainRadar.tsx`: new file, L1-0 -> L1-60, +60 -0.
  - `src/pages/CompetitorMatrix.tsx`: new file, L1-0 -> L1-77, +77 -0.
  - `src/pages/Evaluation.tsx`: new file, L1-0 -> L1-77, +77 -0.
  - `src/pages/ProposalPrd.tsx`: new file, L1-0 -> L1-71, +71 -0.
  - `src/pages/FeishuWorkflow.tsx`: new file, L1-0 -> L1-82, +82 -0.
  - `src/data/agentEvaluations.json`: new file, L1-0 -> L1-24, +24 -0.
  - `src/data/candidates.json`: new file, L1-0 -> L1-82, +82 -0.
  - `src/data/competitorProducts.json`: new file, L1-0 -> L1-38, +38 -0.
  - `src/data/decisionLedger.json`: new file, L1-0 -> L1-35, +35 -0.
  - `src/data/designSignals.json`: new file, L1-0 -> L1-27, +27 -0.
  - `src/data/evidence_schema.json`: new file, L1-0 -> L1-135, +135 -0.
  - `src/data/evidenceCards.json`: new file, L1-0 -> L1-52, +52 -0.
  - `src/data/evidenceSources.json`: new file, L1-0 -> L1-26, +26 -0.
  - `src/data/evidenceSummary.json`: new file, L1-0 -> L1-11, +11 -0.
  - `src/data/feedback.json`: new file, L1-0 -> L1-18, +18 -0.
  - `src/data/feishuArtifacts.json`: new file, L1-0 -> L1-96, +96 -0.
  - `src/data/feishuWorkflow.json`: new file, L1-0 -> L1-61, +61 -0.
  - `src/data/gateEvaluations.json`: new file, L1-0 -> L1-34, +34 -0.
  - `src/data/killCriteria.json`: new file, L1-0 -> L1-18, +18 -0.
  - `src/data/npdRuns.json`: new file, L1-0 -> L1-57, +57 -0.
  - `src/data/opportunityGaps.json`: new file, L1-0 -> L1-31, +31 -0.
  - `src/data/painPoints.json`: new file, L1-0 -> L1-58, +58 -0.
  - `src/data/pendingConfirmations.json`: new file, L1-0 -> L1-47, +47 -0.
  - `src/data/productOverlapWarnings.json`: new file, L1-0 -> L1-11, +11 -0.
  - `src/data/products.json`: new file, L1-0 -> L1-49, +49 -0.
  - `src/data/projects.json`: new file, L1-0 -> L1-71, +71 -0.
  - `src/data/proposalPrd.json`: new file, L1-0 -> L1-99, +99 -0.
  - `src/data/runConfig.json`: new file, L1-0 -> L1-11, +11 -0.
  - `src/data/validationTasks.json`: new file, L1-0 -> L1-38, +38 -0.
  - `STATE.md`: L1-142 -> L1-175, +33 -0.
  - `docs/CHANGELOG.md`: L1-46 -> L1-102, +56 -0.

- Timestamp: 2026-07-08T11:19:00+08:00.
- Modified paths:
  - `data_workbench/feishu_workspace_manifest.json`: L1-115 -> L1-124, +10 -1.
  - `STATE.md`: L1-130 -> L1-142, +12 -0.
  - `docs/CHANGELOG.md`: L1-40 -> L1-46, +6 -0.

- Timestamp: 2026-07-08T10:34:45+08:00.
- Modified paths:
  - `data_workbench/feishu_workspace_manifest.json`: new file, L1-0 -> L1-115, +115 -0.
  - `STATE.md`: L95-0 -> L95-130, +36 -0.
  - `docs/CHANGELOG.md`: L1-30 -> L1-40, +10 -0.

## v0.3 Pre-dev Final Discussion Package

- 完成 7 页页面设计 V1。
- 增加多项目状态管理。
- 增加 NPD Run 生命周期。
- 增加 Decision Panel、Decision Ledger、Pending Confirmation 机制。
- 增加飞书四层协同设计。
- 增加 Demo 演示脚本。
- 增加详细开题报告结构。
- 更新 AGENT 开发规范。

## v0.2

- 新增 DESIGN.md。
- 将首页升级为页面设计入口。

## v0.1

- 建立 README、AGENT、SPEC、STATE、DECISIONS。


## Final Starter Package Update

- Promoted predev files to repository root.
- Merged Evidence Intake Pipeline documents and templates.
- Added `docs/START_HERE_DEV.md`.
- Added placeholders for `src/`, `scripts/`, `public/`, and `data_workbench/`.
- Updated `README.md`, `AGENT.md`, `STATE.md`, `DECISIONS.md`, and `review_index.json`.
