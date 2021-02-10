import React, { useState, useContext, useEffect } from "react";
// import { PostContext } from "../providers/PostProvider";
import { ExhibitContext } from "../providers/ExhibitProvider";
import ExhibitCard from "../components/ExhibitCard"
import "./Home.css"

const Home = () => {
    // const { addPost, posts, setPosts } = useContext(PostContext);
    const { getExhibitsBySearch, exhibits, setExhibits } = useContext(ExhibitContext);

    useEffect(() => {
        setExhibits([])
    }, []);

    let searchTermBuilder = {}

    const handleSearchTermUpdate = (event) => {
        searchTermBuilder[event.target.id] = event.target.value
    }

    const sendSearch = () => {
        getExhibitsBySearch(searchTermBuilder.searchTerm)
    }

    return (
        <>
            <div className="search-controls">
                <input type="text" placeholder="What shall we find today?" id="searchTerm" onChange={handleSearchTermUpdate} />
                <div className="searchButton" onClick={() => sendSearch(searchTermBuilder)} >Search</div>
            </div>
            <div >
                <div className="search-view-container">
                    {
                        exhibits.map((exhibitObj) => {
                            return (
                                <ExhibitCard key={exhibitObj.objectID} exhibit={exhibitObj} />
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
};

export default Home;