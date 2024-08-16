import React, { useState, useEffect } from "react";
import "./AdminReview.css";
import axios from "axios";

const API_URL = "http://localhost:8000";

const AdminReview = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [tasks, setTasks] = useState([]);
  const [totalApprovedPoints, setTotalApprovedPoints] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/teams`);
        setTeams(response.data);
        if (response.data.length > 0) {
          setSelectedTeam(response.data[0].Team_ID);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, []);

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (selectedTeam) {
        try {
          const response = await axios.get(
            `${API_URL}/api/submissions/${selectedTeam}`
          );

          console.log("Fetched tasks:", response.data); // Debugging log

          const initializedTasks = response.data.map((task) => ({
            ...task,
            Given_points:
              task.Given_points !== null && task.Given_points !== undefined
                ? task.Given_points
                : task.Task_points, // Initialize Given_points with Task_points if not set
          }));

          console.log("Initialized tasks:", initializedTasks); // Debugging log

          setTasks(initializedTasks);
        } catch (error) {
          console.error("Error fetching submissions:", error);
        }
      }
    };

    const fetchTeamPoints = async () => {
      if (selectedTeam) {
        try {
          const response = await axios.get(
            `${API_URL}/api/team-points/${selectedTeam}`
          );
          setTotalApprovedPoints(response.data.teamPoints);
        } catch (error) {
          console.error("Error fetching team points:", error);
        }
      }
    };

    fetchSubmissions();
    fetchTeamPoints();
  }, [selectedTeam]);

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handlePointsChange = (taskId, points) => {
    const updatedTasks = tasks.map((task) =>
      task.Submission_ID === taskId
        ? { ...task, Given_points: parseInt(points) || task.Task_points }
        : task
    );
    setTasks(updatedTasks);
  };

  const handleApproval = async (taskId, approval) => {
    const updatedTasks = tasks.map((task) => {
      if (task.Submission_ID === taskId) {
        return {
          ...task,
          Confirmed: true,
          Aprove: approval, // Update the Aprove field based on the approval status
          Given_points: approval ? task.Given_points : task.Task_points,
        };
      }
      return task;
    });

    setTasks(updatedTasks);

    try {
      await axios.put(`${API_URL}/api/submissions/${taskId}`, {
        givenPoints: approval
          ? tasks.find((task) => task.Submission_ID === taskId).Given_points
          : 0,
        confirmed: true,
        aprove: approval,
      });

      const response = await axios.get(
        `${API_URL}/api/team-points/${selectedTeam}`
      );
      setTotalApprovedPoints(response.data.teamPoints);
    } catch (error) {
      console.error("Error updating submission:", error);
    }
  };

  const handleExpandImage = (photo) => {
    setSelectedPhoto(photo);
  };

  return (
    <div className="corpo">
      <div className="BeatBlast404">BeatBlast</div>
      <h1 className="admin-header">Point Approval</h1>
      <div className="team-view">
        <select value={selectedTeam} onChange={handleTeamChange}>
          {teams.map((team) => (
            <option key={team.Team_ID} value={team.Team_ID}>
              {team.Team_name}
            </option>
          ))}
        </select>
        <br />
        <div className="pointstotal">
          Total Points: <span>{totalApprovedPoints}</span>
        </div>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Files</th>
            <th>Description</th>
            <th>Points</th>
            <th>Approve</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.Submission_ID}>
              <td
                style={{
                  backgroundColor: task.Confirmed ? "lightblue" : "transparent",
                }}
              >
                {task.Task_ID}
              </td>
              <td>
                <img
                  src={`${API_URL}/uploads/${task.Submission_path}`}
                  alt={`Task ${task.Task_ID}`}
                  className="thumbnail"
                  onClick={() => handleExpandImage(task.Submission_path)}
                />
              </td>
              <td>{task.Submission_description}</td>
              <td>
                <input
                  className="points-input"
                  type="text"
                  value={task.Given_points}
                  onChange={(e) =>
                    handlePointsChange(task.Submission_ID, e.target.value)
                  }
                />
              </td>
              <td>
                <button
                  onClick={() => handleApproval(task.Submission_ID, true)}
                  style={{
                    backgroundColor:
                      task.Aprove && task.Confirmed ? "lightgreen" : "",
                    color: task.Aprove && task.Confirmed ? "black" : "black",
                  }}
                >
                  ✔️ Approve
                </button>
                <button
                  onClick={() => handleApproval(task.Submission_ID, false)}
                  style={{
                    backgroundColor:
                      !task.Aprove && task.Confirmed ? "#FFCCCB" : "",
                    color: !task.Aprove && task.Confirmed ? "black" : "black",
                  }}
                >
                  ❌ Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPhoto && (
        <div className="modal" onClick={() => setSelectedPhoto(null)}>
          <img
            src={`${API_URL}/uploads/${selectedPhoto}`}
            alt="Expanded view"
            className="modal-content"
          />
          <span className="close">&times;</span>
        </div>
      )}
    </div>
  );
};

export default AdminReview;
