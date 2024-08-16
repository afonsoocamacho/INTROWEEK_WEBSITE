import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <h1>
        <Link to="/" className="Logo">
          BEATBLAST
        </Link>
      </h1>
      <div className="hamburger-menu">
        <Link to="/menu" className="Link">
          ☰
        </Link>
      </div>
    </div>
  );
}

export default Header;
