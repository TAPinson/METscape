import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../providers/PostProvider";
import { ExhibitContext } from "../providers/ExhibitProvider";
import { CommentContext } from "../providers/CommentProvider"
// import { UserProfileContext } from "../providers/UserProfileProvider"
import MyExhibitCard from "../components/MyExhibitCard"
import PostEditor from "../components/PostEditor"
import "./MyExhibits.css"

const MyExhibits = () => {
    const { posts, getPostsByUser, deletePost, postWasEdited, setPostWasEdited } = useContext(PostContext);
    const { exhibits, getPostExhibits } = useContext(ExhibitContext);
    // const { getToken } = useContext(UserProfileContext);
    const userId = JSON.parse(localStorage.getItem('userProfile')).id;
    const [toggle, setToggle] = useState(0);

    useEffect(() => {
        getPostsByUser(userId)
            .then((postResponse) => {
                getPostExhibits(postResponse)
            })
    }, [toggle, postWasEdited]);

    const PostTitle = (objectID) => {
        const linkedTitle = posts.find((post) => {
            return post.metId === objectID.objectID
        })
        if (linkedTitle === undefined) {
            return null
        }
        return linkedTitle.title
    }

    const removePost = (objectID) => {
        const linkedPost = posts.find((post) => {
            return post.metId === objectID
        })
        deletePost(linkedPost.id)
            .then(() => setToggle(toggle + 1))
    }

    const PostFinder = (objectID) => {
        const linkedPost = posts.find((post) => {
            return post.metId === objectID.objectID
        })
        return <PostEditor post={linkedPost} />
    }

    return (
        <div >
            {exhibits.map((exhibit) => {
                return (
                    <div key={exhibit.objectID} className="my-exhibits-container">
                        <div>
                            <h2><PostTitle objectID={exhibit.objectID} /></h2>
                            <PostFinder objectID={exhibit.objectID} />
                            <div className="delete-post-button" onClick={() => removePost(exhibit.objectID)}>DELETE POST</div>
                        </div>
                        <MyExhibitCard exhibit={exhibit} />
                    </div>
                )
            })}
        </div>
    );
};

export default MyExhibits;