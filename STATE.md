# STATE.md

## Current Phase

当前处于 **Pre-development Design Freeze** 阶段。

方向已经明确：Anker AI-NPD Copilot，一套面向安克新品定义的证据链驱动 NPD 决策系统。

## Completed Decisions

- 企业选择：安克创新。
- 方案方向：产品研发 / 新品定义工具，不是营销工具。
- 系统定位：Evidence-to-Decision，而不是 Prompt-to-Idea。
- Demo 形态：React + TypeScript + Tailwind + 本地 JSON。
- 候选 NP：报名阶段预置 3 个，体现为基于证据池预生成。
- 页面结构：7 页主流程。
- 飞书定位：企业协同底座，不是导出按钮。
- 仓库规范：Human-readable + Agent-readable，包含 README、AGENT、SPEC、STATE、DESIGN 等。
- 页面设计：7 页已完成 V1 设计讨论。
- 工作流机制：多项目工作台 + NPD Run 状态 + Pending Confirmation + Decision Ledger + Feishu Handoff。

## Current Demo State Recommendation

```text
Project: 桌面办公能源生态项目
Run: 智能充电 × 多设备移动办公 × 北美市场
Status: PRD Drafted / Need Confirmation
Leading Candidate: 跨平台 Dock 兼容预检助手（待 Stage-Gate）
Confidence: Medium
Next Action: Stage-Gate + Multi-Agent Review
```

## Next Development Steps

1. 初始化 Vite + React + TypeScript + Tailwind 项目。
2. 将 `data_templates/*.json` 复制到 `src/data/` 并补齐样例数据。
3. 按 `docs/DATA_SCHEMA.md` 创建 `src/types/index.ts`。
4. 搭建全局 Layout、Header、StepNav、RunStatusBar、DecisionPanel。
5. 开发 7 个页面。
6. 实现 P0 交互。
7. 补充视觉 polish。
8. 截图并沉淀到提交材料。

## Risks

- 页面信息量较大，开发时需要保持清晰层级。
- 不要把系统做成普通 dashboard。
- 不要把多 Agent 做成聊天记录。
- 不要让飞书只在最后出现一个按钮。
- 不要让 PRD 输出显得像最终立项。

## Update Rule

每次重大决策变更后更新：

- `STATE.md`
- `DECISIONS.md`
- `SPEC.md`
- `DESIGN.md`
- `review_index.json`


---

## Data Intake Pipeline

### Current Data Intake Status

Evidence intake has been defined as a semi-automated pipeline:

```text
raw public evidence
  → raw_evidence_intake.csv
  → Evidence Screening Agent
  → structured_evidence_template.csv
  → human review
  → src/data/*.json
  → demo pages
```

### Current Rules

- Team members only need to collect minimal raw evidence fields.
- AI / Agent classifies evidence, scores evidence value, maps pages, extracts tags, pain points, opportunity gaps, and design signals.
- Human review is required before final demo JSON generation.
- Public evidence must not be described as full-market or full-user data.

### Next Data Tasks

1. Fill `data_templates/raw_evidence_intake.csv` with public product, feedback, review, and community data.
2. Batch classify raw evidence with `docs/EVIDENCE_AGENT_PROMPT.md`.
3. Review `include` and high-value `maybe` records.
4. Export approved evidence into `src/data/*.json`.
5. Update Page 2–7 demo data from approved structured evidence.

---

## Feishu Cloud Data Workspace Initialization

### Status

- Git repository initialized: yes.
- Baseline commit created: yes, `chore: add repository baseline`.
- Feishu collaboration workspace created: yes.
- Resource type: Feishu Base / 多维表格.
- Workspace name: `Anker AI-NPD Copilot 数据采集工作台`.
- Public manifest: `data_workbench/feishu_workspace_manifest.json`.
- Local identifier manifest: `data_workbench/feishu_workspace_manifest.local.json` and ignored by `.gitignore`.
- Feishu data intake guide created: yes, `数据采集填写说明｜Anker AI-NPD Copilot`.
- Guide document location: created as a docx block inside the existing Feishu Base workspace.

### Tables for Team Collection

Team members should fill these tables in Feishu:

1. `raw_evidence_intake`: low-friction raw public evidence intake.
2. `anker_products`: Anker public product capability matrix.
3. `competitor_products`: competitor public product capability matrix.
4. `user_feedback_samples`: public feedback and scenario pain samples.
5. `review_sources`: review, article, community, and expert source index.

### Export and Repository Sync

Recommended workflow:

1. Export each Feishu Base table to CSV after human review.
2. Save exported CSV files under `data_workbench/` for working review.
3. Run the evidence screening flow described in `docs/EVIDENCE_AGENT_PROMPT.md`.
4. Write approved structured outputs to `data_templates/structured_evidence_template.csv` first.
5. Transform reviewed data into `src/data/*.json` only after approval.

