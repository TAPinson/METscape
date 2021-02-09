import React, { useState, useContext, useEffect } from "react";
import { PostContext } from "../providers/PostProvider";
import { CommentContext } from "../providers/CommentProvider"
import "./ExhibitCard.css"
import Modal from 'react-modal'
import { CommentEditButton } from "./CommentEditor"

const FeedExhibitCard = ({ exhibit }) => {
    const { addPost, posts } = useContext(PostContext);
    const { addComment, getCommentsByPost, deleteComment } = useContext(CommentContext);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState([])
    const userId = JSON.parse(localStorage.getItem('userProfile')).id;
    const [modalIsOpen, setModalIsOpen] = useState(false)
    Modal.setAppElement('#root')

    useEffect(() => {
        commentsFinder()
    }, [toggle]);

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
                <div>{linkedContent.postAuthor} - {linkedContent.dateCreated}</div>
            </div>
        )
    }

    let newPost = {}

    const handleContentUpdate = (event) => {
        newPost.metId = exhibit.objectID
        newPost[event.target.id] = event.target.value
    }

    const handleCommentUpdate = (event) => {
        newComment[event.target.name] = event.target.value
    }

    const postCreator = () => {
        addPost(newPost)
    }

    let newComment = {}

    const CommentContainer = (objectID) => {
        return (
            <section className="new-comment-container">
                <input className="comment-input" type="text" name="content" onChange={handleCommentUpdate} />
                <div className="submit-new-comment-button" onClick={() => commentCreator(objectID)}>Submit Comment</div>
            </section>
        )
    }

    const commentCreator = (objectID) => {
        const linkedContent = posts.find((post) => {
            return post.metId === objectID.objectID
        })
        newComment.postId = linkedContent.id
        addComment(newComment)
            .then(() => setToggle(toggle + 1))
    }

    const DeleteButton = (comment) => {
        if (comment.comment.userProfileId === userId) {
            return (
                <div className="comment-delete-button" onClick={() => {
                    removeComment(comment.comment.id)
                }}>
                    ❌
                </div>
            )
        }
        else {
            return null
        }
    }
    const removeComment = (id) => {
        deleteComment(id)
            .then(() => setToggle(toggle + 1))
    }

    return (
        <>
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
                        <div>{comment.content}</div>
                        <div>{comment.commentAuthor} - {comment.dateCreated}</div>
                        <div className="myexhibits-comment-controls">
                            <DeleteButton comment={comment} />
                            <CommentEditButton comment={comment} />
                        </div>
                    </div>
                })}
            </div>
            <CommentContainer objectID={exhibit.objectID} />
        </>
    );
};

export default FeedExhibitCard;