import React, { useState, createContext } from "react";

export const CommentContext = createContext();

export function CommentProvider(props) {
    const apiUrl = "/api/comment";
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState([]);
    const [toggle, setToggle] = useState([])

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

    const updateComment = (comment) => {
        return fetch(`${apiUrl}/edit/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
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
                timeToToggle
            }}
        >
            {props.children}
        </CommentContext.Provider>
    );
}