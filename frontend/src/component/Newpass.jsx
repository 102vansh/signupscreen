


import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Newpass = () => {
  const { token } = useParams(); // Get token from URL parameters
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await axios.post(
        `http://localhost:8000/api/v1/user/changepasswod/${token}`,
        {
          token,
          newPassword,
        }
      );
      toast.success('Password reset successful');
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Failed to reset password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen px-4 md:px-8 lg:px-12"> {/* Responsive padding */}
      <form className="w-full max-w-sm" onSubmit={handleSubmit}> {/* Restrict width on larger screens */}
        <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2> {/* Centered title */}
        <div className="mb-4"> {/* Spacing between form elements */}
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded" // Tailwind styling
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded" // Consistent input styling
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-pink-500 text-white rounded-xl hover:bg-blue-600 transition-colors" // Transition for hover effect
        >
          Reset Password
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default Newpass;
