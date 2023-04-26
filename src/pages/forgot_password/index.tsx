import FullScreenOverlayWithCenteredItem from "@/components/layouts/FullScreenOverlayWithCenteredItem";
import SmallField from "@/components/ui/inputs/SmallFormField";
import Separator from "@/components/ui/Separator";
import mail from "@/icons/mail.svg"
import classes from "./index.module.css";
import {FormButton} from "@/components/ui/Button";

export default function ForgotPassword() {
    return <FullScreenOverlayWithCenteredItem>
        <div className={classes.container}>
            <h1 className={classes.heading}>Forgot your password?</h1>
            <fieldset className={classes.topFields}>
                <SmallField label={"Email"} icon={mail} name={"email"} type={"email"}
                            placeholder={"example@example.com"}></SmallField>
            </fieldset>
            <Separator></Separator>
            <FormButton>Reset your password</FormButton>
        </div>
    </FullScreenOverlayWithCenteredItem>;
}