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

    const commentsFinder = () => {
        const linkedContent = posts.find((post) => {
            return post.metId === exhibit.objectID
        })

        getCommentsByPost(linkedContent.id)
            //.then((resp) => resp.json())
            //.then((res) => console.log(res))
            .then((resp) => {
                setComments(resp)
                return resp
            })
    }

    console.log(comments)

    return (<>
        <div className="exhibit-card-container">
            <div className="exhibit-card">
                <h3> {exhibit.title} </h3>
                <img src={exhibit.primaryImage} className="exhibit-card-image" alt="exhibit representation" />
                <div>
                    From: {exhibit.country} <br />
                    Department: {exhibit.department} <br />
                    Dimensions: {exhibit.dimensions} <br />
                    Medium: {exhibit.medium} <br />
                </div>
            </div>
        </div>
        <div>
            {comments.map((comment) => {
                return <div className="initial-comment">{comment.content}</div>
            })}
        </div>
    </>
    );
};

export default MyExhibitCard;