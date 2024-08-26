import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../services/postservices'
import PostCard from '../components/PostCard'

export default function ShowPosts() {

    const [postData,setPostData] = useState([])

    const fetchPosts = ()=>{
        getAllPosts()
            .then((res)=>{
                setPostData(res)
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    useEffect(()=>{
        fetchPosts()

    },[])

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="w-96">
                    {
                        postData.map((data)=>(
                            <PostCard key={data._id} data={data} />
                        ))
                    }
                </div>                
            </div>
        </>
    )
}
