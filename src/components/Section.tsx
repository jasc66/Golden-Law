import { cn } from "@/lib/cn";

export function Section({
  id, eyebrow, title, emphasis, intro, children, className, action,
}: {
  id?: string; eyebrow?: string; title: string; emphasis?: string; intro?: string;
  children: React.ReactNode; className?: string; action?: React.ReactNode;
}) {
  const hid = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={hid} className={cn("border-t border-line", className)}>
      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 md:py-28 lg:px-10">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            {eyebrow && <p className="label-mono mb-4 text-fg-3">{eyebrow}</p>}
            <h2 id={hid} className="heading max-w-[20ch] text-[clamp(32px,4vw,56px)]">
              {title} {emphasis && <em>{emphasis}</em>}
            </h2>
            {intro && <p className="mt-5 max-w-[56ch] text-fg-2 leading-relaxed">{intro}</p>}
          </div>
          {action}
        </div>
        {children}
      </div>
    </section>
  );
}
