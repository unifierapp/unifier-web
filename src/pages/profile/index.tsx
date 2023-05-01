import {NextPageWithLayout} from "@/pages/_app";
import {useRouter} from "next/router";
import React from "react";
import {UserContext} from "@/contexts/UserContext";
import DashboardLayout from "@/components/specific/dashboard/Layout";

const ProfileRedirect: NextPageWithLayout = function () {
    const router = useRouter();
    const {user} = React.useContext(UserContext);

    React.useEffect(() => {
        if (user) {
            router.push(`/profile/${user.username}`).then();
        }
    }, [user]);

    return null;
};

ProfileRedirect.getLayout = function (page) {
    return <DashboardLayout>
        {page}
    </DashboardLayout>;
};

export default ProfileRedirect;
