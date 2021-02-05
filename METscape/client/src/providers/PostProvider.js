import React, { useState, createContext } from "react";


export const PostContext = createContext();

export function PostProvider(props) {

    const apiUrl = "/api/post";

    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState([]);

    const getPostById = (id) => {
        fetch(`${apiUrl}/${id}`)
            .then((res) => res.json())
            .then((resp) => setPost(resp))
    }

    const getAllPosts = () => {
        fetch(`${apiUrl}`)
            .then((res) => res.json())
            .then((resp) => setPosts(resp))
    }

    const getPostsByUser = (id) => {
        return fetch(`${apiUrl}/userposts/${id}`)
            .then((res) => res.json())
            .then((resp) => {
                setPosts(resp)
                return resp
            })
    }

    const getPostsByFriend = (id) => {
        return fetch(`${apiUrl}/userposts/${id}`)
            .then((res) => res.json())
            .then((resp) => {
                //setPosts(resp)
                return resp
            })
    }

    const getFriendsPosts = (id) => {
        return fetch(`${apiUrl}/friendposts/${id}`)
            .then((res) => res.json())
            .then((resp) => {
                setPosts(resp)
                return resp
            })
    }

    const addPost = (post) => {
        const userId = JSON.parse(localStorage.getItem('userProfile')).id;
        post.userProfileId = userId
        return fetch(`${apiUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
    }

    const deletePost = (id) => {
        return fetch(`${apiUrl}/delete/${id}`, {
            method: "DELETE"
        })
    }

    return (
        <PostContext.Provider
            value={{
                getPostById,
                post,
                setPost,
                setPosts,
                getAllPosts,
                posts,
                addPost,
                getPostsByUser,
                getPostsByFriend,
                getFriendsPosts,
                deletePost
            }}
        >
            {props.children}
        </PostContext.Provider>
    );
}