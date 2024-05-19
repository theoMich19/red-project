import { cssBundleHref } from "@remix-run/css-bundle";
import stylesheet from './tailwind.css';
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLocation,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SpeedInsights } from "@vercel/speed-insights/remix"
import EnigmaticLoader from "./components/common/loader/loader";
import { useState } from "react";
import ErrorComponent from "./components/common/error/error";


export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Island+Moments&family=Oswald:wght@400;500;600;700&display=swap',
  },
];


export default function App() {
  const navigation = useNavigation();
  const loading = navigation.state === "loading"


  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Enigmatique</title>
        <Meta />
        <Links />
      </head>
      <body>
        {!loading && <EnigmaticLoader />}
        <Analytics />
        <SpeedInsights />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <ToastContainer />
      </body>
    </html>
  );
}


export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <ErrorComponent error={error} />;
        <Scripts />
      </body>
    </html>
  );
}