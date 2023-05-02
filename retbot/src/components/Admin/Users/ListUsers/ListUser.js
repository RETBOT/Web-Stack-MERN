/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { UserItem } from "../UserItems";

const userConroller = new User();

export function ListUser(props) {
    const { usersActive, reload, onReload } = props;
    const [users, setUsers] = useState(null);
    const { accessToken } = useAuth();

    console.log(users);
    useEffect(() => {
        (async () => {
            try {
                setUsers(null);
                const respose = await userConroller.getUsers(accessToken, usersActive);
                setUsers(respose);
            } catch (error) {
                console.error(error);
            }
        })()
    }, [usersActive, reload]);

    if (!users) return <Loader active inline="centered" />
    if (size(users) === 0) return "No hay ningun usuario";

    return map(users, (user) => <UserItem key={user._id} user={user} onReload={onReload} />)
}
