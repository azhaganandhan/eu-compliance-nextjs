import { BookOpen, ClipboardCheck, ShieldCheck, BarChart3 } from "lucide-react";

const items = [
  {
    icon: BookOpen,
    title: "Translate complex rules into practical action",
    desc: "We convert carbon, trade, and product disclosure requirements into usable guidance for Tamil Nadu industries.",
  },
  {
    icon: ClipboardCheck,
    title: "Support compliance readiness",
    desc: "We provide tools to evaluate EU market-access regulations and prepare for reporting and traceability requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Improve compliance readiness",
    desc: "We help companies align with CBAM, DPP, ESG, and related buyer or market expectations.",
  },
  {
    icon: BarChart3,
    title: "Create awareness on carbon legislation",
    desc: "We track national and international carbon regulations and surface the opportunities they open up for green businesses.",
  },
];

const WhatWeDo = () => {
  return (
    <section id="overview" className="py-16 md:py-20 bg-gradient-soft scroll-mt-32">
      <div className="container mx-auto">
        <div className="max-w-2xl mb-10">
          <span className="text-primary text-xs font-semibold tracking-wider uppercase">Overview</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-2 leading-tight">
            What the Decarbonisation Intelligence Unit does
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="bg-card border border-border rounded-xl p-6 lg:p-7 flex gap-5 hover:border-primary/30 transition-colors"
            >
              <div className="shrink-0">
                <div className="w-11 h-11 rounded-lg bg-primary/8 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
                </div>
                <span className="block mt-2 text-[11px] font-mono text-muted-foreground tabular text-center">
                  0{i + 1}
                </span>
              </div>
              <div>
                <h3 className="font-display text-foreground text-lg font-semibold leading-snug mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
