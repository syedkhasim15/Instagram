import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Navbar() {

    const userImage = useSelector((state)=>state?.userReducer?.userDetails?.image)
    return (
        <>
            <ul className='mt-4'>
                <li className='mb-5'><NavLink to='' className="py-2 flex items-center"><i className='bx bxs-home-alt-2 bx-sm mr-4'></i>Home</NavLink></li>
                <li className='mb-5'><NavLink to='' className="py-2 flex items-center"><i className='bx bx-search-alt-2 bx-sm mr-4'></i>Search</NavLink></li>
                <li className='mb-5'><NavLink to='' className="py-2 flex items-center"><i className='bx bx-compass bx-sm mr-4'></i>Explore</NavLink></li>
                <li className='mb-5'><NavLink to='' className="py-2 flex items-center"><i className='bx bx-message-dots bx-sm mr-4' ></i>Messsages</NavLink></li>
                <li className='mb-5'><NavLink to='' className="py-2 flex items-center"><i className='bx bx-heart bx-sm mr-4'></i>Notification</NavLink></li>
                <li className='mb-5'><NavLink to='create-post' className="py-2 flex items-center"><i className='bx bx-plus-circle bx-sm mr-4'></i>Create</NavLink></li>
                <li className='mb-5'><NavLink to='logout' className="py-2 flex items-center"><i className='bx bx-log-out bx-sm mr-4' ></i>Logout</NavLink></li>
                <li className='mb-5'><NavLink to='user-profile' className="py-2 flex items-center"><img className='w-9 h-9 rounded-full mr-3 border-2 border-gray-200' src={userImage} alt="" />Profile</NavLink></li>
                {/* Add more NavLinks as needed */}
            </ul>
        </>
    )
}
