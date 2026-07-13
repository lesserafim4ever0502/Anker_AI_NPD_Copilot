# data_workbench/

## Purpose / 用途

**English:** This folder records the Feishu collaboration workspace and reviewed working-data outputs. The public manifest stores shareable URLs and non-sensitive metadata; internal resource identifiers belong only in the ignored local manifest.

**中文：** 此目录用于记录飞书协作工作台和已审核的工作数据产物。公开 manifest 仅保存可共享链接与非敏感元数据；内部资源 ID 只能写入已忽略的 local manifest。

Possible exported working files / 可导出的工作文件：

```text
raw_evidence_intake.xlsx
structured_evidence.xlsx
anker_products.xlsx
competitor_products.xlsx
user_feedback_samples.xlsx
review_sources.xlsx
```

Do not treat working files as final demo data until reviewed and exported to `src/data/*.json`. Never commit OAuth tokens, cookies, app secrets, personal authorization data, or private Feishu exports.

工作文件经人工审核并导出到 `src/data/*.json` 后才可作为 Demo 数据。禁止提交 OAuth token、cookie、应用密钥、个人授权信息或非公开飞书导出内容。
