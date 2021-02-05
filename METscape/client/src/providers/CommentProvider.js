import React, { useState, createContext } from "react";

export const CommentContext = createContext();

export function CommentProvider(props) {
    const apiUrl = "/api/comment";
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState([]);

    const getCommentsByPost = (id) => {
        return fetch(`${apiUrl}/bypost/${id}`)
            .then((res) => res.json())
            .then((resp) => {
                return resp
            })

    }
    const addComment = (comment) => {
        const userId = JSON.parse(localStorage.getItem('userProfile')).id;
        comment.userProfileId = userId
        return fetch(`${apiUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
    }

    const deleteComment = (id) => {
        return fetch(`${apiUrl}/delete/${id}`, {
            method: "DELETE"
        })
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
                deleteComment
            }}
        >
            {props.children}
        </CommentContext.Provider>
    );
}