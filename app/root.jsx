import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import "./app.css";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png",
  },
];

export function Layout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>REST Countries API with color theme switcher</title>

        {/* Ionicons (global) */}
        <script
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        ></script>
        <script
          noModule
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
        ></script>

        <Meta />
        <Links />
      </head>
      <body className="relative flex min-h-screen flex-col items-center bg-(--color-bg) text-(--color-text)">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }) {
  let title = "Something went wrong";
  let description = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "404";
      description = "The requested page could not be found.";
    } else {
      title = "Error";
      description = error.statusText || description;
    }
  }

  return (
    <main
      role="alert"
      className="mx-auto flex max-w-2xl flex-col gap-4 px-4 pt-24 text-center"
    >
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-(--color-input)">{description}</p>

      {import.meta.env.DEV && error instanceof Error && (
        <pre className="mt-6 max-w-full overflow-x-auto rounded bg-black/5 p-4 text-left text-sm">
          <code>{error.stack}</code>
        </pre>
      )}
    </main>
  );
}
