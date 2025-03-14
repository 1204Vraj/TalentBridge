import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../services/api';
import { UserProfile as IUserProfile } from '../types';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

function UserProfile() {
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Replace 1 with actual user ID from auth context
        const response = await getUserProfile(1);
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!profile) return;

    try {
      // Replace 1 with actual user ID from auth context
      await updateUserProfile(1, profile);
      setEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Profile not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center space-x-4">
              {profile.profilePicUrl ? (
                <img
                  src={profile.profilePicUrl}
                  alt={profile.fullName}
                  className="w-24 h-24 rounded-full border-4 border-white"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center">
                  <span className="text-3xl text-gray-500">
                    {profile.fullName.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold">{profile.fullName}</h1>
                <p className="text-blue-100">{profile.title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Skills */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section>
            <div className="flex items-center mb-4">
              <Briefcase className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Experience</h2>
            </div>
            <div className="space-y-4">
              {profile.experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-blue-200 pl-4">
                  <h3 className="font-semibold">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </p>
                  <p className="mt-2 text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <div className="flex items-center mb-4">
              <GraduationCap className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Education</h2>
            </div>
            <div className="space-y-4">
              {profile.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-blue-200 pl-4">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  <p className="text-gray-700">{edu.field}</p>
                  {edu.grade && (
                    <p className="text-sm text-gray-500">Grade: {edu.grade}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section>
            <div className="flex items-center mb-4">
              <Award className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Certifications</h2>
            </div>
            <div className="space-y-4">
              {profile.certifications.map((cert, index) => (
                <div key={index} className="border-l-2 border-blue-200 pl-4">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-gray-600">{cert.issuingOrganization}</p>
                  <p className="text-sm text-gray-500">
                    Issued: {cert.issueDate}
                    {cert.expiryDate && ` · Expires: ${cert.expiryDate}`}
                  </p>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View Credential
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Resume */}
          {profile.resumeUrl && (
            <section>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
              >
                View Resume
              </a>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;