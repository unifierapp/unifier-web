import React from "react";
import classes from "./styles.module.css"
import MainSidebar from "@/components/layouts/MainSidebar";

export default function MainApplicationLayout(props: {children: React.ReactNode}): JSX.Element {
    return <div className={classes.container}>
        <MainSidebar></MainSidebar>
        <main className={classes.mainContainer}>
            {props.children}
        </main>
        <aside></aside>
    </div>
}