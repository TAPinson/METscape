import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../providers/PostProvider";
import { CommentContext } from "../providers/CommentProvider";
import { ExhibitContext } from "../providers/ExhibitProvider";
import MyExhibitCard from "../components/MyExhibitCard"
import "./MyExhibits.css"

const MyExhibits = () => {
    const { posts, getPostsByUser } = useContext(PostContext);
    const { exhibits, getPostExhibits } = useContext(ExhibitContext);
    const { addComment, getCommentsByPost } = useContext(CommentContext);
    const userId = JSON.parse(localStorage.getItem('userProfile')).id;

    useEffect(() => {
        getPostsByUser(userId)
            .then((postResponse) => {
                getPostExhibits(postResponse)
            })
    }, []);

    const PostTitle = (objectID) => {
        const linkedTitle = posts.find((post) => {
            return post.metId === objectID.objectID
        })
        return linkedTitle.title
    }

    // let newComment = {}

    // const handleContentUpdate = (event) => {
    //     newComment[event.target.name] = event.target.value
    // }

    // const commentCreator = (objectID) => {
    //     const linkedContent = posts.find((post) => {
    //         return post.metId === objectID.objectID
    //     })
    //     newComment.postId = linkedContent.id
    //     addComment(newComment)
    // }

    // const CommentContainer = (objectID) => {
    //     return (
    //         <section className="new-comment-container">
    //             <input className="comment-input" type="text" name="content" onChange={handleContentUpdate} />
    //             <div className="submit-new-comment-button" onClick={() => commentCreator(objectID)}>Submit Comment</div>
    //         </section>
    //     )
    // }

    return (
        <div >
            {exhibits.map((exhibit) => {
                return (
                    <div key={exhibit.objectID} className="my-exhibits-container">
                        <h2><PostTitle objectID={exhibit.objectID} /></h2>
                        <MyExhibitCard exhibit={exhibit} />
                        {/* <CommentContainer objectID={exhibit.objectID} /> */}
                    </div>
                )
            })}
        </div>
    );
};

export default MyExhibits;