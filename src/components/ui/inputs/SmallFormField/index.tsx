import React from "react";
import classes from "./styles.module.css";
import Image, {StaticImageData} from "next/image";

export interface SmallFormFieldProps {
    label?: string,
    placeholder?: string,
    icon: StaticImageData,
    type?: string,
    name?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const SmallFormField = React.forwardRef<HTMLInputElement, SmallFormFieldProps>(function SmallFormField(props, ref) {
    const id = React.useId();
    return <div className={classes.container}>
        {props.label ? <label htmlFor={id}>{props.label}</label> : null}
        <div className={classes.inputContainer}>
            <input onBlur={props.onBlur} onChange={props.onChange} name={props.name} className={classes.input}
                   type={props.type} placeholder={props.placeholder} ref={ref} id={id}></input>
            <Image src={props.icon} alt={props.label || ""} className={classes.icon}/>
        </div>
    </div>;
});

export default SmallFormField;
