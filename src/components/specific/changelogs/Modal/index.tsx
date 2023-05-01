import classes from "./styles.module.css";
import {PropsWithChildren} from "react";

export default function Modal(props: PropsWithChildren) {
    return <div className={classes.modal}>
        {props.children}
    </div>;
}