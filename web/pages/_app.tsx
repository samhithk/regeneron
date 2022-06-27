import type { AppProps } from "next/app";
import { Fragment } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";
import { Page } from "../types";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as Page).Layout || Fragment;

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
