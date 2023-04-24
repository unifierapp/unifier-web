import React from "react";
import classes from "./styles.module.css";

export interface SmallFormFieldProps {
    label?: string,
    placeholder?: string,
    icon: { src: string },
    type?: string,
    name?: string,
}

const SmallFormField = React.forwardRef<HTMLInputElement, SmallFormFieldProps>(function SmallFormField(props, ref) {
    const id = React.useId();
    return <div className={classes.container}>
        {props.label ? <label htmlFor={id}>{props.label}</label> : null}
        <div className={classes.inputContainer}>
            <input name={props.name} className={classes.input} type={props.type} placeholder={props.placeholder} ref={ref} id={id}></input>
            <img src={props.icon.src} alt={props.label} className={classes.icon}/>
        </div>
    </div>
});

export default SmallFormField;
