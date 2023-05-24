import Image from 'next/image';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

import cross from '@/icons/cross.svg';

import { PrimaryHeading } from '../Heading';
import classes from './styles.module.css';

interface PageProps extends PropsWithChildren {
    title?: string;
}

export default function Page(props: PageProps) {
    const { query, push } = useRouter();

    function close() {
        push({
            query: {
                ...query,
                modal_type: undefined,
            }
        }, undefined, {
            shallow: true,
        }).then();
    }

    return <section className={classes.page}>
        <div className={classes.header}>
            <PrimaryHeading>{props.title ?? 'My Account'}</PrimaryHeading>
            <button onClick={close} className={classes.closeButton}>
                <Image src={cross} alt={"Close"} title={"Close"} />
            </button>
        </div>
        {props.children}
    </section>;
}
