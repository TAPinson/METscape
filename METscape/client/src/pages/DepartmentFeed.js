import React, { useEffect, useContext, useState } from "react";
import { ExhibitContext } from "../providers/ExhibitProvider";
import { useParams } from 'react-router-dom';
import ExhibitCard from "../components/ExhibitCard"
import "./DepartmentFeed.css"

const DepartmentFeed = () => {
    const { getExhibitsByDepartment, exhibits, exhibitsCompiler } = useContext(ExhibitContext);
    const { departmentId } = useParams();
    const [postsToDisplay, setPostsToDisplay] = useState([])

    let emptyArray = []

    useEffect(() => {
        getExhibitsByDepartment(departmentId)
        pagifyExhibits()


    }, []);

    const pagifyExhibits = () => {
        let pageOne = exhibits.slice(0, 3)

        pageOne.map((selection) => {
            exhibitsCompiler(selection)
                .then((res) => {
                    emptyArray.push(res)
                    setPostsToDisplay(emptyArray)
                })
        })

    }

    return (
        <div >
            {
                postsToDisplay.map((exhibit) => {
                    console.log(exhibit)
                    return (
                        <ExhibitCard key={exhibit.objectID} exhibit={exhibit} />
                    )
                })
            }
        </div>
    );
};

export default DepartmentFeed;