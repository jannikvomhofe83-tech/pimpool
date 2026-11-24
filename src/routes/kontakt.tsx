import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { Phone, Mail, MapPin, Clock, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { useReveal } from "@/lib/useReveal";
import { COMPANY } from "@/lib/site";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Anfrage & Kontakt – pim POOL Hohenpolding" },
      { name: "description", content: "Fragen Sie Ihren Salzwasser-Pool an. Persönliche, kostenfreie Beratung von pim POOL aus Hohenpolding in Oberbayern." },
    ],
  }),
  component: KontaktPage,
});

// Vorqualifizierung: Auswahlmöglichkeiten
const PROJEKT = ["Neuer Pool", "Bestehenden Pool sanieren", "Noch unsicher"];
const GROESSE = ["Bis ca. 6 × 3 m", "Bis ca. 8 × 4 m", "Größer als 8 × 4 m", "Noch offen"];
const ZEITRAUM = ["In den nächsten 6 Monaten", "In 6 bis 12 Monaten", "In mehr als 12 Monaten", "Noch offen"];
const BUDGET = ["Unter 40.000 €", "40.000 – 60.000 €", "60.000 – 90.000 €", "Über 90.000 €", "Noch offen"];
const GRUNDSTUECK = ["Ja, eigenes Grundstück", "Neubau in Planung", "Nein / gemietet"];
const QUELLE = ["Google", "Instagram", "Facebook", "Empfehlung", "Unser Firmenfahrzeug gesehen", "Sonstiges"];

type Answers = Record<string, string>;

const STEPS = ["Ihr Projekt", "Standort & Rahmen", "Ihre Kontaktdaten"] as const;

