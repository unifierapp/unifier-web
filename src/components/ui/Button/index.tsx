import React from "react";
import classes from "./styles.module.css";

export default function Button(props: React.ComponentPropsWithoutRef<"button">) {
    return <button {...props} className={`${classes.button} ${props.className || ""}`}></button>;
}

export function FormButton(props: React.ComponentPropsWithoutRef<"button">) {
    return <Button {...props} className={`${classes.formButton} ${props.className || ""}`}/>;
}
