"use client";

import React, {PropsWithChildren} from "react";
import {UserContext} from "@/contexts/UserContext";
import {redirect} from "next/navigation";

export default function PrivateRoute(props: PropsWithChildren<{}>) {
    const user = React.useContext(UserContext);
    if (!user) {
        redirect("/login");
    }
    return props.children;
}
