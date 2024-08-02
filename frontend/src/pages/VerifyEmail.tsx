import React, { FormEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../utils/UserPool';
import axios from 'axios'; 
import { toast } from 'react-toastify'; 

export const VerifyEmail: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const name = location.state && location.state.name; 
  const email = location.state && location.state.email; 

  const onSubmitVerification = (event: FormEvent) => {
    event.preventDefault();
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });
    user.confirmRegistration(verificationCode, true, async (err, data) => {
      if (err) {
        console.error("Verification failed:", err);
        return;
      }
      console.log("Verification successful:", data);
      toast.success("Verification successful!"); 
      try {
        const response = await axios.post('https://1ay2z54geb.execute-api.us-east-1.amazonaws.com/dev/registration/signup', {
          name: name,
          email: email
        });

        if (response.status === 200) {
          toast.success("User data stored successfully!");

          navigate('/', { state: { email } });
        } else {
          toast.error("Failed to store user data.");
        }
      } catch (error) {
        console.error('Error storing user data:', error);
        toast.error("Failed to store user data.");
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
    <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md border border-gray-300 dark:border-gray-600 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Verify Email</h2>
      <form onSubmit={onSubmitVerification} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="verificationCode">
            Verification Code:
          </label>
          <input
            id="verificationCode"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            placeholder="Enter your verification code"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Verify
        </button>
      </form>
    </div>
  </div>
  );
};
