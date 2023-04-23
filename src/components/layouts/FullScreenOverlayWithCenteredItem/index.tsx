import React, {PropsWithChildren} from "react";
import classes from "./styles.module.css";

export default function FullScreenOverlayWithCenteredItem(props: PropsWithChildren<{}>) {
    return <div className={classes.overlay}>
        {props.children}
    </div>
}