function KontaktPage() {
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({});
  const [error, setError] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);

  const set = (k: string, v: string) => {
    setA((prev) => ({ ...prev, [k]: v }));
    setError(null);
  };

  const required: string[][] = [
    ["projekt", "groesse", "zeitraum"],
    ["plz", "ort", "grundstueck"],
    ["name", "email", "phone", "consent"],
  ];

  const next = () => {
    const missing = required[step].filter((k) => !a[k]?.trim());
    if (missing.length) {
      setError("Bitte füllen Sie alle Pflichtfelder (*) aus.");
      return;
    }
    if (step === 1 && !/^\d{5}$/.test(a.plz ?? "")) {
      setError("Bitte geben Sie eine gültige fünfstellige Postleitzahl ein.");
      return;
    }
    setStep((s) => s + 1);
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < STEPS.length - 1) {
      next();
      return;
    }
    const missing = required[step].filter((k) => !a[k]?.trim());
    if (missing.length) {
      setError(missing.includes("consent") && missing.length === 1
        ? "Bitte stimmen Sie der Datenschutzerklärung zu."
        : "Bitte füllen Sie alle Pflichtfelder (*) aus.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(a.email ?? "")) {
      setError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }
    // TODO: Anfrage an E-Mail/CRM übermitteln (aktuell noch kein Versand angebunden)
    setSent(true);
  };

  return (
    <div ref={rootRef}>
      <PageHero
        eyebrow="Anfrage"
        title="Ihr Salzwasser-Pool beginnt mit einem Gespräch"
        subtitle="In drei kurzen Schritten zu Ihrer persönlichen Beratung. Unverbindlich und kostenfrei."
        crumbs={[{ label: "Kontakt" }]}
        image="/images/pim/pool_2.jpg"
        ctaLabel="Jetzt Anfrage starten"
        ctaHref="#angebot"
      />

      <section id="angebot" className="container-page py-16 grid lg:grid-cols-[1.3fr_1fr] gap-10 scroll-mt-24">
        <form data-reveal="left" noValidate className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-card" onSubmit={submit}>
          <h2 className="text-2xl font-bold">Kostenlose Beratung anfragen</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Damit wir uns optimal vorbereiten können, stellen wir Ihnen ein paar kurze Fragen. Antwort in der Regel innerhalb von 24 Stunden.
          </p>

          {sent ? (
            <div className="mt-6 rounded-2xl bg-primary/10 border border-primary/30 p-6 text-foreground">
              <div className="flex items-center gap-2 font-semibold text-primary"><Check className="size-5" /> Vielen Dank, {a.name}!</div>
              <p className="mt-2 text-sm">Wir haben Ihre Anfrage erhalten und melden uns schnellstmöglich bei Ihnen.</p>
            </div>
          ) : (
            <>
              {/* Fortschritt */}
              <ol className="mt-6 grid grid-cols-3 gap-2" aria-label="Fortschritt">
                {STEPS.map((label, i) => (
                  <li key={label}>
                    <div className={`h-1.5 rounded-full transition-colors ${i <= step ? "bg-[#00A1DE]" : "bg-border"}`} />
                    <span className={`mt-2 block text-xs font-medium ${i === step ? "text-foreground" : "text-muted-foreground"}`}>
                      {i + 1}. {label}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-8 grid gap-6">
                {step === 0 && (
                  <>
                    <Choice label="Um was für ein Projekt geht es?" name="projekt" options={PROJEKT} value={a.projekt} onChange={set} required />
                    <Choice label="Welche Poolgröße schwebt Ihnen vor?" name="groesse" options={GROESSE} value={a.groesse} onChange={set} required />
                    <Choice label="Wann soll der Pool fertig sein?" name="zeitraum" options={ZEITRAUM} value={a.zeitraum} onChange={set} required />
                  </>
                )}

                {step === 1 && (
                  <>
                    <div>
                      <p className="text-sm font-medium">Wo soll der Pool gebaut werden? *</p>
                      <div className="mt-2 grid grid-cols-[8rem_1fr] gap-3">
                        <Input label="PLZ" name="plz" value={a.plz} onChange={set} inputMode="numeric" maxLength={5} autoComplete="postal-code" />
                        <Input label="Ort" name="ort" value={a.ort} onChange={set} autoComplete="address-level2" />
                      </div>
                    </div>
                    <Choice label="Ist das Grundstück in Ihrem Eigentum?" name="grundstueck" options={GRUNDSTUECK} value={a.grundstueck} onChange={set} required />
                    <Choice label="Welchen Budgetrahmen haben Sie eingeplant?" name="budget" options={BUDGET} value={a.budget} onChange={set} />
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input label="Name" name="name" value={a.name} onChange={set} autoComplete="name" showLabel required />
                      <Input label="Telefon" name="phone" type="tel" value={a.phone} onChange={set} autoComplete="tel" showLabel required />
                    </div>
                    <Input label="E-Mail" name="email" type="email" value={a.email} onChange={set} autoComplete="email" showLabel required />
                    <Choice label="Wie sind Sie auf uns aufmerksam geworden?" name="quelle" options={QUELLE} value={a.quelle} onChange={set} />
                    <div>
                      <label htmlFor="nachricht" className="text-sm font-medium">Ihre Nachricht (optional)</label>
                      <textarea
                        id="nachricht"
                        rows={4}
                        value={a.nachricht ?? ""}
                        onChange={(e) => set("nachricht", e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <label className="flex items-start gap-2 text-xs text-muted-foreground">
                      <input type="checkbox" checked={a.consent === "ja"} onChange={(e) => set("consent", e.target.checked ? "ja" : "")} className="mt-0.5" />
                      <span>Ich habe die <Link to="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link> gelesen und stimme der Verarbeitung meiner Angaben zur Kontaktaufnahme zu.</span>
                    </label>
                  </>
                )}

                {error && <p role="alert" className="text-sm font-medium text-destructive">{error}</p>}

                <div className="flex items-center gap-3">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => { setStep((s) => s - 1); setError(null); }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-3.5 text-sm font-semibold hover:bg-muted transition"
                    >
                      <ArrowLeft className="size-4" /> Zurück
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full gradient-water text-primary-foreground py-3.5 font-semibold shadow-card hover:opacity-95 transition"
                  >
                    {step < STEPS.length - 1 ? <>Weiter <ArrowRight className="size-4" /></> : "Anfrage absenden"}
                  </button>
                </div>
              </div>
            </>
          )}
        </form>

        <aside data-reveal-group className="space-y-6">
          <div data-reveal-item className="rounded-3xl gradient-deep text-primary-foreground p-8 shadow-elegant">
            <h3 className="text-xl font-bold">So erreichen Sie uns</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3"><MapPin className="size-5 text-[#8FD8F5] mt-0.5" /><span>{COMPANY.street}<br />{COMPANY.zip} {COMPANY.city}</span></li>
              <li className="flex items-center gap-3"><Phone className="size-5 text-[#8FD8F5]" /><a href={COMPANY.phoneHref} className="hover:text-[#8FD8F5]">{COMPANY.phone}</a></li>
              <li className="flex items-center gap-3"><Mail className="size-5 text-[#8FD8F5]" /><a href={`mailto:${COMPANY.email}`} className="hover:text-[#8FD8F5]">{COMPANY.email}</a></li>
            </ul>
          </div>

          <div data-reveal-item className="rounded-3xl border border-border bg-card p-8">
            <h3 className="text-lg font-bold flex items-center gap-2"><Clock className="size-5 text-primary" /> Öffnungszeiten</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {COMPANY.hours.map((h) => (
                <li key={h.d} className="flex justify-between border-b border-border/60 last:border-0 py-1.5">
                  <span className="font-medium">{h.d}</span><span className="text-muted-foreground">{h.h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal-item className="rounded-3xl overflow-hidden border border-border aspect-[4/3]">
            <iframe
              title="Karte"
              className="size-full"
              loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=12.03%2C48.28%2C12.11%2C48.32&layer=mapnik&marker=48.3017%2C12.0683`}
            />
          </div>
        </aside>
      </section>
    </div>
  );
}

function Choice({
  label, name, options, value, onChange, required,
}: { label: string; name: string; options: string[]; value?: string; onChange: (k: string, v: string) => void; required?: boolean }) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">{label}{required && " *"}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o;
          return (
            <label
              key={o}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition focus-within:ring-2 focus-within:ring-ring ${
                active ? "border-[#0077B6] bg-[#0077B6] text-white" : "border-border bg-background hover:border-[#00A1DE] hover:bg-[#E6F6FD]"
              }`}
            >
              <input type="radio" name={name} value={o} checked={active} onChange={() => onChange(name, o)} className="sr-only" />
              {o}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function Input({
  label, name, type = "text", value, onChange, showLabel, required, ...rest
}: {
  label: string; name: string; type?: string; value?: string; onChange: (k: string, v: string) => void;
  showLabel?: boolean; required?: boolean; inputMode?: "numeric"; maxLength?: number; autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={showLabel ? "text-sm font-medium" : "sr-only"}>{label}{required && " *"}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={showLabel ? undefined : label}
        value={value ?? ""}
        onChange={(e) => onChange(name, e.target.value)}
        className={`${showLabel ? "mt-1.5 " : ""}w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring`}
        {...rest}
      />
    </div>
  );
}
