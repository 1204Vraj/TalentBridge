import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const user = userData?.data || {};

    const [postedJobs, setPostedJobs] = useState([]);

    useEffect(() => {
        const fetchPostedJobs = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/jobs/posted/${user.id}`);
                const jobs = response.data;
    
                if (Array.isArray(jobs)) {
                    setPostedJobs(jobs);
                } else {
                    console.error("Expected an array but got:", jobs);
                    setPostedJobs([]);
                }
            } catch (error) {
                console.error("Error fetching posted jobs:", error);
            }
        };
    
        if (user.roleName === "EMPLOYER") {
            fetchPostedJobs();
        }
    }, [user.id, user.roleName]); 
    

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-5xl mx-auto p-6">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Profile</h2>

                    {/* User Info Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <div>
                            <p className="text-gray-700 text-lg">
                                <strong>Name:</strong> {user.name}
                            </p>
                            <p className="text-gray-700 text-lg">
                                <strong>Email:</strong> {user.email}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-700 text-lg">
                                <strong>Role:</strong> {user.roleName}
                            </p>
                            <p className="text-gray-700 text-lg">
                                <strong>Account Created:</strong> {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {user.roleName === "JOB_SEEKER" ? (
                        <>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Applied Jobs</h3>
                            {user.jobs && user.jobs.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse border border-gray-300 rounded-lg">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="border p-3 text-left">Job Title</th>
                                                <th className="border p-3 text-left">Company</th>
                                                <th className="border p-3 text-left">Location</th>
                                                <th className="border p-3 text-left">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {user.jobs.map((job) => (
                                                <tr key={job.id} className="hover:bg-gray-100">
                                                    <td className="border p-3">{job.jobTitle}</td>
                                                    <td className="border p-3">{job.company}</td>
                                                    <td className="border p-3">{job.location}</td>
                                                    <td className="border p-3 text-green-600 font-medium">Applied</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-600">You haven&apos;t applied for any jobs yet.</p>
                            )}
                        </>
                    ) : user.roleName === "EMPLOYER" ? (
                        <>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Posted Jobs</h3>
                            {Array.isArray(postedJobs) && postedJobs.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse border border-gray-300 rounded-lg">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="border p-3 text-left">Job Title</th>
                                                <th className="border p-3 text-left">Location</th>
                                                <th className="border p-3 text-left">No. of Applicants</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {postedJobs.map((job) => (
                                                <tr key={job.id} className="hover:bg-gray-100">
                                                    <td className="border p-3">{job.jobTitle}</td>
                                                    <td className="border p-3">{job.location}</td>
                                                    <td className="border p-3 text-blue-600 font-medium">
                                                        {job.users ? job.users.length : 0} Applicants
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-600">You haven&apos;t posted any jobs yet.</p>
                            )}
                        </>
                    ) : (
                        <p className="text-gray-600">ADMIN role.</p>
                    )}
                </div>
            </main >
        </div >
    );
};

export default Profile;
