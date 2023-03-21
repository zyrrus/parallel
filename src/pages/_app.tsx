import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { SSRProvider } from "react-aria";
import Head from "next/head";
import { RootLayout } from "@components/layouts";
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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#deb887" />
        <meta name="msapplication-TileColor" content="#deb887" />
        <meta name="theme-color" content="#483e41" />
      </Head>
      <SSRProvider>
        <SessionProvider session={session}>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        </SessionProvider>
      </SSRProvider>
    </>
  );
};

export default api.withTRPC(ParallelApp);
