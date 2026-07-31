import { Mail, Linkedin, Twitter, Youtube, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const SITE = "https://www.investingintamilnadu.com";
const LOGO = "https://www.investingintamilnadu.com/guidance-logo-2.png";

type Group = { title: string; links: { label: string; href: string }[] };

const groups: Group[] = [
  {
    title: "Why Tamil Nadu",
    links: [
      { label: "Robust Economy", href: `${SITE}/why-tamil-nadu/robust-economy` },
      { label: "Industry Ready Infrastructure", href: `${SITE}/why-tamil-nadu/industry-ready-infrastructure` },
      { label: "Preparing for the Future", href: `${SITE}/why-tamil-nadu/preparing-for-future` },
      { label: "World-class Talent Pool", href: `${SITE}/why-tamil-nadu/world-class-talent-pool` },
      { label: "Great Place for Work and Life", href: `${SITE}/why-tamil-nadu/great-place-work-life` },
      { label: "Ease of Doing Business", href: `${SITE}/why-tamil-nadu/ease-of-doing-business` },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "Guidance Tamil Nadu", href: `${SITE}/about-us/guidance-tamil-nadu` },
      { label: "Single Window Portal", href: `${SITE}/about-us/single-window-portal` },
      { label: "Biz Buddy", href: `${SITE}/about-us/biz-buddy` },
      { label: "Our Team", href: `${SITE}/about-us/our-team` },
      { label: "MSMEs", href: `${SITE}/about-us/msme` },
      { label: "Careers", href: `${SITE}/about-us/careers` },
    ],
  },
  {
    title: "Business in Tamil Nadu",
    links: [
      { label: "Setting up Business", href: `${SITE}/business-in-tamil-nadu/setting-up-business` },
      { label: "Exports", href: `${SITE}/business-in-tamil-nadu/exports` },
      { label: "Policy & Notifications", href: `${SITE}/business-in-tamil-nadu/policy-notifications` },
      { label: "Country Desk", href: `${SITE}/business-in-tamil-nadu/country-desk` },
      { label: "User Manual", href: `${SITE}/business-in-tamil-nadu/user-manual` },
    ],
  },
  {
    title: "Initiatives & Media",
    links: [
      { label: "Business Intelligence Unit", href: `${SITE}/initiatives/business-intelligence-unit` },
      { label: "EU CBAM / DPP / DR Compliance Checker", href: "/#tools" },
      { label: "Industrial Park Walkthrough", href: `${SITE}/initiatives/virtual-tour` },
      { label: "Media Gallery", href: `${SITE}/media-events/media-gallery` },
      { label: "E-Newsletters", href: `${SITE}/media-events/e-newsletters` },
      { label: "Blogs", href: `${SITE}/media-events/blogs` },
    ],
  },
  {
    title: "Help & Support",
    links: [
      { label: "FAQs", href: `${SITE}/help-support/faqs` },
      { label: "Contact Us", href: `${SITE}/help-support/contact-us` },
      { label: "Submit Your Queries", href: "https://tnswp.com/DIGIGOV/TN-pages/ryq_intermediate.jsp?pagedisp=static" },
    ],
  },
];

const socials = [
  { Icon: Linkedin, href: "https://www.linkedin.com/company/investtn/", label: "LinkedIn" },
  { Icon: Twitter, href: "https://x.com/guidance_tn", label: "X" },
  { Icon: Facebook, href: "https://www.facebook.com/InvestInTN", label: "Facebook" },
  { Icon: Instagram, href: "https://www.instagram.com/guidancetamilnaduofficial/", label: "Instagram" },
  { Icon: Youtube, href: "https://www.youtube.com/channel/UC6mPNMPdIR4KMsDx17rROOA", label: "YouTube" },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-cta opacity-20 blur-3xl"
      />
      <div className="container mx-auto py-12 relative">
        <div className="grid md:grid-cols-12 gap-8 mb-8">
          {/* Brand column */}
          <div className="md:col-span-4">
            <a href={SITE} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary-foreground/95 rounded-xl px-4 py-3 mb-4">
              <img src={LOGO} alt="Guidance Tamil Nadu" className="h-10 w-auto" />
            </a>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-5 max-w-sm">
              The single-window investment promotion agency of the Government of Tamil Nadu —
              supporting industries through guidance, intelligence, and practical tools.
            </p>
            <form className="flex gap-2 max-w-sm mb-5">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-primary-foreground/8 border border-primary-foreground/15 rounded-full text-primary-foreground placeholder:text-primary-foreground/50 text-sm flex-1 focus-visible:outline-none focus-visible:border-primary-foreground/40"
              />
              <Button variant="accent" size="sm" type="submit">
                <Mail className="w-3.5 h-3.5" />
                Subscribe
              </Button>
            </form>
            <div className="flex gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-primary-foreground/8 border border-primary-foreground/15 flex items-center justify-center hover:bg-gradient-cta hover:border-transparent transition-all"
                >
                  <Icon className="w-3.5 h-3.5 text-primary-foreground/85" />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {groups.slice(0, 4).map((g) => (
              <div key={g.title}>
                <h4 className="font-display font-semibold text-sm mb-3">{g.title}</h4>
                <ul className="space-y-2">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-foreground/65 text-xs hover:text-primary-foreground transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary row: contact + help */}
        <div className="grid md:grid-cols-12 gap-8 pt-6 border-t border-primary-foreground/10">
          <div className="md:col-span-4">
            <h4 className="font-display font-semibold text-sm mb-3">DIU Contact</h4>
            <ul className="space-y-1.5 text-sm text-primary-foreground/70 leading-relaxed">
              <li>Guidance Tamil Nadu, Chennai 600002, India</li>
              <li><a href="mailto:decarb@investtn.in" className="hover:text-primary-foreground">decarb@investtn.in</a></li>
              <li><a href="mailto:azhaa.talam@gmail.com" className="hover:text-primary-foreground">azhaa.talam@gmail.com</a></li>
              <li>Toll Free: 1800 258 3878</li>
            </ul>
          </div>
          <div className="md:col-span-8">
            <h4 className="font-display font-semibold text-sm mb-3">{groups[4].title}</h4>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {groups[4].links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 text-xs hover:text-primary-foreground"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-5 flex flex-wrap justify-between items-center gap-3">
          <p className="text-primary-foreground/50 text-xs">© 2026 Guidance Tamil Nadu. All rights reserved.</p>
          <div className="flex gap-5">
            <a href={`${SITE}/help-support/contact-us`} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 text-xs hover:text-primary-foreground/85">Contact</a>
            <a href={SITE} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 text-xs hover:text-primary-foreground/85">Site Map</a>
            <span className="text-primary-foreground/50 text-xs">A Tamil Nadu Government Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
