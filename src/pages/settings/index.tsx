import FullScreenOverlayWithCenteredItem from "@/components/layouts/FullScreenOverlayWithCenteredItem";
import OnboardingWrapper from "@/components/onboarding/OnboardingWrapper";
import classes from "@/pages/dashboard/index.module.css";
import StatusInput from "@/components/dashboard/StatusInput";
import PostViewer from "@/components/dashboard/PostViewer";
import MainApplicationLayout from "@/components/layouts/MainApplicationLayout";
import React from "react";
import Dashboard from "@/pages/dashboard";

export default function Settings() {
    return <><Dashboard></Dashboard>
        <FullScreenOverlayWithCenteredItem></FullScreenOverlayWithCenteredItem></>
        ;
}