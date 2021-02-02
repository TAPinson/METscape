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
                let getTwenty = resp.objectIDs.slice(0, 20)
                let retrievedObjects = []
                setExhibits([])
                getTwenty.map((metObj) => {
                    exhibitsCompiler(metObj)
                        .then((resp) => {
                            if (!retrievedObjects.includes(resp)) {
                                retrievedObjects.push(resp)
                                setExhibits([...retrievedObjects, resp])
                            }
                        })
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
                exhibitsCompiler
            }}
        >
            {props.children}
        </ExhibitContext.Provider>
    );
}