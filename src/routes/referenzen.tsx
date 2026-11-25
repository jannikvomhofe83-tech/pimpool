import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, Waves, Umbrella, Cpu, Expand } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { useReveal } from "@/lib/useReveal";
import data from "@/lib/referenzen.json";

type Img = { src: string; thumb: string; w: number; h: number; caption: string };
type Group = { cat: string; key: string; title: string; images: Img[] };
const GROUPS = data as Group[];

const TABS = [
  { cat: "poolprojekte", label: "Poolprojekte", icon: Waves, intro: "Außenpools, Innenpools, Renovierungen und der Weg von der 3D-Planung bis zum fertigen Becken." },
  { cat: "abdeckungen", label: "Abdeckungen", icon: Umbrella, intro: "Schiebeüberdachungen, Rollladenabdeckungen und Hubboden, damit Ihr Wasser sauber und warm bleibt." },
  { cat: "technik", label: "Technik", icon: Cpu, intro: "Saubere, durchdachte Technikräume und Technikschächte. Vollautomatisiert, wartungsfreundlich und platzsparend." },
] as const;

export const Route = createFileRoute("/referenzen")({
  head: () => ({
    meta: [
      { title: "Referenzen – pim POOL" },
      {
        name: "description",
        content: "Echte Projekte von pim POOL: Salzwasser-Pools, Innenpools, Renovierungen, Überdachungen und Technik aus Oberbayern.",
      },
    ],
  }),
  component: ReferenzenPage,
});

function ReferenzenPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["cat"]>("poolprojekte");
  const [open, setOpen] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);

  const groups = useMemo(() => GROUPS.filter((g) => g.cat === tab), [tab]);
  const flat = useMemo(() => groups.flatMap((g) => g.images), [groups]);
  const counts = useMemo(
    () => Object.fromEntries(TABS.map((t) => [t.cat, GROUPS.filter((g) => g.cat === t.cat).reduce((n, g) => n + g.images.length, 0)])),
    [],
  );
  const active = TABS.find((t) => t.cat === tab)!;

  const prev = useCallback(() => setOpen((i) => (i === null ? i : (i - 1 + flat.length) % flat.length)), [flat.length]);
  const next = useCallback(() => setOpen((i) => (i === null ? i : (i + 1) % flat.length)), [flat.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, prev, next]);

  let offset = 0;

  return (
    <div ref={rootRef}>
      <PageHero
        eyebrow="Referenzen"
        title="Pools, die wir gebaut haben"
        subtitle="Echte Projekte aus Oberbayern, fotografiert direkt auf der Baustelle und beim Kunden im Garten."
        crumbs={[{ label: "Referenzen" }]}
        image="/images/referenzen/poolprojekte/fertig-01.jpg"
        ctaLabel="Projekte ansehen"
        ctaHref="#galerie"
      />

      <section id="galerie" className="container-page scroll-mt-24 py-14 md:py-20">
        {/* Reiter */}
        <div data-reveal className="flex flex-wrap justify-center gap-3" role="tablist" aria-label="Kategorien">
          {TABS.map((t) => {
            const on = t.cat === tab;
            return (
              <button
                key={t.cat}
                role="tab"
                aria-selected={on}
                onClick={() => setTab(t.cat)}
                className={`group inline-flex items-center gap-2.5 rounded-full border px-6 py-3 text-sm font-semibold transition ${
                  on
                    ? "border-[#0077B6] bg-[#0077B6] text-white shadow-[0_12px_30px_-10px_rgba(0,119,182,0.7)]"
                    : "border-border bg-white text-foreground hover:border-[#00A1DE] hover:bg-[#E6F6FD]"
                }`}
              >
                <t.icon className="size-4" />
                {t.label}
                <span className={`rounded-full px-2 py-0.5 text-xs ${on ? "bg-white/20" : "bg-[#E6F6FD] text-[#0077B6]"}`}>{counts[t.cat]}</span>
              </button>
            );
          })}
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-muted-foreground">{active.intro}</p>

        {groups.map((g) => {
          const start = offset;
          offset += g.images.length;
          return (
            <div key={g.key} className="mt-14">
              {groups.length > 1 && (
                <div className="mb-6 flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-[#0A3A5F] md:text-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {g.title}
                  </h2>
                  <span className="h-px flex-1 bg-gradient-to-r from-[#00A1DE]/50 to-transparent" />
                  <span className="text-sm text-muted-foreground">{g.images.length} Bilder</span>
                </div>
              )}
              <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
                {g.images.map((img, i) => (
                  <button
                    key={img.src}
                    onClick={() => setOpen(start + i)}
                    className="group relative mb-3 block w-full overflow-hidden rounded-xl bg-[#E6F6FD] md:mb-4"
                    style={{ aspectRatio: `${img.w} / ${img.h}` }}
                    aria-label={img.caption || `${g.title}, Bild ${i + 1} vergrößern`}
                  >
                    <img
                      src={img.thumb}
                      alt={img.caption || `${g.title} von pim POOL`}
                      loading="lazy"
                      width={img.w}
                      height={img.h}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#062440]/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <Expand className="absolute right-3 top-3 size-5 text-white opacity-0 drop-shadow transition-opacity duration-300 group-hover:opacity-100" />
                    {img.caption && (
                      <span className="absolute inset-x-0 bottom-0 p-3 text-left text-sm font-semibold text-white drop-shadow md:translate-y-2 md:opacity-0 md:transition md:duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                        {img.caption}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {open !== null && flat[open] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#041a2e]/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Bildansicht"
          onClick={() => setOpen(null)}
        >
          <img
            src={flat[open].src}
            alt={flat[open].caption || "Referenzbild pim POOL"}
            className="max-h-[86vh] max-w-full rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute inset-x-0 bottom-4 text-center text-sm text-white/80">
            {flat[open].caption && <span className="font-semibold text-white">{flat[open].caption} · </span>}
            {open + 1} / {flat.length}
          </div>
          <button onClick={(e) => { e.stopPropagation(); setOpen(null); }} className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Schließen">
            <X className="size-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Vorheriges Bild">
            <ChevronLeft className="size-7" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Nächstes Bild">
            <ChevronRight className="size-7" />
          </button>
        </div>
      )}

      <CTASection
        title="Ihr Pool könnte der nächste sein."
        text="Erzählen Sie uns von Ihrem Garten und Ihren Wünschen. Wir planen Ihren Salzwasser-Pool persönlich und kostenfrei."
        primary="Jetzt Beratung anfragen"
      />
    </div>
  );
}
