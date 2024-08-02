// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Accountcontext } from '../context/Account';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const UserProfile: React.FC = () => {
//   const { getSession, logout } = useContext(Accountcontext);
//   const [userProfile, setUserProfile] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       setLoading(true);

//       try {
//         const session = await getSession();
//         const email = session.getIdToken().payload.email;
//         console.log(email)
//         const response = await axios.get(`https://1ay2z54geb.execute-api.us-east-1.amazonaws.com/dev/get-profile?email=${email}`);
//         console.log(response.data)
//         // Check if response status is OK (200)
//         if (response.status === 200) {
//           const userProfileData = response.data;
//           console.log(userProfile)
//           setUserProfile(userProfileData);
//           setError('');
//         } else {
//           setError('Failed to fetch user profile');
//           setUserProfile(null);
//         }
//       } catch (err) {
//         console.error('Error fetching user profile:', err);
//         setError('Error fetching user profile');
//         setUserProfile(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, [getSession]);

//   const handleLogout = async () => {
//     try {
//       await logout();
//       setUserProfile(null);
//       navigate('/login');
//       toast.success('You have been logged out. Please login again.');
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   if (loading) {
//     return <p>Loading user profile...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   if (!userProfile) {
//     return <p>No user profile found.</p>;
//   }

//   return (
//     <div className="ml-4 p-4">
//       <h3 className="text-lg font-bold mb-4">User Profile</h3>
//       <div>
//         <p><strong>Name:</strong> {userProfile.name}</p>
//         <p><strong>Email:</strong> {userProfile.email}</p>
//         {/* Additional fields as needed */}
//         <button onClick={handleLogout} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium">
//           Logout
//         </button>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Accountcontext } from '../context/Account';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile: React.FC = () => {
  const { getSession, logout } = useContext(Accountcontext);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const session = await getSession();
        const email = session.getIdToken().payload.email;
        const response = await axios.get(`https://1ay2z54geb.execute-api.us-east-1.amazonaws.com/dev/get-profile?email=${email}`);
        if (response.status === 200) {
          setUserProfile(response.data);
          setError('');
        } else {
          setError('Failed to fetch user profile');
          setUserProfile(null);
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Error fetching user profile');
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [getSession]);

  const handleLogout = async () => {
    try {
      await logout();
      setUserProfile(null);
      navigate('/login');
      toast.success('You have been logged out. Please login again.');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-800">
      <p className="text-gray-700 dark:text-white">Loading user profile...</p>
    </div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-800">
      <p className="text-red-500 dark:text-red-400">Error: {error}</p>
    </div>;
  }

  if (!userProfile) {
    return <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-800">
      <p className="text-gray-700 dark:text-white">No user profile found.</p>
    </div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md border border-gray-300 dark:border-gray-600 w-full max-w-md">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">User Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-white text-lg font-bold mb-2">Name: {userProfile.name}</label>
           
          </div>
          <div>
            <label className="block text-gray-700 dark:text-white text-lg font-bold mb-2">Email:   {userProfile.email}</label>
           
          </div>
          <button 
            onClick={handleLogout} 
            className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-green-600 transition duration-300 mt-6"
          >
            Logout
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UserProfile;