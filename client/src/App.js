import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage"; // Fixed the case of LandingPage import
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />{" "}
        {/* Corrected LandingPage case */}
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              {" "}
              {/* Protecting the HomePage route */}
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {/* Chatbot should be outside of Routes to remain persistent */}
      <div className="chatbot-button-container">
        <Chatbot /> {/* This will be the chat interface */}
      </div>
    </>
  );
}

function ProtectedRoutes({ children }) {
  // Check if the user is logged in by looking for 'user' in localStorage
  if (localStorage.getItem("user")) {
    return children;
  } else {
    return <Navigate to="/login" />; // Redirect to login if no user is found
  }
}

export default App;
