import { EventSourceProvider } from "@/components/eventprovider";
import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <EventSourceProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </EventSourceProvider>
    </SessionProvider>
  );
}
