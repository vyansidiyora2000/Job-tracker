import React, { FormEvent, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Accountcontext } from "../context/Account";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls
import image from "../assets/bg.jpg";

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const context = useContext(Accountcontext);

  if (!context) {
    throw new Error("Accountcontext must be used within an AccountProvider");
  }

  const { authenticate } = context;

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      // Authenticate user using Cognito
      await authenticate(email, password);
      
      // Fetch additional user details from DynamoDB
      const response = await axios.get(`https://1ay2z54geb.execute-api.us-east-1.amazonaws.com/dev/get-profile?email=${email}`);
      console.log(response)
      // Assuming response.data contains user profile data like name
      const userProfile = response.data.body;

      console.log("User authenticated");
      localStorage.setItem("email",email);
      navigate('/', { state: { email, userProfile } });
      // Navigate to home or another protected page with user profile data
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  return (
   
    <div className="fixed inset-0 bg-white  overflow-y-auto">
       <div 
    className="fixed inset-0 bg-cover bg-center overflow-y-auto"
    style={{backgroundImage: `url(${image})`}}
  >
    <div className="flex justify-center items-center h-full">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300 w-full max-w-sm dark:bg-gray-800">
        <h2 className="text-2xl dark:text-white font-bold mb-6 text-center">Login</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-green-600"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-700 dark:text-white">Forgot your password? </span>
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Reset Password
          </Link>
        </div>
      </div>
    </div>
  </div>
  </div>

  );
};
