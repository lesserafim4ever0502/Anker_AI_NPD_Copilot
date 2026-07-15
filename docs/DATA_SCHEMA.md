# DATA_SCHEMA.md

## 1. Source of Truth / 事实源

**EN:** The executable schema is [`src/types/index.ts`](../src/types/index.ts). JSON files in `src/data/` must conform to those TypeScript types. This document explains ownership and invariants; it intentionally does not duplicate the full type declarations, which previously drifted from the implementation.

**中文：** 可执行数据契约以 [`src/types/index.ts`](../src/types/index.ts) 为唯一事实源，`src/data/` 下的 JSON 必须符合其中的 TypeScript 类型。本文只说明类型职责和不可破坏约束，不再重复整段类型代码，避免文档与实现再次漂移。

## 2. Core Types / 核心类型

| Type | Responsibility / 职责 | Main JSON owners / 主要数据文件 |
|---|---|---|
| `NpdProject` | Project card, active Run, recommendation, pending count / 项目卡、当前 Run、推荐与待确认数 | `projects.json` |
| `NpdRun` | Run boundary, stage progress, status and next action / Run 边界、阶段、状态与下一步 | `npdRuns.json` |
| `EvidenceSource`, `EvidenceCard`, `Feedback` | Traceable evidence and reviewed feedback / 可追溯证据与已审核反馈 | `evidenceSources.json`, `evidenceCards.json`, `feedback.json` |
| `PainPoint` | Cluster maturity, source count and design signals / 痛点成熟度、来源数与设计信号 | `painPoints.json` |
| `Product`, `CapabilityMatrixRow` | Reviewed product facts and normalized capability coverage / 产品事实与能力矩阵 | `products.json`, `competitorProducts.json`, `capabilityMatrix.json` |
| `CandidateNP`, `CandidateScreening` | Bounded candidate hypotheses and entry decisions / 有边界的候选假设与准入结论 | `candidates.json`, `candidateScreening.json` |
| `GateEvaluation`, `EvaluationSummary` | Gate reasons, evidence, blocking state and weighted summary / 门禁理由、证据、阻断与加权结论 | `gateEvaluations.json`, `evaluationSummary.json` |
| `AgentEvaluation` | Six-role committee judgement and objection / 六角色委员会判断与异议 | `agentEvaluations.json` |
| `PendingConfirmation` | Human-owned unresolved decisions / 必须由人负责的待确认事项 | `pendingConfirmations.json` |
| `FeishuArtifact` | Mock handoff object shown in the web demo / 网页 Demo 中的 Mock 交接对象 | `feishuArtifacts.json` |
| `FeishuWorkflow` | Four-layer collaboration, review meeting and knowledge archive / 四层协同、评审会议与知识归档 | `feishuWorkflow.json` |

## 3. Required Invariants / 必须保持的约束

- `Confidence` is `high | medium | low`; public single-source feedback normally remains `medium`.
- `Feedback.sentiment` supports `positive | neutral | negative | mixed`.
- `Feedback.humanReviewStatus` supports `approved | needs_edit | rejected | needs_recheck`.
- A candidate status and its `entryDecision` must agree; UI scores must not override a Fail Gate or Kill Criteria.
- `GateEvaluation` and `AgentEvaluation` retain `confidence` and `evidenceRefs` for traceability.
- Proposed PRD metrics and open questions remain pending confirmation; they are not approved targets.
- Feishu artifacts describe the demo handoff state and must not expose CLI credentials, tokens, or local manifest identifiers.
- `FeishuWorkflow.reviewMeeting` and `knowledgeArchive` remain proposal-stage handoff structures; their `mockStatus` must distinguish reviewed snapshots, existing documents and proposed artifacts.

## 4. JSON Consumption Rules / JSON 使用规则

1. Business names, counts, scores, risks, and conclusions come from `src/data/*.json`, never component literals.
2. Add or change a field in `src/types/index.ts` first, then update affected JSON and consumers in the same change.
3. Validate every JSON file before build and keep IDs stable across cross-file references.
4. Follow the seven-page ownership map in `docs/SITES_HANDOFF.md`.
5. Do not silently coerce missing review status, confidence, evidence references, or pending-confirmation state.

## 5. Current Frozen State / 当前冻结状态

The demo contract is `PRD Drafted / Need Confirmation`, `Recommended with Warning`, five open confirmations, 12 Anker products, 18 competitor products, 18 Gate evaluations, and six committee reviews.

当前 Demo 契约为：`PRD Drafted / Need Confirmation`、`Recommended with Warning`、5 个开放待确认项、12 个安克产品、18 个竞品、18 条 Gate 评审和 6 个委员会角色评审。
