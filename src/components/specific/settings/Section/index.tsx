import classes from "./styles.module.css";
import React from "react";

export default function Section(props: React.PropsWithChildren<{
    onSubmit?: React.FormEventHandler<HTMLFormElement>
}>) {
    return <form className={classes.section} onSubmit={props.onSubmit}>
        {props.children}
    </form>;
}
