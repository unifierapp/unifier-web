import React, {PropsWithChildren} from "react";
import classes from "./styles.module.css";
import NextLink, {LinkProps} from "next/link";

export default function Link(props: React.ComponentPropsWithRef<"a"> & LinkProps & {disabled?: boolean}) {
    return <NextLink {...props} className={`${classes.link} ${props.className || ""}`}></NextLink>;
}

export function FormLink(props: React.ComponentPropsWithRef<"a"> & LinkProps) {
    return <Link {...props} className={`${classes.formLink} ${props.className || ""}`}></Link>;
}

export function OAuthLink(props: PropsWithChildren<{ href: string, icon?: {src: string} }>) {
    return <Link href={props.href} className={classes.oAuthLink}>
        {props.icon ? <img src={props.icon.src} alt={""}/> : null}
        <div>{props.children}</div>
    </Link>;
}
