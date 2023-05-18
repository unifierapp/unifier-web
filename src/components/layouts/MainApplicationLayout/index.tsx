import React, {PropsWithChildren} from "react";
import classes from "./styles.module.css";
import MainSidebar from "@/components/layouts/MainSidebar";
import ActivitySidebar from "@/components/specific/dashboard/ActivitySidebar";

export default function MainApplicationLayout(props: PropsWithChildren): JSX.Element {
    return <div className={classes.container}>
        <MainSidebar></MainSidebar>
        <main className={classes.mainContainer}>
            {props.children}
        </main>
        <ActivitySidebar></ActivitySidebar>
    </div>;
}