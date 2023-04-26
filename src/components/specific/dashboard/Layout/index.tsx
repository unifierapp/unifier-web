import MainApplicationLayout from "@/components/layouts/MainApplicationLayout";
import OnboardingWrapper from "@/components/specific/onboarding/OnboardingWrapper";
import classes from "@/components/specific/dashboard/Layout/index.module.css";
import StatusInput from "@/components/specific/dashboard/StatusInput";
import PostViewer from "@/components/specific/dashboard/PostViewer";
import React from "react";

export default function DashboardLayout(props: React.PropsWithChildren) {
    return <MainApplicationLayout>
        <OnboardingWrapper>
            <section className={classes.welcomeSection}>
                <div className={classes.welcomeSectionLeft}>
                    <h1 className={classes.welcomeHeading}>Welcome back,</h1>
                    <p>Let's see what the people you follow are up to today!</p>
                </div>
            </section>
            <StatusInput></StatusInput>
            <PostViewer></PostViewer>
        </OnboardingWrapper>
        {props.children}
    </MainApplicationLayout>;
}