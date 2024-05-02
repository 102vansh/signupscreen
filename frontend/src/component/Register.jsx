




import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
  const [login, setLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const changeAvatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setAvatar(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!check) {
      toast.error("Please confirm you're not a robot");
      return;
    }

    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirmpassword', confirmpassword);
      formData.append('avatar', avatar);

      const response = await axios.post(
        'http://signupscreen-6.onrender.com/api/v1/user/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      if (response.data) { 
        toast.success('User Registered Successfully');
        navigate('/login');
      } else {
        throw new Error("Registration response is invalid");
      }
    } catch (error) {
      console.error('Registration error:', error.message);

      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4"> 
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
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
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              onChange={changeAvatarHandler}
              className="w-full p-2"
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="notARobot"
              checked={check}
              onChange={(e) => setCheck(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="notARobot">I'm not a robot</label>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-pink-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            {login ? 'Login' : 'Register'}
          </button>
          <p className="text-center mt-4">
            {login ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link to={login ? "/register" : "/login"} className="text-blue-500">
              {login ? "Register" : "Login"}
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-gray-300 w-1/2 relative">
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-600 rounded-full animate-bounce"></div>
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"></div>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
