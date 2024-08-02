import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Accountcontext } from '../context/Account';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import image from "../assets/bg.jpg";

const Navbar: React.FC = () => {
  const { getSession } = useContext(Accountcontext) as {
    getSession: () => Promise<CognitoUserSession>;
  };

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    getSession()
      .then(() => {
        setLoggedIn(true);
      })
      .catch(() => {
        setLoggedIn(false);
      });
  }, [getSession]);

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-300 hover:text-gray-300 transition duration-300">
              JOB TRACKER
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {!loggedIn && (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-lg font-medium transition duration-300"
                >
                  Signup
                </Link>
              </>
            )}
            {loggedIn && (
                  <>
             
              <Link
                  to="/joblist"
               
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300"
                >
                  JobList
                </Link>
                <Link
                to="/userprofile"
                className="bg-gray-700 text-white px-4 py-2 rounded-md text-lg font-medium"
              >
                Profile
              </Link>
              </>
              
            )}
          </div>
        </div>
      </div>
    </nav>
    
  );
};

export default Navbar;