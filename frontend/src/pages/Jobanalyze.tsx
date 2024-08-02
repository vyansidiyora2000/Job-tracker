// import React, { useState } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';


// const JobAnalyzer: React.FC = () => {
//     const cleanJobData = (job: any) => {
//         const cleanedData = { ...job };
//         for (const key in cleanedData) {
//           if (key.trim() === "jobId") {
//             cleanedData.jobId = cleanedData[key].trim();
//             delete cleanedData[key];
//           }
//         }
//         return cleanedData;
//     };
//     const location = useLocation();
//     const job = cleanJobData(location.state.jobId)
//     const [jobId, setJobId] = useState(job.jobId)
//     // const [jobd, setJobId] = useState(location.state.jobId)
//     // const { jobId, jobDescription } = location.state || {};
    
//     console.log(JSON.stringify(cleanJobData(location.state.jobId)));
    
//     const [jobDescription,setJobDescription] = useState(job.jobDescription);

//   const [result, setResult] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);
//   const API_ENDPOINT = 'https://1ay2z54geb.execute-api.us-east-1.amazonaws.com/dev/job-analyze'; // Replace with your API endpoint

//   async function analyzeJobDescription(jobId: string, jobDescription: string) {
//     try {
//       const response = await axios.post(API_ENDPOINT, {
//         job_id: jobId,
//         job_description: jobDescription
//       });

//       // Parse the JSON string in the response body
//       const parsedData = JSON.parse(response.data.body);
//       return parsedData;
//     } catch (error) {
//       console.error('API Error:', error);
//       throw error;
//     }
//   }

//   const handleAnalyze = async () => {
//     try {
//       const data = await analyzeJobDescription(jobId, jobDescription);
//       setResult(data);
//       setError(null);
//     } catch (error) {
//       setResult(null);
//       setError('Failed to analyze job description');
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen p-4">
//       <h1 className="text-2xl font-bold mb-4">Analyze Job Description</h1>
//       <textarea
//         value={jobDescription}
//         onChange={(e) => setJobDescription(e.target.value)}
//         placeholder="Job Description"
//         className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
//       />
//       <button onClick={handleAnalyze} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//         Analyze
//       </button>
//       {result && (
//         <div className="bg-white shadow-md sm:rounded-lg p-4 mt-4">
//           <h2 className="text-lg font-semibold mb-4">Analysis Result:</h2>
//           <div>
//             <h3 className="text-md font-semibold mt-4">Companies:</h3>
//             <ul className="list-disc pl-6">
//               {result.companies && result.companies.length > 0 ? (
//                 result.companies.map((company: string, index: number) => (
//                   <li key={index}>{company}</li>
//                 ))
//               ) : (
//                 <li>No companies found</li>
//               )}
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-md font-semibold mt-4">Key Phrases:</h3>
//             <ul className="list-disc pl-6">
//               {result.key_phrases && result.key_phrases.length > 0 ? (
//                 result.key_phrases.map((phrase: string, index: number) => (
//                   <li key={index}>{phrase}</li>
//                 ))
//               ) : (
//                 <li>No key phrases found</li>
//               )}
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-md font-semibold mt-4">Qualifications:</h3>
//             <ul className="list-disc pl-6">
//               {result.qualifications && result.qualifications.length > 0 ? (
//                 result.qualifications.map((qualification: string, index: number) => (
//                   <li key={index}>{qualification}</li>
//                 ))
//               ) : (
//                 <li>No qualifications found</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       )}
//       {error && <div className="mb-4 p-4 bg-red-200 text-red-800">{error}</div>}
//     </div>
//   );
// };

// export default JobAnalyzer;
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const JobAnalyzer: React.FC = () => {
  const cleanJobData = (job: any) => {
    const cleanedData = { ...job };
    for (const key in cleanedData) {
      if (key.trim() === "jobId") {
        cleanedData.jobId = cleanedData[key].trim();
        delete cleanedData[key];
      }
    }
    return cleanedData;
  };

  const location = useLocation();
  const job = cleanJobData(location.state.jobId);
  const [jobId, setJobId] = useState(job.jobId);
  const [jobDescription, setJobDescription] = useState(job.jobDescription);

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const API_ENDPOINT = 'https://1ay2z54geb.execute-api.us-east-1.amazonaws.com/dev/job-analyze'; // Replace with your API endpoint

  async function analyzeJobDescription(jobId: string, jobDescription: string) {
    try {
      const response = await axios.post(API_ENDPOINT, {
        job_id: jobId,
        job_description: jobDescription,
      });

      // Parse the JSON string in the response body
      const parsedData = JSON.parse(response.data.body);
      return parsedData;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  const handleAnalyze = async () => {
    try {
      const data = await analyzeJobDescription(jobId, jobDescription);
      setResult(data);
      setError(null);
    } catch (error) {
      setResult(null);
      setError('Failed to analyze job description');
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Analyze Job Description</h1>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Job Description"
        className="w-full px-3 py-2 border border-gray-300 rounded mb-4 dark:bg-gray-800 dark:text-white"
      />
      <button
        onClick={handleAnalyze}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Analyze
      </button>
      {result && (
        <div className="bg-white shadow-md sm:rounded-lg p-4 mt-4 dark:bg-gray-800 dark:text-white">
          <h2 className="text-lg font-semibold mb-4">Analysis Result:</h2>
          <div>
            <h3 className="text-md font-semibold mt-4">Companies:</h3>
            <ul className="list-disc pl-6">
              {result.companies && result.companies.length > 0 ? (
                result.companies.map((company: string, index: number) => (
                  <li key={index}>{company}</li>
                ))
              ) : (
                <li>No companies found</li>
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold mt-4">Key Phrases:</h3>
            <ul className="list-disc pl-6">
              {result.key_phrases && result.key_phrases.length > 0 ? (
                result.key_phrases.map((phrase: string, index: number) => (
                  <li key={index}>{phrase}</li>
                ))
              ) : (
                <li>No key phrases found</li>
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold mt-4">Qualifications:</h3>
            <ul className="list-disc pl-6">
              {result.qualifications && result.qualifications.length > 0 ? (
                result.qualifications.map((qualification: string, index: number) => (
                  <li key={index}>{qualification}</li>
                ))
              ) : (
                <li>No qualifications found</li>
              )}
            </ul>
          </div>
        </div>
      )}
      {error && (
        <div className="mb-4 p-4 bg-red-200 text-red-800">
          {error}
        </div>
      )}
    </div>
  );
};

export default JobAnalyzer;
