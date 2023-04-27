import "@/styles/index.css";
import {NextPage} from "next";
import Head from "next/head";
import {UserWrapper} from "@/contexts/UserContext";
import React from "react";
import {AppProps} from "next/app";
import {Analytics} from "@vercel/analytics/react";


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page);

    return <>
        <Analytics></Analytics>
        <Head>
            <title>Unified</title>
        </Head>
        <UserWrapper>
            {getLayout(<Component {...pageProps} />)}
        </UserWrapper>
    </>;
}