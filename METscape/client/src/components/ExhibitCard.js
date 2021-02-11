import React, { useState, useContext } from "react";
import { PostContext } from "../providers/PostProvider";
import "./ExhibitCard.css"
import Modal from 'react-modal'
import placeholder from "../images/exhibit-placeholder-image.png"

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

    const ImageProvider = (exhibit) => {
        if (exhibit.exhibit.primaryImage === "") {
            return (
                <img src={placeholder} className="exhibit-card-image" alt="exhibit representation" />
            )
        }
        else {
            return (
                <img src={exhibit.exhibit.primaryImage} className="exhibit-card-image" alt="exhibit representation" />
            )
        }
    }

    const ArtistProvider = (exhibit) => {
        if (exhibit.exhibit.artistDisplayName === "") {
            return null
        }
        else {
            return (
                <>
                    Artist: {exhibit.exhibit.artistDisplayName} <br />
                    {exhibit.exhibit.artistDisplayBio} <br />
                    <br />
                </>
            )
        }
    }

    return (
        <div className="exhibit-card-container">
            <div className="exhibit-card">
                <h3> {exhibit.title} </h3>
                <ImageProvider exhibit={exhibit} />
                <div>
                    <ArtistProvider exhibit={exhibit} />
                    Department: {exhibit.department} <br />
                    Dimensions: {exhibit.dimensions} <br />
                    Medium: {exhibit.medium} <br />
                    <div className="browser-post-this-button" onClick={() => setModalIsOpen(true)}>Add to Gallery</div>
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