import React, { useEffect, useContext } from "react";
import { PostContext } from "../providers/PostProvider";
import { ExhibitContext } from "../providers/ExhibitProvider";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./FriendManager.css"

const FriendManager = () => {

    const { getAllUserProfiles, users } = useContext(UserProfileContext);

    useEffect(() => {
        getAllUserProfiles()
    }, []);

    return (
        <div >
            <h2>Users</h2>
            {users.map((user) => {
                return (
                    <div className="userprofile-card" key={user.id}>
                        {user.firstName} {user.lastName}
                    </div>
                )
            })}
        </div>
    );
};

export default FriendManager;