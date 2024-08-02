import React, { ChangeEvent } from 'react';

interface JobFiltersProps {
  filters: {
    position: Set<string>;
    worktype: Set<string>;
    status: Set<string>;
  };
  handleFilterChange: (category: string, value: string) => void;
  handleSearchChange: (query: string) => void; // Function to handle search query changes
}

const JobFilters: React.FC<JobFiltersProps> = ({ filters, handleFilterChange, handleSearchChange }) => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearchChange(query);
  };

  return (
    <div className="p-4 bg-gray-600">
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search jobs..."
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div className="flex space-x-6"> {/* Flex container for horizontal layout */}
        <div className="flex-1">
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Work Type</h4>
          <div className="flex flex-wrap space-x-4"> {/* Flex container for row layout */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.worktype.has('Full-time')}
                onChange={() => handleFilterChange('worktype', 'Full-time')}
                className="form-checkbox rounded-full text-blue-600"
              />
              <span>Full-time</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.worktype.has('Part-time')}
                onChange={() => handleFilterChange('worktype', 'Part-time')}
                className="form-checkbox rounded-full text-blue-600"
              />
              <span>Part-time</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.worktype.has('Internship')}
                onChange={() => handleFilterChange('worktype', 'Internship')}
                className="form-checkbox rounded-full text-blue-600"
              />
              <span>Internship</span>
            </label>
            {/* Add more work types as needed */}
          </div>
        </div>
        <div className="flex-1">
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Status</h4>
          <div className="flex flex-wrap space-x-4"> {/* Flex container for row layout */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.status.has('Applied')}
                onChange={() => handleFilterChange('status', 'Applied')}
                className="form-checkbox rounded-full text-blue-600"
              />
              <span>Applied</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.status.has('Interviewing')}
                onChange={() => handleFilterChange('status', 'Interviewing')}
                className="form-checkbox rounded-full text-blue-600"
              />
              <span>Interviewing</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.status.has('Offer')}
                onChange={() => handleFilterChange('status', 'Offer')}
                className="form-checkbox rounded-full text-blue-600"
              />
              <span>Offer</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.status.has('Rejected')}
                onChange={() => handleFilterChange('status', 'Rejected')}
                className="form-checkbox rounded-full text-blue-600"
              />
              <span>Rejected</span>
            </label>
            {/* Add more statuses as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
