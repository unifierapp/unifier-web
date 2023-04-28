import React, {PropsWithChildren} from "react";
import {UserContext} from "@/contexts/UserContext";
import {useRouter} from "next/router";
import SmallScreenWrapper from "@/components/specific/screens/SmallScreenWrapper";

export default function GuestRouteComponent(props: PropsWithChildren<{}>) {
    const router = useRouter();
    const {user, loaded} = React.useContext(UserContext);
    if (user && loaded) {
        router.replace("/dashboard").then();
    }
    return <>
        <SmallScreenWrapper></SmallScreenWrapper>
        {props.children}
    </>;
}
