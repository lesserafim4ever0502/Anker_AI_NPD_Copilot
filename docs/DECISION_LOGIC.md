# DECISION_LOGIC.md

## 1. Stage-Gate Gates

| Gate | 判断问题 |
|---|---|
| 品牌契合度 | 是否符合安克核心品类、品牌心智和能力边界？ |
| 痛点强度 | 是否有高频、强烈、真实的用户痛点支撑？ |
| 竞品差异度 | 是否避开现有 SKU 与主要竞品同质化？ |
| 技术 / 制造可行性 | 是否能在硬件复杂度可控范围内验证？ |
| 市场验证可行性 | 是否能快速做概念测试、用户访谈或 MVP 验证？ |
| 组织沉淀价值 | 是否能沉淀进飞书数据、文档、任务和知识库复用？ |

## 2. Gate Status

- Pass: 当前证据足以支持进入下一步。
- Warning: 方向可继续，但需要二次确认、补证据或上会。
- Fail: 当前不建议推进，除非补充关键证据后重新评审。

## 3. Kill Criteria

1. 与安克现有核心 SKU 高度重叠，否决。
2. 缺少明确高频痛点证据，否决。
3. 差异化只能依赖硬件堆料，降级。
4. 制造复杂度明显高于验证价值，降级。
5. 无法形成可验证 MVP，降级。
6. 无法进入飞书协同沉淀，降级。

## 4. Agent Roles

- 用户研究员 Agent
- 产品经理 Agent
- 工业设计师 Agent
- 硬件 / 制造顾问 Agent
- 市场增长顾问 Agent
- 风险评审官 Agent

每个 Agent 输出：评分、核心判断、支持理由、反对意见、建议动作、是否生成待确认事项。

## 5. Pending Confirmation Triggers

触发待确认的情况：

- Gate = Warning。
- 风险评审官 Agent 触发风险。
- 证据置信度不足。
- 需要跨部门判断。
- PRD MVP 过重。

## 6. Recommended Decision State

当前 Demo 推荐：

```text
跨平台 Dock 兼容预检助手: Recommended with Warning
```

不是 Approved，也不是 Final Decision。
