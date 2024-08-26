import React, { useState } from 'react';
import { register } from '../services/authservices';
import { NavLink, useNavigate } from 'react-router-dom';
import InstagramLogo from '../assets/instagram-logo.png'

export default function Signup() {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        role: "normal",
        password: "",
        image: null, // New state for the image
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            setUserData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setUserData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('fullName', userData.fullName);
            formData.append('email', userData.email);
            formData.append('role', userData.role);
            formData.append('password', userData.password);
            formData.append('image', userData.image);

            register(formData)
                .then((res) =>{
                    console.log(res)
                    navigate("/instagram/");
                })
                .catch((err) => console.log(err));

            console.log('Form submitted successfully');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mx-auto text-black vh-100 text-center">
            <div className="flex justify-center mt-7">
                <div className="w-96 max-w-md shadow-md px-12">
                    <img src={InstagramLogo} alt="" />
                    <form onSubmit={onSubmit} className="rounded  pt-6 pb-8">
                        <div className="mb-5">
                            <input
                                name="fullName"
                                onChange={handleChange}
                                value={userData.fullName}
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Full Name"
                            />
                        </div>
                        <div className="mb-5">
                            <input
                                name="email"
                                onChange={handleChange}
                                value={userData.email}
                                type="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Email"
                            />
                        </div>
                        <div className="mb-5">
                            <input
                                name="password"
                                onChange={handleChange}
                                value={userData.password}
                                type="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Password"
                            />
                        </div>
                        <div className="mb-5">
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
                        <div className="mb-5">
                            <input
                                name="image"
                                onChange={handleChange}
                                type="file"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                accept="image/*"
                            />
                        </div>
                        <button type="submit" className="mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                        <p><NavLink to="/instagram/login" className='text-blue-400  text-center'>Login?</NavLink></p>

                    </form>
                </div>
            </div>
        </div>
    );
}
