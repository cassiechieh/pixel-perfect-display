import { Link } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const features = [
  {
    title: "高準確度逐字稿",
    subtitle: "High-accuracy transcripts",
    body: "Powered by OpenAI Whisper, with solid support for both Chinese and English.",
  },
  {
    title: "三分鐘交付",
    subtitle: "Three-minute turnaround",
    body: "Processed in the background — you get an email the moment it's ready.",
  },
  {
    title: "可商用授權",
    subtitle: "Commercial-use ready",
    body: "You own the output. Publish it, sell it, or fold it into your product.",
  },
];

export function Landing() {
  useDocumentMeta({
    title: "Video Speed Reader — Transcripts in three minutes",
    description:
      "Upload your video and get an accurate Chinese or English transcript in three minutes. Built for creators, educators, and engineers.",
    ogTitle: "Video Speed Reader — Transcripts in three minutes",
    ogDescription: "Upload your video, get a clean transcript in three minutes.",
  });
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
      setSignedIn(!!session),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-sm font-semibold tracking-tight sm:text-base">
          Video Speed Reader
        </span>
        <Link
          to={signedIn ? "/app" : "/sign-in"}
          className="btn-primary inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold"
        >
          {signedIn ? "Open app" : "Sign in / 登入"}
        </Link>
      </header>

      <main>
        <section className="surface-hero px-6 pb-24 pt-16 text-center sm:pt-24">
          <div className="animate-rise mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              Whisper-powered transcription
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
              <span className="text-gradient">Video Speed Reader</span>
            </h1>
            <p className="mt-6 text-xl font-semibold sm:text-2xl">
              上傳影片，三分鐘內拿到逐字稿。
            </p>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              Upload your video, get a clean transcript in three minutes.
            </p>
            <div className="mt-10">
              <Link
                to={signedIn ? "/app" : "/sign-in"}
                className="btn-primary inline-flex items-center rounded-xl px-7 py-3.5 text-base font-semibold"
              >
                {signedIn ? "Go to your dashboard" : "Sign in / 登入"}
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <article
                key={f.subtitle}
                className="card-surface animate-rise rounded-2xl p-7"
                style={{ animationDelay: `${i * 110}ms` }}
              >
                <h2 className="text-lg font-semibold">{f.title}</h2>
                <p className="mt-1 text-sm font-medium text-primary-glow">{f.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted-foreground">
        © 2026 Video Speed Reader
      </footer>
    </div>
  );
}
