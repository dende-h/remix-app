// auth.ts
import { redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export async function requireUserSession(request: Request) {
  const url = new URL(request.url);

  if (url.pathname === "/login" || url.pathname === "/signup") {
    return null; // 認証チェックをスキップ
  }
  // 認証状態を確認
  const user = await authenticator.isAuthenticated(request);
  // 認証されていない場合、手動でリダイレクトを設定
  if (!user) {
    // クエリパラメータ付きでリダイレクト
    return redirect("/login?message=Please log in again");
  }

  return user; // 認証済みのユーザー情報を返す
}
