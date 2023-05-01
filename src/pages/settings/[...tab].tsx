import {useRouter} from "next/router";
import React from "react";

export default function SettingsRouter() {
    const router = useRouter();

    React.useEffect(() => {
        const modalType = "settings";
        const settingsPageId = router.query.tab?.toString() ?? "account";
        router.replace({
            pathname: "/dashboard",
            query: {
                modal_type: "settings",
                settings_tab: settingsPageId,
            }
        }, `/${modalType}/${settingsPageId}`).then();
    }, [router]);

    return null;
}
