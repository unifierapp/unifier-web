import {PropsWithChildren} from "react";
import classes from "./styles.module.css";
export function PrimaryHeading(props: PropsWithChildren) {
   return <h1 className={classes.primaryHeading}>{props.children}</h1>
}

export function SecondaryHeading(props: PropsWithChildren) {
   return <h2 className={classes.secondaryHeading}>{props.children}</h2>
}