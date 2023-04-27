import classes from "./styles.module.css";
import React from "react";

export default function Section(props: React.PropsWithChildren) {
    return <form className={classes.section}>
        {props.children}
    </form>;
}