import React from 'react'
import { Navigate, Outlet, useActionData, useLocation } from 'react-router-dom'
import Index from '../layout/Index';
import { useDispatch } from 'react-redux';
import { addToken, addUserDetails } from '../redux/userDataSlice';
import { getUserDetails } from '../services/userservice';

export default function ProtectedRoute() {

    const userAcessToken = localStorage.getItem('AccessToken')
    const dispatch = useDispatch()
    if(userAcessToken!==null)
    {
        dispatch(addToken(userAcessToken))
        getUserDetails()
            .then((res)=>{
                dispatch(addUserDetails(res))})
            .catch((err)=>console.log(err)) 
    }
    let location = useLocation();
    return userAcessToken !==null ? <Index ><Outlet/></Index> : <Navigate to="/instagram/login" state={{from:location}} replace/>
}
