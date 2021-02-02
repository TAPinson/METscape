import React, { useEffect, useContext, useState } from "react";
import { ExhibitContext } from "../providers/ExhibitProvider";
import { useParams } from 'react-router-dom';
import ExhibitCard from "../components/ExhibitCard"
import "./DepartmentFeed.css"

const DepartmentFeed = () => {
    const { getExhibitsByDepartment, exhibits } = useContext(ExhibitContext);
    const { departmentId } = useParams();
    const [postsToDisplay, setPostsToDisplay] = useState([])

    useEffect(() => {
        getExhibitsByDepartment(departmentId)
    }, []);

    return (
        <div >
            {
                exhibits.map((exhibitObj) => {
                    return (
                        <ExhibitCard key={exhibitObj.objectID} exhibit={exhibitObj} />
                    )
                })
            }
        </div>
    );
};

export default DepartmentFeed;