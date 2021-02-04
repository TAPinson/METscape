import React from "react";

import "./ExhibitCard.css"


const MyExhibitCard = ({ exhibit }) => {

    return (
        <div className="exhibit-card-container">
            <div className="exhibit-card">
                <h3> {exhibit.title} </h3>
                <img src={exhibit.primaryImage} className="exhibit-card-image" alt="exhibit representation" />
                <div>
                    From: {exhibit.country} <br />
                    Department: {exhibit.department} <br />
                    Dimensions: {exhibit.dimensions} <br />
                    Medium: {exhibit.medium} <br />
                </div>

            </div>
        </div>
    );
};

export default MyExhibitCard;