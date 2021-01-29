import React, { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider"

const Home = () => {
    const [posts, setPosts] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    useEffect(() => {
    }, []);

    return (
        <div >
            Welcome Home!

        </div>
    );
};

export default Home;