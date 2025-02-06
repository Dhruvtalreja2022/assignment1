import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Dashboard from "./components/dashboard.jsx";
import GamePage from "./components/game.jsx";

function LoginPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle Google Login
  const handleGoogleLogin = (credentialResponse) => {
    if (credentialResponse?.credential) {
      const googleUser = jwtDecode(credentialResponse.credential);

      // Auto-fill form fields with Google data
      const user = {
        name: googleUser.name || "",
        email: googleUser.email || "",
        phone: "",
        address: "",
      };

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      console.log("User logged in:", user);

      // Redirect to Dashboard
      navigate("/dashboard");
    }
  };

  // Handle Manual Form Submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify(userData));

    console.log("Form Data Saved:", userData);

    // Show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/dashboard");
    }, 2000); // Redirect after 2 seconds
  };

  // Handle Input Change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      style={pageStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        style={cardStyle}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login / Register</h2>

        {/* Google Login */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.log("Login Failed")} />
        </div>

        <p style={{ textAlign: "center", margin: "20px 0" }}>OR</p>

        {/* Manual Form */}
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={userData.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={userData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={userData.address}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <motion.button
            type="submit"
            style={buttonStyle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>
        </form>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              style={successStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              Success! Redirecting to Dashboard...
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// Styles
const pageStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  background: "linear-gradient(135deg, #6a11cb, #2575fc)",
  padding: "20px",
};

const cardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
  width: "100%",
  maxWidth: "400px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ccc",
  transition: "border-color 0.3s, box-shadow 0.3s",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "15px",
  fontSize: "16px",
  fontWeight: "bold",
};

const successStyle = {
  textAlign: "center",
  marginTop: "20px",
  color: "#28a745",
  fontSize: "14px",
};

// Define Routes
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;