import { useEffect, useState, type FormEvent } from "react";
import { Database, FolderKanban, Plus, ShieldCheck, X } from "lucide-react";
import type { CreateNpdRunDraftInput } from "../types";

type NewRunDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (input: CreateNpdRunDraftInput) => void;
};

type DraftForm = {
  projectName: string;
  categories: string;
  scenario: string;
  market: string;
  problemStatement: string;
  ownerRoles: string;
};

const initialForm: DraftForm = {
  projectName: "",
  categories: "",
  scenario: "",
  market: "",
  problemStatement: "",
  ownerRoles: "产品负责人, 用户研究员",
};

function splitList(value: string) {
  return value.split(/[,，]/).map((item) => item.trim()).filter(Boolean);
}

export default function NewRunDialog({ open, onClose, onCreate }: NewRunDialogProps) {
  const [form, setForm] = useState<DraftForm>(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return undefined;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose, open]);

  if (!open) return null;

  const update = (field: keyof DraftForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const categories = splitList(form.categories);
    const ownerRoles = splitList(form.ownerRoles);
    if (!form.projectName.trim() || !categories.length || !form.scenario.trim() || !form.market.trim() || !form.problemStatement.trim()) {
      setError("请完整填写项目名称、品类、场景、市场和初始问题。");
      return;
    }
    onCreate({
      projectName: form.projectName.trim(),
      categories,
      scenario: form.scenario.trim(),
      market: form.market.trim(),
      problemStatement: form.problemStatement.trim(),
      ownerRoles: ownerRoles.length ? ownerRoles : ["产品负责人"],
    });
    setForm(initialForm);
    setError("");
    onClose();
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.currentTarget === event.target) onClose();
    }}>
      <section className="modal-shell" role="dialog" aria-modal="true" aria-labelledby="new-run-title" aria-describedby="new-run-boundary">
        <header className="modal-header">
          <div className="flex min-w-0 items-center gap-3">
            <span className="page-icon"><FolderKanban size={19} /></span>
            <div className="min-w-0">
              <div className="section-kicker">Portfolio intake</div>
              <h2 id="new-run-title" className="mt-1 text-lg font-semibold text-ink">登记新的 NPD Run 草案</h2>
            </div>
          </div>
          <button type="button" className="icon-button" aria-label="关闭" title="关闭" onClick={onClose}><X size={18} /></button>
        </header>

        <form onSubmit={submit}>
          <div className="modal-body">
            <div id="new-run-boundary" className="draft-boundary-note">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-emerald-700" />
              <div><strong>草案边界</strong><p>仅登记项目问题与 Run 范围，保存在当前浏览器。建立独立证据快照前，不会激活证据池、评审或 PRD 页面。</p></div>
            </div>

            <div className="form-grid">
              <label className="form-field form-field-wide">
                <span className="form-label">项目名称</span>
                <input autoFocus className="form-input" value={form.projectName} onChange={(event) => update("projectName", event.target.value)} placeholder="例如：家庭储能场景探索" />
              </label>
              <label className="form-field">
                <span className="form-label">品类</span>
                <input className="form-input" value={form.categories} onChange={(event) => update("categories", event.target.value)} placeholder="使用逗号分隔" />
              </label>
              <label className="form-field">
                <span className="form-label">目标市场</span>
                <input className="form-input" value={form.market} onChange={(event) => update("market", event.target.value)} placeholder="国家或区域" />
              </label>
              <label className="form-field form-field-wide">
                <span className="form-label">核心场景</span>
                <input className="form-input" value={form.scenario} onChange={(event) => update("scenario", event.target.value)} placeholder="用户在什么情境下遇到问题" />
              </label>
              <label className="form-field form-field-wide">
                <span className="form-label">初始问题陈述</span>
                <textarea className="form-input form-textarea" value={form.problemStatement} onChange={(event) => update("problemStatement", event.target.value)} maxLength={240} placeholder="描述待验证的问题，不直接写成产品答案。" />
                <span className="form-help">{form.problemStatement.length} / 240</span>
              </label>
              <label className="form-field form-field-wide">
                <span className="form-label">责任角色</span>
                <input className="form-input" value={form.ownerRoles} onChange={(event) => update("ownerRoles", event.target.value)} placeholder="使用逗号分隔" />
              </label>
            </div>

            <div className="flex items-start gap-2 border-l-2 border-blue-200 bg-blue-50/60 px-3 py-2.5 text-xs leading-5 text-slate-600">
              <Database size={15} className="mt-0.5 shrink-0 text-blue-700" />
              下一门槛：冻结问题范围，在飞书建立证据采集表，并生成首个可审核快照。
            </div>
            {error ? <p className="text-xs font-semibold text-red-700" role="alert">{error}</p> : null}
          </div>

          <footer className="modal-footer">
            <button type="button" className="secondary-button" onClick={onClose}>取消</button>
            <button type="submit" className="primary-button"><Plus size={16} /> 创建 Run 草案</button>
          </footer>
        </form>
      </section>
    </div>
  );
}
