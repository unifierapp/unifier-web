import "@/styles/index.css";
import {NextPage} from "next";

export default function MyApp({Component, pageProps}: {
    Component: NextPage;
    pageProps: any;
}) {
    return <Component/>;
};
