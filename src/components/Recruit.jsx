import { useState } from 'react';
import {
    Briefcase,
    DollarSign,
    MapPin,
    Clock,
    Building2,
    GraduationCap,
    Users,
    CheckCircle2
} from 'lucide-react';
import Navbar from './Navbar';
// import { useAuth0 } from "@auth0/auth0-react";

function Recruit() {
    // const { getAccessTokenSilently } = useAuth0();
    const [formData, setFormData] = useState({
        jobTitle: '',
        company: '',
        location: '',
        salary: '',
        jobType: 'full-time',
        experience: 'entry',
        description: '',
        requirements: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Retrieve user details from localStorage
        const user = JSON.parse(localStorage.getItem("user"));
    
        if (!user || user.data.roleName !== "EMPLOYER") {
            alert("Only employers can post jobs.");
            return;
        }
    
        // Include employer_id in job data
        const jobData = {
            ...formData,
            employerId: user.data.id  // Ensure employer_id is included
        };
        
        try {
            const response = await fetch('http://localhost:8080/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${user?.token}`,  
                },
                body: JSON.stringify(jobData),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log('Job posted successfully:', result);
    
                // Reset the form
                setFormData({
                    jobTitle: '',
                    company: '',
                    location: '',
                    salary: '',
                    jobType: 'full-time',
                    experience: 'entry',
                    description: '',
                    requirements: '',
                });
    
                alert('Job posted successfully!');
            } else {
                console.error('Failed to post job:', response.statusText);
                alert('Failed to post job. Please try again.');
            }
        } catch (error) {
            console.error('Error while posting job:', error);
            alert('An error occurred. Please try again.');
        }
    }; 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Navbar></Navbar>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Post a New Job</h2>

                        {/* Benefits Section */}
                        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <Users className="h-6 w-6 text-indigo-600" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-lg font-medium text-gray-900">Reach Qualified Candidates</h3>
                                    <p className="mt-2 text-sm text-gray-500">Connect with professionals actively seeking opportunities.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <CheckCircle2 className="h-6 w-6 text-indigo-600" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-lg font-medium text-gray-900">Easy Job Management</h3>
                                    <p className="mt-2 text-sm text-gray-500">Track applications and manage candidates efficiently.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <GraduationCap className="h-6 w-6 text-indigo-600" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-lg font-medium text-gray-900">Smart Matching</h3>
                                    <p className="mt-2 text-sm text-gray-500">AI-powered matching to find the best candidates.</p>
                                </div>
                            </div>
                        </div>

                        {/* Job Posting Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                                        Job Title
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Briefcase className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="jobTitle"
                                            id="jobTitle"
                                            value={formData.jobTitle}
                                            onChange={handleChange}
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="e.g. Senior Software Engineer"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                                        Company Name
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Building2 className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="company"
                                            id="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Your Company Name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                        Location
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="location"
                                            id="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="e.g. San Francisco, CA"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                                        Salary Range
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <DollarSign className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="salary"
                                            id="salary"
                                            value={formData.salary}
                                            onChange={handleChange}
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="e.g. $80,000 - $120,000"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
                                        Job Type
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Clock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <select
                                            name="jobType"
                                            id="jobType"
                                            value={formData.jobType}
                                            onChange={handleChange}
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option value="full-time">Full-time</option>
                                            <option value="part-time">Part-time</option>
                                            <option value="contract">Contract</option>
                                            <option value="internship">Internship</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                                        Experience Level
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <GraduationCap className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <select
                                            name="experience"
                                            id="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option value="entry">Entry Level</option>
                                            <option value="mid">Mid Level</option>
                                            <option value="senior">Senior Level</option>
                                            <option value="executive">Executive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Job Description
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Describe the role, responsibilities, and ideal candidate..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                                    Requirements
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="requirements"
                                        name="requirements"
                                        rows={4}
                                        value={formData.requirements}
                                        onChange={handleChange}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="List the required skills, qualifications, and experience..."
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Post Job
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Recruit;