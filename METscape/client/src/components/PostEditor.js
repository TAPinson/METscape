import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../providers/PostProvider";
import { ExhibitContext } from "../providers/ExhibitProvider";
import Modal from 'react-modal'
import "./PostEditor.css"

const PostEditor = (post) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    useEffect(() => {

    }, []);

    let editedPost = {
        id: post.post.id,
        metId: post.post.metId,
        dateCreated: post.post.dateCreated,
        userProfileId: post.post.userProfileId
    }

    const handlePostUpdate = (event) => {
        editedPost[event.target.name] = event.target.value
    }

    const postUpdater = (post) => {
        if (editedPost.content === undefined) {
            editedPost.content = post.post.content
        }
        if (editedPost.title === undefined) {
            editedPost.title = post.post.title
        }
        console.log(editedPost)
    }

    return (
        <div >
            <div className="post-edit-button" onClick={() => setModalIsOpen(true)}>Edit Post</div>
            <Modal ariaHideApp={false} className="postModal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2>Title</h2>
                <input type="text" className="modalInput" defaultValue={post.post.title} name="title" onChange={handlePostUpdate} />

                <h2>Content</h2>
                <input type="text" className="modalInput" defaultValue={post.post.content} name="content" onChange={handlePostUpdate} />

                <button onClick={evt => {
                    evt.preventDefault()
                    postUpdater(post)
                    setModalIsOpen(false)
                }}>Save
                    </button>
                <div>
                    <button className="modalClose" onClick={() => setModalIsOpen(false)}>Close</button>
                </div>
            </Modal>

        </div >
    );
};

export default PostEditor;