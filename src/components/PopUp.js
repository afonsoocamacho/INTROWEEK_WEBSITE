import React, { useState, useEffect } from "react";
import "./PopUp.css"; // Ensure this path is correct based on your project structure

const PopUp = ({ onClose }) => {
  const [TeamID, setTeamID] = useState(null);
  const [activityType, setActivityType] = useState("");
  const [activityName, setActivityName] = useState("");
  const [submissionDescription, setSubmissionDescription] = useState("");
  const [activities, setActivities] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected");
  const [filePreview, setFilePreview] = useState(null); // New state for file preview
  const [submitted, setSubmitted] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [activityTypes, setActivityTypes] = useState([]);

  // Retrieve team ID from session storage
  useEffect(() => {
    const storedTeamID = sessionStorage.getItem("teamID");

    if (storedTeamID) {
      setTeamID(JSON.parse(storedTeamID));
    } else {
      console.error("No team ID found in session storage");
    }
  }, []);

  // Fetch activity types from the server
  useEffect(() => {
    const fetchActivityTypes = async () => {
      try {
        const response = await fetch(
          "https://introweek-runcmd-website-e0032d4f624f.herokuapp.com/api/activity-types"
        );
        const data = await response.json();
        setActivityTypes(data);
      } catch (error) {
        console.error("Error fetching activity types:", error);
      }
    };

    fetchActivityTypes();
  }, []);

  // Fetch activities when activity type changes
  useEffect(() => {
    if (activityType) {
      const fetchActivities = async () => {
        try {
          const response = await fetch(
            `https://introweek-runcmd-website-e0032d4f624f.herokuapp.com/api/activities?type=${activityType}`
          );
          const data = await response.json();
          setActivities(data);
        } catch (error) {
          console.error("Error fetching activities:", error);
        }
      };

      fetchActivities();
    }
  }, [activityType]);

  const handleActivityTypeChange = (e) => {
    setActivityType(e.target.value);
    setActivityName(""); // Reset activity name when type changes
    checkFormValidity(
      e.target.value,
      activityName,
      file,
      submissionDescription
    );
  };

  const handleActivityNameChange = (e) => {
    setActivityName(e.target.value);
    checkFormValidity(
      activityType,
      e.target.value,
      file,
      submissionDescription
    );
  };

  const handleSubmissionDescriptionChange = (e) => {
    setSubmissionDescription(e.target.value);
    checkFormValidity(activityType, activityName, file, e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "No file selected");
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
    checkFormValidity(
      activityType,
      activityName,
      selectedFile,
      submissionDescription
    );
  };

  const checkFormValidity = (type, name, uploadedFile, description) => {
    if (type && name && uploadedFile && description) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedActivity = activities.find(
      (activity) => activity.Task_ID === parseInt(activityName)
    );
    if (!selectedActivity) {
      console.error("Selected activity not found");
      return;
    }

    const formData = new FormData();
    formData.append("activityId", selectedActivity.Task_ID);
    formData.append("file", file);
    formData.append("activityDescription", activityName);
    formData.append("submissionDescription", submissionDescription);

    console.log("Form Data:", formData); // Log FormData for debugging

    try {
      const response = await fetch("https://introweek-runcmd-website-e0032d4f624f.herokuapp.com/api/upload", {
        method: "POST",
        headers: {
          "x-team-id": TeamID, // Ensure this is being set correctly
        },
        body: formData,
      });
      console.log("the team id is", TeamID);

      if (response.ok) {
        setSubmitted(true);
      } else {
        const errorData = await response.json();
        console.error("Upload failed:", errorData.message);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {!submitted ? (
          <>
            <h2>Upload Documents</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Activity Type</label>
                <select
                  value={activityType}
                  onChange={handleActivityTypeChange}
                  required
                >
                  <option value="" disabled>
                    Select activity type
                  </option>
                  {activityTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Activity Name</label>
                <select
                  value={activityName}
                  onChange={handleActivityNameChange}
                  required
                  disabled={!activityType}
                >
                  <option value="" disabled>
                    Select activity
                  </option>
                  {activities.map((activity) => (
                    <option key={activity.Task_ID} value={activity.Task_ID}>
                      {activity.Task_Type_ID} - {activity.Task_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  className="description-input"
                  type="text"
                  value={submissionDescription}
                  onChange={handleSubmissionDescriptionChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Upload Document*</label>

                {filePreview && (
                  <div className="file-preview">
                    <img src={filePreview} alt="Preview" />
                  </div>
                )}
                <span id="file-name">{fileName}</span>
                <label htmlFor="file-input" className="custom-file-upload">
                  Choose File
                </label>
                <input
                  id="file-input"
                  className="file-input"
                  type="file"
                  onChange={handleFileChange}
                  required
                />
                <br />
                <br />
                <div className="note">
                  <small>
                    If you have more than one file for a single task,
                    <br /> please upload them one at a time. <br />
                    Use descriptions like "part 1", "part 2", etc., <br /> for
                    each file.
                  </small>
                </div>
                <br />
                <small>Supported files: .jpeg, .png, .pdf, .mp3</small>
                <br />
                <small>Max Size: 50Mb</small>
              </div>
              <div className="form-actions">
                <button type="button" onClick={onClose}>
                  Cancel
                </button>
                {formValid && (
                  <button type="submit" className="upload-button">
                    Upload
                  </button>
                )}
              </div>
            </form>
          </>
        ) : (
          <div className="success-message">
            <p className="success-text">
              Your documents have been uploaded successfully!
            </p>
            <button className="upload-button" onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopUp;