Do not export OAuth tokens, cookies, app secrets, personal authorization files, or internal Anker data into this repository.

### Feishu Data Cleaning Status

- Full read-only review completed for the five original intake tables.
- `user_feedback_samples` now distinguishes `editorial_inference` from `user_generated_feedback` through cleaning metadata fields.
- The 42 editorial-derived records were grouped into 14 source groups and copied to `editorial_insights_cleaned`; they must not be presented as direct user feedback or quotes.
- Twelve traceable public Reddit user-feedback summaries were added to `user_feedback_samples`, mirrored into `raw_evidence_intake`, and copied to `verified_user_feedback`.
- A web evidence audit corrected 11 records, approved UGF-008 without content changes, and split UGF-011 into compatibility and display-information records. `verified_user_feedback` now contains 13 approved records.
- Original records remain available for audit; cleaned tables are the preferred source for downstream analysis.
- New Base tables must be created serially. Parallel `table-create` calls can return `OpenAPIAddTable limited` even when one request succeeds.
- Evidence scoring completed for all 13 approved user-feedback records: all are `include`, scores range from 8 to 10, and confidence remains `medium` because each record is a public single-source sample.
- First-pass `pain_radar` created with five clusters. Three are `insight_ready`; thermal safety and desktop integration remain `needs_more_evidence` because each has only two independent sources.
- Frontend seed data now uses the approved user-feedback set and the first-pass Pain Radar instead of the original placeholder samples.
- Product capability standardization completed for 12 Anker and 18 competitor products. The repository now mirrors the reviewed public product set and a 30-row normalized capability matrix.
- Opportunity Gap V1 completed with four evidence-constrained gaps: one may continue to candidate generation, two require validation before candidate generation, and one hardware-system direction is deprioritized.
- Product overlap warnings explicitly prevent display, wattage, universal-compatibility, or crowded desktop-hardware concepts from being treated as automatic opportunities.
- Candidate NP generation and boundary screening completed. One candidate can enter Stage-Gate, one requires task-value validation, one requires more evidence, and the crowded desktop hardware-integration gap was excluded.
- The old desktop energy hub recommendation and placeholder Gate/Agent scores were removed because they conflict with the reviewed evidence and overlap findings.
- Feishu `candidate_pool` now mirrors the three bounded candidate hypotheses, their MVP boundaries, non-goals, entry decisions, risks, and next validation.

### Sites Handoff Readiness

The project is not ready for Sites implementation yet. Two decision stages remain before the UI/data contract should be frozen:

1. Complete Stage-Gate, agent evaluation, Kill Criteria, Pending Confirmation, and Decision Ledger review.
2. Draft and review Proposal PRD content, then freeze the seven-page JSON contract and demo narrative.

Hand off to Sites after those two stages are complete. Sites should implement the frozen evidence-to-decision experience, not invent product conclusions or replace the decision review.

### Feishu Guide Document

The Feishu workspace now includes a teammate-facing guide document:

- Title: `数据采集填写说明｜Anker AI-NPD Copilot`.
- URL: `https://my.feishu.cn/docx/AGAwdBavUosqQCxqeWscSfBmnvw`.
- Purpose: explain the collection goal, common rules, ID naming, field-level filling guidance for the five intake tables, recommended team roles, and the export-to-repository workflow.

The public manifest records the document URL only. Internal docx token and Base block ID are stored in the ignored local manifest.

---

## Frontend Engineering Skeleton

### Status

- Frontend skeleton initialized: yes.
- Stack scaffolded: Vite + React + TypeScript + Tailwind.
- Routing scaffolded: yes, 7 routes are available through `react-router-dom`.
- Data source rule: pages read from `src/data/*.json`; business seed content is not embedded in components.
- Current global run status displayed: `PRD Drafted / Need Confirmation`.
- Demo boundary displayed: `Proposal-stage Mock / Public sample data`.

### Created Frontend Files

- Root config: `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `tailwind.config.js`, `postcss.config.js`.
- App entry: `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`.
- Types: `src/types/index.ts`.
- Components: `Layout`, `Header`, `StepNav`, `RunStatusBar`, `DecisionPanel`, `StatusBadge`, `MetricCard`.
- Pages: `ProjectWorkspace`, `EvidencePool`, `PainRadar`, `CompetitorMatrix`, `Evaluation`, `ProposalPrd`, `FeishuWorkflow`.
- Seed data: copied reviewed template JSON into `src/data/` and added `src/data/competitorProducts.json`.

### Current Frontend Scope

This is only an engineering skeleton. It does not include complete page-level UI polish, real Feishu API calls, real LLM calls, authentication, backend services, production persistence, or final data integration.

### Validation Notes

- JSON seed files parse successfully.
- Required frontend skeleton files exist.
- `npm install` was not executed because repository instructions require explicit confirmation before dependency installation.
- TypeScript build was not run because dependencies are not installed and no global `tsc` executable is available.
