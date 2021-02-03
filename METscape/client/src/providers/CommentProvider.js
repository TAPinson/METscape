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

    }

    return (
        <CommentContext.Provider
            value={{
                getCommentById,
                comment,
                setComment,
                setComments,
                comments
            }}
        >
            {props.children}
        </CommentContext.Provider>
    );
}