import {instance} from './axiosBase';

export const register = (data)=>{
    return instance.post('/register',data,{header:{'Content-Type':'multipart/form-data'}})
        .then((res)=>{
            return res.data
        })
        .catch((error)=>{
            console.log(error)
            throw error
        })
}

export const login = (data)=>{
    return instance.post('/login', data)
    .then(res => {
        return res.data;
    })
    .catch(error => {
        console.log(error);
        throw error; 
    });
}
