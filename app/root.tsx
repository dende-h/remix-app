import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { requireUserSession } from "libs/auth";
import { SnackbarProvider } from "notistack";
import "./tailwind.css";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // 認証チェックを実行、loginやsigninページは除外される
    const user = await requireUserSession(request);
    if (user) {
      return user;
    }

    // 認証が不要なページの場合、nullユーザーを返す
    return null;
  } catch (error) {
    console.log(error);
    return redirect("/login?message=You need to log in again.");
  }
}

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
