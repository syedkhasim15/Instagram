import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function UserProfileDetails() {

  const userData = useSelector((state)=>state.userReducer.userDetails)
  const navigate = useNavigate()
  const profileUpdate = ()=>{
    navigate("/instagram/profile-update")
  }

  return (
    <div className='flex items-center'>
        <div className='mr-10'>
            <img className='h-28 w-28 rounded-full mr-3 border-2 border-gray-200' src={userData.image} alt="" />
        </div>
        <div>
            <div className='flex'>
                <p className='text-xl mr-12'>{userData.fullName}</p>
                <i className='mx-3 bx bx-edit-alt bx-sm text-gray-500' onClick={profileUpdate}></i>
                <i className='mx-3 bx bx-dots-horizontal-rounded bx-sm text-gray-500' ></i>
            </div>
            <div className='mt-2 text-gray-400'>
              Soo beautifull sooo elegant just looking like a wow
            </div>
            <div className='text-gray-400'>{userData.email}</div>
        </div>
    </div>
  )
}
