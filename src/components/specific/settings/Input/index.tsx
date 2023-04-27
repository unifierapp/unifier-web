import {PropsWithChildren} from "react";
import classes from "./styles.module.css";

export function InputAndButtonContainer(props: PropsWithChildren) {
    return <div className={classes.inputAndButtonContainer}>
        {props.children}
    </div>;
}