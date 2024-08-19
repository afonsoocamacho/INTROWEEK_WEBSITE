import React, { useState, useEffect } from "react";
import MetaTags from "../components/MetaTags"; // Import the MetaTags component
import Header from "../components/Header";
import "./LeaderBoard.css"; // Updated CSS file name
import PopUpButton from "../components/PopUpButton"; // Import the PopUpButton component
import axios from "axios";

function LeaderBoard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const loggedInTeamID = parseInt(sessionStorage.getItem("teamID"), 10); // Ensure teamID is parsed as an integer

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          "https://introweek-runcmd-website-e0032d4f624f.herokuapp.com/api/leaderboard"
        );
        console.log("Fetched leaderboard data:", response.data); // Debugging log
        setLeaderboard(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  console.log("Logged-in team ID:", loggedInTeamID); // Debugging log

  return (
    <>
      <MetaTags />
      <Header />
      <h1 className="leaderboard-title">Leader board</h1>
      <table className="leaderboard-table">
        <tbody>
          {leaderboard.map((entry, index) => {
            let rowClass = "leaderboard-row";
            console.log("Comparing", entry.Team_ID, "with", loggedInTeamID); // Debugging log
            if (entry.Team_ID === loggedInTeamID)
              rowClass += " highlighted-row"; // Highlight the logged-in team

            return (
              <tr key={index} className={rowClass}>
                <td className="stage-cell">{`Stage ${index + 1}`}</td>
                <td className="team-cell">{entry.Team_name}</td>
                {/*   <td className="points-cell">{entry.Team_points}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      <PopUpButton />
    </>
  );
}

export default LeaderBoard;
