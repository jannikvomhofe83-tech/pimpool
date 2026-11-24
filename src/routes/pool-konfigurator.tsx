import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ExternalLink, MousePointerClick, Palette, Sun, Waves } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { useReveal } from "@/lib/useReveal";

// Kostenloser 3D-Pool-Konfigurator von CGT Alkor (externer Anbieter)
const CONFIGURATOR_URL = "https://www.cgt-alkor.com/configurator?lang=de-DE";

export const Route = createFileRoute("/pool-konfigurator")({
  head: () => ({
    meta: [
      { title: "Pool-Konfigurator – pim POOL" },
      {
        name: "description",
        content: "Gestalten Sie Ihren Traumpool online: Farben, Oberflächen und Umgebung im 3D-Pool-Konfigurator ausprobieren und anschließend mit pim POOL umsetzen.",
      },
    ],
  }),
  component: KonfiguratorPage,
});

const HOW = [
  { icon: Waves, title: "Becken wählen", text: "Wählen Sie Form und Umgebung, die Ihrem Garten am nächsten kommen." },
  { icon: Palette, title: "Farbe ausprobieren", text: "Testen Sie verschiedene Farben und Oberflächen und sehen Sie sofort die Wasserwirkung." },
  { icon: Sun, title: "Gemeinsam umsetzen", text: "Schicken Sie uns Ihren Favoriten. Wir beraten Sie und bauen Ihren Salzwasser-Pool." },
];

function KonfiguratorPage() {
  const [loaded, setLoaded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);

  return (
    <div ref={rootRef}>
      <PageHero
        eyebrow="Pool-Konfigurator"
        title="Stellen Sie sich den Pool Ihrer Träume vor"
        subtitle="Testen Sie Farben und Oberflächen in einer realistischen 3D-Umgebung, kostenlos und unverbindlich."
        crumbs={[{ label: "Pool-Konfigurator" }]}
        image="/images/pim/pool_3.jpg"
        ctaLabel="Zum Konfigurator"
        ctaHref="#konfigurator"
      />

      <section className="container-page py-16 md:py-20">
        <div data-reveal-group className="grid gap-5 md:grid-cols-3">
          {HOW.map((h, i) => (
            <div key={h.title} data-reveal-item className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-[#E6F6FD] ring-1 ring-inset ring-[#00A1DE]/30">
                  <h.icon className="size-5 text-[#0077B6]" strokeWidth={1.75} />
                </span>
                <span className="text-sm font-semibold text-[#00A1DE]">Schritt {i + 1}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-[#0A3A5F]">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="konfigurator" className="container-page scroll-mt-24">
        <div data-reveal className="overflow-hidden rounded-3xl border border-border bg-[#0A3A5F] shadow-elegant">
          {loaded ? (
            <iframe
              title="3D-Pool-Konfigurator"
              src={CONFIGURATOR_URL}
              className="block h-[80vh] min-h-[560px] w-full bg-white"
              allow="fullscreen; xr-spatial-tracking"
              allowFullScreen
            />
          ) : (
            <div className="relative grid min-h-[480px] place-items-center px-6 py-16 text-center text-white">
              <img src="/images/pim/pool_1.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0A3A5F]/60 to-[#062440]/90" aria-hidden="true" />
              <div className="relative max-w-xl">
                <MousePointerClick className="mx-auto size-12 text-[#8FD8F5]" strokeWidth={1.5} />
                <h2 className="mt-5 text-3xl font-bold md:text-4xl">3D-Pool-Konfigurator starten</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  Der Konfigurator wird von einem externen Anbieter (CGT Alkor) bereitgestellt. Mit dem Klick auf
                  „Konfigurator laden“ werden Inhalte von cgt-alkor.com geladen und dabei Daten wie Ihre IP-Adresse an
                  den Anbieter übertragen.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setLoaded(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#00A1DE] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#0077B6]"
                  >
                    Konfigurator laden
                  </button>
                  <a
                    href={CONFIGURATOR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium transition hover:bg-white/10"
                  >
                    In neuem Tab öffnen <ExternalLink className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        {loaded && (
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Konfigurator bereitgestellt von CGT Alkor.{" "}
            <a href={CONFIGURATOR_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Im Vollbild öffnen
            </a>
          </p>
        )}
      </section>

      <CTASection
        title="Ihren Favoriten gefunden?"
        text="Machen Sie einen Screenshot Ihrer Wunschkombination und schicken Sie ihn uns mit Ihrer Anfrage. Wir beraten Sie persönlich und kostenfrei."
        primary="Jetzt Beratung anfragen"
      />
    </div>
  );
}
