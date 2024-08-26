import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateDetails } from '../services/userservice';

export default function ProfileUpdate() {

    const navigate = useNavigate()
    const prevData = useSelector(state=>state.userReducer.userDetails)
    

    const [userData, setUserData] = useState({
        fullName: prevData.fullName,
        email: prevData.email,
        role: prevData.role,
        password: "",
    });

    const handleChange = (e) => {
        const { name, value} = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            
            console.log(userData)
            updateDetails(userData)
                .then((res) =>{
                    navigate("/instagram/user-profile")
                })
                .catch((err) => console.log(err));

            console.log('Form submitted successfully');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mx-auto text-black vh-100 text-center">
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-md">
                    <p className="mb-4 text-4xl text-center text-xl font-bold">Update details</p>
                    <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <input
                                name="fullName"
                                onChange={handleChange}
                                value={userData.fullName}
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Full Name"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                name="email"
                                onChange={handleChange}
                                value={userData.email}
                                type="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Email"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                name="password"
                                onChange={handleChange}
                                value={userData.password}
                                type="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Password"
                            />
                        </div>
                        <div className="mb-4">
                            <select
                                name="role"
                                onChange={handleChange}
                                value={userData.role}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="admin">Admin</option>
                                <option value="normal">Normal</option>
                            </select>
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

