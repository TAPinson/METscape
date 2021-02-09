import React, { useEffect, useContext } from "react";

import { ExhibitContext } from "../providers/ExhibitProvider";
import './CategoryBrowser.css';
import { useHistory } from 'react-router-dom';


export const CategoryBrowser = () => {
    const { departments, getAllDepartments } = useContext(ExhibitContext);
    const history = useHistory();

    useEffect(() => {
        getAllDepartments()
    }, []);

    return (
        <div className="departments-container view-container">
            {departments.map((department) => {
                return (
                    <div className="department-card"
                        key={department.departmentId}
                        onClick={() => {
                            history.push(`/departmentfeed/${department.departmentId}`)
                        }}>
                        {department.displayName}
                    </div>
                )
            })}
        </div>
    );
};

export default CategoryBrowser;