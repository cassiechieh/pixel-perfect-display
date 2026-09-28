import { useNavigate, useOutletContext } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import type { AuthContext } from "./RequireAuth";

export function AppShell() {
  useDocumentMeta({
    title: "Dashboard — Video Speed Reader",
    description: "Your Video Speed Reader dashboard.",
    ogTitle: "Dashboard — Video Speed Reader",
    ogDescription: "Your Video Speed Reader dashboard.",
    robots: "noindex",
  });
  const { user } = useOutletContext<AuthContext>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate("/sign-in", { replace: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <span className="text-sm font-semibold tracking-tight">Video Speed Reader</span>
        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
        >
          Sign out
        </button>
      </header>

      <main className="surface-hero mx-auto max-w-5xl px-6 py-16">
        <div className="animate-rise">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Hi {user.email}
          </h1>
          <div className="card-surface mt-8 rounded-2xl p-8">
            <p className="text-muted-foreground">
              Your dashboard is coming soon. Upload functionality will be added in the next
              milestone.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
