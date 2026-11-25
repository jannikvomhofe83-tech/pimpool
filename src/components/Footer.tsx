import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Mail } from "lucide-react";
import { COMPANY, NAV } from "@/lib/site";
import { WaveDivider } from "@/components/WaveDivider";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden gradient-deep text-primary-foreground">
      <WaveDivider position="top" className="h-16 md:h-24" />
      <div className="pointer-events-none absolute -right-32 top-20 size-96 rounded-full bg-[#00A1DE]/15 blur-3xl" aria-hidden="true" />
      <div className="container-page relative pt-28 pb-16 md:pt-36">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1 space-y-5">
            <Link to="/">
              <img
                src="/images/logo/pimpool-logo-quer-negativ.png"
                alt="pim POOL"
                width={900}
                height={231}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-primary-foreground/75 leading-relaxed">
              {COMPANY.full}. Individuelle Salzwasser-Pools, geplant und gebaut in {COMPANY.region}. Aus Begeisterung für Wasser.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2"><MapPin className="size-4 mt-0.5 text-[#8FD8F5]" />{COMPANY.street}, {COMPANY.zip} {COMPANY.city}</div>
              <a href={COMPANY.phoneHref} className="flex items-center gap-2 hover:text-[#8FD8F5]"><Phone className="size-4 text-[#8FD8F5]" />{COMPANY.phone}</a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-[#8FD8F5]"><Mail className="size-4 text-[#8FD8F5]" />{COMPANY.email}</a>
            </div>
          </div>

          <div className="lg:col-span-3 text-sm">
            <span className="font-semibold mb-3 inline-block">Navigation</span>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-primary-foreground/70 hover:text-[#8FD8F5]">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <div>© {new Date().getFullYear()} {COMPANY.full}. Alle Rechte vorbehalten.</div>
          <div className="flex gap-5">
            <Link to="/impressum" className="hover:text-[#8FD8F5]">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-[#8FD8F5]">Datenschutz</Link>
            <Link to="/kontakt" className="hover:text-[#8FD8F5]">Kontakt</Link>
          </div>
        </div>

        <div className="mt-4 text-xs text-primary-foreground/60">
          Teile der Inhalte dieser Website wurden mit Unterstützung von KI erstellt.
        </div>
      </div>
    </footer>
  );
}
