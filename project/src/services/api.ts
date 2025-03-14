import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth endpoints
export const login = (email: string, password: string) => 
  api.post('/auth/login', { email, password });

export const register = (email: string, password: string, role: string) =>
  api.post('/auth/register', { email, password, role });

// User profile endpoints
export const getUserProfile = (userId: number) =>
  api.get(`/users/${userId}/profile`);

export const updateUserProfile = (userId: number, profileData: any) =>
  api.put(`/users/${userId}/profile`, profileData);

// Company profile endpoints
export const getCompanyProfile = (companyId: number) =>
  api.get(`/companies/${companyId}`);

export const updateCompanyProfile = (companyId: number, profileData: any) =>
  api.put(`/companies/${companyId}`, profileData);

// Job endpoints
export const getJobs = (filters?: any) =>
  api.get('/jobs', { params: filters });

export const getJobById = (jobId: number) =>
  api.get(`/jobs/${jobId}`);

export const createJob = (jobData: any) =>
  api.post('/jobs', jobData);

export const updateJob = (jobId: number, jobData: any) =>
  api.put(`/jobs/${jobId}`, jobData);

// Job applications
export const applyForJob = (jobId: number, userId: number) =>
  api.post(`/jobs/${jobId}/applications`, { userId });

export const getJobApplications = (jobId: number) =>
  api.get(`/jobs/${jobId}/applications`);

export const updateApplicationStatus = (applicationId: number, status: string) =>
  api.put(`/applications/${applicationId}`, { status });

export default api;