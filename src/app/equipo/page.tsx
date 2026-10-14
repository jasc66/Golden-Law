import type { Metadata } from "next";
import { CtaBlock } from "@/components/CtaBlock";
import { PageHeader } from "@/components/PageHeader";
import { TeamCard } from "@/components/TeamCard";
import { TeamExplorer } from "@/components/TeamExplorer";
import { site } from "@/content";

export const metadata: Metadata = {
  title: "Equipo",
  description: `Conozca al equipo de ${site.brand.name}.`,
  alternates: { canonical: "/equipo" },
};

export default function TeamPage() {
  const cards = Object.fromEntries(site.team.map((l) => [l.slug, <TeamCard key={l.slug} lawyer={l} headingLevel={2} />]));
  return (
    <>
      <PageHeader crumbs={[{ name: "Equipo", path: "/equipo" }]} eyebrow="Equipo" title="Quién lleva" emphasis="su caso." intro="Filtre por área, idioma o sede para encontrar a la persona indicada." />
      <div className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-6 lg:px-10">
        <TeamExplorer team={site.team} areas={site.areas.map((a) => ({ value: a.slug, label: a.name }))} cards={cards} />
      </div>
      <CtaBlock />
    </>
  );
}
