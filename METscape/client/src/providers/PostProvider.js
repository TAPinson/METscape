import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider"

export const PostContext = createContext();

export function PostProvider(props) {
    const { getToken } = useContext(UserProfileContext)
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState([]);
    const [postWasEdited, setPostWasEdited] = useState(0);
    const apiUrl = "/api/post";

    const getPostsByUser = (id) => {
        return getToken().then((token) => {
            return fetch(`${apiUrl}/userposts/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then((resp) => {
                    setPosts(resp)
                    return resp
                })
        });
    }

    const getMyPosts = (id) => {
        return getToken().then((token) => {
            return fetch(`${apiUrl}/userposts/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
        });
    }

    const getFriendsPosts = (id) => {
        return getToken().then((token) => {
            return fetch(`${apiUrl}/friendposts/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then((resp) => {
                    setPosts(resp.slice(0, 20))
                    return resp.slice(0, 20)
                })
        })
    }

    const addPost = (post) => {
        const userId = JSON.parse(localStorage.getItem('userProfile')).id;
        getMyPosts(userId)
            .then((res) => {
                let myPostChecker = []
                res.map((singlePost) => {
                    if (singlePost.metId === post.metId) {

                        myPostChecker.push(singlePost)
                    }
                })
                if (myPostChecker.length > 0) {
                    alert("You've already added this!")
                }
                if (myPostChecker.length === 0) {
                    post.userProfileId = userId
                    getToken().then((token) => {
                        return fetch(`${apiUrl}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`
                            },
                            body: JSON.stringify(post)
                        })
                    })
                }
            })
    }

    const deletePost = (id) => {
        return getToken().then((token) => {
            return fetch(`${apiUrl}/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
    }

    const editPost = (post) => {
        return getToken().then((token) => {
            return fetch(`${apiUrl}/update/${post.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(post)
            })
        })
    }

    return (
        <PostContext.Provider
            value={{
                post,
                setPost,
                setPosts,
                posts,
                addPost,
                getPostsByUser,
                getFriendsPosts,
                deletePost,
                editPost,
                postWasEdited,
                setPostWasEdited
            }}
        >
            {props.children}
        </PostContext.Provider>
    );
}