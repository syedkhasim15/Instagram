import React, { useState } from 'react';
import { login } from '../services/authservices';
import { useDispatch } from 'react-redux';
import { addUserDetails, addToken } from '../redux/userDataSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import InstagramLogo from '../assets/instagram-logo.png'

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        login(data)
            .then((res) => {
                console.log(res);
                dispatch(addUserDetails(res.user));
                dispatch(addToken(res.accessToken));
                localStorage.setItem("AccessToken", res.accessToken);
                navigate("/instagram/");
            })
            .catch(err => console.log(err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container mx-auto">
            <div className="flex  justify-center mt-5">
                <div className="w-96 max-w-md shadow-md  mt-10 p-12">
                    <img src={InstagramLogo} alt="" />
                    <form onSubmit={onSubmit} className="bg-white text-center  rounded pt-6 pb-8 mb-4">
                        <div className="mb-5">
                            <input
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                type="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Email"
                            />
                        </div>
                        <div className="mb-5">
                            <input
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                type="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Password"
                            />
                        </div>
                        <button type="submit" className="bg-blue-400 mb-5 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
                        <p><NavLink to="/instagram/signup" className='text-blue-400  text-center'>Register?</NavLink></p>
                    </form>
                </div>
            </div>
        </div>
    );
}
