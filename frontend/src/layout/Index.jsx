import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

export default function Index() {
  return (
    <div>
        <div className='fixed left-0 top-0 h-full bg-gray-100 text-black w-48 p-4'>
                <Navbar/>
            </div>
        <div className="ml-48 text-black my-5">
          <Outlet/>
        </div>
    </div>
  )
}
