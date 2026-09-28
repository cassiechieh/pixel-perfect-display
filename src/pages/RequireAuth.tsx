import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AuthContext = { user: User };

/** Client-side guard that replaces the TanStack `_authenticated` layout route. */
export function RequireAuth() {
  const [state, setState] = useState<
    { status: "loading" } | { status: "ok"; user: User } | { status: "anon" }
  >({ status: "loading" });

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;
      setState(error || !data.user ? { status: "anon" } : { status: "ok", user: data.user });
    });
    return () => {
      active = false;
    };
  }, []);

  if (state.status === "loading") return null;
  if (state.status === "anon") return <Navigate to="/sign-in" replace />;
  return <Outlet context={{ user: state.user } satisfies AuthContext} />;
}
