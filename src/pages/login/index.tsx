import FullScreenOverlayWithCenteredItem from "@/components/layouts/FullScreenOverlayWithCenteredItem";
import SmallField from "@/components/ui/inputs/SmallFormField";
import Separator from "@/components/ui/Separator";
import Button from "@/components/ui/Button";
import lock from "@/icons/lock.svg";
import mail from "@/icons/mail.svg"
import classes from "./index.module.css";

export default function Login() {
    return <FullScreenOverlayWithCenteredItem>
        <div className={classes.container}>
            <h1 className={classes.heading}>Log In</h1>
            <fieldset className={classes.topFields}>
                <SmallField label={"Email"} icon={mail} name={"email"} type={"text"} placeholder={"example@example.com"}></SmallField>
                <SmallField label={"Password"} icon={lock} name={"password"} type={"password"} placeholder={"********"}></SmallField>
            </fieldset>
            <Separator></Separator>
            <Button className={classes.oAuthButton}>Login with Google</Button>
        </div>
    </FullScreenOverlayWithCenteredItem>;
}
