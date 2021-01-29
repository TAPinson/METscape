import React, { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider"
import { PostContext } from "../providers/PostProvider"

const Home = () => {
    //const [posts, setPosts] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const { getPostById, post } = useContext(PostContext);


    useEffect(() => {
        getPostById(2)
    }, []);

    console.log(post)
    return (
        <div >
            Welcome Home!
        </div>
    );
};

export default Home;