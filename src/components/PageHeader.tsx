import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export default function PageHeader({ eyebrow, title, description, icon: Icon, action }: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  action?: ReactNode;
}) {
  return (
    <header className="page-header">
      <div className="page-header-main flex min-w-0 items-start gap-3">
        <div className="page-icon"><Icon size={20} /></div>
        <div className="min-w-0">
          <div className="section-kicker">{eyebrow}</div>
          <h2 className="mt-1 text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>
      {action ? <div className="page-header-action shrink-0">{action}</div> : null}
    </header>
  );
}
