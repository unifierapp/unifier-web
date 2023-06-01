import '@/styles/index.css';

import {NextPage} from 'next';
import {AppProps} from 'next/app';
import Head from 'next/head';
import {useRouter} from 'next/router';
import React from 'react';

import og from '@/assets/og.png';
import ChangelogLayout from '@/components/specific/changelogs/Layout';
import SettingsLayout from '@/components/specific/settings/components/Layout';
import {UserWrapper} from '@/contexts/UserContext';
import favicon from '@/icons/favicon.png';
import {useAutoAnimate} from '@formkit/auto-animate/react';
import {Analytics} from '@vercel/analytics/react';
import {MediaWrapper} from "@/contexts/MediaContext";

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
    const router = useRouter();
    const getLayout = Component.getLayout ?? ((page) => page);

    const [parent] = useAutoAnimate({
        duration: 100,
    });

    const modalMappings: Record<string, () => JSX.Element> = {
        settings: SettingsLayout,
        changelogs: ChangelogLayout,
    };

    const AdditionalModel = modalMappings[router.query.modal_type?.toString() ?? ""];

    return <>
        <Analytics></Analytics>
        <HeadContent></HeadContent>
        <UserWrapper>
            <MediaWrapper>
                {getLayout(<Component {...pageProps} />)}
                <div ref={parent}>
                    {AdditionalModel ? <AdditionalModel></AdditionalModel> : null}
                </div>
            </MediaWrapper>
        </UserWrapper>
    </>;
}
