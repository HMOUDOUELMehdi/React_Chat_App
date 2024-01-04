import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";
import Login from "./Main pages/Login";
import Register from "./Main pages/Rogister";
import Home from "./Home pages/Home";
import UserInterface from "./userinterface/userinterface";

export const UserContext = createContext(null);

function App() {
  // Retrieve user data from local storage
  const storedUserData = JSON.parse(localStorage.getItem("userData")) || {
    name: "",
    avatar: "",
    email: "",
    validLogin: false,
  };

  const [userData, setUserData] = useState(storedUserData);
  const UserValues = { userData, setUserData };

  const PrivateRoute = ({ element }) => {
    const isAuthenticated = userData.validLogin;

    useEffect(() => {
      console.log("isAuthenticated: " + isAuthenticated);
    }, [isAuthenticated]);
  
    // Check if the user is authenticated, otherwise, redirect to login
    return isAuthenticated ? element : <Navigate to="/login" replace />;
  };

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <UserContext.Provider value={UserValues}>
      <Router>
        <Routes>
          <Route path="/" element={<UserInterface />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          {/* Pass validLogin as a prop to PrivateRoute */}
          <Route path="home" element={<PrivateRoute element={<Home />} />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
