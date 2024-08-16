import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MetaTags from "./components/MetaTags";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import UploadPortal from "./pages/UploadPortal";
import EventSchedule from "./pages/EventSchedule";
import LeaderBoard from "./pages/LeaderBoard";
import Staff from "./pages/Staff";
import NotFound from "./pages/NotFound";
import AdminReview from "./pages/AdminReview";
import "./App.css";

// Add an event listener to clear sessionStorage on page unload (refresh or close)
window.addEventListener("beforeunload", function () {
  sessionStorage.clear();
});

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <MetaTags />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute allowedTypes={["member", "admin"]}>
                  <EventSchedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/menu"
              element={
                <ProtectedRoute allowedTypes={["member", "admin"]}>
                  <Menu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/uploadportal"
              element={
                <ProtectedRoute allowedTypes={["member", "admin"]}>
                  <UploadPortal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/EventSchedule"
              element={
                <ProtectedRoute allowedTypes={["member", "admin"]}>
                  <EventSchedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/LeaderBoard"
              element={
                <ProtectedRoute allowedTypes={["member", "admin"]}>
                  <LeaderBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Staff"
              element={
                <ProtectedRoute allowedTypes={["member", "admin"]}>
                  <Staff />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminreview"
              element={
                <ProtectedRoute allowedTypes={["admin"]}>
                  <AdminReview />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
