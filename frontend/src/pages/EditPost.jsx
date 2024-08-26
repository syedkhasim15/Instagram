import React, { useState, useEffect } from 'react';
import { createPost} from '../services/postservices';
import { useNavigate, useParams } from 'react-router-dom';
import { getSinglePost,updatePost } from '../services/postservices';
 
export default function EditPost() {
 
    const navigate = useNavigate()
    const {postId} = useParams('postId')
 
    const [postData, setPostData] = useState({
        post_title: '',
        post_description: '',
    });
 
    useEffect(() => {
        getSinglePost(postId)
        .then((res)=>{
            console.log(res)
            setPostData(res.postDetails)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, []);
 
    const handleData = (e) => {
        const { name, value, files } = e.target;
        setPostData(prev => ({ ...prev, [name]: value }));
    };
 
    const onSubmitData = (e) => {
        e.preventDefault();
        updatePost(postData,postId)
            .then((res) => navigate('/instagram/user-profile',{replace:true}))
            .catch((err) => console.log(err));
    };
 
    return (
        <div className='max-w-md mx-auto mt-8'>
            <h2 className='text-xl font-semibold mb-4'>Edit Post</h2>
            <form onSubmit={onSubmitData} className='space-y-4'>
                <input
                    type="text"
                    name="post_title"
                    onChange={handleData}
                    value={postData.post_title}
                    placeholder="Post Title"
                    className='block w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500'
                />
                <textarea
                    name="post_description"
                    onChange={handleData}
                    value={postData.post_description}
                    placeholder="Post Description"
                    rows="4"
                    className='block w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500'
                ></textarea>
                <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300'
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
 