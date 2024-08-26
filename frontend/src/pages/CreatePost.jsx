import React, { useState } from 'react';
import { createPost } from '../services/postservices';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {

    const navigate = useNavigate()

    const [postData, setPostData] = useState({
        post_title: '',
        post_description: '',
        post_image: null
    });

    const handleData = (e) => {
        const { name, value, files } = e.target;

        if (name === 'post_image')
            setPostData(prev => ({ ...prev, [name]: files[0] }));
        else
            setPostData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmitData = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('post_title', postData.post_title);
        formData.append('post_description', postData.post_description);
        formData.append('post_image', postData.post_image);
        console.log(postData)
        createPost(formData)
            .then((res) => navigate('/instagram/',{replace:true}))
            .catch((err) => console.log(err));
    };

    return (
        <div className='max-w-md mx-auto mt-8'>
            <h2 className='text-xl font-semibold mb-4'>Create a New Post</h2>
            <form onSubmit={onSubmitData} className='space-y-4'>
                <input
                    type="text"
                    name="post_title"
                    onChange={handleData}
                    value={postData.post_title}
                    placeholder="Post Title"
                    required
                    className='block w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500'
                />
                <textarea
                    name="post_description"
                    onChange={handleData}
                    value={postData.post_description}
                    placeholder="Post Description"
                    rows="4"
                    required
                    className='block w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500'
                ></textarea>
                <input
                    type="file"
                    accept='image/*'
                    name='post_image'
                    onChange={handleData}
                    required
                    className='block w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500'
                />
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
