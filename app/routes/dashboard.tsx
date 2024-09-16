import { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect, useLoaderData } from "@remix-run/react";
import { apiClient } from "libs/apiClient";
import { sessionStorage } from "~/services/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // セッションを取得
    const session = await sessionStorage.getSession(
      request.headers.get("cookie")
    );
    const user = session.get("user");

    // ユーザーが存在しない場合、セッションを破壊してログインページにリダイレクト
    if (!user) {
      const destroyCookie = await sessionStorage.destroySession(session);
      return redirect("/login", {
        headers: {
          "Set-Cookie": destroyCookie, // セッション削除のためにクッキーを設定
        },
      });
    }

    // APIリクエストを送信
    const response = await apiClient.get("/api/memos/", {
      headers: {
        Authorization: `Bearer ${user.access}`,
      },
    });

    console.log(response);
    return json(response.data, { status: response.status });
  } catch (error) {
    console.log(error);
    // エラー発生時もセッションを破壊してログインページにリダイレクト
    const session = await sessionStorage.getSession(
      request.headers.get("cookie")
    );
    const destroyCookie = await sessionStorage.destroySession(session);
    return redirect("/login", {
      headers: {
        "Set-Cookie": destroyCookie, // セッション削除のためにクッキーを設定
      },
    });
  }
}

export default function Dashboard() {
  const memos: [] = useLoaderData();
  console.log(memos);

  return <h1>home</h1>;
}
