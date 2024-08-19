import React, { useState } from "react";
import MetaTags from "../components/MetaTags";
import Header from "../components/Header";
import "./EventSchedule.css"; // Import the CSS file
import PopUpButton from "../components/PopUpButton"; // Import the PopUpButton component

const EventSchedule = () => {
  const [day, setDay] = useState(1);

  const handleNextDay = () => {
    if (day < 3) setDay(day + 1);
  };

  const handlePreviousDay = () => {
    if (day > 1) setDay(day - 1);
  };

  const schedules = {
    1: [
      {
        time: "9:00",
        activity: "Meet & Greet",
        description: "NHL Stenden campus",
      },
      {
        time: "9:30",
        activity: "Act 1: Treasure Hunt",
        description: "Through City Center to Campsite",
      },
      {
        time: "13:00",
        activity: "Arrival, Set-Up Camp",
        description: "Campsite",
      },
      {
        time: "14:30",
        activity: "Festival Opener",
        description: "Welcome & Infos",
      },
      {
        time: "15:00",
        activity: "Act 2: Band Creation",
        description: "Once done take Band Picture",
      },
      { time: "18:00", activity: "Dinner", description: "" },
      {
        time: "19:30",
        activity: "Hello from RUN-CMD",
        description: "Presentation",
      },
      {
        time: "20:00",
        activity: "Act 3: Quiz Night",
        description: "By Vincent & Paul",
      },
    ],
    2: [
      {
        time: "8:00",
        activity: "Breakfast",
        description: "",
      },
      {
        time: "9:00",
        activity: "Intro Day 2",
        description: "Lineup Updates",
      },
      {
        time: "10:00",
        activity: "Act 4: Music Video",
        description: "Once done, free time and extra activities",
      },
      {
        time: "12:30",
        activity: "Lunch",
        description: "",
      },
      {
        time: "13:30",
        activity: "Act 5: Tournament",
        description: "Wear sports clothing",
      },
      {
        time: "16:00",
        activity: "Free time",
        description: "Time for Extra Activities",
      },
      {
        time: "18:00",
        activity: "Dinner",
        description: "",
      },
      {
        time: "19:00",
        activity: "Act 6: Festival Contest",
        description: "Beatblast",
      },
      {
        time: "20:00",
        activity: "Act 7: Karaoke & Secret Act",
        description: "Beatblast",
      },
    ],
    3: [
      {
        time: "8:00",
        activity: "Breakfast",
        description: "",
      },
      {
        time: "9:00",
        activity: "Morning Swim",
        description: "Canal",
      },
      {
        time: "10:00",
        activity: "Final Act: Fan Letters",
        description: "Surprises",
      },
      {
        time: "11:30",
        activity: "Final Announcement",
        description: "Closing Ceremony",
      },
      {
        time: "12:00",
        activity: "Pack ’N Go",
        description: "Bye-Bye Beatblast!",
      },
      {
        time: "20:00",
        activity: "Pub Crawl",
        description: "Afterparty in City Center",
      },
    ],
  };

  return (
    <>
      <MetaTags />
      <Header />
      <div className="schedule-body">
        <div className="schedule-header">
          <button
            className={`arrow-button ${day === 1 ? "disabled-arrow" : ""}`}
            onClick={handlePreviousDay}
            disabled={day === 1}
          >
            &#8592;
          </button>
          <h1>Line Up</h1>
          <div className="day-indicator">Day {day}</div>
          <button
            className={`arrow-button ${day === 3 ? "disabled-arrow" : ""}`}
            onClick={handleNextDay}
            disabled={day === 3}
          >
            &#8594;
          </button>
        </div>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Activity</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {schedules[day].map((entry, index) => (
              <tr key={index}>
                <td>{entry.time}</td>
                <td>{entry.activity}</td>
                <td>{entry.description}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="3"></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <PopUpButton />
    </>
  );
};

export default EventSchedule;
