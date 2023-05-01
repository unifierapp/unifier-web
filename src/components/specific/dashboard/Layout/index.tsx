import MainApplicationLayout from "@/components/layouts/MainApplicationLayout";
import OnboardingWrapper from "@/components/specific/onboarding/OnboardingWrapper";
import React from "react";
import PrivateRoute from "@/components/user/PrivateRoute";

export default function DashboardLayout(props: React.PropsWithChildren) {
    return <MainApplicationLayout>
        <PrivateRoute></PrivateRoute>
        <OnboardingWrapper></OnboardingWrapper>
        {props.children}
    </MainApplicationLayout>;
}
