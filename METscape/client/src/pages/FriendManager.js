import React, { useEffect, useContext, useState } from "react";
import { FriendshipContext } from "../providers/FriendshipProvider";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./FriendManager.css"

const FriendManager = () => {
    const { getAllUserProfiles, users } = useContext(UserProfileContext);
    const { addFriendship, getUserFriends, friends, deleteFriendship } = useContext(FriendshipContext);
    const userId = JSON.parse(localStorage.getItem('userProfile')).id;
    const [toggler, setToggler] = useState(0)
    useEffect(() => {
        getUserFriends(userId)
        getAllUserProfiles()
    }, [toggler]);

    const createFriendship = (id) => {
        const newFriend = {
            approverId: id,
            isApproved: 1
        }
        addFriendship(newFriend)
        const toggle = toggler + 1
        setToggler(toggle)
    }

    const removeFriend = (id) => {
        deleteFriendship(id)
        const toggle = toggler + 1
        setToggler(toggle)
    }

    const AddFriendButton = (user) => {
        for (const buddy of friends) {
            if (buddy.approverId === user.user.id || buddy.initiatorId === user.user.id) {
                return (
                    <div className="add-friend-button"
                        onClick={() => {
                            removeFriend(buddy.id)
                        }}>
                        ❌
                    </div>
                )
            }
        }
        return (
            <div className="add-friend-button"
                onClick={() => {
                    createFriendship(user.user.id)
                }}>
                ➕
            </div>
        )
    }

    return (
        <div className="friends-view-container">
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
                                <AddFriendButton user={user} />
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    );
};

export default FriendManager;