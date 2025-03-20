import React from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to Academic Scheduler
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Efficiently manage academic schedules, avoid conflicts, and optimize learning sessions.
        </Typography>
        <Button variant="contained" color="primary" size="large" component={Link} to="/schedule">
          View Schedule
        </Button>
      </Box>
  );
};

export default Home;
