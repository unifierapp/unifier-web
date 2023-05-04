import React from "react";
import OriginalLink, {CustomLinkProps} from "@/components/ui/Link";
import classes from "./styles.module.css";

export default function Link(props: CustomLinkProps) {
    return <OriginalLink {...props} className={`${classes.button} ${props.className || ""}`}/>;
}
