import React from 'react'

export default function OtherUserPostCard({data}) {

    return (
        <div  className="relative h-72">
              <img className="w-64 h-72" src={data.post_image} alt="" />    
        </div>
      )
    }