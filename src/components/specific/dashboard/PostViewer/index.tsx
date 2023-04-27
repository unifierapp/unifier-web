"use client";
import React from "react";
import Post from "@/components/specific/dashboard/Post";
import api from "@/helpers/api";
import {PostStream, PostStreamCluster} from "@/logic/PostStream";
import InfiniteScroller from "react-infinite-scroller";
import classes from "./styles.module.css";

export default function PostViewer() {
    const [{streamCluster}, setStreamCluster] = React.useState<{ streamCluster: PostStreamCluster }>({streamCluster: new PostStreamCluster()});
    const sectionContainerRef = React.useRef<HTMLElement>(null);

    async function fetchAccounts() {
        const accounts = await api.get<IAccount[]>("/provider/get_all").then(res => res.data);
        accounts.forEach(account => streamCluster.addStream(new PostStream(account)));
    }

    async function update(mode = "newest") {
        streamCluster.update(mode).then(() => {
            setStreamCluster({streamCluster});
        });
    }

    React.useEffect(() => {
        fetchAccounts().then(() => update().then());
    }, []);

    const posts = streamCluster.posts;

    return <section className={classes.postViewer} ref={sectionContainerRef}>
        <InfiniteScroller loadMore={() => {
            update("older");
        }} hasMore={posts.length > 0} useWindow={false} getScrollParent={() => sectionContainerRef.current}>
            {
                posts.map((postProps, index) => {
                    return <Post {...postProps} key={index}></Post>;
                })}gi
        </InfiniteScroller>
    </section>;
}
