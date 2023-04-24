import "@/styles/index.css";
import {NextPage} from "next";
import Head from "next/head";
import {UserWrapper} from "@/contexts/UserContext";

export default function MyApp({Component, pageProps}: {
    Component: NextPage;
    pageProps: any;
}) {
    return <>
        <Head>
            <title>Unified</title>
        </Head>
        <UserWrapper>
            <Component/>
        </UserWrapper>
    </>;
};
