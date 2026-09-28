import { createBrowserRouter, Navigate } from "react-router";

import { RootLayout, NotFoundComponent, ErrorComponent } from "./pages/RootLayout";
import { Landing } from "./pages/Landing";
import { AuthPage } from "./pages/Auth";
import { RequireAuth } from "./pages/RequireAuth";
import { AppShell } from "./pages/AppShell";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorComponent />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/sign-in", element: <AuthPage mode="signin" /> },
      { path: "/sign-up", element: <AuthPage mode="signup" /> },
      // Legacy path from the TanStack version — keep old links working.
      { path: "/auth", element: <Navigate to="/sign-in" replace /> },
      {
        element: <RequireAuth />,
        children: [{ path: "/app", element: <AppShell /> }],
      },
      { path: "*", element: <NotFoundComponent /> },
    ],
  },
]);
