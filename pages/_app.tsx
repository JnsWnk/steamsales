import { EventSourceProvider } from "@/components/eventprovider";
import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NextComponentType, NextPageContext } from "next";
import { ReactNode } from "react";

type AppAuthProps = AppProps & {
  Component: NextComponentType<NextPageContext, any, {}> &
    Partial<{ auth: boolean }>;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppAuthProps) {
  return (
    <SessionProvider session={session}>
      <EventSourceProvider>
        <Layout>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </EventSourceProvider>
    </SessionProvider>
  );
}

interface AuthProps {
  children: ReactNode;
}

function Auth({ children }: AuthProps) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push("/auth/signin");
    return null;
  }

  return <>{children}</>;
}
