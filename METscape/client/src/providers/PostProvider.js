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
        console.log("beep")
        fetch(`${apiUrl}`)
            .then((res) => res.json())
            .then((resp) => setPosts(resp))
    }

    return (
        <PostContext.Provider
            value={{
                getPostById,
                post,
                setPost,
                setPosts,
                getAllPosts,
                posts
            }}
        >
            {props.children}
        </PostContext.Provider>
    );
}