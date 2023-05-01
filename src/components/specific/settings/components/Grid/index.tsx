import {PropsWithChildren} from "react";
import classes from './styles.module.css';

export default function Grid(props: PropsWithChildren<{
    className?: string;
}>) {
    return <div className={`${classes.gridComponent} ${props.className || ""}`}>
        {props.children}
    </div>;
}
