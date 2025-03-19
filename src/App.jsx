import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import Recruit from "./components/Recruit";
import Welcome from "./components/Welcome";
import Jobs from "./components/Jobs";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
import Profile from "./components/Profile";

// Protected Route Component
// const ProtectedRoute = ({ element }) => {
//   const { isAuthenticated, isLoading } = useAuth0();

//   if (isLoading) return <div>Loading...</div>;
//   return isAuthenticated ? element : <Navigate to="/login" replace />;
// };

// ProtectedRoute.propTypes = {
//   element: PropTypes.element.isRequired, 
// };

const App = () => {
  //const { isLoading } = useAuth0();

  //if (isLoading) return <div>Loading...</div>;

  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recruit" element={<Recruit />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/profile" element={<Route element={<AuthProfile />} />} /> */}
      </Routes>
    </Router>
  );
};

// ✅ Create a separate component for authentication logic
// const AuthHandler = () => {
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       navigate("/login");
//     }
//     myAxios.defaults.headers.common["authorization"] = token;
//     console.log(token);
//   }, [navigate]);

//   return null; // This component doesn’t render anything
// };

export default App;
