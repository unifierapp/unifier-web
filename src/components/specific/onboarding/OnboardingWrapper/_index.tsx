import React, {PropsWithChildren} from "react";
import {UserContext} from "@/contexts/UserContext";
import {useRouter} from "next/router";

export default function OnboardingWrapper(props: PropsWithChildren<{}>) {
    const router = useRouter();
    const {user, loaded} = React.useContext(UserContext);
    if (!user?.onboarded && loaded) {
        router.replace("/onboarding").then();
        return null;
    }
    return <>{props.children}</>;
}