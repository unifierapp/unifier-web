import MainApplicationLayout from "@/components/layouts/MainApplicationLayout";
import OnboardingWrapper from "@/components/specific/onboarding/OnboardingWrapper";
import classes from "@/components/specific/dashboard/Layout/index.module.css";
import PostViewer from "@/components/specific/dashboard/PostViewer";
import React from "react";
import PrivateRoute from "@/components/user/PrivateRoute";

export default function ProfileLayout(props: React.PropsWithChildren) {
    return <PrivateRoute>
        <OnboardingWrapper></OnboardingWrapper>
        <MainApplicationLayout>
            <section className={classes.welcomeSection}>
                <div className={classes.welcomeSectionLeft}>
                    <h1 className={classes.welcomeHeading}>Khanh Tran</h1>
                    <p>Let&apos;s see what the people you follow are up to today!</p>
                </div>
            </section>
            <PostViewer></PostViewer>
        </MainApplicationLayout>
    </PrivateRoute>;
}
