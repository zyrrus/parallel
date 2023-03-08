import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { SSRProvider } from "react-aria";
import Head from "next/head";
import { api } from "@utils/api";
import "@styles/globals.css";

const ParallelApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>Parallel</title>
        <meta name="description" content="============" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SSRProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </SSRProvider>
    </>
  );
};

export default api.withTRPC(ParallelApp);
