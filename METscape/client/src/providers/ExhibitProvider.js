import React, { useState, createContext } from "react";


export const ExhibitContext = createContext();

export function ExhibitProvider(props) {

    const singleExhibitUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects";

    const [exhibit, setExhibit] = useState([]);

    const getExhibitById = (id) => {
        fetch(`${singleExhibitUrl}/${id}`)
            .then((res) => res.json())
            .then((resp) => setExhibit(resp))
    }

    return (
        <ExhibitContext.Provider
            value={{
                exhibit,
                setExhibit,
                getExhibitById
            }}
        >
            {props.children}
        </ExhibitContext.Provider>
    );
}