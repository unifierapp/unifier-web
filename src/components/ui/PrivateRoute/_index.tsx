import React, {PropsWithChildren} from "react";
import {UserContext} from "@/contexts/UserContext";
import {useRouter} from "next/router";

export default function PrivateRouteComponent(props: PropsWithChildren<{}>) {
    const router = useRouter();
    const {user, loaded} = React.useContext(UserContext);
    if (!user && loaded) {
        router.replace("/login").then();
    }
    return <>{props.children}</>;
}
