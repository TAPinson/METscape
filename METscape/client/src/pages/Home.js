import React, { useEffect, useContext } from "react";
import { PostContext } from "../providers/PostProvider"

const Home = () => {
    const { getPostById, post } = useContext(PostContext);

    useEffect(() => {
        getPostById(2)
    }, []);

    console.log(post)

    return (
        <div >
            {post.title}
        </div>
    );
};

export default Home;