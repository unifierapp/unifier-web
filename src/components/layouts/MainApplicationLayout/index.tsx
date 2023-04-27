import React, {PropsWithChildren} from "react";
import classes from "./styles.module.css";
import MainSidebar from "@/components/layouts/MainSidebar";
import RightSidebar from "@/components/layouts/RightSidebar";

export default function MainApplicationLayout(props: PropsWithChildren): JSX.Element {
    return <div className={classes.container}>
        <MainSidebar></MainSidebar>
        <main className={classes.mainContainer}>
            {props.children}
        </main>
        <RightSidebar></RightSidebar>
    </div>;
}