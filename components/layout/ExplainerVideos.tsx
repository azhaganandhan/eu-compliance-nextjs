import { useEffect, useRef, useState } from "react";
import { Play, FileText, Download, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { trackEvent } from "@/lib/analytics";

type CaptionTrack = {
  src: string;
  srcLang: string;
  label: string;
  default?: boolean;
};

type Video = {
  title: string;
  duration: string;
  summary?: string;
  /** YouTube video ID — takes precedence when set */
  youtubeId?: string;
  /** Direct MP4 URL */
  src?: string;
  /** WebVTT caption tracks for MP4 sources */
  captions?: CaptionTrack[];
  /** Transcript text shown below the player for screen reader / no-audio users */
  transcript?: string;
};

const videos: Video[] = [
  {
    title: "Understanding EU CBAM",
    duration: "5:12",
    summary: "How the Carbon Border Adjustment Mechanism works and what Tamil Nadu exporters need to prepare.",
    transcript:
      "The EU Carbon Border Adjustment Mechanism places a carbon price on imports of iron, steel, aluminium, cement, fertiliser, hydrogen and electricity. Tamil Nadu exporters must report embedded emissions each quarter during the transitional phase, and pay CBAM certificates from 2026.",
  },
  {
    title: "What is a Digital Product Passport?",
    duration: "4:48",
    summary: "An overview of DPP data requirements and how they will affect product traceability.",
    transcript:
      "A Digital Product Passport is a structured data record that accompanies a product across its lifecycle. It stores information on materials, origin, repairability and end-of-life handling, and will be required under the EU Ecodesign for Sustainable Products Regulation for priority categories from 2027.",
  },
  {
    title: "EU Deforestation Regulation for exporters",
    duration: "6:05",
    summary: "Due-diligence obligations for products linked to land-use risk and how to document supply chains.",
    transcript:
      "The EU Deforestation Regulation requires operators placing cattle, cocoa, coffee, palm oil, rubber, soy and wood on the EU market to prove goods are deforestation-free and legally produced, using geolocation data for every plot of land involved.",
  },
  {
    title: "Carbon accounting basics",
    duration: "4:15",
    summary: "A primer on scope 1, 2, and 3 emissions and where to start with measurement.",
    transcript:
      "Carbon accounting classifies emissions into three scopes: direct emissions from owned sources, indirect emissions from purchased energy, and value-chain emissions. Start by defining organisational boundaries, then collect activity data and apply recognised emission factors.",
  },
];

const downloads = [
  { title: "CBAM guidance note", summary: "Scope, CN codes, and reporting checklist for Tamil Nadu exporters.", size: "1.4 MB" },
  { title: "DPP readiness checklist", summary: "Data fields and traceability questions to assess product readiness.", size: "820 KB" },
  { title: "EUDR summary brief", summary: "Practical guide on due diligence and supply-chain documentation.", size: "1.1 MB" },
];

const SITE_URL = "https://verdant-insight-grid.lovable.app";
const PAGE_URL = `${SITE_URL}/#resources`;
// Approximate upload date for the explainer series — update when videos are refreshed.
const UPLOAD_DATE = "2026-07-20";

/** Convert "5:12" or "1:04:30" into ISO 8601 duration (PT5M12S / PT1H4M30S). */
const toIsoDuration = (d: string) => {
  const parts = d.split(":").map((n) => parseInt(n, 10));
  const [h, m, s] = parts.length === 3 ? parts : [0, parts[0] ?? 0, parts[1] ?? 0];
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}${s ? `${s}S` : ""}` || "PT0S";
};

const videoJsonLd = {
  "@context": "https://schema.org",
  "@graph": videos.map((v, i) => ({
    "@type": "VideoObject",
    "@id": `${PAGE_URL}-video-${i + 1}`,
    name: v.title,
    description: v.summary ?? v.title,
    duration: toIsoDuration(v.duration),
    uploadDate: UPLOAD_DATE,
    thumbnailUrl: v.youtubeId
      ? [`https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg`]
      : [`${SITE_URL}/og-image.jpg`],
    contentUrl: v.src ? (v.src.startsWith("http") ? v.src : `${SITE_URL}${v.src}`) : undefined,
    embedUrl: v.youtubeId ? `https://www.youtube.com/embed/${v.youtubeId}` : undefined,
    transcript: v.transcript,
    inLanguage: "en",
    isFamilyFriendly: true,
    publisher: {
      "@type": "Organization",
      name: "Madras Chamber of Commerce and Industry — Decarbonisation Intelligence Unit",
      url: SITE_URL,
    },
    isAccessibleForFree: true,
    accessibilityFeature: ["captions", "transcript"],
  })),
};

