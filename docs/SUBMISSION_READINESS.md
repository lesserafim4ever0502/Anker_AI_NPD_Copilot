# Submission Readiness / 投稿就绪清单

更新日期：2026-07-15

## 当前结论

当前仓库已具备正式投稿所需的完整样例 Run、七页桌面 Demo、飞书协作工作台记录和可追溯决策链。公开托管按计划延期到最终验收后处理，不阻塞当前内容与工程收口。

## 已完成

- [x] 七页路由与桌面端主流程。
- [x] 12 个 Anker 产品、18 个竞品和 13 条已审核用户反馈。
- [x] 5 个痛点簇、4 个机会缺口和 3 个候选方向。
- [x] 18 条 Stage-Gate 评审、6 个产品委员会角色和 1 个 Fail Gate。
- [x] Proposal PRD V0.2：4 个指标、4 个风险和 3 种验证方法。
- [x] 5 项 Pending Confirmation、Kill Criteria 和 Decision Ledger。
- [x] 真实飞书 Base、数据采集说明和 Proposal PRD 文档记录。
- [x] 1280、1440、1920 px 七页桌面结构审计，无页面级横向溢出。
- [x] `npm run validate` 投稿前数据与仓库契约检查。
- [x] `npm run build` 生产构建。

## 投稿前阻塞项

- [ ] 生成并复核最终补充材料 PDF。
- [ ] 生成评审用数据底座 XLSX；不得包含 local manifest 或授权信息。
- [ ] 补充团队能力证明或团队分工材料。
- [ ] 按 `docs/DEMO_SCRIPT.md` 完成一次 3–5 分钟计时演练。
- [ ] 完成最终桌面截图审阅并冻结 UI 文案。
- [ ] 最终验收后恢复 GitHub Pages，更新 `submission_templates/Demo链接说明.md`。
- [ ] 创建投稿 release/tag 并确认工作树干净。

## 明确延期

- 移动端专项适配。
- 另外两个组合示例的独立 Run 与证据快照。
- 真实前端飞书 API、LLM、后端、登录和生产持久化。

这些项目不属于报名 Demo 的必要范围，不应为了显得完整而伪造数据或扩大产品承诺。

## 投稿前命令

```bash
npm install
npm run validate
npm run build
```

只有 `validate` 和 `build` 均通过，且最终公开链接可在无登录窗口访问时，才可更新为“Ready to submit”。
