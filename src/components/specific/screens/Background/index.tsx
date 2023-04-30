import classes from "./styles.module.css";

export default function Background() {
    return <div className={classes.overlay}>
        <div className={classes.decorator1}></div>
        <div className={classes.decorator2}></div>
        <div className={classes.decorator3}></div>
        <div className={classes.decorator4}></div>
    </div>
}
