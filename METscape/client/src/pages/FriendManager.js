import React, { useEffect, useContext } from "react";
import { PostContext } from "../providers/PostProvider";
import { ExhibitContext } from "../providers/ExhibitProvider";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./FriendManager.css"

const FriendManager = () => {

    const { getAllUserProfiles, users } = useContext(UserProfileContext);
    const userId = JSON.parse(localStorage.getItem('userProfile')).id;

    useEffect(() => {
        getAllUserProfiles()
    }, []);

    return (
        <>
            <h2>Users</h2>
            <div className="user-card-container">
                {users.map((user) => {
                    if (user.id === userId) {
                        return null
                    }
                    else {
                        return (
                            <div className="userprofile-card" key={user.id}>
                                <div>{user.firstName} {user.lastName}</div>
                                <div>{user.userName}</div>
                                <div className="add-friend-button">
                                    ➕
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </>
    );
};

export default FriendManager;