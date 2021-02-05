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

    const InitialComment = (objectID) => {
        const linkedContent = posts.find((post) => {
            return post.metId === objectID.objectID
        })
        return (
            <div className="initial-comment">{linkedContent.content}</div>
        )
    }

    const UserComments = (objectID) => {
        const linkedContent = posts.find((post) => {
            return post.metId === objectID.objectID
        })
        const postId = linkedContent.id
        return <div className="initial-comment">COMMENTS SECTION</div>
    }

    let newComment = {}

    const CommentContainer = (objectID) => {
        return (
            <section className="new-comment-container">
                <input className="comment-input" type="text" name="content" onChange={handleContentUpdate} />
                <div className="submit-new-comment-button" onClick={() => commentCreator(objectID)}>Submit Comment</div>
            </section>
        )
    }

    const handleContentUpdate = (event) => {
        newComment[event.target.name] = event.target.value
    }

    const commentCreator = (objectID) => {
        const linkedContent = posts.find((post) => {
            return post.metId === objectID.objectID
        })
        newComment.postId = linkedContent.id
        addComment(newComment)
    }

    return (
        <div >
            {exhibits.map((exhibit) => {
                return (
                    <div key={exhibit.objectID} className="my-exhibits-container">
                        <h2><PostTitle objectID={exhibit.objectID} /></h2>
                        <FeedExhibitCard exhibit={exhibit} />
                        {/* <InitialComment objectID={exhibit.objectID} /> */}
                        {/* <UserComments objectID={exhibit.objectID} /> */}


                        <CommentContainer objectID={exhibit.objectID} />
                    </div>
                )
            })}
        </div>

        // <div >
        //     <h2>Posts</h2>
        //     {posts.map((post) => {
        //         return (
        //             <>
        //                 <div key={post.id}>{post.title}</div>

        //             </>
        //         )
        //     })}
        //     <h2>Exhibits</h2>
        //     {exhibits.map((exhibit) => {
        //         console.log(exhibit)
        //         return (

        //             <ExhibitCard key={exhibit.objectID} exhibit={exhibit} />

        //         )
        //     })

        //     }

        // </div>
    );
};

export default MyFeed;