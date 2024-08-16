import React from "react";
import Header from "../components/Header";
import "./Staff.css";
import MetaTags from "../components/MetaTags";
import PopUpButton from "../components/PopUpButton";

const profiles = [
  {
    name: "Zwaantje Blümel",
    description: "Introweek Committee Chairwoman",
    imageUrl: "/img/staff/Zwaantje_image.jpg", // Replace with actual image URL
  },
  {
    name: "Anna Pospelov",
    description: "Introweek Committee Vice Chairwoman",
    imageUrl: "img/staff/Anna_image.jpg", // Replace with actual image URL
  },
  {
    name: "Wander Elout",
    description: "Introweek Committee Member",
    imageUrl: "img/staff/Wander_image.jpg", // Replace with actual image URL
  },
  {
    name: "Tim Reyes",
    description: "Introweek Committee Member",
    imageUrl: "img/staff/Tim_image.jpg", // Replace with actual image URL
  },
  {
    name: "Olya Mykhailovska",
    description: "Introweek Committee Member",
    imageUrl: "img/staff/Olya_image.jpg", // Replace with actual image URL
  },
  {
    name: "Chelsea Ohenhen",
    description: "Introweek Committee Member",
    imageUrl: "img/staff/Chelsea_image.jpg", // Replace with actual image URL
  },
  {
    name: "Merijn Logtenberg",
    description: "Introweek Committee Member",
    imageUrl: "img/staff/Merijn_image.jpg", // Replace with actual image URL
  },
  {
    name: "Georgia Nikolaou",
    description: "Introweek Committee Member",
    imageUrl: "img/staff/Gina_image.jpg", // Replace with actual image URL
  },
  {
    name: "Niels Looge",
    description: "Introweek Committee Member",
    imageUrl: "img/staff/Niels_image.jpg", // Replace with actual image URL
  },
  {
    name: "Lene Andersen",
    description: "Introweek Committee Member",
    imageUrl: "img/staff/Lene_image.jpg", // Replace with actual image URL
  },
  {
    name: "Nathalie Schaper",
    description: "Introweek Committee Member",
    imageUrl: "img/staff/Nathalie_image.jpg", // Replace with actual image URL
  },
  {
    name: "Koen van der Stelt",
    description: "Introweek Photographer",
    imageUrl: "img/staff/Koen_image.jpg", // Replace with actual image URL
  },
  {
    name: "Eric Zandhuis",
    description: "Introweek Videographer",
    imageUrl: "img/staff/Eric_image.jpg", // Replace with actual image URL
  },
  {
    name: "Elia Römpler",
    description: "RUN CMD President",
    imageUrl: "img/staff/Elia_image.jpg", // Replace with actual image URL
  },
  {
    name: "Maria Yordanova",
    description: "RUN CMD Secretary",
    imageUrl: "img/staff/Maria_image.jpg", // Replace with actual image URL
  },
  {
    name: "Afonso Camacho",
    description: "RUN CMD Vice President",
    imageUrl: "img/staff/Afonso_image.jpg", // Replace with actual image URL
  },
  {
    name: "Raphael Eigler",
    description: "RUN CMD Treasurer",
    imageUrl: "img/staff/Raphael_image.jpg", // Replace with actual image URL
  },
  // Add more profiles as needed
];

function Staff() {
  return (
    <>
      <MetaTags />
      <Header />
      <h1>Staff</h1>
      <div className="profile-table">
        {profiles.map((profile, index) => (
          <div className="profile-cell" key={index}>
            <div className="profile-image-container">
              <img
                src={profile.imageUrl}
                alt={profile.name}
                className="profile-image"
              />
            </div>
            <div className="profile-text">
              <div className="profile-name">{profile.name}</div>
              <div className="profile-description">{profile.description}</div>
            </div>
          </div>
        ))}
      </div>
      <PopUpButton />
    </>
  );
}

export default Staff;
