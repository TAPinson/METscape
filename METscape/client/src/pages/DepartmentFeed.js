import React, { useEffect, useContext, useState } from "react";
import { ExhibitContext } from "../providers/ExhibitProvider";
import { useParams } from 'react-router-dom';
import ExhibitCard from "../components/ExhibitCard"
import "./DepartmentFeed.css"

const DepartmentFeed = () => {
    const { getExhibitsByDepartment, exhibits } = useContext(ExhibitContext);
    const { departmentId } = useParams();
    const [toggle, setToggle] = useState(0);

    useEffect(() => {
        getExhibitsByDepartment(departmentId)
    }, [toggle]);

    return (
        <div className="view-container">
            <div className="department-feed-more-button" onClick={() => setToggle(toggle + 1)}>More In This Category</div>
            {

                exhibits.map((exhibitObj) => {
                    return (
                        <ExhibitCard key={exhibitObj.objectID} exhibit={exhibitObj} />
                    )
                })
            }
            <div className="department-feed-more-button" onClick={() => setToggle(toggle + 1)}>More In This Category</div>
        </div>
    );
};

export default DepartmentFeed;