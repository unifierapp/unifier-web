import classes from "./styles.module.css";
import React from "react";

export default function Section(props: React.PropsWithChildren<{
    onSubmit?: React.FormEventHandler<HTMLFormElement>,
    isForm?: boolean
    className?: string
}>) {
    const isForm = props.isForm ?? true;
    if (isForm) {
        return <form className={`${classes.section} ${props.className || ""}`} onSubmit={props.onSubmit}>
            {props.children}
        </form>;
    } else {
        return <div className={`${classes.section} ${props.className || ""}`}>
            {props.children}
        </div>;
    }
}
