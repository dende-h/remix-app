import type { MetaFunction } from "@remix-run/node";
import { LinkButton } from "~/components/Button/LinkButton";

export const meta: MetaFunction = () => {
  return [
    { title: "home" },
    { name: "description", content: "Entrance to the application" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-[365px] shadow-xl p-2 ">
        <div className="card-body items-center">
          <h2 className="card-title">Welcome to Simple Memo App</h2>
          <h3>Please log in and use it right away!</h3>
        </div>
        <div className="flex flex-col gap-4 items-center my-6">
          <LinkButton buttonText="Go to Login" routePath="/login" />
          <LinkButton buttonText="Go to Sign Up" routePath="/signup" />
        </div>
      </div>
    </div>
  );
}
