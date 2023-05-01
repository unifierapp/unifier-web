"use client";
import React from "react";
import Post from "@/components/specific/dashboard/Post";
import api from "@/helpers/api";
import {PostStream, PostStreamCluster} from "@/logic/PostStream";
import InfiniteScroller from "react-infinite-scroller";
import classes from "./styles.module.css";

export default function PostViewer(props: {
    profile?: IPublicUser,
    type?: string
}) {
    const [{streamCluster}, setStreamCluster] = React.useState<{ streamCluster: PostStreamCluster }>({streamCluster: new PostStreamCluster()});
    const sectionContainerRef = React.useRef<HTMLElement>(null);

    const type = props.type ?? "home";

    async function fetchAccounts() {
        const accounts = await api.get<IAccount[]>("/provider/get_all").then(res => res.data);
        accounts.forEach(account => streamCluster.addStream(new PostStream(account, type, props.profile)));
    }

    async function update(mode = "newest") {
        streamCluster.update(mode).then(() => {
            setStreamCluster({streamCluster});
        });
    }

    React.useEffect(() => {
        setStreamCluster({streamCluster: new PostStreamCluster()});
        fetchAccounts().then(() => update().then());
    }, [type, props.profile]);

    const posts = streamCluster.posts;

    return <section className={classes.postViewer} ref={sectionContainerRef}>
        <InfiniteScroller loadMore={() => {
            update("older").then();
        }} hasMore={posts.length > 0} useWindow={false} getScrollParent={() => sectionContainerRef.current}>
            {
                posts.map((postProps, index) => {
                    if (type === "user" && props.profile) {
                        return <Post {...postProps} key={index} connectionInfo={{
                            id: props.profile._id,
                            displayName: props.profile.displayName,
                            type: "user",
                            profileImageUrl: props.profile.profilePictureUrl,
                        }}></Post>;
                    } else {
                        return <Post {...postProps} key={index}></Post>;
                    }
                })
            }
        </InfiniteScroller>
    </section>;
}
