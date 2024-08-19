import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import PopUpButton from "../components/PopUpButton";
import "./UploadPortal.css";
import MetaTags from "../components/MetaTags";
import axios from "axios";

const API_URL = "https://introweek-runcmd-website-e0032d4f624f.herokuapp.com";
const DEFAULT_IMAGE_URL =
  "https://via.placeholder.com/150/CCCCCC/808080?text=No+Image";

function UploadPortal() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const loggedInTeamID = parseInt(sessionStorage.getItem("teamID"), 10);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/uploaded/${loggedInTeamID}`
        );
        console.log("Fetched submissions:", response.data);
        // Reverse the submissions array to put the last submission first
        setSubmissions(response.data.reverse());
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, [loggedInTeamID]);

  const handleExpandMedia = (mediaPath, isVideo) => {
    setSelectedMedia({ path: mediaPath, isVideo });
  };

  const handleImageError = (e) => {
    e.target.src = DEFAULT_IMAGE_URL;
  };

  const getFileExtension = (filename) => {
    return filename.split(".").pop().toLowerCase();
  };

  const isVideoFile = (filename) => {
    const videoExtensions = ["mp4", "webm", "hevc"];
    return videoExtensions.includes(getFileExtension(filename));
  };

  return (
    <>
      <MetaTags />
      <Header />
      <div className="UploadPortal">
        <h2>Upload portal</h2>
        <p>
          Here you can see your team's uploaded assignments!
          <br /> Good luck, may the best band win!
        </p>

        <h2>Uploaded documents</h2>
        <div className="uploadeddocs">
          {submissions.length > 0 ? (
            <table>
              <tbody>
                {submissions.map((submission) => (
                  <tr
                    key={submission.Submission_ID}
                    className="uploaded-doc-row"
                  >
                    <td className="thumbnails">
                      {isVideoFile(submission.Submission_path) ? (
                        <video
                          className="thumbnail"
                          src={`${API_URL}/uploads/${submission.Submission_path}`}
                          onClick={() =>
                            handleExpandMedia(submission.Submission_path, true)
                          }
                          poster={`${API_URL}/uploads/${submission.Submission_path}#t=0.5`}
                        />
                      ) : (
                        <img
                          src={
                            submission.Submission_path
                              ? `${API_URL}/uploads/${submission.Submission_path}`
                              : DEFAULT_IMAGE_URL
                          }
                          alt={`Task ${submission.Task_ID}`}
                          className="thumbnail"
                          onClick={() =>
                            submission.Submission_path &&
                            handleExpandMedia(submission.Submission_path, false)
                          }
                          onError={handleImageError}
                        />
                      )}
                    </td>
                    <td
                      onClick={() =>
                        submission.Submission_path &&
                        handleExpandMedia(
                          submission.Submission_path,
                          isVideoFile(submission.Submission_path)
                        )
                      }
                    >
                      {submission.Submission_path
                        ? submission.Submission_path.split("/").pop()
                        : "No File Available"}
                    </td>
                    <td>{submission.Task_Type_ID}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-submissions">
              <p>
                <br />
                No documents uploaded yet. <br /> Start uploading now!
              </p>
            </div>
          )}
        </div>
      </div>
      <PopUpButton />

      {/* Modal to show expanded media */}
      {selectedMedia && (
        <div className="modal" onClick={() => setSelectedMedia(null)}>
          {selectedMedia.isVideo ? (
            <video
              src={`${API_URL}/uploads/${selectedMedia.path}`}
              controls
              className="modal-content"
            />
          ) : (
            <img
              src={`${API_URL}/uploads/${selectedMedia.path}`}
              alt="Expanded view"
              className="modal-content"
            />
          )}
          <span className="close">&times;</span>
        </div>
      )}
    </>
  );
}

export default UploadPortal;
