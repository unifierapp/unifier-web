import React from "react";
import OriginalButton from "@/components/ui/Button";
import classes from "./styles.module.css";

export default function Button(props: React.ComponentPropsWithoutRef<"button">) {
    return <OriginalButton {...props} className={`${classes.button} ${props.className || ""}`}/>
}

export function ButtonFrame(props: React.PropsWithChildren) {
    return <div className={classes.buttonFrame}>
        {props.children}
    </div>
}