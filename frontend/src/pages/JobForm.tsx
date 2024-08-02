// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';

// interface JobFormData {
//   position: string;
//   company: string;
//   status: string;
//   worktype: string;
//   location: string;
//   email: string; // Add email field
// }

// const JobForm: React.FC = () => {
//   const location = useLocation();

//   // Retrieve user details from location state
  
  
//   const email = localStorage.getItem("email") || ''; 

//   const [formData, setFormData] = useState<JobFormData>({
//     position: '',
//     company: '',
//     status: '',
//     worktype: '',
//     location: '',
//     email: email, // Initialize email with the retrieved value
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       console.log('Form Data:', formData); // Check formData before sending
//       const response = await axios.post('https://7gm1rk55y3.execute-api.us-east-1.amazonaws.com/dev/CRUD', formData);
//       console.log('API Response:', response.data); // Log API response
//       setFormData({
//         position: '',
//         company: '',
//         status: '',
//         worktype: '',
//         location: '',
//         email: email, // Keep email as it is
//       });
//     } catch (error) {
//       console.error('Error creating job:', error);
//       console.log('Error Details:', error); // Log detailed error response if available
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position" required />
//       <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company" required />
//       <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Status" required />
//       <input type="text" name="worktype" value={formData.worktype} onChange={handleChange} placeholder="Work Type" required />
//       <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
//       <input type="hidden" name="email" value={formData.email} /> {/* Hidden field for email */}
//       <button type="submit">Add</button>
//     </form>
//   );
// };

// export default JobForm;
