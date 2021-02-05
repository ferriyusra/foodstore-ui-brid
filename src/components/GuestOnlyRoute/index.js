import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from "react-redux";

export default function GuestOnlyRoute({ children, ...rest }) {

    let { user } = useSelector(state => state.auth)

    return <Route {...rest}>
        {/* jika user tidak memilki nilai alias belum login, maka kita tampilkan prop children sedangkan 
        jika user memiliki nilai alias user sudah login, kita redirect ke halaman / atau Home. */}
        {!user ? children : <Redirect to="/" />}
    </Route>

}