import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const user = userData?.data || {};
    const navigate = useNavigate();

    const [postedJobs, setPostedJobs] = useState([]);
    const [applicants, setApplicants] = useState([]); // Store applicants for selected job
    const [selectedJobTitle, setSelectedJobTitle] = useState(""); // Store job title
    const [showModal, setShowModal] = useState(false); // Modal state

    useEffect(() => {
        if (user.roleName === "EMPLOYER") {
            axios.get(`http://localhost:8080/api/jobs/posted/${user.id}`)
                .then(response => setPostedJobs(response.data))
                .catch(error => console.error("Error fetching jobs:", error));
        }
    }, [user.id, user.roleName]);

    // Fetch applicants for a job
    const handleViewApplicants = (jobId, jobTitle) => {
        axios.get(`http://localhost:8080/api/jobs/${jobId}/applicants`)
            .then(response => {
                console.log(response);
                setApplicants(response.data);
                setSelectedJobTitle(jobTitle);
                setShowModal(true);
            })
            .catch(error => console.error("Error fetching applicants:", error));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-5xl mx-auto p-6">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Profile</h2>

                    {/* User Info Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <div>
                            <p className="text-gray-700 text-lg"><strong>Name:</strong> {user.name}</p>
                            <p className="text-gray-700 text-lg"><strong>Email:</strong> {user.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-700 text-lg"><strong>Role:</strong> {user.roleName}</p>
                            <p className="text-gray-700 text-lg"><strong>Account Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                        {/* Edit Profile Button for Job Seeker */}
                        {/*{user.roleName === "JOB_SEEKER" && (*/}
                        {/*    <button*/}
                        {/*        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"*/}
                        {/*        onClick={() => navigate("/edit-profile")}*/}
                        {/*    >*/}
                        {/*        Edit Profile*/}
                        {/*    </button>*/}
                        {/*)}*/}
                    </div>

                    {/* Employer: Posted Jobs */}
                    {user.roleName === "EMPLOYER" && (
                        <>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Posted Jobs</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-300 rounded-lg">
                                    <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border p-3 text-left">Job Title</th>
                                        <th className="border p-3 text-left">Location</th>
                                        <th className="border p-3 text-left">No. of Applicants</th>
                                        <th className="border p-3 text-left">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {postedJobs.map((job) => (
                                        <tr key={job.id} className="hover:bg-gray-100">
                                            <td className="border p-3">{job.jobTitle}</td>
                                            <td className="border p-3">{job.location}</td>
                                            <td
                                                className="border p-3 text-blue-600 font-medium cursor-pointer hover:underline"
                                                onClick={() => handleViewApplicants(job.id, job.jobTitle)}
                                            >
                                                {job.users ? job.users.length : 0} Applicants
                                            </td>
                                            <td className="border p-3">
                                                {/*<button*/}
                                                {/*    className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2"*/}
                                                {/*    onClick={() => navigate(`/edit-job/${job.id}`)}*/}
                                                {/*>*/}
                                                {/*    Edit*/}
                                                {/*</button>*/}
                                                <button
                                                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                                                    onClick={() => axios.delete(`http://localhost:8080/api/jobs/${job.id}`)
                                                        .then(() => setPostedJobs(postedJobs.filter(j => j.id !== job.id)))}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </main>

            {/* Modal for Applicants */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg max-w-lg w-full">
                        <h3 className="text-xl font-semibold mb-4">Applicants for {selectedJobTitle}</h3>
                        <ul className="divide-y divide-gray-300">
                            {applicants.length > 0 ? (
                                applicants.map((applicant) => (
                                    <li key={applicant.id} className="p-3">
                                        <p><strong>Name:</strong> {applicant.name}</p>
                                        <p><strong>Email:</strong> {applicant.email}</p>
                                        {/*<p><strong>Applied On:</strong> {new Date(applicant.appliedAt).toLocaleDateString()}</p>*/}
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500">No applicants found.</p>
                            )}
                        </ul>
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md w-full"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
