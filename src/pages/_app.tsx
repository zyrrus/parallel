import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@styles/muiTheme";

import { api } from "@utils/api";

import "../styles/globals.css";

import "@fontsource/murecho";
import "@fontsource/murecho/100.css";
import "@fontsource/murecho/200.css";
import "@fontsource/murecho/300.css";
import "@fontsource/murecho/400.css";
import "@fontsource/murecho/500.css";
import "@fontsource/murecho/600.css";
import "@fontsource/murecho/700.css";
import "@fontsource/murecho/800.css";
import "@fontsource/murecho/900.css";

import "@fontsource/fira-code";
import "@fontsource/fira-code/300.css";
import "@fontsource/fira-code/400.css";
import "@fontsource/fira-code/500.css";
import "@fontsource/fira-code/600.css";
import "@fontsource/fira-code/700.css";
import PageWrapper from "@components/PageWrapper";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <ThemeProvider theme={theme}>
            <SessionProvider session={session}>
                <Head>
                    <title>Parallel</title>
                    <meta
                        name="description"
                        content="Connecting educators with creators."
                    />
                    <link rel="icon" href="/favicon.ico" />
                    <meta
                        name="viewport"
                        content="initial-scale=1, width=device-width"
                    />
                </Head>
                <CssBaseline />
                <PageWrapper>
                    <Component {...pageProps} />
                </PageWrapper>
            </SessionProvider>
        </ThemeProvider>
    );
};

export default api.withTRPC(MyApp);
