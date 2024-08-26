// import serviceInstance from './axiosBase';
import { postaxiosInstance } from "./axiosBase"


export const getAllPosts = ()=>{
    return postaxiosInstance.get('/insta-get-posts')
        .then((res)=>{
            return res.data.message
        })
        .catch((error)=>{
            console.log(error)
            throw error
        })
}

export const createPost = (data)=>{
    return postaxiosInstance.post('/insta-post',data)
        .then((res)=>{
            return res.data
        })
        .catch((err)=>{
            return err.message
        })
}

export const updatePost = (postData,postId)=>{
    return postaxiosInstance.put(`insta-post/${postId}`,postData)
        .then((res)=>{
            return res.data
        })
        .catch((err)=>{
            return err.message
        })
}

export const deletePost = (postId)=>{
    return postaxiosInstance.delete(`/insta-post/${postId}`)
        .then((res)=>{
            return res.data
        })
        .catch((err)=>{
            return err.message
        })
}

export const getSinglePost = (postId)=>{
    return postaxiosInstance.get(`/insta-post/${postId}`)
        .then((res)=>{
            return res.data
        })
        .catch((err)=>{
            return err.message
        })
}

export const getUserPosts = (userId)=>{
    return postaxiosInstance.get(`/insta-user-posts/${userId}`)
        .then((res)=>{
            return res.data.userPosts
        })
        .catch((error)=>{
            console.log(error)
            throw error
    })
}