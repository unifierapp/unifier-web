import classes from "./styles.module.css";

export default function Separator() {
    return <div className={classes.separator}>
        <div className={classes.separatorInner}></div>
    </div>;
}
