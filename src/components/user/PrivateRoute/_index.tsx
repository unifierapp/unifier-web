import React, {PropsWithChildren} from "react";
import {UserContext} from "@/contexts/UserContext";
import {useRouter} from "next/router";

export default function PrivateRouteComponent(props: PropsWithChildren<{}>) {
    const router = useRouter();
    const {user, loaded} = React.useContext(UserContext);
    if (loaded) {
        if (!user) {
            router.replace("/login").then();
        } else if (!user.emailVerified && router.pathname !== "/verify") {
            router.replace("/verify").then();
        }
    }

    return <>{props.children}</>;
}
