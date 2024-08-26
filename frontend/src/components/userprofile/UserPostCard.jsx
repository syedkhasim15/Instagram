import React, { useState } from 'react'
import { deletePost} from '../../services/postservices';
import { useNavigate } from 'react-router-dom';
export default function UserPostCard({data}) {
 
  const navigate = useNavigate()
 
  const [flagDelete,setFlagDelete] = useState()
  const handleDotHover = () => {
    setFlagDelete(true)
  };
  const handleDotLeave = ()=>{
    setFlagDelete(false)
  }
  const postDelete = ()=>{
    deletePost(data._id)
      .then((res)=>{
        alert(res.message)
        navigate("/instagram")
      })
      .catch(err=>console.log(err))
  }
 
 
  const postEdit = ()=>{
    console.log(data._id)
    navigate(`/instagram/edit-post/${data._id}`)
  }
 
 
  return (
    <div  className="relative h-72" onMouseLeave={handleDotLeave}>
          <img className="w-64 h-72" src={data.post_image} alt="" />
          <div className="absolute top-0 right-0 p-2">
            <i
              className="bx bx-dots-vertical-rounded bx-sm text-gray-500 cursor-pointer"
              onClick={handleDotHover}
            ></i>
          </div>
          {
            flagDelete === true &&          
             <div>
              <div onClick={postDelete} className="absolute top-8 right-2 bg-white rounded-full">
                <i className='bx bx-trash-alt bx-sm p-1'></i>
            </div>
            <div onClick={postEdit} className="absolute top-20 right-2 bg-white rounded-full">
            <i className='bx bxs-edit-alt bx-sm p-1'></i>
            </div>
              </div>
          }
 
    </div>
  )
}