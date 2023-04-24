import MainApplicationLayout from "@/components/layouts/MainApplicationLayout";
import classes from "./index.module.css"
import PostViewer from "@/components/dashboard/PostViewer";
import StatusInput from "@/components/dashboard/StatusInput";
import OnboardingWrapper from "@/components/onboarding/OnboardingWrapper";
import React from "react";

export default function Dashboard() {
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
    </MainApplicationLayout>
}
