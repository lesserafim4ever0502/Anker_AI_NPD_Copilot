import { useMemo, useState } from "react";
import { AlertTriangle, ArrowRight, ExternalLink, Filter, TableProperties } from "lucide-react";
import ankerProductsData from "../data/products.json";
import competitorProductsData from "../data/competitorProducts.json";
import opportunityGaps from "../data/opportunityGaps.json";
import overlapWarnings from "../data/productOverlapWarnings.json";
import capabilityMatrix from "../data/capabilityMatrix.json";
import type { Product } from "../types";
import StatusBadge from "../components/StatusBadge";
import MetricCard from "../components/MetricCard";
import PageHeader from "../components/PageHeader";
import PageDataLineage from "../components/PageDataLineage";
import { Link } from "react-router-dom";

const ankerProducts = (ankerProductsData as Product[]).filter((product) => product.brand === "Anker");
const competitorProducts = competitorProductsData as Product[];
const products = [...ankerProducts, ...competitorProducts];

export default function CompetitorMatrix() {
  const brands = ["全部", "Anker", ...Array.from(new Set(competitorProducts.map((product) => product.brand)))];
  const [brand, setBrand] = useState(brands[0]);
  const [selectedGapId, setSelectedGapId] = useState(opportunityGaps[1]?.id ?? opportunityGaps[0].id);
  const visible = useMemo(() => brand === brands[0] ? products : products.filter((product) => product.brand === brand), [brand]);
  const selectedGap = opportunityGaps.find((gap) => gap.id === selectedGapId) ?? opportunityGaps[0];

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="04 / Competitor Matrix" title="竞品机会矩阵" icon={TableProperties}
        description="产品能力存在仅代表潜在覆盖，不证明用户痛点已解决。矩阵用于识别重叠风险、验证缺口和候选准入边界。"
        action={<Link to="/evaluation" className="primary-button">提交候选评审 <ArrowRight size={15} /></Link>} />
      <PageDataLineage page="competitor-matrix" />
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <MetricCard label="Anker Products" value={ankerProducts.length} />
        <MetricCard label="Competitor Products" value={competitorProducts.length} />
        <MetricCard label="Capability Rows" value={capabilityMatrix.length} hint={`${opportunityGaps.length} opportunity gaps`} />
      </section>

      <section className="grid grid-cols-1 items-stretch gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div><div className="mb-3"><h3 className="section-title">机会缺口与候选准入</h3><p className="section-subtitle">先看决策结论，再下钻 30 行能力证据</p></div><div className="grid h-full grid-cols-1 gap-3 2xl:grid-cols-2">{opportunityGaps.map((gap) => <button key={gap.id} aria-pressed={selectedGapId === gap.id} onClick={() => setSelectedGapId(gap.id)} className={`panel h-full text-left transition ${selectedGapId === gap.id ? "border-blue-300 shadow-[inset_3px_0_0_#2f80ed]" : "hover:border-slate-300"}`}><div className="flex items-start justify-between gap-3"><h3 className="font-semibold text-ink">{gap.title}</h3><StatusBadge status={gap.confidence} /></div><p className="mt-3 text-sm leading-6 text-slate-600">{gap.opportunityReason}</p><div className="mt-3"><StatusBadge status={gap.recommendation} /></div></button>)}</div></div>
        <aside className="panel h-full"><div className="section-kicker">Selected opportunity</div><h3 className="mt-2 text-lg font-semibold text-ink">{selectedGap.title}</h3><dl className="mt-4 space-y-4 text-sm"><div><dt className="text-xs text-slate-500">Current coverage</dt><dd className="mt-1 leading-6 text-slate-700">{selectedGap.currentCoverage}</dd></div><div><dt className="text-xs text-slate-500">Overlap risk</dt><dd className="mt-1"><StatusBadge status={selectedGap.overlapRisk} /></dd></div><div><dt className="text-xs text-slate-500">Next validation</dt><dd className="mt-1 leading-6 text-slate-700">{selectedGap.nextValidation}</dd></div><div><dt className="text-xs text-slate-500">Feishu lineage</dt><dd className="mt-1 text-xs leading-5 text-slate-600">opportunity_gaps · {selectedGap.id}<br />由 capability_matrix 与产品表标准化结果生成</dd></div></dl></aside>
      </section>

      <section className="warning-panel"><div className="flex items-center gap-2"><AlertTriangle size={17} className="text-amber-700" /><h3 className="section-title">Product Overlap Warning</h3><span className="ml-auto text-xs font-semibold text-amber-700">{overlapWarnings.length} warnings</span></div><div className="mt-4 grid gap-3 lg:grid-cols-3">{overlapWarnings.map((warning) => <div key={warning.id} className="border-l-2 border-amber-300 pl-3"><div className="text-sm font-semibold text-ink">{warning.title}</div><p className="mt-1 text-xs leading-5 text-amber-900/80">{warning.reason}</p></div>)}</div></section>

      <section>
        <div className="mb-3 flex items-end justify-between"><div><h3 className="section-title">产品能力证据明细</h3><p className="section-subtitle">固定高度滚动 · 来源链接可公开复核 · 能力存在不等于痛点已解决</p></div><span className="text-xs text-slate-500">{visible.length} / {products.length} records</span></div>
        <div className="toolbar"><Filter size={14} className="text-slate-400" />{brands.map((item) => <button key={item} aria-pressed={brand === item} onClick={() => setBrand(item)} className={`filter-button ${brand === item ? "filter-button-active" : ""}`}>{item}</button>)}</div>
        <div className="table-shell max-h-[620px] rounded-t-none border-t-0">
          <table className="data-table">
            <thead><tr><th>Brand / Product</th><th>Category</th><th>Power</th><th>Dock</th><th>Display / App</th><th>Possible Gap</th></tr></thead>
            <tbody>{visible.map((product) => <tr key={product.id}>
              <td><div className="flex items-start gap-2"><div><div className="font-semibold text-ink">{product.productName}</div><div className="mt-1 text-xs text-slate-500">{product.brand}</div></div>{product.sourceUrl ? <a href={product.sourceUrl} target="_blank" rel="noreferrer" className="icon-button ml-auto h-7 w-7 shrink-0" aria-label={`打开 ${product.productName} 官方来源`} title="打开官方来源"><ExternalLink size={13} /></a> : null}</div></td>
              <td>{product.category}</td><td>{product.powerWatt ?? "unknown"}</td>
              <td><StatusBadge status={product.dockSupport ? "supported" : "not_supported"} /></td>
              <td className="max-w-[180px] text-xs leading-5 text-slate-600">{product.screenOrApp ?? "none"}</td>
              <td className="max-w-[280px] text-xs leading-5 text-slate-600">{product.possibleGap}</td>
            </tr>)}</tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
