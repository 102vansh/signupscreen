

import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/UserSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://signupscreen-6.onrender.com/api/v1/user/login',
        {
          email,
          password,
        }
      );
      dispatch(setUser(data.user));
      toast.success('Login Successful');
      navigate('/home');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen"> {/* Responsive layout */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4"> {/* Flex and padding */}
        <form className="w-full max-w-sm" onSubmit={handleSubmit}> {/* Restrict width on large screens */}
          <h1 className="text-2xl font-bold mb-4 text-center">Login</h1> {/* Title at the top */}
          <div className="mb-4"> {/* Margins for spacing */}
            <input
              type="email" // Correct input type for email
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded" // Tailwind styling
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <button
            type="submit"
            className="w-full p-2 bg-pink-500 text-white rounded-xl hover:bg-blue-600 transition-colors" // Responsive and styled button
          >
            Login
          </button>

          <div className="mt-4 text-center"> {/* Center-aligned text */}
            <Link className='text-blue-500 font-semibold' to={'/forgotpassword'}>Forgot Password?</Link> {/* Navigation link */}
          </div>
        </form>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-gray-300 w-1/2 relative"> {/* Visible on larger screens */}
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-600 rounded-full animate-bounce"></div>
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"></div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
