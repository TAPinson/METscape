import React, { useEffect, useContext } from "react";
import { PostContext } from "../providers/PostProvider";
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
        <div className="departments-container">
            {departments.map((department) => {
                return (
                    <div className="department-card"
                        key={department.departmentId}
                        onClick={() => {
                            history.push(`/departmentfeed/${department.departmentId}`)
                        }}>
                        {department.displayName} - {department.departmentId}
                    </div>
                )
            })}
        </div>
    );
};

export default CategoryBrowser;