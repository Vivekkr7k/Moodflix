import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Corrected import

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (token) => {
    const decodedUser = jwtDecode(token); // Decode the JWT token
    setUser(decodedUser);
    localStorage.setItem('user', JSON.stringify(decodedUser));
    localStorage.setItem('token', token); // Store the token
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Remove token
  };

  // Optional: Automatically log out if token is expired
  useEffect(() => {
    if (user) {
      const token = localStorage.getItem('token');
      const { exp } = jwtDecode(token);
      const expirationTime = exp * 1000; // Convert to milliseconds
      const timeout = expirationTime - Date.now();

      if (timeout > 0) {
        const timer = setTimeout(() => logout(), timeout);
        return () => clearTimeout(timer);
      } else {
        logout();
      }
    }
  }, [user]);

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