const ExplainerVideos = () => {
  const [active, setActive] = useState<Video | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressMilestones = useRef<Set<number>>(new Set());
  const openedAt = useRef<number>(0);

  // Section impression — fires once when the resources block scrolls into view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            trackEvent("video_section_impression", {
              section: "diu_explainer_videos",
              video_count: videos.length,
            });
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const open = (v: Video, index: number) => {
    setActive(v);
    progressMilestones.current = new Set();
    openedAt.current = Date.now();
    trackEvent("video_open", {
      video_title: v.title,
      video_position: index + 1,
      video_source: v.youtubeId ? "youtube" : v.src ? "mp4" : "placeholder",
      video_duration_label: v.duration,
    });
  };

  const close = (isOpen: boolean) => {
    if (isOpen || !active) {
      if (!isOpen && active) setActive(null);
      return;
    }
    const el = videoRef.current;
    const watchedMs = openedAt.current ? Date.now() - openedAt.current : 0;
    trackEvent("video_close", {
      video_title: active.title,
      watched_seconds: Math.round(watchedMs / 1000),
      current_time: el ? Math.round(el.currentTime) : undefined,
      completed: el ? el.ended : undefined,
    });
    setActive(null);
  };

  // Native <video> event → analytics bridge
  const withVideo = (name: string, extra: Record<string, unknown> = {}) => () => {
    const el = videoRef.current;
    if (!active) return;
    trackEvent(name, {
      video_title: active.title,
      video_source: "mp4",
      current_time: el ? Math.round(el.currentTime) : 0,
      duration: el && !Number.isNaN(el.duration) ? Math.round(el.duration) : undefined,
      ...extra,
    });
  };

  const onTimeUpdate = () => {
    const el = videoRef.current;
    if (!el || !active || !el.duration || Number.isNaN(el.duration)) return;
    const pct = (el.currentTime / el.duration) * 100;
    for (const milestone of [25, 50, 75] as const) {
      if (pct >= milestone && !progressMilestones.current.has(milestone)) {
        progressMilestones.current.add(milestone);
        trackEvent("video_progress", {
          video_title: active.title,
          milestone_pct: milestone,
        });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="resources"
      className="py-16 md:py-20 bg-gradient-soft scroll-mt-32"
    >
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
      <div className="container mx-auto">
        <div className="max-w-2xl mb-8">
          <span className="text-primary text-xs font-semibold tracking-wider uppercase">Resources</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-2 leading-tight">
            Explainer Videos &amp; Guidance Notes
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Access practical explainers, guidance notes, checklists, and reference material to support
            decarbonisation planning and compliance readiness.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Play className="w-4 h-4 text-primary" /> Explainer Videos
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {videos.map((v, idx) => (
              <button
                key={v.title}
                type="button"
                onClick={() => open(v, idx)}
                aria-label={`Play video: ${v.title}`}
                className="group text-left bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 hover:shadow-card transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <div className="relative aspect-video bg-gradient-hero overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 1px 1px, hsl(var(--primary-foreground)) 1px, transparent 0)",
                      backgroundSize: "12px 12px",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-primary-foreground/95 flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 text-primary fill-primary ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-1.5 right-1.5 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-foreground/75 text-primary-foreground text-[10px] font-medium tabular">
                    <Clock className="w-2.5 h-2.5" /> {v.duration}
                  </span>
                </div>
                <div className="px-2.5 py-2">
                  <h3 className="font-display text-xs font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {v.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" /> Downloads
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {downloads.map((d) => (
              <a
                key={d.title}
                href="#"
                onClick={() =>
                  trackEvent("resource_download_click", {
                    resource_title: d.title,
                    resource_size: d.size,
                  })
                }
                className="group bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-card transition-all flex gap-4"
              >
                <div className="w-10 h-12 rounded-md bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-sm font-semibold text-foreground leading-snug">
                      {d.title}
                    </h3>
                    <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-muted text-muted-foreground shrink-0">
                      PDF
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{d.summary}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[11px] text-muted-foreground tabular">{d.size}</span>
                    <span className="inline-flex items-center gap-1 text-primary text-xs font-semibold">
                      Download <Download className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={close}>
        <DialogContent
          className="max-w-3xl p-0 overflow-hidden bg-background border-border max-h-[92dvh] overflow-y-auto"
          aria-describedby={active?.summary ? undefined : undefined}
        >
          <div className="relative aspect-video bg-foreground">
            {active?.youtubeId ? (
              <iframe
                key={active.youtubeId}
                className="absolute inset-0 w-full h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                // cc_load_policy=1 forces captions on; hl sets the caption UI language
                src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1&rel=0&cc_load_policy=1&hl=en&modestbranding=1`}
                title={`${active.title} — explainer video`}
                allow="accelerated-sensors; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                tabIndex={0}
              />
            ) : active?.src ? (
              <video
                key={active.src}
                ref={videoRef}
                className="absolute inset-0 w-full h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                src={active.src}
                controls
                controlsList="nodownload"
                autoPlay
                playsInline
                preload="metadata"
                crossOrigin="anonymous"
                aria-label={`${active.title} — explainer video`}
                tabIndex={0}
                onPlay={withVideo("video_play")}
                onPause={withVideo("video_pause")}
                onEnded={withVideo("video_complete")}
                onTimeUpdate={onTimeUpdate}
                onSeeked={withVideo("video_seek")}
                onError={withVideo("video_error")}
              >
                {(active.captions ?? []).map((track) => (
                  <track
                    key={track.srcLang}
                    kind="captions"
                    src={track.src}
                    srcLang={track.srcLang}
                    label={track.label}
                    default={track.default}
                  />
                ))}
              </video>
            ) : (
              <div
                role="status"
                aria-live="polite"
                className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground/90 bg-gradient-hero px-6 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary-foreground/15 border border-primary-foreground/25 flex items-center justify-center mb-3">
                  <Play className="w-6 h-6 text-primary-foreground fill-primary-foreground ml-0.5" aria-hidden="true" />
                </div>
                <p className="font-display text-lg font-semibold">Video coming soon</p>
                <p className="text-sm text-primary-foreground/80 mt-1 max-w-md">
                  This explainer is being produced. Contact the DIU team to be notified when it goes live.
                </p>
              </div>
            )}
          </div>
          <DialogHeader className="px-6 pt-4 pb-2 text-left">
            <DialogTitle className="font-display text-lg text-foreground">
              {active?.title}
            </DialogTitle>
            {active?.summary && (
              <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                {active.summary}
              </DialogDescription>
            )}
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
              {active?.duration && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  <span className="sr-only">Duration:</span> {active.duration}
                </span>
              )}
              {active?.captions?.length ? (
                <span className="inline-flex items-center gap-1">
                  <span aria-hidden="true" className="font-mono font-semibold px-1 py-0.5 rounded bg-muted text-muted-foreground text-[10px]">CC</span>
                  Captions available
                </span>
              ) : active?.youtubeId ? (
                <span className="inline-flex items-center gap-1">
                  <span aria-hidden="true" className="font-mono font-semibold px-1 py-0.5 rounded bg-muted text-muted-foreground text-[10px]">CC</span>
                  Captions via YouTube
                </span>
              ) : null}
            </div>
          </DialogHeader>
          {active?.transcript && (
            <details
              className="px-6 pb-5 group"
              onToggle={(e) => {
                if ((e.currentTarget as HTMLDetailsElement).open && active) {
                  trackEvent("video_transcript_open", { video_title: active.title });
                }
              }}
            >
              <summary className="cursor-pointer text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
                Read transcript
              </summary>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2 whitespace-pre-line">
                {active.transcript}
              </p>
            </details>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ExplainerVideos;
