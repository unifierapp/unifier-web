import React, {PropsWithChildren} from "react";
import classes from "./styles.module.css";

export default function FullScreenOverlayWithCenteredItem(props: PropsWithChildren<{
    opaqueBackdrop?: boolean
}>) {
    const opaqueBackdrop = props.opaqueBackdrop ?? true;
    return <div className={`${classes.overlay} ${opaqueBackdrop ? classes.opaque : ""}`}>
        {props.children}
    </div>
}
