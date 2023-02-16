import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Murecho } from "@next/font/google";
import Head from "next/head";
import { api } from "../utils/api";

import "../styles/globals.css";

const murecho = Murecho({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-murecho",
});

const MyApp: AppType<{ session: Session | null }> = ({
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
      <div className={`${murecho.variable} font-sans`}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </div>
    </>
  );
};

export default api.withTRPC(MyApp);
