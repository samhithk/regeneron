import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Page } from "../types";
import { Fragment } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as Page).Layout || Fragment;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
