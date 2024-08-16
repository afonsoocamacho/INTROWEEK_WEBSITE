import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div>
      <div className="BeatBlast404">BeatBlast</div>
      <div className="not-found-container">
        <h1>404</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/login" className="home-link">
          Go to Log In
        </Link>
      </div>
    </div>
  );
};

export default NotFound; // Ensure this line is present
