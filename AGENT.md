# AGENT.md

## 0. Mandatory First Read

Any AI coding agent working on this repository must read these files before creating or modifying code:

1. `SPEC.md`
2. `STATE.md`
3. `DESIGN.md`
4. `docs/SYSTEM_PRD.md`
5. `docs/UX_PAGE_DETAILS.md`
6. `docs/DATA_SCHEMA.md`
7. `docs/NPD_RUN_LIFECYCLE.md`
8. `docs/DECISION_LOGIC.md`
9. `docs/FEISHU_COLLABORATION.md`

Do not start implementation from assumptions. The product narrative is part of the architecture.

---

## 1. Repository Purpose

This repository contains the pre-development documentation and templates for **Anker AI-NPD Copilot**, an evidence-driven AI-native new product definition system designed for the Anker Innovation challenge.

This project is not a generic chatbot and not a one-shot product idea generator. It demonstrates a structured NPD workflow:

```text
Multi-project Workspace
  → NPD Run
  → Evidence Pool
  → Pain Point Radar
  → Competitor Opportunity Matrix
  → Stage-Gate Evaluation
  → Multi-Agent Product Committee
  → Sample NP PRD Draft
  → Feishu Collaboration Archive
```

The core concept is **Evidence-to-Decision**, not Prompt-to-Idea.

---

## 2. Current Demo Scope

This is a proposal-stage MVP.

Implemented or planned in the first development iteration:

- Static React web demo.
- Local JSON data.
- Multi-project status dashboard.
- One primary NPD Run with complete 7-page walkthrough.
- Predefined candidate NP opportunities.
- Mock Stage-Gate evaluation.
- Mock multi-agent review outputs.
- Mock Feishu collaboration artifacts.
- Mock Decision Ledger and Pending Confirmations.

Not implemented at this stage:

- Real-time web crawling.
- Real Feishu API integration.
- Real LLM agent execution.
- User authentication.
- Production backend.
- Model fine-tuning.
- Real multi-user permissions.
- Real project persistence beyond local data.

---

## 3. Non-negotiable Product Rules

When modifying or implementing this repository:

1. Do not present the NPD workflow as one-click completion.
2. Preserve NPD Run status across all pages.
3. Always show Pending Confirmations when Gate or Agent evaluation raises uncertainty.
4. Keep PRD output as a draft, not a final product launch decision.
5. Feishu handoff must include meeting, task, document, table and knowledge archive, not just export.
6. Decision progress must be visible through Run Status Bar, Decision Panel and Decision Ledger.
7. Page transitions should support backtracking conceptually, even if implemented as static navigation.
8. If demo data is predefined, label it as proposal-stage sample data.
9. Preserve the Anker context and the consumer electronics NPD context.
10. Do not turn the demo into a generic chat interface.
11. Do not remove Stage-Gate, Kill Criteria, risk review or contrarian Agent logic.
12. Prefer clear, structured UI over decorative animation.
13. If adding a new page or data schema, update README, AGENT, SPEC, DESIGN and DATA_SCHEMA.

---

## 4. Primary User Flow

The intended demo flow is:

1. `WorkspacePage` / Project Start: manage multiple NPD projects and enter the main NPD Run.
2. `EvidencePoolPage`: show data sources, evidence confidence, evidence cards and gaps.
3. `PainRadarPage`: convert user feedback into pain tags, severity and design signals.
4. `CompetitorMatrixPage`: map pain points to competitor coverage and opportunity gaps.
5. `EvaluationPage`: evaluate 3 candidate NPs through Stage-Gate and multi-agent review.
6. `ProposalPrdPage`: generate a sample NP PRD summary draft with evidence chain.
7. `FeishuWorkflowPage`: archive outputs into Feishu docs, base, tasks, meetings and knowledge base.

---

## 5. Required Project Structure After Development

When creating the real front-end project, use this structure unless there is a strong reason to change it:

```text
anker-ai-npd-copilot/
├── package.json
├── index.html
├── README.md
├── AGENT.md
├── SPEC.md
├── STATE.md
├── DESIGN.md
├── review_index.json
├── docs/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── types/
│   │   └── index.ts
│   ├── data/
│   │   ├── projects.json
│   │   ├── npdRuns.json
│   │   ├── runConfig.json
│   │   ├── evidenceSummary.json
│   │   ├── evidenceSources.json
│   │   ├── evidenceCards.json
│   │   ├── feedback.json
│   │   ├── painPoints.json
│   │   ├── designSignals.json
│   │   ├── products.json
│   │   ├── opportunityGaps.json
│   │   ├── productOverlapWarnings.json
│   │   ├── candidates.json
│   │   ├── gateEvaluations.json
│   │   ├── agentEvaluations.json
│   │   ├── killCriteria.json
│   │   ├── pendingConfirmations.json
│   │   ├── proposalPrd.json
│   │   ├── validationTasks.json
│   │   ├── feishuArtifacts.json
│   │   ├── feishuWorkflow.json
│   │   └── decisionLedger.json
│   ├── pages/
│   │   ├── WorkspacePage.tsx
│   │   ├── EvidencePoolPage.tsx
│   │   ├── PainRadarPage.tsx
│   │   ├── CompetitorMatrixPage.tsx
│   │   ├── EvaluationPage.tsx
│   │   ├── ProposalPrdPage.tsx
│   │   └── FeishuWorkflowPage.tsx
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   │   ├── StepNav.tsx
│   │   ├── RunStatusBar.tsx
│   │   ├── DecisionPanel.tsx
│   │   ├── DecisionLedger.tsx
│   │   ├── MetricCard.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── EvidenceCard.tsx
│   │   ├── ProductMatrixTable.tsx
│   │   ├── PainPointCard.tsx
│   │   ├── CandidateCard.tsx
│   │   ├── StageGateMatrix.tsx
│   │   ├── AgentReviewCard.tsx
│   │   ├── PrdPreview.tsx
│   │   ├── FeishuArtifactCard.tsx
│   │   └── MockActionButton.tsx
│   └── utils/
│       ├── status.ts
│       ├── scoring.ts
│       └── format.ts
└── tailwind.config.js
```

