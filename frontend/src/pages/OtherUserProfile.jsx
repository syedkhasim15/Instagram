import React from 'react'
import OtherUserProfileDetails from '../components/userprofile/OtherUserProfileDetails'
import UserPosts from '../components/userprofile/UserPosts'
import { useParams } from 'react-router-dom'

export default function OtherUserProfile() {

    const {userId} = useParams()
    
    return (
        <div className='flex justify-center items-center'>
            <div className='px-28'>
              <div className='mb-8'>
                <OtherUserProfileDetails/>
              </div>
              <div className='text-center mb-4'>
                <i className='bx bxs-grid bx-sm mx-5'></i>
                <i className='bx bx-bookmark bx-sm mx-5'></i>
              </div>
              <div>
                <UserPosts userId={userId} flag={false}/>
              </div>
            </div>
        </div>
      )
    }
    