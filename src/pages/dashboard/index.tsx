import React from "react";
import {NextPageWithLayout} from "@/pages/_app";
import DashboardLayout from "@/components/specific/dashboard/Layout";

const Dashboard: NextPageWithLayout = function () {
    return <></>;
};
export default Dashboard;

Dashboard.getLayout = function () {
    // Needs to persist across pages, so this must stay in the layout to bypass the reload mechanism.
    return <DashboardLayout></DashboardLayout>;
};
