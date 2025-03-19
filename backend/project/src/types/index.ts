export interface User {
  id: number;
  email: string;
  password: string;
  role: 'USER' | 'COMPANY';
  profile?: UserProfile | CompanyProfile;
}

export interface UserProfile {
  id: number;
  fullName: string;
  title: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  resumeUrl?: string;
  profilePicUrl?: string;
}

export interface CompanyProfile {
  id: number;
  name: string;
  description: string;
  location: string;
  industry: string;
  logoUrl?: string;
  website?: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade?: string;
}

export interface Certification {
  id: number;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
}

export interface Job {
  id: number;
  title: string;
  company: CompanyProfile;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  postedDate: string;
  deadline?: string;
  status: 'OPEN' | 'CLOSED';
}

export interface JobApplication {
  id: number;
  job: Job;
  applicant: UserProfile;
  status: 'PENDING' | 'REVIEWED' | 'ACCEPTED' | 'REJECTED';
  appliedDate: string;
}