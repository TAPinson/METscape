import React, { useState, createContext, useContext } from "react";
import { PostContext } from "../providers/PostProvider";
import "./ExhibitCard.css"
import Modal from 'react-modal'
import { useParams } from 'react-router-dom';

const MyExhibitCard = ({ exhibit }) => {

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

export default MyExhibitCard;