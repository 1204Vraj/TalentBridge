import React, { useState, useEffect } from 'react';
import { getCompanyProfile, updateCompanyProfile } from '../services/api';
import { CompanyProfile as ICompanyProfile } from '../types';
import { Building2, MapPin, Globe, Briefcase } from 'lucide-react';

function CompanyProfile() {
  const [profile, setProfile] = useState<ICompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Replace 1 with actual company ID from auth context
        const response = await getCompanyProfile(1);
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch company profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!profile) return;

    try {
      // Replace 1 with actual company ID from auth context
      await updateCompanyProfile(1, profile);
      setEditing(false);
    } catch (error) {
      console.error('Failed to update company profile:', error);
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
        <h2 className="text-2xl font-bold text-gray-900">Company not found</h2>
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
              {profile.logoUrl ? (
                <img
                  src={profile.logoUrl}
                  alt={profile.name}
                  className="w-24 h-24 rounded-lg bg-white p-2"
                />
              ) : (
                <div className="w-24 h-24 rounded-lg bg-white p-2 flex items-center justify-center">
                  <Building2 className="w-12 h-12 text-blue-600" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <p className="text-blue-100">{profile.industry}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Company Info */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{profile.location}</span>
              </div>
              {profile.website && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <Globe className="w-5 h-5" />
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {profile.website}
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* Description */}
          <section>
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <p className="text-gray-700 whitespace-pre-line">{profile.description}</p>
          </section>

          {/* Actions */}
          <section className="flex space-x-4">
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Edit Profile
            </button>
            <button
              onClick={() => window.location.href = '/jobs/create'}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Post a Job
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;