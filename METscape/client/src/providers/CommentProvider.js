import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider"

export const CommentContext = createContext();

export function CommentProvider(props) {
    const { getToken } = useContext(UserProfileContext);
    const apiUrl = "/api/comment";
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState([]);
    const [toggle, setToggle] = useState([])

    const getCommentsByPost = (id) => {
        return getToken().then((token) => {
            return fetch(`${apiUrl}/bypost/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then((resp) => {
                    return resp
                })
        })
    }

    const addComment = (comment) => {
        const userId = JSON.parse(localStorage.getItem('userProfile')).id;
        comment.userProfileId = userId
        return getToken().then((token) => {
            return fetch(`${apiUrl}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(comment)
            })
        })
    }

    const deleteComment = (id) => {
        return getToken().then((token) => {
            return fetch(`${apiUrl}/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
    }

    const updateComment = (comment) => {
        return getToken().then((token) => {
            return fetch(`${apiUrl}/edit/${comment.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(comment)
            })
        })
    }

    const timeToToggle = () => {
        setToggle(toggle + 1)
    }

    return (
        <CommentContext.Provider
            value={{
                comment,
                setComment,
                setComments,
                comments,
                addComment,
                getCommentsByPost,
                deleteComment,
                updateComment,
                toggle,
                setToggle,
                timeToToggle
            }}
        >
            {props.children}
        </CommentContext.Provider>
    );
}