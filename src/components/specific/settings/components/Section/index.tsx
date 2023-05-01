import classes from "./styles.module.css";
import React from "react";

export default function Section(props: React.PropsWithChildren<{
    onSubmit?: React.FormEventHandler<HTMLFormElement>,
    className?: string
}>) {
    return <form className={`${classes.section} ${props.className || ""}`} onSubmit={props.onSubmit}>
        {props.children}
    </form>;
}
