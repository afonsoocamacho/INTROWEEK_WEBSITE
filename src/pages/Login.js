import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import MetaTags from "../components/MetaTags";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Login = () => {
  const [teamName, setTeamName] = useState("");
  const [teamPass, setTeamPass] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const storedTeamName = localStorage.getItem("teamName");
    const storedTeamType = localStorage.getItem("teamType");
    const storedTeamID = localStorage.getItem("teamID");
    const loginTimestamp = localStorage.getItem("loginTimestamp");
    const expirationTime = 30 * 60 * 1000; // 1 minute in milliseconds, adjust as needed

    if (storedTeamName && storedTeamType && storedTeamID && loginTimestamp) {
      const currentTime = new Date().getTime();
      if (currentTime - loginTimestamp < expirationTime) {
        login({
          teamName: storedTeamName,
          teamType: storedTeamType,
          teamID: storedTeamID,
        });
        navigate(storedTeamType === "admin" ? "/adminreview" : "/");
      } else {
        // Clear local storage if the login has expired
        localStorage.clear();
      }
    }
  }, [login, navigate]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && teamName && teamPass) {
        handleLogin();
      }
    };

    // Add event listener
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [teamName, teamPass]); // Dependency array includes teamName and teamPass

  const handleLogin = async () => {
    try {
      console.log("Sending login request...");
      const response = await axios.post(
        "https://introweek-runcmd-website-e0032d4f624f.herokuapp.com/api/login",
        {
          teamName,
          teamPass,
        }
      );

      console.log("Response from server:", response.data);

      const { teamID, teamName: serverTeamName, teamType } = response.data;

      if (!teamID || !serverTeamName || !teamType) {
        throw new Error("Missing required data from server");
      }

      const currentTime = new Date().getTime();

      // Store data in local storage
      localStorage.setItem("teamName", serverTeamName);
      localStorage.setItem("teamType", teamType);
      sessionStorage.setItem("teamID", JSON.stringify(teamID));
      localStorage.setItem("loginTimestamp", currentTime);

      console.log("Stored teamID:", sessionStorage.getItem("teamID")); // Debug log
      let storedTeamID = sessionStorage.getItem("teamID");

      if (storedTeamID) {
        let teamID = JSON.parse(storedTeamID);
        console.log(teamID);
      }

      login({ teamName: serverTeamName, teamType, teamID });

      if (teamType === "admin") {
        navigate("/adminreview");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Incorrect team name or password");
    }
  };

  return (
    <div className="logpage">
      <MetaTags />
      <div className="login-container">
        <img
          src="/img/beatblast_logo.png"
          alt="Beatblast Logo"
          className="login-logo"
        />
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Team Password"
          value={teamPass}
          onChange={(e) => setTeamPass(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
