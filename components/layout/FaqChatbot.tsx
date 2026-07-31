"use client"
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Bot, Loader2, MessageSquare, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Source = { question: string; category: string; url: string | null };
type Message = { role: "user" | "assistant"; content: string; sources?: Source[] };

const SUGGESTIONS = [
  "What is EU CBAM?",
  "Which products need a Digital Product Passport?",
  "What data do I need for EU DR due diligence?",
  "How do the compliance tools work?",
];

const GREETING: Message = {
  role: "assistant",
  content:
    "Hello! I'm the **DIU Assistant**. Ask me about EU CBAM, the Digital Product Passport, the EU Deforestation Regulation, or how to use the tools and resources on this page.",
};

const FaqChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, loading]);

  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener("diu:open-chat", openChat);
    return () => window.removeEventListener("diu:open-chat", openChat);
  }, []);


  const send = async (text: string) => {
    const question = text.trim();
    if (!question || loading) return;
    setError(null);
    setInput("");
    const next = [...messages, { role: "user" as const, content: question }];
    setMessages(next);
    setLoading(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("faq-chat", {
        body: {
          messages: next
            .filter((m) => m !== GREETING)
            .map(({ role, content }) => ({ role, content })),
        },
      });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer, sources: data.sources ?? [] },
      ]);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email decarb@investtn.in.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close the DIU assistant" : "Open the DIU assistant"}
        className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full p-0 shadow-lift"
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      {open && (
        <section
          aria-label="DIU assistant"
          className="fixed bottom-24 right-5 z-50 flex h-[min(600px,calc(100vh-9rem))] w-[min(400px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lift"
        >
          <header className="flex items-center gap-3 border-b border-border bg-gradient-hero px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/15 text-primary-foreground">
              <Bot className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-sm font-semibold text-primary-foreground">DIU Assistant</p>
              <p className="truncate text-xs text-primary-foreground/80">
                Answers from the DIU knowledge base
              </p>
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[88%] text-sm leading-relaxed",
                    m.role === "user"
                      ? "rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-primary-foreground"
                      : "text-foreground",
                  )}
                >
                  <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-strong:text-inherit prose-headings:text-inherit text-inherit">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                  {!!m.sources?.length && (
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {Array.from(new Map(m.sources.map((s) => [s.category, s])).values()).map((s, si) => (
                        <li key={si}>
                          <a
                            href={s.url ?? "#"}
                            className="inline-flex rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {s.category}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Looking through the FAQ…
              </p>
            )}
            {error && (
              <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 border-t border-border p-3"
          >
            <label className="sr-only" htmlFor="diu-chat-input">
              Ask a question
            </label>
            <textarea
              id="diu-chat-input"
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Ask about CBAM, DPP, EU DR…"
              className="max-h-28 min-h-[40px] flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button type="submit" size="icon" disabled={loading || !input.trim()} aria-label="Send message">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </section>
      )}
    </>
  );
};

export default FaqChatbot;
