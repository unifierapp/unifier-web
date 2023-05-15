import classes from "./styles.module.css";
import Image from "next/image";

interface AttachmentVariant {
    content_type: string,
    url: string,
    bit_rate?: number,
}

export interface AttachmentProps {
    type: string,
    url: string,
    alt?: string,
    variants?: AttachmentVariant[],
    width?: number,
    height?: number,
}

export default function Attachment(props: AttachmentProps) {
    if (props.type === "video") {
        return <video className={classes.attachment} controls={true}>
            {props.variants ? props.variants.map((variant, index) => {
                return <source src={variant.url} type={variant.content_type} key={index}/>;
            }) : null}
        </video>;
    } else if (props.type === "animated_gif") {
        return <video className={classes.attachment} autoPlay={true} loop={true}>
            {props.variants ? props.variants.map((variant, index) => {
                return <source src={variant.url} type={variant.content_type} key={index}/>;
            }) : null}
        </video>;
    } else {
        if (props.width && props.height) {
            return <div>
                <Image width={props.width} height={props.height} src={props.url} alt={props.alt ?? ""}
                       className={classes.attachment}/>
            </div>;
        }
        return <div className={classes.relativeImageContainer}>
            <Image fill={true} src={props.url} alt={props.alt ?? ""}
                   className={classes.attachment}/>
        </div>;
    }
}
