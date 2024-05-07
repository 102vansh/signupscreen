// import React, { useState } from 'react';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// const Forgot = () => {
//   const [email, setEmail] = useState('');
// const navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://signupscreen-6.onrender.com/api/v1/user/forgotpassword', { email });
//       toast.success('Password reset link sent to your email');
//       navigate('/newpass')
//     } catch (error) {
//       console.error('Error sending reset link:', error);
//       toast.error('Failed to send reset link');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <form className="w-full max-w-sm" onSubmit={handleSubmit}>
//         <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
//         <div className="mb-4">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full p-2 bg-pink-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
//         >
//           Reset Password
//         </button>
//       </form>
//       <Toaster />
//     </div>
//   );
// };

// export default Forgot;

import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://signupscreen-6.onrender.com/api/v1/user/forgotpassword', { email });
      toast.success('Password reset link sent to your email');
      navigate('/login'); // After sending the reset link, direct to the login page
    } catch (error) {
      console.error('Error sending reset link:', error);
      toast.error('Failed to send reset link');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen px-4 md:px-8 lg:px-12"> {/* Responsive padding */}
      <form className="w-full max-w-sm" onSubmit={handleSubmit}> {/* Limit width to avoid overflow */}
        <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2> {/* Title at the top */}
        <div className="mb-4"> {/* Add spacing between elements */}
          <input
            type="email" // Email input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded" // Border and padding
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-pink-500 text-white rounded-xl hover:bg-blue-600 transition-colors" // Button styles
        >
          Reset Password
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default Forgot;
