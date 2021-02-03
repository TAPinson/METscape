import React, { useState, createContext } from "react";

export const CommentContext = createContext();

export function CommentProvider(props) {

    const apiUrl = "/api/comment";

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState([]);

    const getCommentById = (id) => {
        // fetch(`${apiUrl}/${id}`)
        //     .then((res) => res.json())
        //     .then((resp) => setPost(resp))
    }

    const getCommentsByPost = (id) => {
        fetch(`${apiUrl}/bypost/${id}`)
            .then((res) => res.json())
            .then((resp) => setComments(resp))
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



    return (
        <CommentContext.Provider
            value={{
                getCommentById,
                comment,
                setComment,
                setComments,
                comments,
                addComment
            }}
        >
            {props.children}
        </CommentContext.Provider>
    );
}