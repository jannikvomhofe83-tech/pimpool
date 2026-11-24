import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COMPANY } from "@/lib/site";
import { WaveDivider } from "@/components/WaveDivider";

export function CTASection({
  title = "Ihr Salzwasser-Pool beginnt hier.",
  text = "Erzählen Sie uns von Ihren Vorstellungen und wir planen gemeinsam Ihren ganz persönlichen Salzwasser-Pool. Die Beratung ist für Sie unverbindlich und kostenfrei.",
  primary = "Jetzt unverbindlich beraten lassen",
}: { title?: string; text?: string; primary?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".cta-card", {
        y: 48, opacity: 0, scale: 0.98, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
      gsap.from(".cta-item", {
        y: 24, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.12, delay: 0.15,
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="container-page my-20">
      <div className="cta-card relative overflow-hidden rounded-3xl gradient-deep p-10 md:p-16 text-primary-foreground shadow-elegant">
        <div className="absolute -top-24 -right-24 size-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 size-72 rounded-full bg-primary/20 blur-3xl" />
        <WaveDivider color="rgba(143, 216, 245, 0.10)" className="h-24 md:h-32" layers={2} />
        <div className="relative z-[2] grid md:grid-cols-[1.5fr_1fr] gap-8 items-center">
          <div className="cta-item">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">{title}</h2>
            <p className="mt-3 text-primary-foreground/80 max-w-xl">{text}</p>
          </div>
          <div className="cta-item flex flex-col sm:flex-row md:flex-col gap-3">
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center rounded-full bg-[#00A1DE] px-6 py-3.5 font-semibold shadow-[0_12px_40px_-8px_rgba(0,161,222,0.7)] transition hover:bg-[#0077B6] text-white"
            >
              {primary}
            </Link>
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3.5 font-medium hover:bg-primary-foreground/10 transition"
            >
              <Phone className="size-4" /> {COMPANY.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
