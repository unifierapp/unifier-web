import logo from "@/icons/logo.svg";
import classes from "./styles.module.css"

export default function Logo() {
    return <a className={classes.logo}>
        <img src={logo.src} alt={"Converge"}/>
        <span className={classes.logoText}>Converge</span>
    </a>
}