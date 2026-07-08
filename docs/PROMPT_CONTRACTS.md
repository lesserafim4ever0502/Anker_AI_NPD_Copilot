# PROMPT_CONTRACTS.md

本文件定义后续若接入真实 LLM / Agent 时的输出协议。报名 Demo 阶段可用本地 JSON 预置这些输出。

## Agent Output Contract

每个评审 Agent 必须输出：

```json
{
  "candidateId": "candidate-a",
  "agentName": "风险评审官 Agent",
  "role": "Risk Reviewer",
  "score": 3.6,
  "coreJudgement": "...",
  "supportReason": "...",
  "objection": "...",
  "suggestion": "...",
  "createsPendingConfirmation": true
}
```

## Rules

- Agent 必须输出反对意见，不允许只说好话。
- 风险评审官必须重点检查 SKU 重叠、硬件堆料、低频需求和 MVP 过重。
- 产品经理 Agent 必须给出 MVP 收敛建议。
- 用户研究员 Agent 必须指出证据置信度和补样本需求。
- 硬件 / 制造 Agent 必须识别复杂度和成本风险。

## PRD Output Contract

PRD 输出必须包括：

- 标题
- 状态 Draft / Need Confirmation
- 一句话定义
- 目标用户
- 核心场景
- 产品定位
- 证据链摘要
- MVP 功能 P0/P1/P2
- Out of Scope
- 风险清单
- 验证计划
- Pending Confirmations
- Feishu Artifacts

## Forbidden

- 不得输出最终立项结论。
- 不得虚构安克内部数据。
- 不得宣称全网采集。
- 不得把预置样例说成实时生成。
