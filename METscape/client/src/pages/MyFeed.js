import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../providers/PostProvider";
import { ExhibitContext } from "../providers/ExhibitProvider";
import { FriendshipContext } from "../providers/FriendshipProvider"
import { CommentContext } from "../providers/CommentProvider"
import { UserProfileContext } from "../providers/UserProfileProvider"

const Home = () => {
    const userId = JSON.parse(localStorage.getItem('userProfile')).id;
    const { getPostById, posts, setPosts, getPostsByFriend } = useContext(PostContext);
    const { getExhibitById, exhibit } = useContext(ExhibitContext);
    const { getUserFriends, friends, setFriends } = useContext(FriendshipContext)

    let friendPosts = []

    useEffect(() => {
        getUserFriends(userId)
            .then(() => {
                friends.map((buddy) => {
                    getPostsByFriend(buddy.approverId)
                        .then((res) => {
                            res.map((each) => friendPosts.push(each))
                            console.log(friendPosts)
                            setPosts(friendPosts)
                        })
                })
            })
    }, []);

    return (
        <div >
            <h2>Friends</h2>
            {friends.map((buddy) => {
                return <div key={buddy.id}>{buddy.id}</div>
            })}
            <h2>Posts</h2>
            {posts.map((post) => {
                return <div key={post.id}>{post.title}</div>
            })}

        </div>
    );
};

export default Home;