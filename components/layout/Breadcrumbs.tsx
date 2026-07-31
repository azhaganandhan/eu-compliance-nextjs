import { ChevronRight } from "lucide-react";

const Breadcrumbs = () => {
  return (
    <div className="bg-background border-b border-border/60">
      <div className="container mx-auto py-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Home</a>
          <ChevronRight className="w-3 h-3 opacity-50" />
          <a href="#" className="hover:text-primary transition-colors">Initiatives</a>
          <ChevronRight className="w-3 h-3 opacity-50" />
          <span className="text-foreground font-medium">Decarbonisation Intelligence Unit</span>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumbs;
