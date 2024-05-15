// Importez redirect depuis @remix-run/node
import { redirect } from "@remix-run/node";
import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
  return redirect("/game-day");
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col items-center bg-[url('app/assets/images/bg/fond6.png')] bg-cover bg-center h-full justify-center">
      <div className="flex flex-col items-center w-full mb-[5vh]">
        <h1 className="text-9xl font-bold mb-4" style={{ fontFamily: "Island Moments" }}>Enigmatique</h1>
      </div>
    </div>
  );
}
