import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../providers/PostProvider";
import { ExhibitContext } from "../providers/ExhibitProvider";
import MyExhibitCard from "../components/MyExhibitCard"
import "./MyExhibits.css"

const MyExhibits = () => {
    const { posts, getPostsByUser, deletePost, postWasEdited } = useContext(PostContext);
    const { exhibits, getPostExhibits } = useContext(ExhibitContext);
    const userId = JSON.parse(localStorage.getItem('userProfile')).id;
    const [toggle, setToggle] = useState(0);

    useEffect(() => {
        getPostsByUser(userId)
            .then((postResponse) => {
                getPostExhibits(postResponse)
            })
    }, [toggle, postWasEdited]);

    const removePost = (objectID) => {
        const linkedPost = posts.find((post) => {
            return post.metId === objectID
        })
        deletePost(linkedPost.id)
            .then(() => setToggle(toggle + 1))
    }

    return (
        <div className="view-container">
            {exhibits.map((exhibit) => {
                return (
                    <div key={exhibit.objectID} className="my-exhibits-container">
                        <div>
                            <div className="delete-post-button" onClick={() => removePost(exhibit.objectID)}>Remove</div>
                        </div>
                        <MyExhibitCard exhibit={exhibit} />
                    </div>
                )
            })}
        </div>
    );
};

export default MyExhibits;