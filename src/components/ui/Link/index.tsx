import React from "react";
import classes from "./styles.module.css"
import NextLink, {LinkProps} from "next/link";

function Link(props: React.ComponentPropsWithRef<"a"> & LinkProps) {
    return <NextLink {...props} className={`${classes.button} ${props.className || ""}`}></NextLink>
}

export default Link;