import React, { useState, createContext } from "react";

export const FriendshipContext = createContext();

export function FriendshipProvider(props) {

    const apiUrl = "/api/friendship";

    const [friends, setFriends] = useState([]);
    const [friend, setFriend] = useState([]);

    const addFriendship = (friendship) => {
        const userId = JSON.parse(localStorage.getItem('userProfile')).id;
        friendship.initiatorId = userId
        return fetch(`${apiUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
    }

    return (
        <FriendshipContext.Provider
            value={{
                friend,
                setFriend,
                friends,
                setFriends,
                addFriendship
            }}
        >
            {props.children}
        </FriendshipContext.Provider>
    );
}