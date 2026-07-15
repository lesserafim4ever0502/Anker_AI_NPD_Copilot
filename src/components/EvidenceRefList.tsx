import { ExternalLink } from "lucide-react";
import feedback from "../data/feedback.json";
import products from "../data/products.json";
import competitorProducts from "../data/competitorProducts.json";

const sourceUrls = new Map(
  [...feedback, ...products, ...competitorProducts]
    .filter((item) => item.sourceUrl)
    .map((item) => [item.id, item.sourceUrl]),
);

export default function EvidenceRefList({ refs }: { refs: string[] }) {
  return (
    <div className="mt-1 flex flex-wrap gap-1.5">
      {refs.map((ref) => {
        const sourceUrl = sourceUrls.get(ref);
        return sourceUrl ? (
          <a key={ref} href={sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-1 font-semibold text-blue-700 hover:border-blue-300">
            {ref}<ExternalLink size={10} />
          </a>
        ) : (
          <span key={ref} className="rounded bg-slate-100 px-2 py-1 text-slate-600">{ref}</span>
        );
      })}
    </div>
  );
}
