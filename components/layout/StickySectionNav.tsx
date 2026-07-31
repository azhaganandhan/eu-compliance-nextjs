import { useEffect, useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "focus", label: "Focus Areas" },
  { id: "tools", label: "Tools" },
  { id: "resources", label: "Resources" },
  { id: "partner", label: "Partner" },
];

const StickySectionNav = () => {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const offset = 220;
      let current = "overview";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top - offset <= 0) {
          current = s.id;
        }
      }
      setActive(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="sticky top-32 lg:top-36 z-30 flex justify-center px-3 -mb-12 pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-1 bg-card/95 backdrop-blur-md rounded-full px-2 py-1.5 shadow-pill border border-border/60 overflow-x-auto no-scrollbar max-w-[calc(100vw-1.5rem)]">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => handleClick(s.id)}
            className={`whitespace-nowrap px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
              active === s.id
                ? "bg-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default StickySectionNav;
