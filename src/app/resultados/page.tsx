import type { Metadata } from "next";
import { CasesExplorer } from "@/components/CasesExplorer";
import { CtaBlock } from "@/components/CtaBlock";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/content";
import { t } from "@/i18n";

export const metadata: Metadata = {
  title: "Resultados y casos",
  description: `Casos representativos de ${site.brand.name}, filtrables por área y año.`,
  alternates: { canonical: "/resultados" },
};

export default function ResultsPage() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Resultados", path: "/resultados" }]} eyebrow="Resultados" title="Casos que" emphasis="nos representan." intro={t.disclaimer.results} />
      <div className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-6 lg:px-10">
        <CasesExplorer cases={site.cases} areas={site.areas.filter((a) => site.cases.some((c) => c.area === a.slug)).map((a) => ({ value: a.slug, label: a.name }))} />
      </div>
      <CtaBlock />
    </>
  );
}
