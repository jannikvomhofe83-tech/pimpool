import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Layers, Waves, ArrowRight, Palette, Wrench, Settings, Sparkles, PencilRuler, Droplets, Quote } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { TrustBar } from "@/components/TrustBar";
import { WaveDivider } from "@/components/WaveDivider";
import { useReveal } from "@/lib/useReveal";
import leistungenBg from "@/assets/leistungen-bg.png";

// Echte Bilder von pim POOL (public/images/pim)
const aboutPool = "/images/pim/pool_start.jpg";
const ref9 = "/images/pim/pool_1.jpg";
const ref10 = "/images/pim/pool_2.jpg";
const ref11 = "/images/pim/pool_3.jpg";
const ref12 = "/images/pim/pool_start.jpg";
const ref13 = "/images/pim/glass-enclosure.webp";
const ref14 = "/images/Pim pool/Terrasse verschiebbar mit Handy.png";
const bild19 = "/images/pim/pim-portrait.webp";
const highlight1 = "/images/pim/pool_1.jpg";
const highlight2 = "/images/pim/pool_3.jpg";
const highlight3 = "/images/Pim pool/Terrasse verschiebbar mit Handy.png";
const highlight4 = "/images/pim/glass-enclosure.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "pim POOL – Salzwasser-Pools aus Oberbayern" },
      { name: "description", content: "pim POOL aus Hohenpolding plant und baut individuelle Salzwasser-Pools ganz nach Ihren Wünschen. 35 Jahre Erfahrung, Ihr Ansprechpartner im Großraum München und Erding." },
    ],
  }),
  component: HomePage,
});

// PLATZHALTER – bitte durch echte pim POOL Kundenbewertungen ersetzen.
const REVIEWS = [
  {
    text: "Von der ersten Idee bis zum fertigen Becken hatten wir immer einen festen Ansprechpartner. Unser Pool ist genau so geworden, wie wir sie uns erträumt haben.",
    name: "",
    source: "",
  },
  {
    text: "Die Begeisterung für Wasser spürt man in jedem Detail. Beratung, 3D-Planung und Umsetzung waren rundum stimmig und ehrlich.",
    name: "",
    source: "",
  },
  {
    text: "Das Salzwasser ist so angenehm auf der Haut, und die Pflege ist viel einfacher als gedacht. Wir genießen jeden Tag die Erholung im eigenen Garten.",
    name: "",
    source: "",
  },
];

const LEISTUNGEN = [
  { icon: Sparkles, title: "Salzwasser-Pools", text: "Unsere Spezialität. Salzwasser ist angenehm zur Haut, schont die Augen und ist besonders pflegeleicht.", to: "/poolabdeckungen" },
  { icon: Waves, title: "Pools nach Maß", text: "Wir bauen Ihren Pool Stein für Stein und verwirklichen dabei nahezu jede Form und Größe, die Ihnen vorschwebt.", to: "/poolabdeckungen" },
  { icon: Wrench, title: "Aufbau & Montage", text: "Vom Fundament bis zur fertigen Technik kommt alles aus einer Hand, mit einem festen Ansprechpartner.", to: "/aufbau-unserer-pools" },
  { icon: Palette, title: "Pool-Konfigurator", text: "Probieren Sie Farben und Oberflächen für Ihr Becken direkt online aus, bevor wir gemeinsam planen.", to: "/pool-konfigurator" },
  { icon: Layers, title: "Überdachungen", text: "Ob verschiebbare Terrasse, Glasüberdachung oder Rollabdeckung. So verlängern Sie Ihre Badesaison und schützen das Wasser.", to: "/daecher" },
  { icon: Settings, title: "Wellness & Technik", text: "Gegenstromanlage, Schwalldusche, Luftsprudler und smarte Steuerung machen aus Ihrem Becken eine echte Wellness-Oase.", to: "/kontakt" },
  { icon: PencilRuler, title: "3D-Planung & Beratung", text: "Nach dem Aufmaß fertigen wir eine 3D-Planung, damit Ihre Vorstellungen Gestalt annehmen. Persönlich und mit 35 Jahren Erfahrung.", to: "/kontakt" },
];

