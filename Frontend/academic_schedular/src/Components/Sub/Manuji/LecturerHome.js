import React from 'react';
import { Container, Typography, Box, Button, Card, CardContent, Avatar } from '@mui/material';

export default function LecturerHomepage() {
  return (
    <Container maxWidth="100%">
      {/* Navbar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" sx={{ position: 'relative', zIndex: 2 }}>
          Lecturer Management Dashboard
        </Typography>
        <Typography variant="h4" fontWeight="bold" color="white">Lecturer Management</Typography>
        <Box display="flex" gap={2}>
          <Button variant="outlined" color="inherit">Profiles</Button>
          <Button variant="outlined" color="inherit">Courses</Button>
          <Button variant="outlined" color="inherit">Reports</Button>
          <Button variant="outlined" color="inherit">Settings</Button>
        </Box>
      </Box>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
        {/* Main Content */}
        <Box flex={2}>
          {/* Dashboard Overview with Updated Colors */}
          <Box display="flex" gap={2} mb={4} flexWrap="wrap">
            <Box p={3} bgcolor="#1976d2" color="white" textAlign="center" borderRadius={2} flex={1}>
              <Typography variant="h6">Total Lecturers</Typography>
              <Typography variant="h4" fontWeight="bold">120</Typography>
            </Box>
            <Box p={3} bgcolor="#1976d2" color="white" textAlign="center" borderRadius={2} flex={1}>
              <Typography variant="h6">Upcoming Lectures</Typography>
              <Typography variant="h4" fontWeight="bold">15</Typography>
            </Box>
            <Box p={3} bgcolor="#1976d2" color="white" textAlign="center" borderRadius={2} flex={1}>
              <Typography variant="h6">Pending Approvals</Typography>
              <Typography variant="h4" fontWeight="bold">5</Typography>
            </Box>
            <Box p={3} bgcolor="#1976d2" color="white" textAlign="center" borderRadius={2} flex={1}>
              <Typography variant="h6">Notifications</Typography>
              <Typography variant="h4" fontWeight="bold">3 New</Typography>
            </Box>
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
          <Card sx={{ mb: 4, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3, bgcolor: '#1976d2' }}>
            <Avatar sx={{ width: 100, height: 100, mb: 2 }}>JD</Avatar>
            <CardContent>
              <Typography variant="h5" mb={1} textAlign="center">Dr. John Doe</Typography>
              <Typography variant="body1" textAlign="center">Department: Computer Science</Typography>
              <Typography variant="body1" textAlign="center">Email: johndoe@example.com</Typography>
            </CardContent>
          </Card>

          {/* Announcements Section */}
          <Box p={3} bgcolor="white" boxShadow={2} borderRadius={2}>
            <Typography variant="h5" mb={2}>Announcements</Typography>
            <Typography>University will be closed on Monday due to maintenance.</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
