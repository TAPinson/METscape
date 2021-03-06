import React, { useState, createContext } from "react";


export const ExhibitContext = createContext();

export function ExhibitProvider(props) {

    const singleExhibitUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects";

    const [exhibit, setExhibit] = useState([]);
    const [exhibits, setExhibits] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [department, setDepartment] = useState([]);

    const getExhibitById = (id) => {
        fetch(`${singleExhibitUrl}/${id}`)
            .then((res) => res.json())
            .then((resp) => setExhibit(resp))
    }

    const exhibitsCompiler = (id) => {
        return fetch(`${singleExhibitUrl}/${id}`)
            .then((res) => res.json())
    }


    const getAllDepartments = () => {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/departments`)
            .then((res) => res.json())
            .then((resp) => setDepartments(resp.departments))
    }

    const getExhibitsByDepartment = (id) => {
        fetch(`https:/collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${id}`)
            .then((res) => res.json())
            .then((resp) => {
                //This is where we will do the randomization
                // Random number in the length of the result objectIDs array
                let randomTwenty = Math.floor(Math.random() * resp.objectIDs.length) + 1
                let twentyBelow = randomTwenty - 20
                let getTwenty = resp.objectIDs.slice(twentyBelow, randomTwenty)
                let retrievedObjects = []
                setExhibits([])
                getTwenty.map((metObj) => {
                    exhibitsCompiler(metObj)
                        .then((resp) => {
                            if (!retrievedObjects.includes(resp)) {
                                retrievedObjects.push(resp)
                                setExhibits([...retrievedObjects])
                            }
                        })
                })
            })
    }

    const getExhibitsBySearch = (searchTerm) => {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchTerm}`)
            .then((res) => res.json())
            .then((resp) => {
                if (resp.objectIDs === null) {
                    return null
                }
                let getTwenty = resp.objectIDs.slice(0, 40)
                let retrievedObjects = []
                setExhibits([])
                getTwenty.map((metObj) => {
                    exhibitsCompiler(metObj)
                        .then((resp) => {
                            if (!retrievedObjects.includes(resp)) {
                                retrievedObjects.push(resp)
                                setExhibits([...retrievedObjects])
                            }
                        })
                })
            })

    }

    const getPostExhibits = (posts) => {
        let retrievedObjects = []
        posts.map((post) => {
            exhibitsCompiler(post.metId)
                .then((resp) => {
                    resp.id = post.id
                    retrievedObjects.push(resp)
                    retrievedObjects.sort(function (a, b) {
                        return a.id - b.id;
                    });
                    retrievedObjects.reverse()
                    setExhibits([...retrievedObjects])
                })
        })
    }

    return (
        <ExhibitContext.Provider
            value={{
                exhibit,
                setExhibit,
                getExhibitById,
                getAllDepartments,
                departments,
                setDepartments,
                department,
                setDepartment,
                getExhibitsByDepartment,
                exhibits,
                setExhibits,
                exhibitsCompiler,
                getPostExhibits,
                getExhibitsBySearch
            }}
        >
            {props.children}
        </ExhibitContext.Provider>
    );
}