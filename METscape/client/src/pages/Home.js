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

    return (
        <div >
            {post.title} <br />
            <img src={exhibit.primaryImage} alt="exhibit representation" />
        </div>
    );
};

export default Home;