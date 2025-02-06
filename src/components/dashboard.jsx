import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Typography, Button, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    setIsExiting(true);
    setTimeout(() => {
      localStorage.removeItem("user");
      navigate("/");
    }, 500);
  };

  const handleStartGame = () => {
    setIsExiting(true);
    setTimeout(() => navigate("/game"), 500);
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh"
      sx={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        padding: "20px"
      }}
    >
      <AnimatePresence>
        {!isExiting && user && (
          <motion.div
            key="dashboard-card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Card 
              sx={{
                padding: 4,
                borderRadius: 3,
                boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
                width: "90%",
                maxWidth: 400,
                textAlign: "center",
                bgcolor: "background.paper",
                overflow: "hidden"
              }}
            >
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Typography 
                  variant="h5" 
                  fontWeight="bold" 
                  gutterBottom
                  sx={{ color: "primary.main" }}
                >
                  Welcome, {user.name}
                </Typography>
              </motion.div>

              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ staggerChildren: 0.1 }}
              >
                {[
                  { label: "Email", value: user.email },
                  { label: "Phone", value: user.phone },
                  { label: "Address", value: user.address }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography variant="body1" sx={{ my: 1 }}>
                      <strong>{item.label}:</strong> {item.value || "N/A"}
                    </Typography>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{ marginTop: "2rem" }}
              >
                <Button
                  component={motion.button}
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ 
                    fontWeight: "bold",
                    py: 1.5,
                    borderRadius: 2
                  }}
                  onClick={handleStartGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Start Game
                </Button>

                <Button
                  component={motion.button}
                  variant="contained"
                  color="error"
                  fullWidth
                  sx={{ 
                    mt: 2,
                    fontWeight: "bold",
                    py: 1.5,
                    borderRadius: 2
                  }}
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Logout
                </Button>
              </motion.div>
            </Card>
          </motion.div>
        )}

        {!user && !isExiting && (
          <motion.div
            key="error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Typography 
              variant="h6" 
              color="error"
              sx={{ 
                background: "white",
                padding: 3,
                borderRadius: 2,
                boxShadow: 3
              }}
            >
              No user found. Please login.
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default Dashboard;