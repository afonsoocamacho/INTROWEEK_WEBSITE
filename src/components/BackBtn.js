import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Menu.css";

function BackBtn() {
  const navigate = useNavigate();

  const handleBackClick = (event) => {
    event.preventDefault();
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <a href="#" onClick={handleBackClick} className="back-link">
      X
    </a>
  );
}

export default BackBtn;
