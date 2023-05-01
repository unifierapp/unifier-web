import {PropsWithChildren} from "react";
import classes from "./styles.module.css";
export default function Page(props: PropsWithChildren) {
    return <section className={classes.page}>
        {props.children}
    </section>;
}
