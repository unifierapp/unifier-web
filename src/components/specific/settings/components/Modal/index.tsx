import React from "react";
import classes from "./styles.module.css";

export default function Modal(props: React.PropsWithChildren) {
    return <div className={classes.modal}>
        {props.children}
    </div>;
}