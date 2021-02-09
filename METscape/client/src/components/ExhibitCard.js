import React, { useState, useContext } from "react";
import { PostContext } from "../providers/PostProvider";
import "./ExhibitCard.css"
import Modal from 'react-modal'

const ExhibitCard = ({ exhibit }) => {
    const { addPost } = useContext(PostContext);
    const [modalIsOpen, setModalIsOpen] = useState(false)
    Modal.setAppElement('#root')
    let newPost = {}

    const handleContentUpdate = (event) => {
        newPost.metId = exhibit.objectID
        newPost[event.target.id] = event.target.value
    }

    const postCreator = () => {
        addPost(newPost)
    }

    return (
        <div className="exhibit-card-container">
            <div className="exhibit-card">
                <h3> {exhibit.title} </h3>
                <img src={exhibit.primaryImage} className="exhibit-card-image" alt="exhibit representation" />
                <div>
                    Artist: {exhibit.artistDisplayName} <br />
                    {exhibit.artistDisplayBio} <br />
                    <hr />
                    Department: {exhibit.department} <br />
                    Dimensions: {exhibit.dimensions} <br />
                    Medium: {exhibit.medium} <br />
                    <div className="post-this-button" onClick={() => setModalIsOpen(true)}>Post This</div>
                    <Modal className="postModal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                        <h2>Conversation Starter:</h2>
                        <div className="modal-stuff">
                            <textarea className="modalInput" id="content" onChange={handleContentUpdate} />

                            <button className="modal-save-button" onClick={evt => {
                                evt.preventDefault()
                                postCreator()
                                setModalIsOpen(false)
                            }}>Save
                                    </button>
                            <div>
                                <button className="modalClose" onClick={() => setModalIsOpen(false)}>Close</button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default ExhibitCard;