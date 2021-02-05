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
            body: JSON.stringify(friendship)
        })
            .then(friends.push(friendship))
    }

    const deleteFriendship = (id) => {
        return fetch(`${apiUrl}/delete/${id}`, {
            method: 'DELETE'
        })
    }

    const getUserFriends = (id) => {
        return fetch(`${apiUrl}/myfriends/${id}`)
            .then((res) => res.json())
            .then((resp) => {
                setFriends(resp)
                return [...friends]
            })
    }

    return (
        <FriendshipContext.Provider
            value={{
                friend,
                setFriend,
                friends,
                setFriends,
                addFriendship,
                getUserFriends,
                deleteFriendship
            }}
        >
            {props.children}
        </FriendshipContext.Provider>
    );
}