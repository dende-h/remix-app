import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Home() {
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl font-bold underline">
        Welcome to simple memo app
      </h1>
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Log in or register a new account</h2>
          <p></p>
          <div className="card-actions justify-center flex gap-4">
            <button className="btn btn-primary">Log in</button>
            <button className="btn btn-primary">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
