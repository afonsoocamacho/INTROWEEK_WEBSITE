// src/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const storedTeam = localStorage.getItem("teamInfo");
    if (storedTeam) {
      setTeam(JSON.parse(storedTeam));
    }
  }, []);

  const login = (teamData) => {
    setTeam(teamData);
    localStorage.setItem("teamInfo", JSON.stringify(teamData));
  };

  const logout = () => {
    setTeam(null);
    localStorage.removeItem("teamInfo");
  };

  return (
    <AuthContext.Provider value={{ team, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
