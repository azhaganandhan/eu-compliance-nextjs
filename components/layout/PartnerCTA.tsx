import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Share2 } from "lucide-react";

const team = [
  {
    name: "Dhivya Akilan",
    role: "Lead",
    email: "dhivya.a@investtn.in",
    linkedin: "https://www.linkedin.com/in/d-akilan/",
    initials: "DA",
  },
  {
    name: "Godson G",
    role: "Manager",
    email: "godson@investtn.in",
    linkedin: "https://www.linkedin.com/in/godson-george-micheal-rai/",
    initials: "GG",
  },
];

const PartnerCTA = () => {
  return (
    <section id="partner" className="py-14 md:py-16 bg-gradient-soft scroll-mt-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-primary text-xs font-semibold tracking-wider uppercase">Partner</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold bg-gradient-cta bg-clip-text text-transparent leading-tight mt-2">
            Partner With Us
          </h2>
          <p className="text-muted-foreground mt-3 text-sm md:text-base">
            Looking for guidance on carbon compliance or sector-specific transition strategy?
            Our team is ready to assist.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5">
            <a
              href="mailto:decarb@investtn.in"
              className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:underline underline-offset-4"
            >
              <Mail className="w-4 h-4" />
              decarb@investtn.in
            </a>
            <a
              href="mailto:azhaa.talam@gmail.com"
              className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:underline underline-offset-4"
            >
              <Mail className="w-4 h-4" />
              azhaa.talam@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {team.map((m) => (
            <div
              key={m.name}
              className="relative bg-card border border-border rounded-xl p-5 shadow-sm"
            >
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${m.name} on LinkedIn`}
                className="absolute top-4 right-4 w-7 h-7 rounded-md bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Linkedin className="w-4 h-4" fill="currentColor" />
              </a>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-cta text-primary-foreground flex items-center justify-center font-display font-semibold text-sm shrink-0 ring-2 ring-primary/20">
                  {m.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-bold text-foreground leading-tight">
                    {m.name}
                  </h3>
                  <p className="text-xs text-primary mt-0.5">{m.role}</p>
                </div>
              </div>

              <a
                href={`mailto:${m.email}`}
                className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors mt-3"
              >
                <Mail className="w-3.5 h-3.5" />
                {m.email}
              </a>

              <div className="flex items-center gap-2 mt-4">
                <Button variant="outline" size="sm" className="rounded-full" asChild>
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer">
                    View Profile
                  </a>
                </Button>
                <Button size="sm" className="rounded-full bg-gradient-cta text-primary-foreground hover:opacity-90" asChild>
                  <a href={`mailto:${m.email}`}>
                    <Share2 className="w-3.5 h-3.5" />
                    Book
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerCTA;
