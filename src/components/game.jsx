import { useState, useEffect } from "react";
import { Container, Button, Typography, Grid, Card, CardContent, Snackbar } from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

function GamePage() {
  const [count, setCount] = useState(0);
  const [bgColor, setBgColor] = useState("#007bff");
  const [shadow, setShadow] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

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

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave? Unsaved data will be lost!";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <Container maxWidth="sm" style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5", padding: "20px" }}>
      
      {/* Counter Card */}
      <MotionCard
        style={{
          backgroundColor: bgColor,
          borderRadius: "15px",
          padding: "30px",
          width: "350px",
          height: "450px",
          textAlign: "center",
          color: "white",
          boxShadow: shadow ? "0px 0px 30px rgba(0,0,0,0.3)" : "0px 4px 10px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease-in-out"
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Counter:
            <motion.span
              key={count}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ marginLeft: "10px" }}
            >
              {count}
            </motion.span>
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="success"
                onClick={handleIncrement}
                size="large"
              >
                Increment
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="error"
                onClick={handleDecrement}
                size="large"
                disabled={count === 0}
              >
                Decrement
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </MotionCard>

      {/* Buttons at Bottom */}
      <Grid container spacing={3} justifyContent="center" style={{ marginTop: "20px" }}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleReload}
          >
            Reload
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleSave}
          >
            Save
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar Notification */}
      <Snackbar
        open={alertVisible}
        autoHideDuration={3000}
        onClose={closeAlert}
        message={`Your counter value ${count} has been saved.`}
      />
      
    </Container>
  );
}

export default GamePage;
