import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Plants from "./components/Plants";
import Profile from "./components/Profile";
import Forum from "./components/Forum";
import { logout, fetchUserProfile } from "./services/profileApi";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found in localStorage. User is not logged in.");
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        await fetchUserProfile();
        console.log("Token is valid. User is logged in.");
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Token validation failed:", err.message);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Function to handle logout from anywhere (e.g., Navbar)
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-green-700 font-semibold text-lg animate-pulse">
          Loading...
        </div>
      </div>
    );
  return (
    <Router>
      {/* Pass handleLogout to Navbar if it has a logout button */}
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/plants" element={<Plants />} />
        <Route
          path="/forum"
          element={
            isLoggedIn ? (
              <Forum isLoggedIn={isLoggedIn} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <Profile setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* Pass setIsLoggedIn to Login and Register to update state on successful auth */}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
