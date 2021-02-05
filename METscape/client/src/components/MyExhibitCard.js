import React, { useContext, useState, useEffect } from "react";
import { CommentContext } from "../providers/CommentProvider"
import { PostContext } from "../providers/PostProvider";

import "./ExhibitCard.css"


const MyExhibitCard = ({ exhibit }) => {
    const { posts, getPostsByUser } = useContext(PostContext);
    const { addComment, getCommentsByPost } = useContext(CommentContext);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        commentsFinder()
    }, []);

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

    return (<>
        <div className="exhibit-card-container">
            <div className="exhibit-card">
                <h3> {exhibit.title} </h3>
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
                    <div>{comment.content}</div><div>{comment.dateCreated}</div>
                </div>
            })}
        </div>
    </>
    );
};

export default MyExhibitCard;