import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../providers/PostProvider";
import Modal from 'react-modal'
import "./PostEditor.css"

const PostEditor = (post) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const { editPost, postWasEdited, setPostWasEdited } = useContext(PostContext);

    useEffect(() => {

    }, []);

    let editedPost = {}

    const handlePostUpdate = (event) => {
        editedPost[event.target.name] = event.target.value
    }

    const postUpdater = (post) => {
        editedPost.id = post.post.id
        editedPost.metId = post.post.metId
        editedPost.dateCreated = post.post.dateCreated
        editedPost.userProfileId = post.post.userProfileId
        if (editedPost.content === undefined) {
            editedPost.content = post.post.content
        }
        editPost(editedPost)
            .then(() => {
                post = editedPost
                setPostWasEdited(postWasEdited + 1)
            })
    }

    if (post.post === undefined) {
        return null
    }

    return (
        <div >
            <div className="post-edit-button" onClick={() => setModalIsOpen(true)}>📝</div>
            <Modal ariaHideApp={false} className="postModal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2>Content</h2>
                <div className="modal-stuff">
                    <input type="text" className="modalInput" defaultValue={post.post.content} name="content" onChange={handlePostUpdate} />
                    <button className="modal-save-button" onClick={evt => {
                        evt.preventDefault()
                        postUpdater(post)
                        setModalIsOpen(false)
                    }}>Save
                    </button>
                    <div>
                        <button className="modalClose" onClick={() => setModalIsOpen(false)}>Close</button>
                    </div>
                </div>
            </Modal>
        </div >
    );
};

export default PostEditor;