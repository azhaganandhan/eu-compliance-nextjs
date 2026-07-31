import { Globe, FileBarChart, Trees, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
  {
    icon: Globe,
    title: "EU Carbon Border Adjustment Mechanism (EU CBAM)",
    desc: "Track carbon-related trade exposure and prepare for reporting requirements.",
    slug: "cbam",
  },
  {
    icon: FileBarChart,
    title: "EU Digital Product Passport (DPP)",
    desc: "Understand emerging product transparency and traceability expectations.",
    slug: "dpp",
  },
  {
    icon: Trees,
    title: "EU DR",
    desc: "Review supply-chain implications for products linked to land-use risk.",
    slug: "eudr",
  },
];

const AtAGlance = () => {
  return (
    <section id="focus" className="py-10 md:py-12 bg-background scroll-mt-32">
      <div className="container mx-auto">
        <div className="max-w-2xl mb-6">
          <span className="text-primary text-xs font-semibold tracking-wider uppercase">At a Glance</span>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mt-1 leading-tight">
            Key decarbonisation themes
          </h2>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            Relevant to exporters, manufacturers, and energy-intensive businesses in Tamil Nadu.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={`/themes/${card.slug}`}
              className="group text-left bg-card border border-border rounded-lg p-3.5 hover:border-primary/30 hover:shadow-lift hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 flex flex-col"
            >
              <div className="w-8 h-8 rounded-md bg-primary/8 flex items-center justify-center mb-2.5 group-hover:bg-primary/12 transition-colors">
                <card.icon className="w-4 h-4 text-primary" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-foreground text-sm font-semibold leading-snug mb-1">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed flex-1">{card.desc}</p>
              <span className="inline-flex items-center gap-1 mt-2 text-primary text-[11px] font-semibold">
                Read more <ArrowUpRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AtAGlance;
