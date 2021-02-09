import React, { useContext, useState } from "react";
import Modal from 'react-modal'
import { CommentContext } from "../providers/CommentProvider"

export const CommentEditButton = (comment) => {
    const { updateComment, timeToToggle } = useContext(CommentContext);
    const userId = JSON.parse(localStorage.getItem('userProfile')).id;
    const [modalIsOpen, setModalIsOpen] = useState(false)


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
                    setModalIsOpen(true)
                }}>📝
            </div>
                <Modal ariaHideApp={false} className="postModal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                    <h2>Comment:</h2>
                    <div className="modal-stuff">
                        <input type="text" className="modalInput" defaultValue={comment.comment.content} name="content" onChange={handleCommentUpdate} />

                        <button className="modal-save-button" onClick={evt => {
                            evt.preventDefault()
                            commentUpdater(comment)
                            setModalIsOpen(false)
                        }}>Save
                    </button>
                        <div>
                            <button className="modalClose" onClick={() => setModalIsOpen(false)}>Close</button>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }
    else {
        return null
    }
}