import React, { createContext, useContext, useState, useEffect } from "react";
import { getFirstItemFromIndexedDB, logoutUser } from "../helpers/indexedDB";

// Create the context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedCredentials = await getFirstItemFromIndexedDB('GoogleCredentialsDB', 'CredentialsStore');
      if (storedCredentials) {
        setProfile(storedCredentials);
        setIsAuthenticated(true);
      }
    };

    checkLoginStatus();
  }, []);

  const logout = () => {
    logoutUser('GoogleCredentialsDB', 'CredentialsStore');
    setIsAuthenticated(false);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier access
export const useAuth = () => useContext(AuthContext);
