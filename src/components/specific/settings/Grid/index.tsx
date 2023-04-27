import {PropsWithChildren} from "react";
import classes from './styles.module.css';

export default function Grid(props: PropsWithChildren<{
    columns?: number;
}>) {
    return <div className={classes.gridComponent} style={{
        gridTemplateColumns: props.columns ? `repeat(${props.columns}, 1fr)` : undefined
    }}>
        {props.children}
    </div>;
}