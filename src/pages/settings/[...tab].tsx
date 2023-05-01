import {useRouter} from "next/router";
import React from "react";

export default function SettingsRouter() {
    const router = useRouter();

    React.useEffect(() => {
        const url = new URL("/dashboard", window.location.origin);
        const searchParams = url.searchParams;
        const modalType = "settings";
        const settingsPageId = router.query.tab?.toString() ?? "account";
        searchParams.set("modal_type", modalType);
        searchParams.set("settings_tab", settingsPageId);
        router.replace(url, `/${modalType}/${settingsPageId}`).then();
    }, [router]);

    return null;
}
