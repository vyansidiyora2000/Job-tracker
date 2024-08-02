import React, { FormEvent, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Accountcontext } from "../context/Account";

const ConfirmPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const { confirmPassword } = useContext(Accountcontext) as {
    confirmPassword: (
      email: string,
      code: string,
      newPassword: string
    ) => Promise<void>;
  };
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await confirmPassword(email, code, newPassword);
      navigate("/login"); // Navigate to login page after successful password reset
    } catch (error) {
      console.error("Error in confirming new password:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white-100">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300 w-full max-w-sm mt-20">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Verification Code:
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              New Password:
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmPassword;
