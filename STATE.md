# STATE.md

## Current Phase

当前处于 **Desktop Frontend Optimization / 桌面端优化、暂停公开演示** 阶段。

The seven-page demo remains in the repository for desktop-first frontend optimization. Public hosting is paused; evidence, decisions, routes, and Proposal PRD V0.2 remain frozen for review. Mobile-specific acceptance is deferred.

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
- 项目与 Run 上下文：Header、Run Status Bar、Decision Panel 和项目工作台现在读取同一全局上下文。
- 飞书融合：七页均展示飞书工作台状态和页面级数据血缘；飞书不再只在 PRD/Handoff 阶段出现。
- 品牌与布局：Header 使用 Anker 官方 Logo；主从视图、评审护栏和状态标签已完成首轮响应式修正。
- Run 快照治理：只有同时存在项目、Run 与已载入快照注册记录的项目才能激活后续六页，防止跨项目误用数据。
- 桌面决策上下文：右侧 Decision Panel 在桌面滚动时保持 sticky；无行为的通知和用户按钮已移除。
- 飞书状态边界：真实 Base 快照、已存在飞书文档和 Proposal-stage Mock 现在使用不同状态标签。
- 证据可追溯交互：反馈摘要、产品矩阵和 Gate 引用可下钻到现有公开来源 URL；内部决策引用保留稳定 ID。
- 决策优先演示：Page 4 先展示机会缺口、候选准入和重叠警告，再以固定高度矩阵承载 30 行证据明细。
- Guided Walkthrough：Page 2–6 增加下一阶段动作，右侧待确认入口直接打开 PRD Evidence 标签。
- 飞书闭环具象化：Page 7 展示可展开产物、二次评审会议议程、预期产物与知识库归档树。

## Current Demo State Recommendation

```text
Project: 桌面办公能源生态项目
Run: 智能充电 × 多设备移动办公 × 北美市场
Status: PRD Drafted / Need Confirmation
Recommended Candidate: 跨平台 Dock 兼容预检助手（Recommended with Warning）
Confidence: Medium
Next Action: Proposal PRD Scope Freeze
```

## Next Development Steps / 下一步

1. 以 1280、1440 和 1920 px 桌面视口回归七页视觉、来源外链与 Guided Walkthrough。
2. 按 `docs/DEMO_SCRIPT.md` 使用新的 Page 4 决策优先顺序完成 3–5 分钟讲解排练。
3. 复核 Page 5/6/7 的 Warning、Pending Confirmation、会议交接、Decision Ledger 与知识归档叙事。
4. 为另外两个组合项目建立独立证据快照后，再开放跨项目 Run 切换。
5. 移动端适配延期到桌面 Demo 稳定之后，不纳入当前验收范围。
6. 仅在证据或人工决策变化时更新冻结 JSON；视觉修订不得改写业务结论。

## Sites Deployment / Sites 发布

- Status: public access withdrawn; the site now uses owner-only custom access.
- Demo URL: `https://anker-ai-npd-copilot.yingpengzhuo69.chatgpt.site`.
- Reason: the current network is blocked by the `chatgpt.site` Cloudflare security layer, and the frontend requires further optimization.
- Routes: 7.

## GitHub Pages Deployment / GitHub Pages 发布

- Status: disabled; the public Pages site has been removed and the deployment workflow is disabled.
- Former Demo URL: `https://lesserafim4ever0502.github.io/Anker_AI_NPD_Copilot/`.
- Workflow: `Deploy GitHub Pages`, run `29255347383` completed successfully.
- Verification: the root URL and `#/evaluation` both returned HTTP 200 with the expected application title.
- Routing: HashRouter preserves all seven client-side routes under the repository subpath.
- Re-enable only after frontend optimization and a new review pass.
- Validation: production build passed; 3 projects, 12 Anker products, 18 competitor products, 18 Gate evaluations, 6 committee roles, 1 Fail Gate, 4 proposed metrics, 4 risks, 3 validation methods, and 5 open confirmations verified.
- Boundary: local JSON only; no real frontend Feishu API, LLM, authentication, backend, crawler, or analytics integration.

