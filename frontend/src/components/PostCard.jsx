import React, { useEffect, useState } from 'react'
import { getUserById } from '../services/userservice'
import { useNavigate } from 'react-router-dom'

export default function PostCard({data}) {

    const [userData,setUserData] = useState()
    const navigate = useNavigate()
    
    const fetchUserData = (userId)=>{
        getUserById(userId)
          .then((res)=>{
            setUserData(res)
          })
    }
    useEffect(()=>{
      fetchUserData(data.post_user)
    },[])

    const onProfileClick = ()=>{
      navigate(`/instagram/user-profile/${userData?._id}`)
    }

    return (
      <div className='shadow-md'>
          <div className='m-2 flex justify-between items-center'>
            <div className="flex items-center">
              <img onClick={onProfileClick} className='w-9 h-9 rounded-full mr-3 border-2 border-gray-200' src={userData?.image} alt="" />
              <p className='text-sm font-semibold'>{userData?.fullName}</p>
            </div>
            <i className='bx bx-dots-horizontal-rounded'></i>
          </div>
          <div className='flex justify-center items-center'>
            <img className='h-64' src={data.post_image}  alt="..."/>
          </div>
          <div className='mx-3'>
            <div className="my-2 flex justify-between">
              <div>
                <i className='bx bx-heart mr-2'></i>
                <i className='bx bx-message-square-dots mr-2'></i>
                <i className='bx bx-send'></i>
              </div>
              <i className='bx bx-bookmark'></i>
            </div>
            <div className='mb-3'>         
              {/* <p className='text-xs' >{data.post_title}</p> */}
              <p className='text-xs'>{data.post_description}</p>
            </div>
            <div className="border-t border-gray-200"></div>
            <div className='flex justify-between items-center py-2'>
              <div className='flex justify-between'>
                <i className='bx bx-smile mr-2'></i>
                <p className='text-xs text-gray-400 font-semibold'>Add a comment...</p>
              </div>
              <p className='font-semibold text-blue-300 text-sm'>Post</p>
            </div>              
          </div>      
            
      </div>
      
    )
}
