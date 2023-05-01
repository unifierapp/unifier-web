import React from "react";
import ChangelogLayout from "@/components/specific/changelogs/Layout";
import {useRouter} from "next/router";

export default function Changelog() {
    const router = useRouter();

    React.useEffect(() => {
        router.push({
            pathname: "/dashboard",
            query: {
                ...router.query,
                modal_type: "changelogs",
            },
        }, "/changelogs", {
            shallow: true
        }).then();
    }, [router]);

    return <ChangelogLayout/>;
}

