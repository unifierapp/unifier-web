import posterIcon from "@/debug/posterIcon.jpg"
import classes from "./styles.module.css"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import Attachment, {AttachmentProps} from "@/components/dashboard/Attachment";
import EngagementInfo from "@/components/dashboard/Engagement";
import PostRedirect from "@/components/dashboard/PostRedirect";

dayjs.extend(relativeTime)

export interface PostProps {
    userInfo: {
        displayName: string,
        userId: string,
    },
    provider: string,
    providerUserInfo: {
        userName: string,
    },
    postId: string,
    postData?: {
        providerPostId: string,
        lastUpdatedAt: Date,
        content: string,
        attachments: AttachmentProps[],
        engagements: {
            likes: number,
            reposts: number,
            comments: number,
        }
    },
    directUrl?: string
}

export default function Post(props: PostProps) {
    if (props.postData) {
        const relativeTime = dayjs(props.postData.lastUpdatedAt).fromNow();

        const attachments = props.postData.attachments;
        const attachmentClassNames = [classes.attachmentGrid];
        if (attachments.length === 2) {
            attachmentClassNames.push(classes.attachmentGrid_2Items)
        }
        const attachmentClassName = attachmentClassNames.join(" ");

        return <article className={classes.postContainer}>
            <img src={posterIcon.src} alt={"Poster icon"} className={classes.profilePicture}></img>
            <div className={classes.postContent}>
                <div className={classes.postTextContent}>
                    <div className={classes.topBar}>
                        <div className={classes.posterInfo}>
                            <span className={classes.posterName}>{props.userInfo.displayName}</span>
                            <div className={classes.separator}></div>
                            <span className={classes.relativeTime}>{relativeTime}</span>
                        </div>
                    </div>
                    <p>
                        {props.postData.content}
                    </p>
                </div>
                <div className={attachmentClassName}>
                    {attachments.map((item, index) => {
                        return <Attachment {...item} key={index}></Attachment>
                    })}
                </div>
                <nav className={classes.stats}>
                    <EngagementInfo provider={props.provider} type={"comment"}
                                    count={props.postData.engagements.comments} isActive={false}></EngagementInfo>
                    <EngagementInfo provider={props.provider} type={"repost"} count={props.postData.engagements.reposts}
                                    isActive={false}></EngagementInfo>
                    <EngagementInfo provider={props.provider} type={"like"} count={props.postData.engagements.likes}
                                    isActive={false}></EngagementInfo>
                    <PostRedirect provider={props.provider} userName={props.providerUserInfo.userName}
                                  postId={props.postData.providerPostId} directUrl={props.directUrl}></PostRedirect>
                </nav>
            </div>

        </article>
    }
}
