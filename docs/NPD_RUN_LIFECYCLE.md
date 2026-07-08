# NPD_RUN_LIFECYCLE.md

## 1. Core Object

NPD Run = 一次新品定义任务。

当前 Demo 主 Run：

```text
NPD-ANKER-001
智能充电 × 多设备移动办公 × 北美市场
Status: PRD Drafted / Need Confirmation
```

## 2. Lifecycle

```text
Draft
  ↓
Evidence Building
  ↓
Insight Ready
  ↓
Opportunity Generated
  ↓
Under Review
  ↓
Need Confirmation
  ↓
PRD Drafted
  ↓
Meeting Scheduled
  ↓
Validation Task Created
  ↓
Archived
```

## 3. Status Definitions

| Status | 中文 | 含义 |
|---|---|---|
| Draft | 草稿 | 已创建但未分析 |
| Evidence Building | 证据构建中 | 正在整理数据 |
| Insight Ready | 洞察已形成 | 痛点和设计信号已形成 |
| Opportunity Generated | 候选机会已生成 | 已生成候选 NP |
| Under Review | 评审中 | 正在进行 Gate 和 Agent 评审 |
| Need Confirmation | 需二次确认 | 出现 Warning 或关键证据不足 |
| PRD Drafted | PRD 草案已生成 | 形成产品定义草案 |
| Meeting Scheduled | 已安排评审会议 | 生成会议议程 |
| Validation Task Created | 已创建验证任务 | 形成后续任务 |
| Archived | 已归档 | 进入知识库 |

## 4. Recommended Demo State

Demo 不要表现为全部完成，而应表现为：

```text
PRD Drafted / Need Confirmation
```

原因：真实企业 NPD 不会一键完成；需要二次确认、内部数据复核、用户概念测试、MVP 收敛和会议评审。

## 5. Backtracking Rules

- 痛点证据不足 → 回 Page 3。
- 竞品差异不足 → 回 Page 4。
- MVP 过重 → 回 Page 5。
- 会议后更新结论 → 更新 Page 5 和 Page 6。

## 6. Global Display

每页顶部显示：

```text
Project
Run
Status
Confidence
Next Action
Stage Progress
```

默认：

```text
Project: 桌面办公能源生态项目
Run: 智能充电 × 多设备移动办公 × 北美
Status: PRD Drafted / Need Confirmation
Confidence: Medium
Next: Product Review Meeting
```
