import React from "react";
import {NextPageWithLayout} from "@/pages/_app";
import {useRouter} from "next/navigation";

const Settings: NextPageWithLayout = function () {
    const router = useRouter();
    React.useEffect(() => {
        router.replace("/settings/account");
    });
    return <></>;
};
export default Settings;
