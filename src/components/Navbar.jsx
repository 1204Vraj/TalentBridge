import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Briefcase, PlusCircle, User, LogOut } from "lucide-react";

function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/home");
        window.location.reload(); // Refresh to update UI
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <h1
                            className="ml-3 text-2xl font-bold text-gray-900 cursor-pointer"
                            onClick={() => navigate('/home')}
                        >
                            TalentBridge
                        </h1>
                    </div>

                    {/* Centered Navigation Buttons */}
                    <div className="flex space-x-4 items-center absolute left-1/2 transform -translate-x-1/2">
                        <button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                            onClick={() => navigate('/jobs')}
                        >
                            <Briefcase className="w-5 h-5 mr-2" />
                            Browse Jobs
                        </button>

                        {/* Show "Post a Job" only if user is EMPLOYER */}
                        {
                            user ? (
                                user.data?.roleName === "EMPLOYER" && (
                                    <button
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                        onClick={() => navigate('/recruit')}
                                    >
                                        <PlusCircle className="w-5 h-5 mr-2" />
                                        Post a Job
                                    </button>
                                )
                            ) : (
                                <button
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                        onClick={() => navigate('/recruit')}
                                    >
                                        <PlusCircle className="w-5 h-5 mr-2" />
                                        Post a Job
                                    </button>
                            )
                        }
                        
                    </div>

                    {/* Right Side (Login/Register or Profile/Logout) */}
                    <div className="flex space-x-4 items-center">
                        {user ? (
                            <>
                                {/* My Profile Button */}
                                <button
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
                                    onClick={() => navigate('/profile')}
                                >
                                    <User className="w-5 h-5 mr-2" />
                                    My Profile
                                </button>

                                {/* Logout Button */}
                                <button
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="w-5 h-5 mr-2" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Login Button */}
                                <button
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </button>

                                {/* Register Button */}
                                <button
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                    onClick={() => navigate('/register')}
                                >
                                    Register
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
