import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import { SnackbarProvider } from "notistack";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body className="bg-gray-100">
        <ScrollRestoration />
        <Scripts />
        <SnackbarProvider autoHideDuration={3000}> {children}</SnackbarProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