---

## 6. Page Implementation Priorities

### P0

- Workspace with three project cards.
- Global Run Status Bar.
- Step Navigation.
- Evidence metrics and evidence chain.
- Pain point priority list and design signals.
- Competitor coverage matrix and opportunity gaps.
- Candidate cards, Stage-Gate matrix, Agent cards, Kill Criteria.
- PRD draft preview with evidence sidebar.
- Feishu artifacts, meeting handoff, validation tasks, decision ledger.

### P1

- Filtering project cards by status.
- Clicking evidence / pain / product / candidate cards to update detail panels.
- Mock Feishu sync state.
- Decision Ledger drawer.
- Risk and Pending Confirmation detail expansion.

### P2

- Dynamic charts.
- Markdown export.
- Real Feishu document links.
- CLI sync demo.
- Editing PRD draft.

---

## 7. Visual and Interaction Rules

Follow `DESIGN.md`.

High-level visual direction:

- Enterprise decision cockpit, not consumer marketing page.
- Light background, clean cards, clear hierarchy.
- Use status badges heavily: Completed, In Progress, Need Confirmation, Pending, Blocked.
- Keep text readable and evidence-linked.
- Do not hide critical claims inside images only.
- Every page needs a page conclusion and a Decision Panel.

---

## 8. Feishu Positioning

Feishu is not a decorative export button. In this project, Feishu is the enterprise collaboration layer:

- Feishu Base / 多维表格: structured evidence tables.
- Feishu Docs: PRD and review reports.
- Feishu Wiki / Knowledge Base: reusable NPD knowledge assets.
- Feishu Minutes / AI Summary: review meeting records.
- Feishu Tasks / Projects: MVP validation tasks.
- Feishu CLI / Open Platform API: future automation path.

For the competition demo, Feishu integration may be mocked visually. The UI must clearly label this as proposal-stage mock sync.

---

## 9. Data Rules

- Local JSON is the source of truth for the proposal-stage MVP.
- All page content should be data-driven when feasible.
- Keep schema names consistent with `docs/DATA_SCHEMA.md`.
- If adding data, include IDs and cross references.
- Avoid claims of full web-scale collection. Use “公开小样本验证集”.
- Preserve evidence confidence levels: high / medium / low.

---

## 10. Review Priority

When evaluating changes, prioritize:

1. Clarity of competition narrative.
2. Traceability of product decisions.
3. Demo stability.
4. Human readability.
5. Agent readability.
6. Feishu collaboration logic.
7. Visual polish.

The project should help reviewers understand that Anker AI-NPD Copilot is not simply generating product ideas. It demonstrates how AI can help an enterprise product team make structured, evidence-backed, reusable NPD decisions.


---

## 9. Evidence Intake Rules

Before adding or modifying demo data, read:

- `docs/DATA_INTAKE.md`
- `docs/EVIDENCE_AGENT_PROMPT.md`
- `data_templates/evidence_schema.json`

Development rules:

1. Do not hard-code business evidence inside React components.
2. All evidence should originate from structured data files or templates.
3. Public source data must preserve source URL and confidence level.
4. If data is mock, seed, or placeholder, label it clearly as proposal-stage sample data.
5. Do not claim the dataset is complete, representative, or connected to Anker internal data.
6. Use `include_status`, `evidence_value_score`, and `used_for_pages` to decide whether data can enter demo pages.
7. Page 2 should consume evidence source and summary data.
8. Page 3 should consume feedback, pain point, and design signal data.
9. Page 4 should consume product matrix, competitor matrix, and opportunity gap data.
10. Page 5 should consume candidate, gate evaluation, risk, and pending confirmation data.
11. Page 6 should consume PRD draft, evidence summary, MVP features, risk list, and validation tasks.
12. Page 7 should consume Feishu artifacts, decision ledger, pending confirmations, and validation tasks.

Guardrail:

Do not turn data intake into a full crawler or scraping system in the proposal-stage demo. Use human-selected public sources plus AI classification and human review.
