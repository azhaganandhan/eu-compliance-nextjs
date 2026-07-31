import ComplianceChecker from "./tools/ComplianceChecker";

const ToolsCalculators = () => {
  return (
    <section id="tools" className="py-16 md:py-20 bg-background scroll-mt-32">
      <div className="container mx-auto">
        <div className="max-w-2xl mb-8">
          <span className="text-primary text-xs font-semibold tracking-wider uppercase">Tools</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-2 leading-tight">
            Interactive Tools &amp; Calculators
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Use practical decision-support tools to estimate compliance implications
            across EU market-access regulations.
          </p>
        </div>

        <div id="tool-panel" className="scroll-mt-32">
          <ComplianceChecker />
        </div>
      </div>
    </section>
  );
};

export default ToolsCalculators;
