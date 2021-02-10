import React, { useEffect, useContext } from "react";
import { PostContext } from "../providers/PostProvider";
import { ExhibitContext } from "../providers/ExhibitProvider";
import FeedExhibitCard from "../components/FeedExhibitCard"
import "./MyFeed.css"

const MyFeed = () => {
    const userId = JSON.parse(localStorage.getItem('userProfile')).id;
    const { posts, getFriendsPosts } = useContext(PostContext);
    const { exhibits, getPostExhibits } = useContext(ExhibitContext);


    useEffect(() => {
        getFriendsPosts(userId)
            .then((resp) => getPostExhibits(resp))
    }, []);

    const PostAuthor = (objectID) => {

        const linkedAuthor = posts.find((post) => {
            return post.metId === objectID.objectID
        })

        if (linkedAuthor === undefined) {
            return null
        }
        return <div className="myfeed-post-author">Posted By: {linkedAuthor.postAuthor}</div>
    }

    return (
        <div className="view-container">
            {exhibits.map((exhibit) => {
                return (
                    <div key={exhibit.objectID} className="my-exhibits-container">
                        <PostAuthor objectID={exhibit.objectID} />
                        <FeedExhibitCard exhibit={exhibit} />
                    </div>
                )
            })}
        </div>
    );
};

export default MyFeed;