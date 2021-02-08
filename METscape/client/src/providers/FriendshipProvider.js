import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider"

export const FriendshipContext = createContext();

export function FriendshipProvider(props) {

    const apiUrl = "/api/friendship";
    const { getToken } = useContext(UserProfileContext)
    const [friends, setFriends] = useState([]);
    const [friend, setFriend] = useState([]);

    const addFriendship = (friendship) => {
        const userId = JSON.parse(localStorage.getItem('userProfile')).id;
        friendship.initiatorId = userId
        return getToken().then((token) => {
            return fetch(`${apiUrl}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(friendship)
            })

        })
            .then(friends.push(friendship))
    }

    const deleteFriendship = (id) => {
        return getToken().then((token) => {
            return fetch(`${apiUrl}/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
    }

    const getUserFriends = (id) => {
        return getToken().then((token) => {
            return fetch(`${apiUrl}/myfriends/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then((resp) => {
                    setFriends(resp)
                    return [...friends]
                })
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