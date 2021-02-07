import React, { useContext, useState, useEffect } from "react";
import Modal from 'react-modal'
import { CommentContext } from "../providers/CommentProvider"

export const EditButton = (comment) => {
    const { addComment, getCommentsByPost, deleteComment, updateComment, toggle, setToggle, timeToToggle } = useContext(CommentContext);
    const userId = JSON.parse(localStorage.getItem('userProfile')).id;
    const [modalIsOpen, setModalIsOpen] = useState(false)

    //const [toggle, setToggle] = useState([])

    let editedComment = []

    const commentUpdater = (comment) => {
        comment.comment.content = editedComment.content
        const refurbishedComment = comment.comment
        updateComment(refurbishedComment)
            .then(() => timeToToggle())
    }

    const handleCommentUpdate = (event) => {
        editedComment[event.target.name] = event.target.value
    }

    if (comment.comment.userProfileId === userId) {
        return (
            <>
                <div className="comment-edit-button" onClick={() => {
                    // editComment()
                    setModalIsOpen(true)
                }}>📝
            </div>
                <Modal className="postModal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                    <h2>Comment</h2>
                    <input type="text" className="modalInput" defaultValue={comment.comment.content} name="content" onChange={handleCommentUpdate} />

                    <button onClick={evt => {
                        evt.preventDefault()
                        commentUpdater(comment)
                        setModalIsOpen(false)
                    }}>Save
                                    </button>
                    <div>
                        <button className="modalClose" onClick={() => setModalIsOpen(false)}>Close</button>
                    </div>
                </Modal>
            </>
        )
    }
    else {
        return null
    }
}