import React, { useEffect, useContext } from "react";
import { PostContext } from "../providers/PostProvider";
import { ExhibitContext } from "../providers/ExhibitProvider";

const MyExhibits = () => {
    const { posts, getPostsByUser } = useContext(PostContext);
    const { getExhibitById, exhibit } = useContext(ExhibitContext);
    const userId = JSON.parse(localStorage.getItem('userProfile')).id;

    useEffect(() => {
        getPostsByUser(userId)
        console.log(posts)
    }, []);


    return (
        <div >
            {posts.map((post) => {
                return <div key={post.id}>{post.metId}</div>
            })}
        </div>
    );
};

export default MyExhibits;