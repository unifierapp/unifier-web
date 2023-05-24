import React from 'react';

import OriginalButton, { ButtonProps } from '@/components/ui/Button';

import classes from './styles.module.css';

export default function Button(props: ButtonProps) {
    return <OriginalButton {...props} className={`${classes.button} ${props.className || ""}`} />;
}

export function ButtonFrame(props: React.PropsWithChildren) {
    return <div className={classes.buttonFrame}>
        {props.children}
    </div>;
}