import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import Recruit from "./components/Recruit";
import Welcome from "./components/Welcome";
import Jobs from "./components/Jobs";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
import Profile from "./components/Profile";
// import EditProfile from "./components/EditProfile"; // Import EditProfile component
// import EditJob from "./components/EditJob"; // Import EditJob component

const App = () => {
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
                {/*<Route path="/edit-profile" element={<EditProfile />} />  /!* Changed route *!/*/}
                {/*<Route path="/edit-job/:jobId" element={<EditJob />} />  /!* Dynamic job edit *!/*/}
            </Routes>
        </Router>
    );
};

export default App;
