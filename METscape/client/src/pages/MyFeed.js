import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../providers/PostProvider";
import { ExhibitContext } from "../providers/ExhibitProvider";
import { FriendshipContext } from "../providers/FriendshipProvider"
import { CommentContext } from "../providers/CommentProvider"
import { UserProfileContext } from "../providers/UserProfileProvider"
import FeedExhibitCard from "../components/FeedExhibitCard"

const MyFeed = () => {
    const userId = JSON.parse(localStorage.getItem('userProfile')).id;
    const { getPostById, posts, setPosts, getPostsByFriend, getFriendsPosts } = useContext(PostContext);
    const { exhibits, getPostExhibits } = useContext(ExhibitContext);
    const { getUserFriends, friends, setFriends } = useContext(FriendshipContext)
    const { addComment } = useContext(CommentContext);

    const [postsToDisplay, setPostsToDisplay] = useState([]);
    let friendPosts = []

    useEffect(() => {
        getFriendsPosts(userId)
            .then((resp) => getPostExhibits(resp))
    }, []);

    const PostTitle = (objectID) => {
        const linkedTitle = posts.find((post) => {
            return post.metId === objectID.objectID
        })
        return linkedTitle.title
    }

    // let newComment = {}

    // const CommentContainer = (objectID) => {
    //     return (
    //         <section className="new-comment-container">
    //             <input className="comment-input" type="text" name="content" onChange={handleContentUpdate} />
    //             <div className="submit-new-comment-button" onClick={() => commentCreator(objectID)}>Submit Comment</div>
    //         </section>
    //     )
    // }

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

    return (
        <div >
            {exhibits.map((exhibit) => {
                return (
                    <div key={exhibit.objectID} className="my-exhibits-container">
                        <h2><PostTitle objectID={exhibit.objectID} /></h2>
                        <FeedExhibitCard exhibit={exhibit} />
                        {/* <CommentContainer objectID={exhibit.objectID} /> */}
                    </div>
                )
            })}
        </div>
    );
};

export default MyFeed;