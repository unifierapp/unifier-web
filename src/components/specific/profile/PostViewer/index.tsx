import React from "react";
import Post from "@/components/specific/dashboard/Post";
import {PostStreamCluster} from "@/logic/PostStream";
import InfiniteScroller from "react-infinite-scroller";
import classes from "./styles.module.css";

export default function ProfilePostViewer(props: {
    accounts: PublicAccount[],
}) {
    const [{streamCluster}, setStreamCluster] = React.useState<{ streamCluster: PostStreamCluster }>({streamCluster: new PostStreamCluster()});
    const sectionContainerRef = React.useRef<HTMLElement|null>(null);

    async function update(mode = "newest") {
        streamCluster.update(mode).then(() => {
            setStreamCluster({streamCluster});
        });
    }

    React.useEffect(() => {

    }, []);

    const posts = streamCluster.posts;

    return <section className={classes.postViewer} ref={sectionContainerRef}>
    <InfiniteScroller loadMore={() => {
        update("older").then();
    }} hasMore={posts.length > 0} useWindow={false} getScrollParent={() => sectionContainerRef.current}>
    {
        posts.map((postProps, index) => {
            return <Post {...postProps} key={index}></Post>;
        })}
    </InfiniteScroller>
    </section>;
}
