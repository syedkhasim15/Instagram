import { useraxiosInstance,userdetailsaxiosInstance } from "./axiosBase";


export const getUserById = (userId)=>{
    return useraxiosInstance.get(`/getUser/${userId}`)
            .then((res)=>res.data.message)
            .catch((err)=>err.message)
}

export const getUserDetails = ()=>{
    return userdetailsaxiosInstance.get(`/getUserDetails`)
            .then((res)=>res.data)
            .catch((err)=>err.message)
}

export const updateDetails = (data)=>{
    return userdetailsaxiosInstance.put('/update-user-details',data)
            .then((res)=>res.data)
            .catch((err)=>res.message)
}