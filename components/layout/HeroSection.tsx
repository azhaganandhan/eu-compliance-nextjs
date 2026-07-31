import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, ShieldCheck, BarChart3, BookOpen, Globe } from "lucide-react";

const chips = [
  { icon: ShieldCheck, label: "Compliance readiness" },
  { icon: Globe, label: "EU market access" },
  { icon: BarChart3, label: "Sector intelligence" },
  { icon: BookOpen, label: "Guidance resources" },
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      {/* Decorative swirl gradient (matches ITN signature pink-purple swirl) */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-72 opacity-50 blur-2xl"
        style={{
          background:
            "radial-gradient(60% 80% at 30% 100%, hsl(320 78% 60% / 0.55) 0%, transparent 60%), radial-gradient(60% 80% at 75% 100%, hsl(256 100% 68% / 0.5) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--primary-foreground)) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl" aria-hidden />

      <div className="container mx-auto relative py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 items-start">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground text-xs font-medium tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              Initiatives
            </span>
            <h1 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-primary-foreground leading-[1.05] tracking-tight">
              Decarbonisation<br />
              <span className="text-primary-foreground/95">Intelligence Unit</span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-primary-foreground/85 leading-relaxed max-w-xl">
              Helping Tamil Nadu industries navigate carbon regulations
              and emerging trade requirements through practical guidance,
              digital tools, and expert support.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button variant="white-on-blue" onClick={() => scrollTo("tools")}>
                Explore tools
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="hero-outline" onClick={() => window.dispatchEvent(new Event("diu:open-chat"))}>
                <MessageSquare className="w-4 h-4" />
                Ask the chatbot
              </Button>
            </div>
          </div>

          {/* Video aligned with hero heading */}
          <div className="relative w-full md:mt-[44px]">
            <div aria-hidden className="absolute -inset-4 rounded-2xl bg-primary-foreground/10 blur-2xl" />
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-primary-foreground/20 shadow-2xl bg-[#FAF7F2]">
              <video
                className="w-full h-full object-contain"
                src="/videos/diu-hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-label="Decarbonisation Intelligence Unit overview"
              />
            </div>
          </div>
        </div>

        {/* All 4 chip boxes in one equal row */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-3xl mx-auto">
          {chips.map((c) => (
            <a
              key={c.label}
              href="#focus"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground/90 text-xs font-medium hover:bg-primary-foreground/20 transition-colors"
            >
              <c.icon className="w-3.5 h-3.5" />
              {c.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
