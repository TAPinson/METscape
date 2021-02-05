import React, { useState, useContext, useEffect } from "react";
import { PostContext } from "../providers/PostProvider";
import { CommentContext } from "../providers/CommentProvider"
import "./ExhibitCard.css"
import Modal from 'react-modal'

const FeedExhibitCard = ({ exhibit }) => {
    const { addPost, posts } = useContext(PostContext);
    const { addComment, getCommentsByPost } = useContext(CommentContext);
    const [comments, setComments] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false)
    Modal.setAppElement('#root')

    useEffect(() => {
        commentsFinder()
    }, []);

    const commentsFinder = () => {
        const linkedContent = posts.find((post) => {
            return post.metId === exhibit.objectID
        })
        getCommentsByPost(linkedContent.id)
            .then((resp) => {
                setComments(resp)
                return resp
            })
    }

    const InitialComment = (objectID) => {
        const linkedContent = posts.find((post) => {
            return post.metId === objectID.objectID
        })
        return (
            <div className="initial-comment">
                <div>{linkedContent.content}</div>
                <div>{linkedContent.dateCreated}</div>
            </div>
        )
    }

    let newPost = {}

    const handleContentUpdate = (event) => {
        newPost.metId = exhibit.objectID
        newPost[event.target.id] = event.target.value
    }

    const postCreator = () => {
        addPost(newPost)
    }

    return (
        <>
            <div className="exhibit-card-container">
                <div className="exhibit-card">
                    <h3> {exhibit.title} </h3>
                    <img src={exhibit.primaryImage} className="exhibit-card-image" alt="exhibit representation" />
                    <div>
                        From: {exhibit.country} <br />
                    Department: {exhibit.department} <br />
                    Dimensions: {exhibit.dimensions} <br />
                    Medium: {exhibit.medium} <br />
                        <div className="post-this-button" onClick={() => setModalIsOpen(true)}>Post This</div>

                        <Modal className="postModal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                            <h2>Title</h2>
                            <input type="text" className="modalInput" id="title" onChange={handleContentUpdate} />

                            <h2>Post Message</h2>
                            <input type="text" className="modalInput" id="content" onChange={handleContentUpdate} />

                            <button onClick={evt => {
                                evt.preventDefault()
                                postCreator()
                                setModalIsOpen(false)
                            }}>Save
                                    </button>
                            <div>
                                <button className="modalClose" onClick={() => setModalIsOpen(false)}>Close</button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
            <InitialComment objectID={exhibit.objectID} />
            <div>
                {comments.map((comment) => {
                    return <div key={comment.id} className="initial-comment">
                        <div>{comment.content}</div><div>{comment.dateCreated}</div>
                    </div>
                })}
            </div>
        </>
    );
};

export default FeedExhibitCard;