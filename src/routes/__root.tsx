import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navigation } from "@/components/salon/layout/Navigation";
import { Footer } from "@/components/salon/layout/Footer";
import { useSalonConfig } from "@/config/useSalonConfig";
import { buildBeautySalonJsonLd } from "@/lib/seo/buildJsonLd";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="font-serif text-6xl md:text-7xl text-foreground">404</div>
        <div className="mt-6 text-sm text-muted-foreground">Strona nie istnieje.</div>
        <div className="mt-10">
          <Link
            to="/"
            className="inline-block px-7 py-4 text-[11px] tracking-[0.22em] uppercase bg-foreground text-background"
          >
            Wróć
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="font-serif text-3xl text-foreground">Coś poszło nie tak.</div>
        <div className="mt-4 text-sm text-muted-foreground">Spróbuj odświeżyć stronę.</div>
        <div className="mt-10 flex gap-3 justify-center">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="px-6 py-3 text-[11px] tracking-[0.22em] uppercase bg-foreground text-background"
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#FAF8F5" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const config = useSalonConfig();
  const jsonLd = buildBeautySalonJsonLd(config);

  return (
    <QueryClientProvider client={queryClient}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-foreground focus:text-background focus:px-4 focus:py-2"
      >
        Przejdź do treści
      </a>
      <Navigation />
      <main id="main" className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
