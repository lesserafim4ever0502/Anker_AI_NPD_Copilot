import ankerProductsData from "../data/products.json";
import competitorProductsData from "../data/competitorProducts.json";
import opportunityGaps from "../data/opportunityGaps.json";
import overlapWarnings from "../data/productOverlapWarnings.json";
import type { Product } from "../types";
import StatusBadge from "../components/StatusBadge";

const ankerProducts = (ankerProductsData as Product[]).filter((product) => product.brand === "Anker");
const competitorProducts = competitorProductsData as Product[];

export default function CompetitorMatrix() {
  const products = [...ankerProducts, ...competitorProducts];

  return (
    <div className="space-y-6">
      <section>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-anker">
          Competitor Matrix
        </div>
        <h2 className="mt-2 text-3xl font-semibold text-ink">竞品机会矩阵</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          基于 30 条已复核公开产品资料对齐能力边界；能力存在只代表潜在覆盖，不等于痛点已被解决。
        </p>
      </section>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Power</th>
              <th className="px-4 py-3">Dock</th>
              <th className="px-4 py-3">Possible Gap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-3 font-semibold text-ink">{product.brand}</td>
                <td className="px-4 py-3">{product.productName}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">{product.powerWatt ?? "unknown"}</td>
                <td className="px-4 py-3">{product.dockSupport ? "yes" : "no"}</td>
                <td className="px-4 py-3 text-slate-600">{product.possibleGap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {opportunityGaps.map((gap) => (
          <article key={gap.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="font-semibold text-ink">{gap.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{gap.currentCoverage}</p>
            <p className="mt-2 text-sm text-slate-600">{gap.opportunityReason}</p>
            <p className="mt-2 text-xs font-semibold text-anker">{gap.recommendation}</p>
            <p className="mt-2 text-xs text-slate-500">{gap.relatedPainPointIds.join(" / ")}</p>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-center gap-2">
          <StatusBadge status="warning" />
          <h3 className="font-semibold text-ink">Product Overlap Warning</h3>
        </div>
        <div className="mt-3 space-y-2 text-sm text-slate-700">
          {overlapWarnings.map((warning) => (
            <p key={warning.id}>{warning.reason}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
