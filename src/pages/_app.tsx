import "@/styles/index.css";
import {NextPage} from "next";
import Head from "next/head";
import {UserWrapper} from "@/contexts/UserContext";
import React from "react";
import {AppProps} from "next/app";
import {Analytics} from "@vercel/analytics/react";
import favicon from "@/icons/favicon.png";
import og from "@/assets/og.png";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function HeadContent() {
    return <Head>
        <title>Unifier - Your unified feed for social-media!</title>
        <link rel="icon" href={favicon.src}></link>
        <meta name="title" content="Unifier - Your unified feed for social-media!"/>
        <meta name="description"
              content="Streamline your social life without distracting algorithms, connect with all of your favorite people from any platform in one place!"/>

        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://unifier.app/"/>
        <meta property="og:title" content="Unifier - Your unified feed for social-media!"/>
        <meta property="og:description"
              content="Streamline your social life without distracting algorithms, connect with all of your favorite people from any platform in one place!"/>
        <meta property="og:image" content={og.src}/>

        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://unifier.app/"/>
        <meta property="twitter:title"
              content="Unifier - Your unified feed for social-media!"/>
        <meta property="twitter:description"
              content="Streamline your social life without distracting algorithms, connect with all of your favorite people from any platform in one place!"/>
        <meta property="twitter:image" content={og.src}/>
    </Head>;
}

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page);

    return <>
        <Analytics></Analytics>
        <HeadContent></HeadContent>
        <UserWrapper>
            {getLayout(<Component {...pageProps} />)}
        </UserWrapper>
    </>;
}