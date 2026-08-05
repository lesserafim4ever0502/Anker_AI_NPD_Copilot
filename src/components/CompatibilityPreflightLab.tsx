import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  CircleHelp,
  ExternalLink,
  FlaskConical,
  Play,
  RotateCcw,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import ruleSetData from "../data/compatibilityRules.json";
import type {
  CompatibilityInput,
  CompatibilityOutcome,
  CompatibilityRuleSet,
} from "../types";
import { evaluateCompatibility } from "../utils/compatibilityPreflight";

const ruleSet = ruleSetData as CompatibilityRuleSet;

const outcomePresentation: Record<CompatibilityOutcome, {
  label: string;
  className: string;
  icon: typeof CheckCircle2;
}> = {
  supported: { label: "支持", className: "border-emerald-200 bg-emerald-50 text-emerald-800", icon: CheckCircle2 },
  conditional: { label: "条件支持", className: "border-amber-200 bg-amber-50 text-amber-800", icon: AlertTriangle },
  not_supported: { label: "当前范围不支持", className: "border-red-200 bg-red-50 text-red-800", icon: XCircle },
  unknown: { label: "未知", className: "border-slate-200 bg-slate-50 text-slate-700", icon: CircleHelp },
};

export default function CompatibilityPreflightLab() {
  const [input, setInput] = useState<CompatibilityInput>(ruleSet.defaultInput);
  const [hasRun, setHasRun] = useState(true);
  const result = useMemo(() => evaluateCompatibility(input, ruleSet), [input]);
  const contractResults = useMemo(
    () => ruleSet.contractCases.map((item) => ({
      ...item,
      actualOutcome: evaluateCompatibility(item.input, ruleSet).outcome,
    })),
    [],
  );
  const passedContracts = contractResults.filter((item) => item.actualOutcome === item.expectedOutcome).length;
  const presentation = outcomePresentation[result.outcome];
  const OutcomeIcon = presentation.icon;
  const selectedDock = ruleSet.docks.find((item) => item.id === input.dockId);
  const evidence = ruleSet.evidence.filter((item) => result.evidenceRefs.includes(item.id));

  function updateInput<K extends keyof CompatibilityInput>(key: K, value: CompatibilityInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
    setHasRun(false);
  }

  function reset() {
    setInput(ruleSet.defaultInput);
    setHasRun(true);
  }

  return (
    <section className="overflow-hidden border border-slate-200 bg-white shadow-sm" aria-labelledby="preflight-title">
      <header className="flex flex-col gap-4 border-b border-slate-200 bg-slate-950 px-5 py-5 text-white xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-300">
            <FlaskConical size={15} /> WORKING SLICE · LOCAL RULES
          </div>
          <h3 id="preflight-title" className="mt-2 text-xl font-semibold">Dock 兼容预检实验</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-300">
            运行可解释规则并返回条件、证据和人工核对项。当前不是硬件认证，也不调用生产 LLM。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden border border-slate-700 bg-slate-700 text-center">
          <div className="min-w-28 bg-slate-900 px-4 py-2.5">
            <div className="text-lg font-semibold tabular-nums">{passedContracts}/{ruleSet.contractCases.length}</div>
            <div className="mt-0.5 text-[10px] text-slate-400">规则契约通过</div>
          </div>
          <div className="min-w-28 bg-slate-900 px-4 py-2.5">
            <div className="text-lg font-semibold tabular-nums text-amber-300">{ruleSet.hardwareVerifiedCases}/{ruleSet.goldSetTarget}</div>
            <div className="mt-0.5 text-[10px] text-slate-400">硬件金标准</div>
          </div>
        </div>
      </header>

      <div className="grid min-w-0 xl:grid-cols-[340px_minmax(0,1fr)]">
        <form className="border-b border-slate-200 bg-slate-50 p-5 xl:border-b-0 xl:border-r" onSubmit={(event) => { event.preventDefault(); setHasRun(true); }}>
          <div className="section-kicker">输入配置</div>
          <div className="mt-4 space-y-3">
            <SelectField label="Dock" value={input.dockId} options={ruleSet.docks.map((item) => ({ value: item.id, label: item.name }))} onChange={(value) => updateInput("dockId", value)} />
            <div className="grid grid-cols-2 gap-3">
              <SelectField label="操作系统" value={input.hostOs} options={ruleSet.inputOptions.hostOs} onChange={(value) => updateInput("hostOs", value)} />
              <SelectField label="主机连接" value={input.hostConnection} options={ruleSet.inputOptions.hostConnection} onChange={(value) => updateInput("hostConnection", value)} />
              <SelectField label="外接显示器" value={String(input.displayCount)} options={ruleSet.inputOptions.displayCount} onChange={(value) => updateInput("displayCount", Number(value))} />
              <SelectField label="显示模式" value={input.displayMode} options={ruleSet.inputOptions.displayMode} onChange={(value) => updateInput("displayMode", value)} />
            </div>
            <SelectField label="目标任务" value={input.task} options={ruleSet.inputOptions.task} onChange={(value) => updateInput("task", value)} />
            <SelectField label="驱动状态" value={input.driverState} options={ruleSet.inputOptions.driverState} onChange={(value) => updateInput("driverState", value)} />
          </div>
          <div className="mt-5 flex gap-2">
            <button type="submit" className="primary-button flex-1"><Play size={15} /> 运行预检</button>
            <button type="button" className="icon-button border-slate-200 bg-white" onClick={reset} title="重置输入" aria-label="重置输入"><RotateCcw size={16} /></button>
          </div>
          <p className="mt-3 text-[11px] leading-5 text-slate-500">规则包 {ruleSet.version} · 审阅日期 {ruleSet.lastReviewed}</p>
        </form>

        <div className="min-w-0 p-5">
          {!hasRun ? (
            <div className="flex min-h-72 flex-col items-center justify-center text-center text-slate-500">
              <FlaskConical size={28} className="text-slate-300" />
              <h4 className="mt-3 font-semibold text-slate-700">配置已变更</h4>
              <p className="mt-1 text-sm">运行预检后再生成新的规则结论。</p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${presentation.className}`}>
                    <OutcomeIcon size={14} /> {presentation.label}
                  </div>
                  <h4 className="mt-3 text-xl font-semibold text-ink">{result.headline}</h4>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{result.summary}</p>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <div className="text-[10px] font-semibold uppercase text-slate-400">Confidence</div>
                  <div className="mt-1 text-sm font-semibold text-slate-700">{result.confidence === "medium" ? "中置信度" : "低置信度"}</div>
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <ResultList icon={ShieldCheck} title="判断依据" items={result.reasons} tone="blue" />
                <ResultList icon={AlertTriangle} title="人工核对" items={result.requiredChecks} tone="amber" />
              </div>

              <div className="grid gap-4 border-t border-slate-200 pt-4 lg:grid-cols-[minmax(0,1fr)_220px]">
                <div>
                  <div className="section-kicker">证据引用</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {evidence.length ? evidence.map((item) => (
                      <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:border-blue-300 hover:text-blue-700">
                        {item.id} <ExternalLink size={12} />
                      </a>
                    )) : <span className="text-xs text-slate-500">当前没有足够来源，结论保持 Unknown。</span>}
                  </div>
                </div>
                <div className="border-l-2 border-slate-200 pl-3 text-xs leading-5 text-slate-600">
                  <strong className="block text-slate-800">当前配置</strong>
                  {selectedDock?.name ?? "未选择 Dock"}<br />
                  {input.hostOs || "OS 未知"} · {input.task || "任务未知"}
                </div>
              </div>

              <div className="border-l-2 border-amber-400 bg-amber-50 px-3 py-2.5 text-xs leading-5 text-amber-900">
                {ruleSet.boundary}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SelectField({ label, value, options, onChange }: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="form-field">
      <span className="form-label">{label}</span>
      <select className="form-input" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

function ResultList({ icon: Icon, title, items, tone }: {
  icon: typeof ShieldCheck;
  title: string;
  items: string[];
  tone: "blue" | "amber";
}) {
  return (
    <section>
      <div className={`flex items-center gap-2 text-xs font-semibold ${tone === "blue" ? "text-blue-700" : "text-amber-700"}`}><Icon size={14} /> {title}</div>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
        {items.map((item) => <li key={item} className="border-l-2 border-slate-200 pl-3">{item}</li>)}
      </ul>
    </section>
  );
}
