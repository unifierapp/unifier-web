import React, {PropsWithChildren} from "react";
import classes from "./styles.module.css";
import NextLink, {LinkProps} from "next/link";
import Image, {StaticImageData} from "next/image";
import {UrlObject} from "url";

export type CustomLinkProps =
    Omit<React.ComponentPropsWithRef<"a">, "href">
    & { disabled?: boolean; href: string | UrlObject }
    & LinkProps;

export default function Link(props: CustomLinkProps) {
    return <NextLink {...props} className={`${classes.link} ${props.className || ""}`}></NextLink>;
}

export function FormLink(props: CustomLinkProps) {
    return <Link {...props} className={`${classes.formLink} ${props.className || ""}`}></Link>;
}

export function OAuthLink(props: PropsWithChildren<{ href: string | UrlObject, icon?: StaticImageData }>) {
    return <Link href={props.href} className={classes.oAuthLink}>
        {props.icon ? <Image src={props.icon} alt={""}/> : null}
        <div>{props.children}</div>
    </Link>;
}
