import React from 'react';
import { Container, Typography, Box, Button, Card, CardContent, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

const LecturerHomepage = () => {
  return (
    <Container maxWidth="100%">
      {/* Navbar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Lecturer Management Dashboard
        </Typography>
        <Box display="flex" gap={2}>
          <Button variant="outlined" color="inherit">Lecturer Directory</Button>
          <Button variant="outlined" color="inherit">Lecture Timetable</Button>
          <Button variant="outlined" color="inherit">Academic Settings</Button>
        </Box>
      </Box>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
        {/* Main Content */}
        <Box flex={2}>
          {/* Dashboard Overview */}
          <Box display="flex" gap={2} mb={4} flexWrap="wrap">
            {[ 
              { title: "Total Lecturers", value: "120" },
              { title: "Upcoming Lectures", value: "15" },
              { title: "Pending Approvals", value: "5" },
              { title: "Notifications", value: "3 New" }
            ].map((item, index) => (
              <Box key={index} p={3} bgcolor="#1976d2" color="white" textAlign="center" borderRadius={2} flex={1}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="h4" fontWeight="bold">{item.value}</Typography>
              </Box>
            ))}
          </Box>

          {/* Time Table & Schedule */}
          <Card sx={{ mb: 4, p: 3, boxShadow: 3 }}>
            <Typography variant="h5" mb={2}>Time Table & Schedule</Typography>
            <Typography>Monday - 10:00 AM - 12:00 PM: AI Class</Typography>
            <Typography>Wednesday - 2:00 PM - 4:00 PM: Data Science</Typography>
          </Card>

          {/* Upcoming Lectures */}
          <Box p={3} bgcolor="white" boxShadow={2} borderRadius={2} mb={4}>
            <Typography variant="h5" mb={2}>Upcoming Lectures</Typography>
            <Typography>Friday - 9:00 AM - 11:00 AM: Machine Learning</Typography>
          </Box>

          {/* Recent Activity */}
          <Box p={3} bgcolor="white" boxShadow={2} borderRadius={2} mb={4}>
            <Typography variant="h5" mb={2}>Recent Activity</Typography>
            <ul>
              <li>Updated lecture notes for AI Class</li>
              <li>Reviewed student assignments</li>
            </ul>
          </Box>
        </Box>

        {/* Lecturer Profile on Right Side */}
        <Box flex={1}>
          <Card 
            sx={{ 
              mb: 4, 
              p: 3, 
              textAlign: 'center', 
              borderRadius: 3, 
              boxShadow: 4, 
              background: 'linear-gradient(to right, #1976d2, #42a5f5)', 
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Lecturer Avatar */}
            <Avatar 
              sx={{ width: 120, height: 120, mb: 2, boxShadow: 3 }} 
              src="https://via.placeholder.com/120"
            />

            {/* Lecturer Information */}
            <CardContent>
              <Typography variant="h5" fontWeight="bold">Dr. John Doe</Typography>
              <Typography variant="body1" mt={1}>Department: Computer Science</Typography>
              <Typography variant="body2" mt={1}>johndoe@example.com</Typography>
              <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="outlined" color="inherit">View Profile</Button>
              </Box>
            </CardContent>
          </Card>

          {/* Adding Lecturers Section */}
          <Box p={3} bgcolor="white" boxShadow={2} borderRadius={2} textAlign="center">
            <Typography variant="h5" mb={2}>Register New Lecturers</Typography>
            <Typography>Complete the Form to Register a Lecturer</Typography>
            <Box display="flex" justifyContent="center" mt={2}>
              <Link to="/Lecturer" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" color="inherit">Click Here</Button>
              </Link>
            </Box>
          </Box>

          {/* Announcements Section */}
          <Box p={3} bgcolor="white" boxShadow={2} borderRadius={2} mt={2}>
            <Typography variant="h5" mb={2}>Announcements</Typography>
            <Typography>You cannot use this site on Monday due to maintenance.</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LecturerHomepage;
