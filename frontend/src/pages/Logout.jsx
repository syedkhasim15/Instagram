import React from 'react'
import { Navigate,useLocation } from 'react-router-dom'

export default function Logout() {

    localStorage.removeItem('AccessToken')
    console.log("hello")
    let location = useLocation();
    return <Navigate to="/instagram/login" state={{from:location}} replace/>
}
