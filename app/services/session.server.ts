import { createCookieSessionStorage } from "@remix-run/node";
import { Authenticator } from "remix-auth";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    secrets: ["s3cret"], // 環境変数を使うことを推奨
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
});

const authenticator = new Authenticator(sessionStorage);

export { authenticator, sessionStorage };
