import React, { ChangeEvent, useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import JobFilters from './JobFilters';

interface Job {
  job_description: any;
  jobId: string;
  position: string;
  company: string;
  status: string;
  worktype: string;
  location: string;

  file_key?: string;
}

interface JobFormData {
  position: string;
  company: string;
  status: string;
  worktype: string;
  location: string;
  email: string;
  fileUrl?: string;
  job_description: any;
}

interface Filters {
  position: Set<string>;
  worktype: Set<string>;
  status: Set<string>;
  [key: string]: Set<string>;
}

 export const JobLists: React.FC = () => {
  const location = useLocation();
  const [jobId, setJobId] = useState<string | null>(null);
  const email = localStorage.getItem("email") || '';
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editJobId, setEditJobId] = useState<string | null>(null);
  const [formData, setFormData] = useState<JobFormData>({
    position: '',
    company: '',
    status: '',
    worktype: '',
    location: '',
    job_description: '',
    email: email,
    fileUrl: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [filters, setFilters] = useState<Filters>({
    position: new Set<string>(),
    worktype: new Set<string>(),
    status: new Set<string>(),
  });

  useEffect(() => {
    fetchJobs();
  }, [email]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://yvjzn82p2h.execute-api.us-east-1.amazonaws.com/dev/job-get?email=${email}`);
      let jobsData: Job[] = [];

      if (Array.isArray(response.data.jobs)) {
        jobsData = response.data.jobs;
      } else if (typeof response.data === 'object' && response.data !== null) {
        const possibleJobsArray = Object.values(response.data).find(Array.isArray);
        if (possibleJobsArray) {
          jobsData = possibleJobsArray;
        } else {
          throw new Error('No array found in response body');
        }
      } else {
        throw new Error('Unexpected response format');
      }

      setJobs(jobsData);
      setAllJobs(jobsData);
      setError(null);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to fetch jobs. Please try again later.');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleAddSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const base64Content = fileReader.result?.toString().split(',')[1];
        if (base64Content) {
          try {
            await axios.post('https://yvjzn82p2h.execute-api.us-east-1.amazonaws.com/dev/job-create', {
              ...formData,
              file_name: selectedFile.name,
              file_content: base64Content,
            });
            setShowAddForm(false);
            fetchJobs();
            resetForm();
          } catch (error) {
            console.error('Error creating job:', error);
            setError('Failed to create job. Please try again.');
          }
        }
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };


  const handleEditSubmit = async (e: any) => {
    e.preventDefault();
    console.log("sdswss", editJobId);
    console.log(formData, "agsh")
    if (!editJobId) return;
    const cleanJobData = (job: any) => {
      const cleanedData = { ...job };
      for (const key in cleanedData) {
        if (key.trim() === "jobId") {
          cleanedData.jobId = cleanedData[key].trim();
          delete cleanedData[key];
        }
      }

      console.log("cleanedData", cleanedData);

      return cleanedData;
    };

    const cleanedJobData = cleanJobData({ jobId: editJobId });
    // const finalJobId = cleanedJobData.jobId;
    // console.log("finalJobId", editJobId);

    const { email, ...updateData } = formData;

    console.log("{ email, ...updateData }", { email, ...updateData });
    console.log("tyghfh", {
      jobId: editJobId,
      ...updateData // Spread the updateData directly
    })
    try {
      const data = await axios.put('https://yvjzn82p2h.execute-api.us-east-1.amazonaws.com/dev/job-update', {
        jobId: editJobId,
        updateData: { ...updateData } // Spread the updateData directly
      });
      console.log(data.data);
      setShowEditForm(false);
      fetchJobs();
      resetForm();
    } catch (error) {
      console.error('Error updating job:', error);
      setError('Failed to update job. Please try again.');
    }
  };
  const handleDelete = async (job: any) => {
    const cleanJobData = (job: any) => {
      const cleanedData = { ...job };

      for (const key in cleanedData) {
        if (key.trim() === "jobId") {
          cleanedData.jobId = cleanedData[key].trim();
          delete cleanedData[key];
        }
      }

      console.log("cleanedData", cleanedData);


      return cleanedData;
    };
    const jobId = cleanJobData(job)
    console.log("outer", jobId);
    const finalJobId = jobId.jobId
    try {
      const data = await axios.delete('https://yvjzn82p2h.execute-api.us-east-1.amazonaws.com/dev/job-delete', {
        data: { jobId: finalJobId }

      });
      console.log(data.data)
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      setError('Failed to delete job. Please try again.');
    }
  };



  const handleEdit = (job: any) => {
    const cleanJobData = (job: any) => {
      const cleanedData = { ...job };

      for (const key in cleanedData) {
        if (key.trim() === "jobId") {
          cleanedData.jobId = cleanedData[key].trim();
          delete cleanedData[key];
        }
      }

      console.log("cleanedData", cleanedData);

      return cleanedData;
    };

    const cleanedJobData = cleanJobData(job);
    const finalJobId = cleanedJobData.jobId;
    console.log("finalJobId", finalJobId);

    setEditJobId(finalJobId);
    setFormData({
      position: job.position,
      company: job.company,
      status: job.status,
      worktype: job.worktype,
      location: job.location,
      email: job.email, // Assuming you have email in the job object
      job_description: job.job_description,
      fileUrl: job.file_key || ''
    });
    setShowEditForm(true);
  };

  const resetForm = () => {
    setFormData({
      position: '',
      company: '',
      status: '',
      worktype: '',
      location: '',
      email: email,
      fileUrl: '',
      job_description: ''
    });
    setSelectedFile(null);
    setEditJobId(null);
  };

  const handleFilterChange = (category: keyof Filters, value: string) => {
    setFilters(prevFilters => {
      const updatedFilters = new Set(prevFilters[category]);
      if (updatedFilters.has(value)) {
        updatedFilters.delete(value);
      } else {
        updatedFilters.add(value);
      }
      return {
        ...prevFilters,
        [category]: updatedFilters,
      };
    });
  };

  const handleSearchChange = (query: string) => {
    if (query.trim() === '') {
      setJobs(allJobs);
    } else {
      const filteredJobs = allJobs.filter(job =>
        job.position.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.status.toLowerCase().includes(query.toLowerCase()) ||
        job.worktype.toLowerCase().includes(query.toLowerCase()) ||
        job.location.toLowerCase().includes(query.toLowerCase())
      );
      setJobs(filteredJobs);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const positionMatch = filters.position.size === 0 || filters.position.has(job.position);
    const worktypeMatch = filters.worktype.size === 0 || filters.worktype.has(job.worktype);
    const statusMatch = filters.status.size === 0 || filters.status.has(job.status);

    return positionMatch && worktypeMatch && statusMatch;
  });




  return (
    <div className="bg-gray-50 min-h-screen">
      {error && <div className="mb-4 p-4 bg-red-200 text-red-800">{error}</div>}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-600">
        <JobFilters filters={filters} handleFilterChange={handleFilterChange} handleSearchChange={handleSearchChange} />
        <button
          onClick={() => setShowAddForm(true)}
          className="mt-2 ml-2 mb-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Job
        </button>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Position</th>
              <th className="px-6 py-3">Company</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Work Type</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">File</th>
              <th className="px-6 py-3">Actions</th>
             
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center">Loading...</td>
              </tr>
            ) : (
              filteredJobs.map((job) => (
                <tr key={job.jobId} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <td className="px-6 py-4">{job.position}</td>
                  <td className="px-6 py-4">{job.company}</td>
                  <td className="px-6 py-4">{job.status}</td>
                  <td className="px-6 py-4">{job.worktype}</td>
                  <td className="px-6 py-4">{job.location}</td>
                  <td className="px-6 py-4">{job.job_description}</td>
                  <td className="px-6 py-4">
                    {job.file_key ? (
                      <a href={job.file_key} target="_blank" rel="noopener noreferrer" className="text-blue-500">View File</a>
                    ) : 'No file'}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(job)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <form
            onSubmit={handleAddSubmit}
            className="bg-white p-6 rounded shadow-lg"
          >
            <h2 className="text-lg font-semibold mb-4">Add Job</h2>
            <div className="mb-4">
              <label htmlFor="position" className="block text-gray-700">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="company" className="block text-gray-700">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700">Status</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="worktype" className="block text-gray-700">Work Type</label>
              <input
                type="text"
                name="worktype"
                value={formData.worktype}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              {/* <label htmlFor="location" className="block text-gray-700">JobDescription</label>
              <input
                type="text"
                name="location"
                value={formData.job_description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              /> */}
            </div>
            <div className="mb-4">
              <label htmlFor="file" className="block text-gray-700">File</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Job
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="ml-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {showEditForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded shadow-lg"
          >
            <h2 className="text-lg font-semibold mb-4">Edit Job</h2>
            <div className="mb-4">
              <label htmlFor="position" className="block text-gray-700">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="company" className="block text-gray-700">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700">Status</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="worktype" className="block text-gray-700">Work Type</label>
              <input
                type="text"
                name="worktype"
                value={formData.worktype}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              {/* <label htmlFor="location" className="block text-gray-700">Jobdescription</label>
              <input
                type="text"
                name="location"
                value={formData.job_description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              /> */}
            </div>
            <div className="mb-4">
              <label htmlFor="file" className="block text-gray-700">File</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"

            >
              Update Job
            </button>
            <button
              type="button"
              onClick={() => setShowEditForm(false)}
              className="ml-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};