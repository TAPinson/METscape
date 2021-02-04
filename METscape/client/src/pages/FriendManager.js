import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../providers/PostProvider";
import { ExhibitContext } from "../providers/ExhibitProvider";
import { FriendshipContext } from "../providers/FriendshipProvider";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./FriendManager.css"

const FriendManager = () => {
    const { getAllUserProfiles, users } = useContext(UserProfileContext);
    const { addFriendship, getUserFriends, friends } = useContext(FriendshipContext);
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
        //console.log(newFriend)
        addFriendship(newFriend)
        const toggle = toggler + 1
        setToggler(toggle)
    }

    const notFriends = users.filter((person) => {
        // for (const buddy of friends) {
        //     if (buddy.initiatorId !== person.id && buddy.approverId !== person.id) {
        //         return person
        //     }
        // }
    })

    const AddFriendButton = (user) => {
        for (const buddy of friends) {
            if (buddy.approverId === user.user.id || buddy.initiatorId === user.user.id) {
                return null
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
                                <AddFriendButton user={user} />
                            </div>
                        )
                    }
                })}
            </div>
        </>
    );
};

export default FriendManager;