## Risks

- 页面信息量较大，开发时需要保持清晰层级。
- 不要把系统做成普通 dashboard。
- 不要把多 Agent 做成聊天记录。
- 不要让飞书只在最后出现一个按钮。
- 不要让 PRD 输出显得像最终立项。

## Frontend Integration Update

- Added a shared project/Run context so global status, decision state, and the project workspace use one source of truth.
- Added a persistent Feishu workspace bar and `feishuLineage.json` contract across all seven routes.
- Page 2–5 now expose the Base tables and transformation stages behind evidence, pain clusters, competitor analysis, and evaluation.
- Page 7 is now a Run collaboration asset map; the developer-facing Automation Roadmap was removed from the product UI.
- Project portfolio selection remains review-only when a project has no loaded evidence snapshot, preventing cross-project data misrepresentation.
- `runSnapshots.json` now binds the only complete Run to its reviewed page datasets; downstream activation rejects projects without a matching loaded snapshot.
- Desktop review keeps the Decision Panel visible while scrolling and removes controls that had no implemented behavior.

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
- Stage-Gate review completed for all three candidates using six weighted gates and explicit evidence references. Weighted scores are 4.24, 3.91, and 3.24; scores do not override Fail gates or Kill Criteria.
- The six-role product committee reviewed the compatibility-preflight candidate. The final state is `Recommended with Warning`, not approved or final.
- Five Pending Confirmations remain open, including topology scope, accuracy and version ownership, FAQ differentiation, power-explanation task value, and thermal evidence collection.
- Feishu now mirrors 18 Stage-Gate records and 6 product committee reviews in dedicated tables.

### Sites Handoff Readiness

Status: **READY FOR SITES HANDOFF**.

- Proposal PRD V0.2 is frozen for demo implementation with explicit P0 scope, non-goals, proposed metrics, risks, validation plans, and three candidate-specific Pending Confirmations.
- The seven-page JSON contract and bilingual demo narrative are frozen in `docs/SITES_HANDOFF.md` and `docs/DEMO_SCRIPT.md`.
- Global project and Run data now reference the compatibility-preflight candidate and five open confirmations.
- A Proposal PRD document was created inside the existing Feishu Base workspace.

Sites may now implement the frozen evidence-to-decision experience. It must not invent product conclusions, change Gate outcomes, remove warnings, imply universal compatibility, or replace human review.

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

This is a data-complete engineering skeleton ready for Sites presentation work. It does not include complete page-level UI polish, real Feishu frontend API calls, real LLM calls, authentication, backend services, or production persistence.

### Project Governance UI

- The header now exposes the active Project and Run as a project-workspace entry instead of presenting a non-functional search field.
- The global Run bar is a connected seven-stage route track with completed, need-confirmation, in-progress, and current-page states.
- Project Workspace distinguishes portfolio projects from projects with a loaded evidence snapshot; only snapshot-ready projects can become the global Current Run.
- Portfolio metrics show project count, Run readiness, and total pending confirmations without inventing evidence for placeholder projects.
- Feishu lineage source tables wrap within the available desktop width and no longer expose a local horizontal scrollbar.
- Only `project-desktop-energy` currently has a loaded Run snapshot. The other two projects remain explicit portfolio placeholders until independent evidence snapshots exist.

### Validation Notes

- JSON seed files parse successfully.
- Required frontend skeleton files exist.
- Project governance UI production build passed on 2026-07-15; desktop screenshots were checked at 1355 x 898 and 1101 x 898, including the four-table Competitor Matrix lineage strip.
- Dependency installation and build validation must be checked in the active Sites environment before publishing.
- The current handoff contract is `docs/SITES_HANDOFF.md`; Sites must not change frozen business conclusions to make the UI look more decisive.
