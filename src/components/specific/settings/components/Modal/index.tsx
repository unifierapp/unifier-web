import React from "react";
import classes from "./styles.module.css";
import {formToJSON} from "axios";
import api from "@/helpers/api";
import FullScreenOverlayWithCenteredItem from "@/components/layouts/FullScreenOverlayWithCenteredItem";
import SmallFormField from "@/components/ui/inputs/SmallFormField";
import person from "@/icons/profile.svg";
import lock from "@/icons/lock.svg";
import Button from "@/components/specific/settings/components/Button";


export default function Modal(props: React.PropsWithChildren) {
    return <div className={classes.modal}>
        {props.children}
    </div>;
}

