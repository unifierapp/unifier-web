import comment from "@/icons/comment.svg";
import repost from "@/icons/repost.svg";
import like from "@/icons/like.svg";
import classes from "./styles.module.css";

interface EngagementInfoProps {
    provider: string,
    type: "like" | "repost" | "comment",
    count?: number,
    isActive: boolean,
}

export default function EngagementInfo(props: EngagementInfoProps) {
    const mapping: Record<typeof props.type, { src: string }> = {like, comment, repost};

    return <button className={classes.engagementInfo}>
        <img src={mapping[props.type].src} alt={props.type.toUpperCase()}/>
        <span>{props.count ?? 0}</span>
    </button>;
}
