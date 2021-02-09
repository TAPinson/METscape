import React, { useContext, useState, useEffect } from "react";
import { CommentContext } from "../providers/CommentProvider"
import { PostContext } from "../providers/PostProvider";
import { CommentEditButton } from "./CommentEditor"
import "./ExhibitCard.css"
import PostEditor from "./PostEditor"

const MyExhibitCard = ({ exhibit }) => {
    const { posts } = useContext(PostContext);
    const { addComment, getCommentsByPost, deleteComment } = useContext(CommentContext);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(0)
    const userId = JSON.parse(localStorage.getItem('userProfile')).id;

    useEffect(() => {
        commentsFinder()
    }, [toggle]);

    const PostFinder = (objectID) => {
        const linkedPost = posts.find((post) => {
            return post.metId === objectID.objectID
        })
        return <PostEditor post={linkedPost} />
    }

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
                <div>{linkedContent.postAuthor} - {linkedContent.dateCreated}</div>
                <PostFinder objectID={exhibit.objectID} />
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

    // New Comment Code
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
            .then(setToggle(toggle + 1))
    }

    const CommentContainer = (objectID) => {
        return (
            <section className="new-comment-container">
                <input className="comment-input" type="text" name="content" onChange={handleContentUpdate} />
                <div className="submit-new-comment-button" onClick={() => commentCreator(objectID)}>Submit Comment</div>
            </section>
        )
    }

    // Delete Comment Code
    const removeComment = (id) => {
        deleteComment(id)
            .then(setToggle(toggle + 1))
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

    return (<>
        <div className="exhibit-card-container">
            <div className="exhibit-card">
                <div>
                    <h3> {exhibit.title} </h3>
                </div>
                <img src={exhibit.primaryImage} className="exhibit-card-image" alt="exhibit representation" />
                <div className="exhibit-card-details">
                    Artist: {exhibit.artistDisplayName} <br />
                    {exhibit.artistDisplayBio} <br />
                    <hr />

                    Department: {exhibit.department} <br />
                    Dimensions: {exhibit.dimensions} <br />
                    Medium: {exhibit.medium} <br />
                </div>
            </div>
        </div>

        <div className="comment-container">
            <InitialComment objectID={exhibit.objectID} />
            {comments.map((comment) => {
                return <div key={comment.id} className="initial-comment">
                    <div>{comment.content}</div>
                    <div></div>
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

export default MyExhibitCard;