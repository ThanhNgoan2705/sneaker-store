import React, {useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import {useLocation, useNavigate,} from "react-router-dom";

const OTP = () => {
    const navigate = useNavigate();

    const [otp, setOTP] = useState('');
    const location = useLocation();
    const { id } = location.state;
    const handleChange = (e) => {
        const {value} = e.target;
        // Allow only numbers and maximum length of 6 digits
        if (/^[0-9]{0,6}$/.test(value)) {
            setOTP(value);
        }
    };

    const handleVerifyOTP = async () => {
        // Assuming the actual OTP to verify against is '123456'
        const response = await axios.patch(`http://localhost:8080/api/v1/client-api/auth/confirm-OTP/${id}?reset-password=false&otp=${otp}`);
        if (response.status === 200) {
            navigate("/login");
        } else {
            toast.error("Invalid OTP");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Enter OTP</h2>
                <input
                    type="text"
                    value={otp}
                    onChange={handleChange}
                    placeholder="Enter OTP"
                    maxLength={6}
                    className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
                />
                <button
                    onClick={handleVerifyOTP}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md focus:outline-none focus:shadow-outline"
                >
                    Verify OTP
                </button>
            </div>
        </div>

    );
};

export default OTP;
