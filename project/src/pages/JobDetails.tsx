import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById, applyForJob } from '../services/api';
import { Job } from '../types';
import { MapPin, Building2, Clock, Calendar, ExternalLink } from 'lucide-react';

function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(Number(id));
        setJob(response.data);
      } catch (error) {
        console.error('Failed to fetch job details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  const handleApply = async () => {
    if (!job) return;

    setApplying(true);
    try {
      // Replace 1 with actual user ID from auth context
      await applyForJob(job.id, 1);
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Failed to submit application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Job not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center text-gray-600">
              <Building2 className="w-5 h-5 mr-2" />
              <span>{job.company.name}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{new Date(job.postedDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="mb-8">
          <button
            onClick={handleApply}
            disabled={applying || job.status !== 'OPEN'}
            className={`w-full md:w-auto px-8 py-3 rounded-md font-semibold ${
              job.status === 'OPEN'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {applying ? 'Applying...' : job.status === 'OPEN' ? 'Apply Now' : 'Position Closed'}
          </button>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Job Description</h2>
          <div className="prose max-w-none">
            {job.description.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Requirements</h2>
          <ul className="list-disc list-inside space-y-2">
            {job.requirements.map((requirement, index) => (
              <li key={index} className="text-gray-600">
                {requirement}
              </li>
            ))}
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">About the Company</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-start space-x-4">
              {job.company.logoUrl && (
                <img
                  src={job.company.logoUrl}
                  alt={job.company.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold">{job.company.name}</h3>
                <p className="text-gray-600 mb-4">{job.company.description}</p>
                {job.company.website && (
                  <a
                    href={job.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;