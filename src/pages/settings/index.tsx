import React from "react";
import {NextPageWithLayout} from "@/pages/_app";
import SettingsLayout from "@/components/specific/settings/Layout";
import DashboardLayout from "@/components/specific/dashboard/Layout";
import {useRouter} from "next/navigation";

const Settings: NextPageWithLayout = function () {
    const router = useRouter();
    React.useEffect(() => {
        router.replace("/settings/account");
    })
    return <></>;
}
export default Settings;

Settings.getLayout = function (page) {
    return <DashboardLayout>
        <SettingsLayout>
            {page}
        </SettingsLayout>
    </DashboardLayout>
}
