import React, { useEffect, useState } from 'react'
import { getUserById } from '../../services/userservice'
import { useParams } from 'react-router-dom'

export default function OtherUserProfileDetails() {

    const [userData,setUserData] = useState({})
    const {userId} = useParams()

    useEffect(()=>{
        getUserById(userId)
            .then((res)=>setUserData(res))
            .catch((err)=>console.log(err))
    },[userId]) 

    return (
        <div className='flex items-center'>
        <div className='mr-10'>
            <img className='h-28 w-28 rounded-full mr-3 border-2 border-gray-200' src={userData.image} alt="" />
        </div>
        <div>
            <div className='flex'>
                <p className='text-xl mr-8'>{userData.fullName}</p>
                <p className='border-2 px-2 mx-1 border-gray-200'>Message</p>
                <p className='rounded-sm px-5 mx-1 text-white bg-blue-500'>Follow</p>
                <p className='rounded-sm px-2 bg-blue-500 text-white mx-1 '><i className='bx bx-chevron-down bx-sm'></i></p>
                <p className='rounded-sm px-2 mx-1 '><i className='bx bx-dots-horizontal-rounded bx-sm text-gray-500' ></i></p>
            </div>
            <div className='mt-2 text-gray-400'>
              Soo beautifull sooo elegant just looking like a wow
            </div>
            <div className='text-gray-400'>{userData.email}</div>
        </div>
    </div>
    )
}
