import "@/styles/index.css";
import {NextPage} from "next";
import {Inter} from "next/dist/compiled/@next/font/dist/google";
export default function MyApp({Component, pageProps}: {
    Component: NextPage;
    pageProps: any;
}) {
    return <Component/>;
};
