import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">TalentBridge</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/jobs" className="text-gray-600 hover:text-blue-600">Jobs</Link>
            <Link to="/companies" className="text-gray-600 hover:text-blue-600">Companies</Link>
            <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;