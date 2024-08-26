import React, { useId } from 'react'
import UserProfileDetails from '../components/userprofile/UserProfileDetails'
import UserPosts from '../components/userprofile/UserPosts'
import { useSelector } from 'react-redux' 


export default function UserProfile() {

  const userId = useSelector((state)=>state.userReducer.userDetails._id)
  

  return (
    <div className='flex justify-center items-center'>
        <div className='px-28'>
          <div className='mb-8'>
             <UserProfileDetails/>
          </div>
          <div className='text-center mb-4'>
            <i className='bx bxs-grid bx-sm mx-5'></i>
            <i className='bx bx-bookmark bx-sm mx-5'></i>
          </div>
          <div>
            <UserPosts userId={userId} flag={true}/>
          </div>
        </div>
    </div>
  )
}
