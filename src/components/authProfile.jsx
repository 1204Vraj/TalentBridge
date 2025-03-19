import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from './Navbar';
import { User, Mail, Briefcase } from 'lucide-react';

function AuthProfile() {
  const { getAccessTokenSilently } = useAuth0();
    const { user, isAuthenticated } = useAuth0();
    const [role, setRole] = useState(null);
    const [myApplications, setMyApplications] = useState([]);
    const [jobApplicants, setJobApplicants] = useState([]);
    const [isSelectingRole, setIsSelectingRole] = useState(false);
    
    useEffect(() => {
      const fetchUserRole = async () => {
          if (isAuthenticated && user) {
              try {
                  const token = await getAccessTokenSilently();
                  console.log("Fetched Token:", token);  // Debugging
  
                  const response = await fetch(`http://localhost:8080/api/user/${user.email}`, {
                      method: 'GET',
                      headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`,
                      },
                  });
  
                  if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                  }
  
                  const text = await response.text(); // Read response as text first
                  const data = text ? JSON.parse(text) : {}; // Parse JSON only if text exists
  
                  if (data.role) {
                      setRole(data.role);
                  } else {
                      setIsSelectingRole(true);
                  }
              } catch (error) {
                  console.error("Error fetching user role:", error);
              }
          }
      };
      
      if(user.email) fetchUserRole();
  }, [isAuthenticated, user, getAccessTokenSilently, user.email]);

  const handleRoleSelection = async (selectedRole) => {
    try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`http://localhost:8080/api/set-role`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ email: user.email, role: selectedRole }),
        });

        if (response.ok) {
            setRole(selectedRole);
            setIsSelectingRole(false);
        } else {
            console.error("Failed to set role:", response.statusText);
        }
    } catch (error) {
        console.error("Error setting role:", error);
    }
};

useEffect(() => {
  const fetchApplications = async () => {
      if (role === "job_seeker") {
          try {
              const token = await getAccessTokenSilently();
              const response = await fetch(`http://localhost:8080/api/my-applications/${user.email}`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                  },
              });

              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const data = await response.json();
              setMyApplications(data);
          } catch (error) {
              console.error("Error fetching applications:", error);
          }
      }
  };

  fetchApplications();
}, [role, user.email, getAccessTokenSilently]);

useEffect(() => {
  const fetchJobApplicants = async () => {
      if (role === "employer") {
          try {
              const token = await getAccessTokenSilently();
              const response = await fetch(`http://localhost:8080/api/job-applicants/${user.email}`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                  },
              });

              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const data = await response.json();
              setJobApplicants(data);
          } catch (error) {
              console.error("Error fetching job applicants:", error);
          }
      }
  };

  fetchJobApplicants();
}, [role, user.email, getAccessTokenSilently]);


    if (!isAuthenticated) {
        return <p className="text-center text-gray-500 text-lg mt-10">Please log in to view your profile.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h2>

                    {isSelectingRole ? (
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-700">Select Your Role</h3>
                            <button 
                                className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 mx-2"
                                onClick={() => handleRoleSelection("job_seeker")}
                            >
                                Job Seeker
                            </button>
                            <button 
                                className="bg-green-600 text-white px-4 py-2 rounded-md mt-4 mx-2"
                                onClick={() => handleRoleSelection("employer")}
                            >
                                Employer
                            </button>
                        </div>
                    ) : (
                        <p className="text-lg"></p>
                    )}
                    
                    {/* Profile Overview */}
                    <div className="flex items-center space-x-6 mb-6">
                        <img src={user.picture} alt="Profile" className="w-20 h-20 rounded-full border-2 border-indigo-500" />
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <User className="h-6 w-6 text-indigo-600" />
                            <span className="ml-3 text-gray-700 text-lg">Full Name: <strong>{user.name}</strong></span>
                        </div>
                        <div className="flex items-center">
                            <Mail className="h-6 w-6 text-indigo-600" />
                            <span className="ml-3 text-gray-700 text-lg">Email: <strong>{user.email}</strong></span>
                        </div>
                        <div className="flex items-center">
                            <Briefcase className="h-6 w-6 text-indigo-600" />
                            <span className="ml-3 text-gray-700 text-lg">Role: <strong>{role}</strong></span>
                        </div>
                    </div>

                    {/* Job Seeker Applications */}
                    {role === "job_seeker" && (
                        <div className="mt-10">
                            <h3 className="text-2xl font-semibold text-gray-900">My Applications</h3>
                            {myApplications.length > 0 ? (
                                <ul className="mt-4">
                                    {myApplications.map((job, index) => (
                                        <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm mb-2">
                                            <p className="text-lg font-medium">{job.title}</p>
                                            <p className="text-gray-600">{job.company}</p>
                                            <p className="text-gray-500">{job.status}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 mt-2">You have not applied to any jobs yet.</p>
                            )}
                        </div>
                    )}

                    {/* Employer Job Applicants */}
                    {role === "employer" && (
                        <div className="mt-10">
                            <h3 className="text-2xl font-semibold text-gray-900">Job Applicants</h3>
                            {jobApplicants.length > 0 ? (
                                jobApplicants.map((job, index) => (
                                    <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
                                        <h4 className="text-lg font-medium">{job.title}</h4>
                                        <ul className="mt-2">
                                            {job.applicants.map((applicant, i) => (
                                                <li key={i} className="border-t py-2">
                                                    <p className="text-gray-900 font-medium">{applicant.name}</p>
                                                    <p className="text-gray-600">{applicant.email}</p>
                                                    <p className="text-gray-500">{applicant.resume}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 mt-2">No applicants yet.</p>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default AuthProfile;