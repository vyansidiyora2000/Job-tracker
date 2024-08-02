import React from "react";
import "react-toastify/dist/ReactToastify.css";
import image from "../assets/bg.jpg";
import Navbar from "../components/Navbar";

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div
        className="flex-grow bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="container mx-auto px-4 py-16">
       
            <h1 className="text-4xl text-center font-bold mb-6 text-gray-300">Welcome to Job Tracker</h1>
            <p className="text-xl text-center text-gray-300 mb-8">
              Organize your job search, track applications, and boost your career opportunities.
            </p>
            
          </div>
        </div>
      </div>
    
  );
};