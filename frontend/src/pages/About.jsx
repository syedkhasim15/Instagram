import React from 'react'
import { useSelector } from 'react-redux'

export default function About() {

    const data = useSelector((state)=>state.userReducer.accessToken)
    
    return (
        <div>About
            {data}
        </div>
    )
}
