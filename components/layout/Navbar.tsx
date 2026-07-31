"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, LayoutGrid } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ta", label: "தமிழ் (Tamil)" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
  { code: "ja", label: "日本語" },
  { code: "zh-CN", label: "中文" },
];

const setLanguage = (code: string) => {
  // Preferred path: drive the hidden Google Translate <select> (no reload needed)
  const select = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
  if (select) {
    select.value = code === "en" ? "" : code;
    select.dispatchEvent(new Event("change"));
    if (code === "en") {
      // Google needs an explicit restore for the source language
      document.cookie = `googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      window.location.reload();
    }
    return;
  }
  // Fallback: cookie + reload
  const host = window.location.hostname;
  const domain = host.split(".").slice(-2).join(".");
  const value = code === "en" ? "/en/en" : `/en/${code}`;
  document.cookie = `googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  document.cookie = `googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${domain}`;
  if (code !== "en") {
    document.cookie = `googtrans=${value};path=/`;
    document.cookie = `googtrans=${value};path=/;domain=.${domain}`;
  }
  window.location.reload();
};



const SITE = "https://www.investingintamilnadu.com";

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  {
    label: "Why Tamil Nadu",
    children: [
      { label: "Robust Economy", href: `${SITE}/why-tamil-nadu/robust-economy` },
      { label: "Great Place for Work and Life", href: `${SITE}/why-tamil-nadu/great-place-work-life` },
      { label: "Industry Ready Infrastructure", href: `${SITE}/why-tamil-nadu/industry-ready-infrastructure` },
      { label: "Ease of Doing Business", href: `${SITE}/why-tamil-nadu/ease-of-doing-business` },
      { label: "Preparing for the Future", href: `${SITE}/why-tamil-nadu/preparing-for-future` },
      { label: "TN Innovation Dashboard", href: "https://www.ynos.in/tamilnadu-innovation/" },
      { label: "World-class Talent Pool", href: `${SITE}/why-tamil-nadu/world-class-talent-pool` },
    ],
  },
  {
    label: "About Us",
    children: [
      { label: "Guidance Tamil Nadu", href: `${SITE}/about-us/guidance-tamil-nadu` },
      { label: "MSME", href: `${SITE}/about-us/msme` },
      { label: "Our Team", href: `${SITE}/about-us/our-team` },
      { label: "Careers", href: `${SITE}/about-us/careers` },
      { label: "Biz Buddy", href: `${SITE}/about-us/biz-buddy` },
      { label: "Single Window Portal", href: `${SITE}/about-us/single-window-portal` },
    ],
  },
  {
    label: "Sectors",
    children: [
      { label: "Automobile, Auto Components & EV", href: `${SITE}/sectors/automobile-auto-components-ev` },
      { label: "Electronics", href: `${SITE}/sectors/electronics` },
      { label: "Semiconductors", href: `${SITE}/sectors/semiconductors` },
      { label: "Textile, Apparel & Technical Textiles", href: `${SITE}/sectors/textile-apparel-technical-textiles` },
      { label: "IT & ITeS", href: `${SITE}/sectors/it-and-ites` },
      { label: "GCC & R&D", href: `${SITE}/sectors/gcc-and-rnd` },
      { label: "Aerospace & Defence", href: `${SITE}/sectors/aerospace-defence` },
      { label: "Food Processing", href: `${SITE}/sectors/fmcg-agro-food-processing` },
      { label: "Renewable Energy", href: `${SITE}/sectors/renewable-energy` },
      { label: "Life Sciences", href: `${SITE}/sectors/life-sciences` },
    ],
  },
  {
    label: "Business in Tamil Nadu",
    children: [
      { label: "Setting up Business", href: `${SITE}/business-in-tamil-nadu/setting-up-business` },
      { label: "Exports", href: `${SITE}/business-in-tamil-nadu/exports` },
      { label: "Policy & Notifications", href: `${SITE}/business-in-tamil-nadu/policy-notifications` },
      { label: "Country Desk", href: `${SITE}/business-in-tamil-nadu/country-desk` },
      { label: "User Manual", href: `${SITE}/business-in-tamil-nadu/user-manual` },
    ],
  },
  { label: "Non-Resident Tamil", href: `${SITE}/nrt-help-desk` },
];

const appGridItems: NavItem[] = [
  ...navItems,
  {
    label: "Initiatives",
    children: [
      { label: "Business Intelligence Unit", href: `${SITE}/initiatives/business-intelligence-unit` },
      { label: "Industrial Park Walkthrough", href: `${SITE}/initiatives/industrial-park-walkthrough` },
      { label: "Decarbonisation Intelligence Unit", href: "/" },
    ],
  },
];

const LOGO = "https://www.investingintamilnadu.com/guidance-logo-2.png";

const readLangCookie = () => {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
  return m ? decodeURIComponent(m[1]) : "en";
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<string>(readLangCookie);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element",
      );
    };
    const s = document.createElement("script");
    s.id = "google-translate-script";
    s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(s);
  }, []);

  // Close the language menu on outside click or Escape
  useEffect(() => {
    if (!langOpen) return;
    const onDown = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLangOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  const chooseLanguage = (code: string) => {
    setCurrentLang(code);
    setLangOpen(false);
    setLanguage(code);
  };




  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div id="google_translate_element" style={{ position: "absolute", left: "-9999px", top: 0 }} aria-hidden />

      {/* Top ribbon */}
      <div className="hidden md:block bg-foreground/95 text-primary-foreground text-xs">
        <div className="container mx-auto flex justify-between items-center py-1.5">
          <div className="flex gap-5">
            <span>Friday, July 24, 2026</span>
            <span>Toll Free Number: 18002583878</span>
            <a
              href={`${SITE}/business-in-tamil-nadu/policy-notifications`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary-foreground/80"
            >
              Tenders
            </a>
          </div>
          <span className="text-primary-foreground/80">A Tamil Nadu Government Portal</span>
        </div>
      </div>

      {/* Floating logo */}
      <div className="hidden md:flex justify-center pt-3">
        <a
          href={SITE}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-card/95 backdrop-blur-md rounded-full px-5 py-2 shadow-pill"
        >
          <img src={LOGO} alt="Guidance Tamil Nadu" className="h-9 w-auto" />
        </a>
      </div>

      {/* Pill nav */}
      <div className="container mx-auto mt-2 md:mt-3 flex justify-center">
        <nav className="hidden lg:flex items-center gap-1 bg-card/95 backdrop-blur-md rounded-full px-2 py-1.5 shadow-pill relative">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-primary hover:text-primary-foreground transition-colors rounded-full"
                >
                  {item.label}
                </a>
              ) : (
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-primary hover:text-primary-foreground transition-colors rounded-full">
                  {item.label}
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>
              )}
              {item.children && activeDropdown === item.label && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 min-w-[260px]">
                  <div className="bg-card rounded-2xl shadow-pill py-2 border border-border">
                    {item.children.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary transition-colors"
                      >
                        {c.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <a
            href={`${SITE}/appointment-md-ceo`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 px-4 py-2 text-sm font-semibold bg-gradient-cta text-primary-foreground rounded-full hover:opacity-92 transition-opacity"
          >
            Invest Now
          </a>
        </nav>

        {/* Language + app grid icons (desktop) */}
        <div className="hidden lg:flex items-center gap-2 ml-2 relative">
          <div className="relative" ref={langRef}>
            <button
              type="button"
              aria-label="Change language"
              aria-haspopup="menu"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((v) => !v)}
              className="w-11 h-11 rounded-full bg-card/95 backdrop-blur-md shadow-pill overflow-hidden flex items-center justify-center hover:scale-105 transition-transform"
            >
              <img src="https://flagcdn.com/48x36/in.png" alt="India" className="w-6 h-auto rounded-sm" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full pt-2 w-[220px] z-50" role="menu">
                <div className="bg-card rounded-2xl shadow-pill py-2 border border-border max-h-[70vh] overflow-y-auto notranslate">
                  <p className="px-4 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Select language
                  </p>
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      role="menuitem"
                      onClick={() => chooseLanguage(l.code)}
                      className={`w-full flex items-center justify-between gap-2 px-4 py-2 text-sm transition-colors hover:bg-muted hover:text-primary ${
                        currentLang === l.code ? "text-primary font-semibold bg-muted/60" : "text-foreground/80"
                      }`}
                    >
                      <span>{l.label}</span>
                      {currentLang === l.code && <span aria-hidden>✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>


          <div
            onMouseEnter={() => setActiveDropdown("__apps")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              aria-label="All sections"
              className="w-11 h-11 rounded-full bg-card/95 backdrop-blur-md shadow-pill flex items-center justify-center hover:scale-105 transition-transform"
            >
              <LayoutGrid className="w-4 h-4 text-foreground/80" />
            </button>
            {activeDropdown === "__apps" && (
              <div className="absolute right-0 top-full pt-2 w-[340px] z-50">
                <div className="bg-card rounded-2xl shadow-pill p-3 border border-border grid grid-cols-2 gap-1 max-h-[70vh] overflow-y-auto">
                  {appGridItems.flatMap((item) =>
                    item.children
                      ? item.children.map((c) => (
                          <a
                            key={`${item.label}-${c.label}`}
                            href={c.href}
                            target={c.href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="px-2.5 py-2 text-xs text-foreground/80 hover:bg-muted hover:text-primary rounded-lg leading-tight"
                          >
                            {c.label}
                          </a>
                        ))
                      : [
                          <a
                            key={item.label}
                            href={item.href!}
                            target={item.href!.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="px-2.5 py-2 text-xs font-medium text-foreground hover:bg-muted hover:text-primary rounded-lg leading-tight"
                          >
                            {item.label}
                          </a>,
                        ],
                  )}
                </div>
              </div>
            )}
          </div>
        </div>



        {/* Mobile bar */}
        <div className="lg:hidden w-full bg-card/95 backdrop-blur-md rounded-full px-3 py-2 shadow-pill flex items-center justify-between">
          <a href={SITE} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <img src={LOGO} alt="Guidance Tamil Nadu" className="h-7 w-auto" />
          </a>
          <div className="flex items-center gap-1">
            <div className="relative" ref={langRef}>
              <button
                type="button"
                aria-label="Change language"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((v) => !v)}
                className="p-1.5 flex items-center"
              >
                <img src="https://flagcdn.com/48x36/in.png" alt="India" className="w-6 h-auto rounded-sm" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full pt-2 w-[220px] z-50" role="menu">
                  <div className="bg-card rounded-2xl shadow-pill py-2 border border-border max-h-[60vh] overflow-y-auto notranslate">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        role="menuitem"
                        onClick={() => chooseLanguage(l.code)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-muted hover:text-primary ${
                          currentLang === l.code ? "text-primary font-semibold bg-muted/60" : "text-foreground/80"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => setOpen(!open)} className="p-1.5" aria-label="Toggle menu">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {open && (
        <div className="lg:hidden container mx-auto mt-2">
          <div className="bg-card rounded-2xl shadow-pill p-2 max-h-[70vh] overflow-y-auto">
            <nav className="flex flex-col">
              {navItems.map((item) =>
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-xl"
                  >
                    {item.label}
                  </a>
                ) : (
                  <details key={item.label} className="group">
                    <summary className="px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-xl cursor-pointer flex justify-between items-center">
                      {item.label}
                      <ChevronDown className="w-3 h-3 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="pl-3 pb-1">
                      {item.children?.map((c) => (
                        <a
                          key={c.label}
                          href={c.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-3 py-1.5 text-xs text-foreground/75 hover:text-primary"
                        >
                          {c.label}
                        </a>
                      ))}
                    </div>
                  </details>
                ),
              )}
              <a
                href={`${SITE}/appointment-md-ceo`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-center bg-gradient-cta text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-full"
              >
                Invest Now
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
