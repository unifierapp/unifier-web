import MainApplicationLayout from "@/components/layouts/MainApplicationLayout";
import classes from "./index.module.css"
import Button from "@/components/ui/Button";
import PostViewer from "@/components/dashboard/PostViewer";
import StatusInput from "@/components/dashboard/StatusInput";

export default function Dashboard() {
    return <MainApplicationLayout>
        <section className={classes.welcomeSection}>
            <div className={classes.welcomeSectionLeft}>
                <h1 className={classes.welcomeHeading}>Welcome back,</h1>
                <p>Let's see what the people you follow are up to today!</p>
            </div>
        </section>
        <StatusInput></StatusInput>
        <PostViewer></PostViewer>
    </MainApplicationLayout>
}
