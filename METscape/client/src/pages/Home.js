import React, { useEffect, useContext } from "react";
import { PostContext } from "../providers/PostProvider";
import { ExhibitContext } from "../providers/ExhibitProvider";

const Home = () => {
    const { getPostById, post } = useContext(PostContext);
    const { getExhibitById, exhibit } = useContext(ExhibitContext);

    useEffect(() => {
        getPostById(2)
        getExhibitById(436050)
    }, []);

    console.log(post)
    console.log(exhibit)

    return (
        <div >
            {post.title} <br />
            <img src={exhibit.primaryImage} />
        </div>
    );
};

export default Home;