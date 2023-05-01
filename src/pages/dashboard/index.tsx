import React from "react";
import {NextPageWithLayout} from "@/pages/_app";
import DashboardLayout from "@/components/specific/dashboard/Layout";
import classes from "./styles.module.css";
import StatusInput from "@/components/specific/dashboard/StatusInput";
import PostViewer from "@/components/specific/dashboard/PostViewer";

const Dashboard: NextPageWithLayout = function () {
    return <>
        <section className={classes.welcomeSection}>
            <div className={classes.welcomeSectionLeft}>
                <h1 className={classes.welcomeHeading}>Welcome back,</h1>
                <p>Let&apos;s see what the people you follow are up to today!</p>
            </div>
        </section>
        <StatusInput></StatusInput>
        <PostViewer></PostViewer>
    </>;
};
export default Dashboard;

Dashboard.getLayout = function (page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
