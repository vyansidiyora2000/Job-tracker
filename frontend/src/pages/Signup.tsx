import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserPool from "../utils/UserPool";
import image from "../assets/bg.jpg";

export const Signup: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Basic form validation
    if (!name || !email || !password) {
      toast.error("Please fill out all fields.");
      return;
    }

    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Password validation: at least 8 characters
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    UserPool.signUp(email, password, [], [], (err, data) => {
      if (err) {
        console.error("Signup error:", err);
        toast.error("Signup failed. Please try again.");
        return;
      }
      console.log("Signup successful:", data);
      toast.success("Signup successful!");
      navigate("/verify", { state: { email, name } }); // Navigate to verification page with email state
    });
  };

  return (
     <div 
      className="fixed inset-0 bg-cover bg-center overflow-y-auto"
      style={{backgroundImage: `url(${image})`}}
    >
      <div className="flex justify-center items-center h-full">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300 w-full max-w-sm dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Signup</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-green-600"
            >
              Signup
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  
  );
};
