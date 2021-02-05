import React from 'react'

import { useHistory } from 'react-router-dom';
import { LayoutOne } from 'upkit';
import { useDispatch } from 'react-redux';
import HashLoader from 'react-spinners/HashLoader';

import { userLogout } from "../../features/Auth/actions";
import { logout } from "../../api/auth";


export default function Logout() {

    // definisikan `history` dan `dispatch`
    let history = useHistory()
    let dispatch = useDispatch()

    // gunakan `logout` di dalam `useEffect`
    // jika sudah dispatch Redux _action_ `useLogout`
    // kemudian redirect ke `Home`

    React.useEffect(() => {

        logout()
            .then(() => dispatch(userLogout()))
            .then(() => history.push('/'));

    }, [history, dispatch]);

    return (
        <LayoutOne size="small">
            <div className="text-center flex flex-col justify-center itemscenter">
                <HashLoader color="red" />
                <br />
                Sedang proses logout ...
                </div>
        </LayoutOne>

    )
}
