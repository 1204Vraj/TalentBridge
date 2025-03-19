import PropTypes from "prop-types";
import { Briefcase, MapPin, DollarSign, User } from "lucide-react";
import axios from "axios"; 
import { toast } from "react-toastify"; 

const JobList = ({ jobListings }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.data?.id; 

  const handleApply = async (job) => {
    if (!userId) {
      toast.error("User not found. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/user/${userId}/apply/${job.id}`
      );

      if (response.status === 200) {
        const updatedUser = {
          ...user,
          data: {
            ...user.data,
            jobs: [...(user.data.jobs || []), job], 
          },
        };

        localStorage.setItem("user", JSON.stringify(updatedUser)); 
        alert("Successfully applied for the job!");
        toast.success("Successfully applied for the job!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.error(error.response?.data?.message || "Failed to apply for job.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      {jobListings.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found</p>
      ) : (
        jobListings.map((job) => {
          const hasApplied = user?.data?.jobs?.some((appliedJob) => appliedJob.id === job.id);

          return (
            <div
              key={job.id}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-6 max-w-2xl mx-auto hover:shadow-xl transition"
            >
              {/* ✅ Header - Job Title & Job Type Badge */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{job.jobTitle}</h3>
                  <p className="text-gray-600 font-medium mt-1 flex items-center gap-2">
                    <Briefcase size={16} /> {job.company}
                  </p>
                  <p className="text-gray-500 flex items-center gap-2 mt-1">
                    <MapPin size={16} /> {job.location}
                  </p>
                </div>

                {/* ✅ Job Type + Experience + Salary (aligned to the right) */}
                <div className="text-right">
                  <span className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full capitalize">
                    {job.jobType}
                  </span>
                  <p className="text-gray-700 mt-2 flex items-center justify-end gap-2 text-sm">
                    <User size={16} className="text-indigo-600" /> <strong>Exp. :</strong> {job.experience} Level
                  </p>
                  <p className="text-gray-700 flex items-center justify-end gap-2 text-sm">
                    <DollarSign size={16} className="text-green-600" /> <strong>Salary:</strong> ${job.salary}
                  </p>
                </div>
              </div>

              {/* ✅ Job Description */}
              <p className="text-gray-700 mt-4 text-sm leading-relaxed">{job.description}</p>

              {/* ✅ Requirements */}
              {job.requirements && (
                <div className="mt-4">
                  <strong className="text-gray-800">Requirements:</strong>
                  <ul className="list-disc ml-6 text-gray-600 text-sm">
                    {Array.isArray(job.requirements) ? (
                      job.requirements.map((req, i) => <li key={i}>{req}</li>)
                    ) : (
                      <li>{job.requirements}</li>
                    )}
                  </ul>
                </div>
              )}

              {/* ✅ Apply Button - Disabled if user has already applied */}
              <button
                className={`mt-6 w-full py-2.5 rounded-lg font-semibold transition ${
                  hasApplied
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
                onClick={() => handleApply(job)}
                disabled={hasApplied}
              >
                {hasApplied ? "Already Applied" : "Apply Now"}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

JobList.propTypes = {
  jobListings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      jobTitle: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      experience: PropTypes.string.isRequired,
      jobType: PropTypes.string.isRequired,
      requirements: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
      salary: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default JobList;
