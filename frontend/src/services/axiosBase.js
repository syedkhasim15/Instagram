import axios from 'axios';
import store from '../redux/store'

export const instance = axios.create({
  baseURL: 'http://localhost:8010/instagram/auth', 
});

export const postaxiosInstance = axios.create({
  baseURL: 'http://localhost:8010/instagram/post'
})

export const useraxiosInstance = axios.create({
  baseURL: 'http://localhost:8010/instagram/user'
})

export const userdetailsaxiosInstance = axios.create({
  baseURL: 'http://localhost:8010/instagram/user'
})
  


postaxiosInstance.interceptors.request.use((config)=>{
  const state = store.getState();
  const accessToken = state.userReducer.accessToken; 
  if (accessToken) {
      config.headers.Authorization = `JWT ${accessToken}`;
  }
  return config
})

userdetailsaxiosInstance.interceptors.request.use((config)=>{
  const state = store.getState();
  const accessToken = state.userReducer.accessToken; 
  if (accessToken) {
      config.headers.Authorization = `JWT ${accessToken}`;
  }
  return config
})


// export const serviceInstance = axios.create({
//   baseURL: 'http://localhost:8000/instagram'
// });


