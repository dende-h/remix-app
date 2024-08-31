import { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { apiClient } from "libs/apiClient";
import { sessionStorage } from "~/services/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );
  const user = session.get("user");

  const response = await apiClient.get("/api/memos/", {
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
  });
  console.log(response);
  return json(response.data, { status: response.status });
}

export default function Dashboard() {
  const memos = useLoaderData();
  console.log(memos);

  return <h1>home</h1>;
}
