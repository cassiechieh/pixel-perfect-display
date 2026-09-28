import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Video Speed Reader" },
      {
        name: "description",
        content: "Sign in or create your Video Speed Reader account to get transcripts fast.",
      },
      { property: "og:title", content: "Sign in — Video Speed Reader" },
      {
        property: "og:description",
        content: "Sign in or create your Video Speed Reader account.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/app", replace: true });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        if (!data.session) {
          setError("Check your email to confirm your account, then sign in.");
          setMode("signin");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/app", replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="surface-hero flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <Link to="/" className="text-sm font-semibold tracking-tight">
        Video Speed Reader
      </Link>

      <div className="card-surface animate-rise mt-8 w-full max-w-md rounded-2xl p-8">
        <h1 className="text-2xl font-bold tracking-tight">
          {mode === "signin" ? "Sign in / 登入" : "Create your account"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Welcome back. Pick up where you left off."
            : "Start turning videos into transcripts in minutes."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              maxLength={255}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-input bg-secondary px-3 py-2.5 text-sm outline-none focus:border-ring"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              maxLength={72}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-input bg-secondary px-3 py-2.5 text-sm outline-none focus:border-ring"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full rounded-lg px-4 py-2.5 text-sm font-semibold"
          >
            {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Sign up"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
          }}
          className="mt-5 w-full text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {mode === "signin"
            ? "No account yet? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
