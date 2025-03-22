import React from "react";
import { Box, Typography, Button, Grid, Paper, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh", // Full viewport height=
        backgroundImage: 'url("/Main/home.jpg")', // Replace with your image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        margin: 0, // Reset margin
        padding: 0, // Reset padding
      }}
    >
      {/* Semi-transparent overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity by changing the alpha value
          zIndex: 1,
        }}
      />

      {/* Main content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          py: 6,
          color: "white", // Ensures all text is white for readability
        }}
      >
        {/* Welcome Section */}
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to Academic Scheduler
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Efficiently manage academic schedules, avoid conflicts, and optimize learning sessions.
        </Typography>
        <Button variant="contained" color="primary" size="large" component={Link} to="/schedule">
          View Schedule
        </Button>

        {/* Stats Overview */}
        <Box sx={{ display: "flex", justifyContent: "space-around", py: 4 }}>
          <Card sx={{ maxWidth: 300 }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Total Students</Typography>
              <Typography variant="h4" fontWeight="bold">500</Typography>
            </CardContent>
          </Card>

          <Card sx={{ maxWidth: 300 }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Upcoming Exams</Typography>
              <Typography variant="h4" fontWeight="bold">10</Typography>
            </CardContent>
          </Card>

          <Card sx={{ maxWidth: 300 }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Total Courses</Typography>
              <Typography variant="h4" fontWeight="bold">25</Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Quick Access Links */}
        <Typography variant="h5" gutterBottom>
          Quick Access
        </Typography>
        <Grid container spacing={4} sx={{ justifyContent: "center" }}>
          <Grid item>
            <Paper sx={{ p: 2, textAlign: "center", width: 200 }}>
              <Button variant="contained" fullWidth component={Link} to="/students">Student Management</Button>
            </Paper>
          </Grid>
          <Grid item>
            <Paper sx={{ p: 2, textAlign: "center", width: 200 }}>
              <Button variant="contained" fullWidth component={Link} to="/schedule">Timetable</Button>
            </Paper>
          </Grid>
          <Grid item>
            <Paper sx={{ p: 2, textAlign: "center", width: 200 }}>
              <Button variant="contained" fullWidth component={Link} to="/exam">Exams</Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Announcements Section */}
        <Box sx={{ py: 6 }}>
          <Typography variant="h5" gutterBottom>
            Announcements
          </Typography>
          <Typography variant="body1" paragraph>
            Don't miss the upcoming registration deadlines! Make sure to finalize your schedules and exam dates.
          </Typography>
          <Button variant="outlined" component={Link} to="/announcements">View All Announcements</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;