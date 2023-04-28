import FullScreenOverlayWithCenteredItem from "@/components/layouts/FullScreenOverlayWithCenteredItem";
import classes from "./styles.module.css";

export default function SmallScreenWrapper() {
    return <FullScreenOverlayWithCenteredItem className={classes.smallWrapper}>
        <section className={classes.content}>
            <h2 className={classes.heading}>Unifier is not yet available on smaller resolutions.</h2>
            <p>You’ll soon be able to experience the fun soon, stay updated by following us on Twitter and Atlis.</p>
            <p>If you are a desktop user, try expanding the browser window.</p>
        </section>
    </FullScreenOverlayWithCenteredItem>
}