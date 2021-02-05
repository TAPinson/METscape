import React, { useContext, useState, useEffect } from "react";
import { CommentContext } from "../providers/CommentProvider"
import { PostContext } from "../providers/PostProvider";
import "./ExhibitCard.css"
import Modal from 'react-modal'

const MyExhibitCard = ({ exhibit }) => {
    const { posts, getPostsByUser } = useContext(PostContext);
    const { addComment, getCommentsByPost, deleteComment, updateComment } = useContext(CommentContext);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState([])
    const userId = JSON.parse(localStorage.getItem('userProfile')).id;

    const [modalIsOpen, setModalIsOpen] = useState(false)
    Modal.setAppElement('#root')

    useEffect(() => {
        commentsFinder()
    }, [toggle]);

    const InitialComment = (objectID) => {
        const linkedContent = posts.find((post) => {
            return post.metId === objectID.objectID
        })
        if (linkedContent === undefined) {
            return null
        }
        return (
            <div className="initial-comment">
                <div>{linkedContent.content}</div>
                <div>{linkedContent.dateCreated}</div>
            </div>
        )
    }

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

    const CommentContainer = (objectID) => {
        return (
            <section className="new-comment-container">
                <input className="comment-input" type="text" name="content" onChange={handleContentUpdate} />
                <div className="submit-new-comment-button" onClick={() => commentCreator(objectID)}>Submit Comment</div>
            </section>
        )
    }

    let newComment = {}

    const handleContentUpdate = (event) => {
        newComment[event.target.name] = event.target.value
    }

    const commentCreator = (objectID) => {
        const linkedContent = posts.find((post) => {
            return post.metId === objectID.objectID
        })
        newComment.postId = linkedContent.id
        addComment(newComment)
            .then(() => setToggle(toggle + 1))
    }

    const removeComment = (id) => {
        deleteComment(id)
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

    let editedComment = []

    const handleCommentUpdate = (event) => {
        editedComment[event.target.name] = event.target.value
    }

    const commentUpdater = (comment) => {
        comment.comment.content = editedComment.content
        const refurbishedComment = comment.comment
        updateComment(refurbishedComment)
    }

    const EditButton = (comment) => {
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

    return (<>
        <div className="exhibit-card-container">
            <div className="exhibit-card">
                <div>
                    <h3> {exhibit.title} </h3>
                </div>
                <img src={exhibit.primaryImage} className="exhibit-card-image" alt="exhibit representation" />
                <div className="exhibit-card-details">
                    From: {exhibit.country} <br />
                    Department: {exhibit.department} <br />
                    Dimensions: {exhibit.dimensions} <br />
                    Medium: {exhibit.medium} <br />
                </div>
            </div>
        </div>
        <InitialComment objectID={exhibit.objectID} />
        <div>
            {comments.map((comment) => {
                return <div key={comment.id} className="initial-comment">
                    <div>{comment.content}</div>
                    <div>{comment.dateCreated}</div>

                    <DeleteButton comment={comment} />
                    <EditButton comment={comment} />



                </div>
            })}
        </div>
        <CommentContainer objectID={exhibit.objectID} />
    </>
    );
};

export default MyExhibitCard;