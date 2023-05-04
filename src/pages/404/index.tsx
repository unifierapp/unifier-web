import FullScreenOverlayWithCenteredItem from "@/components/layouts/FullScreenOverlayWithCenteredItem";
import classes from "./styles.module.css";
import Logo from "@/components/ui/Logo";

export default function NotFound() {
    return <FullScreenOverlayWithCenteredItem>
        <span className={classes.notFound}>404</span>
        <Logo className={classes.logo}></Logo>
    </FullScreenOverlayWithCenteredItem>;
}