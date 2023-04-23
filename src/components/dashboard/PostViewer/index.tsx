"use client";
import React from "react";
import Post from "@/components/dashboard/Post";
import attachment from "@/debug/attachment.png"

export default function PostViewer() {
    const [{posts}, setPosts] = React.useState<{ posts: Map<string, any> }>({posts: new Map()});

    const postElements = [];
    postElements.forEach(([key, entity]) => {

    })

    return <section>
        <Post isResolved={false} postId={"oof"} postData={{
            attachments: [{
                url: attachment.src,
                type: "image"
            }, {
                url: attachment.src,
                type: "image"
            }],
            content: "Testing the Converge pages rn",
            engagements: {
                likes: 10,
                reposts: 3,
                comments: 4,
            },
            lastUpdatedAt: new Date(Date.now() - 2000),
            providerPostId: "9934995"
        }} provider={"twitter"} userInfo={{
            userId: "foofoo",
            displayName: "Khánh"
        }} providerUserInfo={{
            userName: "khanhtncva"
        }}></Post>
        <Post isResolved={true} postId={"oof"} postData={{
            attachments: [{
                url: attachment.src,
                type: "image"
            }, {
                url: attachment.src,
                type: "image"
            }],
            content: "Testing the Converge pages rn",
            engagements: {
                likes: 10,
                reposts: 3,
                comments: 4,
            },
            lastUpdatedAt: new Date(Date.now() - 2000),
            providerPostId: "9934995"
        }} provider={"twitter"} userInfo={{
            userId: "foofoo",
            displayName: "Khánh"
        }} providerUserInfo={{
            userName: "khanhtncva"
        }}></Post>
    </section>
}
