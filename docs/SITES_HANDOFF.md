# Sites Handoff Contract / Sites 交接契约

## 1. Purpose / 目的

**EN:** This document freezes the content and data contract for implementing the seven-page Anker AI-NPD Copilot demo in Sites. Sites is responsible for presentation and interaction, not for inventing or changing product decisions.

**中文：** 本文档冻结 Anker AI-NPD Copilot 七页 Demo 的内容与数据契约。Sites 负责视觉与交互实现，不负责发明或改写产品决策。

## 2. Frozen Decision State / 冻结决策状态

- Run: `智能充电 × 多设备移动办公 × 北美市场`
- Status: `PRD Drafted / Need Confirmation`
- Recommended candidate: `跨平台 Dock 兼容预检助手`
- Decision: `Recommended with Warning`
- Confidence: `Medium`
- Pending confirmations: `5`
- Data boundary: `Public sample data / 公开小样本验证集`
- Integration boundary: `Proposal-stage Mock`; no real frontend Feishu API and no real LLM call.

Sites must not present the candidate as approved, final, production-ready, universally compatible, or supported by Anker internal data.

Sites 不得将候选描述为已批准、最终方案、可量产、通用兼容，或声称使用了安克内部数据。

## 3. Seven-page Data Contract / 七页数据契约

| Page | Route | Required JSON sources | Required conclusion |
|---|---|---|---|
| 1 | `ProjectWorkspace` | `projects.json`, `npdRuns.json`, `runConfig.json`, `feishuLineage.json` | This is a multi-project NPD workspace; the main Run remains `Need Confirmation`. |
| 2 | `EvidencePool` | `evidenceSummary.json`, `evidenceSources.json`, `evidenceCards.json`, `feedback.json` | Evidence is traceable but limited public sample data. |
| 3 | `PainRadar` | `painPoints.json`, `feedback.json`, `designSignals.json` | Three clusters are insight-ready; thermal and desktop integration need more evidence. |
| 4 | `CompetitorMatrix` | `products.json`, `competitorProducts.json`, `capabilityMatrix.json`, `opportunityGaps.json`, `productOverlapWarnings.json` | Capability presence is potential coverage, not proof of pain resolution. |
| 5 | `Evaluation` | `candidates.json`, `candidateScreening.json`, `evaluationRubric.json`, `gateEvaluations.json`, `evaluationSummary.json`, `agentEvaluations.json`, `killCriteria.json`, `pendingConfirmations.json` | One candidate is Recommended with Warning; one requires validation; one fails the evidence gate. |
| 6 | `ProposalPrd` | `proposalPrd.json`, `pendingConfirmations.json`, `validationTasks.json` | PRD is a bounded proposal draft with proposed metrics and explicit non-goals. |
| 7 | `FeishuWorkflow` | `feishuWorkflow.json`, `feishuArtifacts.json`, `validationTasks.json`, `decisionLedger.json`, `feishuLineage.json` | Feishu is the collaboration and knowledge layer across the Run, not an export button. |

所有业务内容必须来自上述 JSON。组件中不得硬编码产品名、评分、证据数量、风险或推荐结论。

## 4. Required Global UI / 全局必备结构

- Header with product, workspace, project, Run, and public-sample label.
- Left seven-step navigation.
- Global Run Status Bar showing `PRD Drafted / Need Confirmation`.
- Shared project/Run context across Header, Run Status Bar, Decision Panel, and Project Workspace.
- Persistent Feishu Workspace Bar distinguishing the real workspace, reviewed local snapshot, and read-only frontend boundary.
- Page-level Feishu collaboration context showing sources, collaboration action, owners, review state, pending confirmations, and artifact destination on all seven routes.
- Right Decision Panel with current output, open questions, owner, and next action.
- Persistent `Proposal-stage Mock / Public sample data` boundary.
- Warning, Pending Confirmation, Decision Ledger, Kill Criteria, and Feishu collaboration context must remain visible.
- Status badges must remain single-line; constrained tables should scroll instead of wrapping badges.

## 5. Page 5 and Page 6 Guardrails / 评审与 PRD 护栏

**Page 5:** Display reasons before scores. A Fail Gate or Kill Criteria must remain blocking even when the weighted score is acceptable. Agent cards must show objections, not chat transcripts.

**Page 6:** Display P0 scope, non-goals, proposed metrics, risks, validation plan, evidence limitations, and pending confirmations. Proposed targets must remain labeled `pending_confirmation`.

## 6. Interaction Scope / 交互范围

Required interactions:

- Navigate across all seven pages.
- Select a project and candidate.
- Filter or inspect evidence, pain points, products, and Gate results.
- Open Pending Confirmation and Decision Ledger details.
- Distinguish existing Feishu assets, reviewed snapshots, and proposal-stage write-back mocks without invoking a real API.

Not required:

- Authentication, backend persistence, web crawling, live LLM agents, real Feishu frontend API, or production analytics.

## 7. Visual Acceptance / 视觉验收

- Enterprise decision cockpit, not a landing page or generic dashboard.
- Dense but readable information hierarchy; no marketing hero.
- No card nesting and no oversized headings inside operational panels.
- Desktop and mobile layouts must not overlap or truncate critical decision text.
- Use restrained status colors and familiar icons; keep evidence and warnings visually distinct.

## 8. Sites Completion Criteria / Sites 完成标准

1. All seven routes render from JSON and navigation works.
2. Page 1 shows three projects and the correct leading candidate.
3. Page 4 shows 12 Anker and 18 competitor products or a clearly summarized matrix.
4. Page 5 shows 18 Gate evaluations, six committee roles, one Fail Gate, and the final warning state.
5. Page 6 shows the frozen Proposal PRD, three candidate-specific confirmations, four proposed metrics, four risks, and three validation methods.
6. Page 7 shows Base, document, task, meeting, Decision Ledger, and knowledge-reuse structures.
7. Desktop and mobile screenshots pass visual QA with no overlap.
8. The demo never implies one-click generation or final approval.
