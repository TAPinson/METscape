import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../providers/PostProvider";
import { ExhibitContext, getExhibitById } from "../providers/ExhibitProvider";
import { useHistory, useParams } from 'react-router-dom';
import "./ExhibitCard.css"

const ExhibitCard = ({ exhibit }) => {


    return (
        <div className="exhibit-card-container">
            <div className="exhibit-card">
                <h3> {exhibit.title} </h3>

                <img src={exhibit.primaryImage} className="exhibit-card-image" />
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

export default ExhibitCard;