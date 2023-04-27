import React from "react";
import classes from "./styles.module.css";

export default function Toast({children, className}: { children?: React.ReactNode, className?: string }) {
    return <div className={`${classes.toast} ${className || ""}`}>
        <span className={`${classes.toastText}`}>{children}</span>
    </div>;
}
