import React from "react";
import "./Menu.css"; // Import the header.css file
import { Link } from "react-router-dom";
import MetaTags from "../components/MetaTags"; // Import the MetaTags component
import BackBtn from "../components/BackBtn";

function Menu() {
  return (
    <div className="Menu">
      <MetaTags />
      <div className="header">
        <h1>
          <Link to="/" className="Logo">
            BEATBLAST
          </Link>
        </h1>
        <div className="hamburger-menu">
          <BackBtn />
        </div>
      </div>
      <div>
        <ul>
          <li>
            <Link to="/UploadPortal" className="Link">
              Upload Portal
            </Link>
          </li>
          <li>
            <Link to="/EventSchedule" className="Link">
              Event Schedule
            </Link>
          </li>
          <li>
            <Link to="/LeaderBoard" className="Link">
              Leader Board
            </Link>
          </li>
          <li>
            <a
              href="https://newuniversity-my.sharepoint.com/:f:/r/personal/zwaantje_blumel_student_nhlstenden_com/Documents/Introweek%20pictures/Student%20uploads?csf=1&web=1&e=MHm7xA"
              target="_blank"
              className="Link"
              rel="noreferrer"
            >
              Photo Drive
            </a>
          </li>
          <li>
            <Link to="/Staff" className="Link">
              Staff
            </Link>
          </li>
        </ul>
        <button className="btn-emergency">
          <a href="tel:0031616691054">Emergency</a>
        </button>
      </div>
    </div>
  );
}

export default Menu;
