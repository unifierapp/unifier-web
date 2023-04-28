import logo from "@/icons/logo.svg";
import classes from "./styles.module.css";

export default function Logo() {
    return <a href={"/dashboard"} className={classes.logo}>
        <img src={logo.src} alt={"Converge"} className={classes.logoImage}/>
        <span className={classes.logoText}>Unifier</span>
    </a>;
}