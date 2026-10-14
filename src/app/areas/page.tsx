import type { Metadata } from "next";
import { CtaBlock } from "@/components/CtaBlock";
import { PageHeader } from "@/components/PageHeader";
import { PracticeGrid } from "@/components/PracticeGrid";
import { site } from "@/content";

export const metadata: Metadata = {
  title: "Áreas de práctica",
  description: `Áreas de práctica de ${site.brand.name}: ${site.areas.map((a) => a.name).join(", ")}.`,
  alternates: { canonical: "/areas" },
};

export default function AreasPage() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Áreas de práctica", path: "/areas" }]} eyebrow="Servicios" title="Áreas de" emphasis="práctica."
        intro="Elija un área para ver qué cubrimos, cómo trabajamos, cómo cobramos y las preguntas más comunes." />
      <div className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-6 lg:px-10">
        <PracticeGrid areas={site.areas} headingLevel={2} />
      </div>
      <CtaBlock />
    </>
  );
}
