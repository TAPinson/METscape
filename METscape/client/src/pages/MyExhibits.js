import React, { useEffect, useContext } from "react";
import { PostContext } from "../providers/PostProvider";
import { ExhibitContext } from "../providers/ExhibitProvider";
import ExhibitCard from "../components/ExhibitCard"
import "./MyExhibits.css"

const MyExhibits = () => {
    const { posts, getPostsByUser } = useContext(PostContext);
    const { exhibits, getPostExhibits } = useContext(ExhibitContext);
    const userId = JSON.parse(localStorage.getItem('userProfile')).id;

    useEffect(() => {
        getPostsByUser(userId)
        getPostExhibits(posts)
    }, []);

    const PostTitle = (objectID) => {
        const linkedTitle = posts.find((post) => {
            return post.metId === objectID.objectID
        })
        return linkedTitle.title
    }

    const InitialComment = (objectID) => {
        const linkedContent = posts.find((post) => {
            return post.metId === objectID.objectID
        })
        return (
            <div className="initial-comment">{linkedContent.content}</div>
        )
    }


    return (
        <div >
            {exhibits.map((exhibit) => {
                return (
                    <div className="my-exhibits-container">
                        <h2><PostTitle key={exhibit.objectID} objectID={exhibit.objectID} /></h2>
                        <ExhibitCard key={exhibit.objectID} exhibit={exhibit} />
                        <InitialComment key={exhibit.objectID} objectID={exhibit.objectID} />
                        <div className="add-comment-button">Add Comment</div>
                    </div>
                )
            })}
        </div>
    );
};

export default MyExhibits;