function HomePage() {
  const [reviewSlide, setReviewSlide] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);

  return (
    <div ref={rootRef}>
      {/* HERO */}
      <section className="relative isolate overflow-hidden -mt-18 min-h-screen flex items-center">
        {/* Hintergrund: Villa-Pool mit langsamem Zoom + gerichteten Verläufen */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src="/images/pim/pool_1.jpg"
            alt="Rechteckiger Salzwasser-Pool vor moderner Villa"
            width={1000}
            height={601}
            className="hero-kenburns size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#062440]/90 via-[#0A3A5F]/55 to-[#0A3A5F]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#062440]/70 via-transparent to-[#062440]/40" />
          {/* weicher Lichtschimmer wie Wasserreflexe */}
          <div className="hero-shimmer absolute -left-1/4 top-1/3 h-[60%] w-[70%] rounded-full blur-3xl" aria-hidden="true" />
        </div>

        <div data-hero className="container-page relative pt-40 pb-48">
          {/* Text links */}
          <div className="max-w-3xl text-white">
            <div data-hero-item className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#8FD8F5] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[#00A1DE]" />
              </span>
              Salzwasser-Pools aus Oberbayern
            </div>
            <h1
              data-hero-item
              className="mt-6 text-5xl font-bold leading-[1.05] md:text-6xl lg:text-7xl"
              style={{ fontFamily: "'Playfair Display', serif", textShadow: "0 2px 24px rgba(6,36,64,0.5)" }}
            >
              Pools, die
              <br />
              <span className="bg-gradient-to-r from-[#8FD8F5] via-[#4FC3EC] to-[#00A1DE] bg-clip-text italic text-transparent">begeistern.</span>
            </h1>
            <p data-hero-item className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              Individuell geplant und gebaut in Hohenpolding. Sanft zur Haut, einfach in der Pflege und mit
              35 Jahren Erfahrung umgesetzt, von der ersten Idee bis zum ersten Bad.
            </p>
            <div data-hero-item className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/kontakt"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#00A1DE] px-8 py-4 text-sm font-semibold text-white shadow-[0_12px_40px_-8px_rgba(0,161,222,0.7)] transition hover:bg-[#0077B6]"
              >
                Erstberatung vereinbaren
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/pool-konfigurator"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <Palette className="size-4" /> Pool online gestalten
              </Link>
            </div>
          </div>

        </div>

        {/* animierte Wellen als Übergang zur Seite */}
        <WaveDivider className="h-28" />
      </section>

      <TrustBar />

      {/* ÜBER UNS */}
      <section className="mt-20 grid lg:grid-cols-[3fr_1.2fr] overflow-hidden">
        {/* Text links */}
        <div data-reveal="left" className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 lg:py-24 bg-white">
          <h2
            className="text-2xl md:text-3xl lg:text-[1.9rem] font-bold leading-tight text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Wasser ist Lebenselixier und pim POOLs sind Lebensfreude
          </h2>
          <div className="mt-8 border-l-2 pl-6 space-y-3 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif", borderColor: "#00A1DE" }}>
            <p className="text-base text-muted-foreground">
              Wasser fasziniert Groß und Klein. Ob Morgenfitness oder Abkühlung nach einem heißen Tag, ob Meerrauschen oder das Plätschern eines Bachlaufes. Für uns von pim POOL ist jeder Pool, den wir für Sie bauen, pure Lebensfreude.
            </p>
            <p className="text-base text-muted-foreground">
              Gemeinsam mit Ihnen entwerfen wir Ihren ganz individuellen Salzwasser-Pool. Neben unserer Begeisterung dürfen Sie von uns die Erfahrung aus 35 Jahren und ein starkes Netzwerk an Partnern erwarten. Von der Planung bis zur Umsetzung haben Sie immer einen festen Ansprechpartner.
            </p>
            <p className="text-base text-muted-foreground">
              Wir stehen für Qualität bis ins Detail. Wenn Sie selbst mit gestalten möchten, bringen Sie gerne Eigenleistung ein. Oder Sie vertrauen uns und unseren Partnern und genießen einfach.
            </p>
          </div>
        </div>

        {/* Bild rechts */}
        <div data-reveal="right" className="group relative min-h-[520px]" style={{ background: "linear-gradient(160deg, #00A1DE 0%, #0077B6 55%, #0A3A5F 100%)" }}>
          <div className="absolute inset-8 border border-white/50 pointer-events-none z-10" />
          <div className="absolute top-10 -left-10 right-10 bottom-10 shadow-2xl overflow-hidden rounded-sm">
            <img src={aboutPool} alt="Individueller Salzwasser-Pool von pim POOL" className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
          </div>
        </div>
      </section>

      {/* LEISTUNGEN */}
      <section className="relative pt-24 pb-40 overflow-hidden bg-white">
        {/* Wassertropfen Hintergrund */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <img src={leistungenBg} alt="" className="w-full h-full object-cover opacity-40" />
        </div>

        <div className="container-page relative z-10">
          <h2
            data-reveal
            className="text-center text-4xl md:text-5xl font-bold mb-16 text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Unsere Leistungen
          </h2>
          <div data-reveal-group className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LEISTUNGEN.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                data-reveal-item
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#DCEBF3] bg-white/85 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00A1DE]/40 hover:shadow-elegant"
              >
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#00A1DE] to-[#0077B6] transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                <span className="grid size-12 place-items-center rounded-xl bg-[#E6F6FD] transition-colors duration-300 group-hover:bg-[#00A1DE]">
                  <item.icon className="size-6 text-[#00A1DE] transition-colors duration-300 group-hover:text-white" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0077B6]">
                  Mehr erfahren <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
        <WaveDivider color="#F2F9FD" />
      </section>

      {/* HIGHLIGHTS */}
      <section>
        <div className="pt-8 pb-16 text-center" style={{ backgroundColor: "#F2F9FD" }}>
          <div data-reveal className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Highlights</div>
          <h2
            data-reveal
            data-reveal-delay="0.08"
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Vier gute Gründe für Ihren pim POOL
          </h2>
        </div>
        <div data-reveal-group className="grid grid-cols-2 lg:grid-cols-4 gap-y-8" style={{ backgroundColor: "#F2F9FD" }}>
          {/* Zeile 1 */}
          <div data-reveal-item className="bg-[#F2F9FD] flex flex-col items-center justify-center px-8 py-16 min-h-[480px]">
            <Waves className="size-16 mb-6" strokeWidth={1} style={{ color: "#00A1DE" }} />
            <h3 className="text-xl font-bold text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Pools nach Maß</h3>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">Stein für Stein entsteht Ihr Becken in der Form, Größe und Tiefe, die Sie sich wünschen.</p>
            <Link to="/poolabdeckungen" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">Mehr erfahren <ArrowRight className="size-3.5" /></Link>
          </div>
          <div data-reveal-item className="group min-h-[480px] overflow-hidden">
            <img src={highlight1} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
          </div>
          <div data-reveal-item className="bg-[#F2F9FD] flex flex-col items-center justify-center px-8 py-16 min-h-[480px]">
            <Droplets className="size-16 mb-6" strokeWidth={1} style={{ color: "#00A1DE" }} />
            <h3 className="text-xl font-bold text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Salzwasser</h3>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">Weiches Wasser ohne störenden Chlorgeruch, angenehm für Haut und Augen und dabei besonders pflegeleicht.</p>
            <Link to="/poolabdeckungen" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">Mehr erfahren <ArrowRight className="size-3.5" /></Link>
          </div>
          <div data-reveal-item className="group min-h-[480px] overflow-hidden">
            <img src={highlight2} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
          </div>
          {/* Zeile 2 */}
          <div data-reveal-item className="bg-[#F2F9FD] flex flex-col items-center justify-center px-8 py-16 min-h-[480px]">
            <Layers className="size-16 mb-6" strokeWidth={1} style={{ color: "#00A1DE" }} />
            <h3 className="text-xl font-bold text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Komfort & Technik</h3>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">Verschiebbare Terrasse, Überdachung oder Smart Home: Ihr Pool lässt sich bequem per App steuern.</p>
            <Link to="/poolabdeckungen" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">Mehr erfahren <ArrowRight className="size-3.5" /></Link>
          </div>
          <div data-reveal-item className="group min-h-[480px] overflow-hidden">
            <img src={highlight3} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
          </div>
          <div data-reveal-item className="bg-[#F2F9FD] flex flex-col items-center justify-center px-8 py-16 min-h-[480px]">
            <Wrench className="size-16 mb-6" strokeWidth={1} style={{ color: "#00A1DE" }} />
            <h3 className="text-xl font-bold text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Aufbau & Montage</h3>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">Von der Planung über den Beckenbau bis zur Technik kommt alles aus einer Hand.</p>
            <Link to="/aufbau-unserer-pools" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">Mehr erfahren <ArrowRight className="size-3.5" /></Link>
          </div>
          <div data-reveal-item className="group min-h-[480px] overflow-hidden">
            <img src={highlight4} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
          </div>
        </div>
      </section>

      {/* REFERENZEN */}
      <section className="relative overflow-hidden gradient-deep pt-36 pb-44 text-white">
        <WaveDivider color="#F2F9FD" position="top" />
        <div className="pointer-events-none absolute -right-40 top-1/4 size-[36rem] rounded-full bg-[#00A1DE]/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-40 bottom-10 size-[28rem] rounded-full bg-[#0077B6]/25 blur-3xl" aria-hidden="true" />

        <div className="container-page relative">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div data-reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8FD8F5]">Realisierte Projekte</p>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Referenzen
              </h2>
            </div>
            <Link
              data-reveal
              to="/poolabdeckungen"
              className="group inline-flex items-center gap-2 self-start rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur-md transition hover:bg-white/20 md:self-auto"
            >
              Alle Salzwasser-Pools <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div data-reveal-group className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
            {[ref9, ref10, ref11, ref12, ref13, ref14].map((src, i) => (
              <div
                key={i}
                data-reveal-item
                className={`group relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 ${i === 0 ? "md:col-span-2 md:row-span-2" : ""} aspect-[4/3] ${i === 0 ? "md:aspect-auto" : ""}`}
              >
                <img src={src} alt="Salzwasser-Pool von pim POOL" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062440]/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
        <WaveDivider color="#ffffff" />
      </section>

      {/* REZENSIONEN */}
      <section className="relative overflow-hidden bg-white py-24 px-8">
        {/* Wassertropfen-Textur */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <img src={leistungenBg} alt="" className="w-full h-full object-cover opacity-15" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h2
            data-reveal
            className="text-5xl font-bold text-foreground mb-14"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Rezensionen
          </h2>

          {/* Zitat-Box */}
          <div data-reveal data-reveal-delay="0.1" className="relative rounded-3xl border border-[#DCEBF3] bg-white/90 px-8 py-12 shadow-elegant backdrop-blur-sm md:px-14">
            <span className="absolute -top-7 left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-full bg-gradient-to-br from-[#00A1DE] to-[#0077B6] shadow-lg" aria-hidden="true">
              <Quote className="size-6 text-white" />
            </span>
            <div className="min-h-[140px] flex flex-col justify-center">
              <p
                className="text-xl leading-relaxed text-foreground/80 italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {REVIEWS[reviewSlide].text}
              </p>
              {REVIEWS[reviewSlide].name && (
                <p className="mt-8 text-base font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {REVIEWS[reviewSlide].name}
                </p>
              )}
              {REVIEWS[reviewSlide].source && (
                <p className="mt-1 text-sm text-muted-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {REVIEWS[reviewSlide].source}
                </p>
              )}
            </div>
          </div>

          {/* Navigations-Punkte */}
          <div className="flex justify-center gap-2 mt-10">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setReviewSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === reviewSlide ? "w-8 bg-[#00A1DE]" : "w-2 bg-[#0A3A5F]/20 hover:bg-[#0A3A5F]/40"}`}
                aria-label={`Rezension ${i + 1}`}
              />
            ))}
          </div>

          <Link
            to="/kontakt"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-[#0A3A5F] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0077B6]"
          >
            Kontakt aufnehmen <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ÜBER UNS – Bild links / Text rechts */}
      <section id="ueber-uns" className="grid lg:grid-cols-2 overflow-hidden scroll-mt-20">
        {/* Bild – Porträt von Pim van der Poel, vollständig sichtbar */}
        <div data-reveal="left" className="relative min-h-[600px] flex items-end justify-center" style={{ background: "linear-gradient(160deg, #E6F6FD 0%, #BFE4F5 100%)" }}>
          <img src={bild19} alt="Pim van der Poel, Geschäftsführer von pim POOL" className="h-[88%] w-auto max-w-full object-contain self-end" />
        </div>

        {/* Text rechts */}
        <div data-reveal="right" className="flex flex-col justify-center px-14 lg:px-20 py-20 bg-white">
          <h2
            className="text-4xl font-bold text-foreground mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Über uns
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-10">
            Seit 35 Jahren baut unser Geschäftsführer Pim van der Poel Wasseranlagen für seine Kunden, angefangen in Holland. Diese Erfahrung fließt heute in jeden Pool ein, der in Hohenpolding entsteht. Für die Umsetzung sind viele Bauabschnitte nötig, von den Erdarbeiten über den Wasseranschluss bis zur Gartengestaltung. Wir koordinieren alle Firmen, damit Sie immer einen festen Ansprechpartner haben.
          </p>

          {/* Callout mit linkem Balken */}
          <div className="border-l-[3px] pl-5 mb-6" style={{ borderColor: "#00A1DE" }}>
            <p className="text-base font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              Unsere Leistungen auf einen Blick:
            </p>
          </div>

          {/* 2-spaltige Liste – klickbar */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {LEISTUNGEN.map((item) => (
              <Link key={item.title} to={item.to} className="flex items-center gap-3 group">
                <div className="size-2.5 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-150" style={{ backgroundColor: "#00A1DE" }} />
                <span className="text-sm text-foreground group-hover:text-primary transition">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
