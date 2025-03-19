import { useNavigate } from 'react-router-dom';
// import React from 'react';
import {
    Users,
    CheckCircle2,
    GraduationCap,
    Heart,
} from 'lucide-react';
import Navbar from './Navbar';

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar></Navbar>

            {/* Hero Section */}
            <header className="bg-indigo-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Find Your Dream Job or Post Your Opportunity Today!
                    </h1>
                    <p className="text-lg mb-6">
                        Jobify connects professionals and employers seamlessly.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button className="px-6 py-3 text-indigo-600 bg-white font-medium rounded-md shadow-sm hover:bg-gray-100"
                            onClick={() => navigate('/jobs')}>
                            Find Jobs
                        </button>
                        <button className="px-6 py-3 bg-indigo-800 text-white font-medium rounded-md shadow-sm hover:bg-indigo-900"
                            onClick={() => navigate('/recruit')}>
                            Post Jobs
                        </button>
                    </div>
                </div>
            </header>

            {/* Key Features Section */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Jobify?</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <Users className="h-10 w-10 text-indigo-600 mx-auto" />
                            <h3 className="text-lg font-medium text-gray-900 mt-4">Extensive Job Network</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Access thousands of job opportunities across industries.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <CheckCircle2 className="h-10 w-10 text-indigo-600 mx-auto" />
                            <h3 className="text-lg font-medium text-gray-900 mt-4">Verified Employers</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Work with trusted companies and verified recruiters.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <GraduationCap className="h-10 w-10 text-indigo-600 mx-auto" />
                            <h3 className="text-lg font-medium text-gray-900 mt-4">Career Growth</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Find roles that match your skills and aspirations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">What People Are Saying</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <Heart className="h-10 w-10 text-red-600 mx-auto" />
                            <p className="mt-4 text-sm text-gray-700">
                                {"Jobify helped me land my dream role in just a week!"}
                            </p>
                            <h3 className="mt-2 font-medium text-gray-900">- Priya Sharma</h3>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <Heart className="h-10 w-10 text-red-600 mx-auto" />
                            <p className="mt-4 text-sm text-gray-700">
                                {"Posting a job was so easy and I received quality applications fast."}
                            </p>
                            <h3 className="mt-2 font-medium text-gray-900">- Rajesh Mehta</h3>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <Heart className="h-10 w-10 text-red-600 mx-auto" />
                            <p className="mt-4 text-sm text-gray-700">
                                {"The smart matching feature saved me so much time."}
                            </p>
                            <h3 className="mt-2 font-medium text-gray-900">- Aditi Kapoor</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm">&copy; 2025 Jobify. All rights reserved.</p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <a href="#" className="text-sm hover:text-indigo-400">Privacy Policy</a>
                            <a href="#" className="text-sm hover:text-indigo-400">Terms of Service</a>
                            <a href="#" className="text-sm hover:text-indigo-400">Contact Us</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;

// import { useNavigate } from "react-router-dom";
// import {PackageSearch,CircleUser, GlobeLock, SearchIcon} from "lucide-react";
// import "./HomePage.css";

// const HomePage = () => {
//   const navigate = useNavigate();

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   return (
//     <div className="home-container">
//       {/* Navbar Section */}
//       <nav className="navbar">
//         <div className="navbar-left">
//           <h1 className="navbar-title">Jobify</h1>
//           <div className="search-bar">
//             <SearchIcon size={25} color="black"></SearchIcon>
//             <input
//               type="text"
//               placeholder="Search Opportunities"
//               className="search-input"
//             />
//           </div>

//         </div>
//         <div className="navbar-right">
//           <button
//             className="navbar-button"
//             onClick={() => handleNavigation("/jobs")}
//           >
//             Jobs
//           </button>
//           <button
//             className="navbar-button"
//             onClick={() => handleNavigation("/recruit")}
//           >
//             Recruit
//           </button>
//           <button
//             className="navbar-button"
//             onClick={() => handleNavigation("/login")}
//           >
//             Login
//           </button>
//         </div>
//       </nav>
//       {/* Hero Section */}
//       <header className="hero-section">
//         <h1 className="hero-tagline">Discover Your Next Opportunity</h1>
//         <p className="hero-subtext">
//           Connecting talent with opportunities to shape the future.
//         </p>
//         <div className="hero-buttons">
//           <button
//             className="cta-button"
//             onClick={() => handleNavigation("/jobs")}
//           >
//             Find Jobs
//           </button>
//           <button
//             className="cta-button secondary"
//             onClick={() => handleNavigation("/recruit")}
//           >
//             Post Jobs
//           </button>
//         </div>
//       </header>

//       {/* Key Features Section */}
//       <section className="features-section">
//         <h2 className="features-title">Why Choose Us?</h2>
//         <div className="features-box">
//           <div className="feature">
//             <PackageSearch size={80} ></PackageSearch>
//             <h3>Advanced Search Filters</h3>
//             <p>
//               Find your dream job using location, skills, and industry filters.
//             </p>
//           </div>
//           <div className="feature">
//             <CircleUser size={80} ></CircleUser>
//             <h3>Personalized Recommendations</h3>
//             <p>
//               Get job suggestions tailored to your profile and preferences.
//             </p>
//           </div>
//           <div className="feature">
//             <GlobeLock size={80}></GlobeLock>
//             <h3>Secure and Trusted</h3>
//             <p>
//               Your data is safe with us, ensuring a seamless experience.
//             </p>
//           </div>
//         </div>
//       </section>


//       {/* Testimonials Section */}
//       <section className="testimonials-section">
//         <h2 className="testimonials-title">Success Stories</h2>
//         <div className="testimonials-container">
//           <div className="testimonial-card">
//             <p className="testimonial-text">
//               &quot;Thanks to this platform, I landed my dream job in just two weeks!&quot;
//             </p>
//             <span className="testimonial-author">- Rahul, Software Engineer</span>
//           </div>
//           <div className="testimonial-card">
//             <p className="testimonial-text">
//               &quot;As a recruiter, I found the perfect candidates effortlessly.&quot;
//             </p>
//             <span className="testimonial-author">- Priya, HR Manager</span>
//           </div>
//         </div>
//       </section>


//       {/* Footer Section */}
//       <footer className="footer">
//         <div className="footer-links">
//           <a href="/about-us">About Us</a>
//           <a href="/contact">Contact</a>
//           <a href="/privacy-policy">Privacy Policy</a>
//         </div>
//         <p>&copy; 2025 Jobify. All Rights Reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;
