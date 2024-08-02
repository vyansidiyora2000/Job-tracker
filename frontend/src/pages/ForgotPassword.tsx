import React, { FormEvent, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Accountcontext } from "../context/Account";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const { forgotPassword } = useContext(Accountcontext) as {
    forgotPassword: (email: string) => Promise<void>;
  };
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await forgotPassword(email);
      navigate("/confirm-password"); // Navigate to confirm password page
    } catch (error) {
      console.error("Error in sending password reset code:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white-100">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300 w-full max-w-sm mt-20">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Send Reset Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
