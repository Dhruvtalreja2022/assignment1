import { useState, useEffect } from "react";
import {
  Container,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Snackbar,
  TextField,
  Box,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

function GamePage() {
  const [count, setCount] = useState(() => {
    const storedCount = localStorage.getItem("counter");
    return storedCount ? parseInt(storedCount) : 0;
  });
  const [bgColor, setBgColor] = useState("#007bff");
  const [shadow, setShadow] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
    setBgColor(getRandomColor());
    setShadow(true);
  };

  const handleDecrement = () => {
    if (count > 0) setCount((prevCount) => prevCount - 1);
  };

  const handleReload = () => {
    setCount(0);
    setBgColor("#007bff");
    setShadow(false);
  };

  const handleSave = () => {
    localStorage.setItem("counter", count);
    setAlertVisible(true);
  };

  const closeAlert = () => {
    setAlertVisible(false);
  };

  return (
    <Container maxWidth="lg" sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f0f2f5", padding: "20px" }}>
      <Grid container spacing={4} sx={{ height: "90vh" }}>
        <Grid item xs={12} sm={6} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <MotionCard
            sx={{
              backgroundColor: bgColor,
              borderRadius: "20px",
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              boxShadow: shadow ? "0px 0px 30px rgba(0,0,0,0.4)" : "0px 4px 10px rgba(0,0,0,0.2)",
              height: "50%",
            }}
          >
            <CardContent>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Counter: {count}
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="success" onClick={handleIncrement} size="large">
                    Increment
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="error" onClick={handleDecrement} size="large" disabled={count === 0}>
                    Decrement
                  </Button>
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
                <Button variant="contained" color="primary" size="large" onClick={handleReload}>
                  Reload
                </Button>
                <Button variant="contained" color="secondary" size="large" onClick={handleSave}>
                  Save
                </Button>
              </Box>
            </CardContent>
          </MotionCard>
          {user && (
            <MotionCard
              sx={{
                borderRadius: "20px",
                padding: "20px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                height: "50%",
              }}
            >
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  User Information
                </Typography>
                <Typography variant="body1"><strong>Name:</strong> {user.name}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
                <Typography variant="body1"><strong>Phone:</strong> {user.phone || "N/A"}</Typography>
                <Typography variant="body1"><strong>Address:</strong> {user.address || "N/A"}</Typography>
              </CardContent>
            </MotionCard>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <MotionCard
            sx={{
              borderRadius: "20px",
              padding: "20px",
              height: "100%",
              boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
              backgroundColor: "#fafafa",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Text Editor
              </Typography>
              <Divider sx={{ marginBottom: "10px" }} />
              <TextField fullWidth multiline minRows={14} variant="outlined" placeholder="Type here..." value={text} onChange={(e) => setText(e.target.value)} sx={{ backgroundColor: "#fff", borderRadius: "8px" }} />
            </CardContent>
          </MotionCard>
        </Grid>
      </Grid>
      <Snackbar open={alertVisible} autoHideDuration={3000} onClose={closeAlert} message={`Your counter value ${count} has been saved.`} />
    </Container>
  );
}

export default GamePage;
