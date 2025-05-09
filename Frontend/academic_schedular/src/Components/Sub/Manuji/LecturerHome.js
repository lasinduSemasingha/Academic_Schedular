import React from 'react';
import { Container, Typography, Box, Button, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const LecturerHomepage = () => {
  const lectureData = [
    { day: 'Mon', lectures: 2 },
    { day: 'Tue', lectures: 1 },
    { day: 'Wed', lectures: 3 },
    { day: 'Thu', lectures: 2 },
    { day: 'Fri', lectures: 4 },
  ];

  return (
    <Container maxWidth="100%">
      {/* Navbar */}
      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#000435" // Change this color as needed
          sx={{ textAlign: 'center' }}
        >
          Lecturer Engagement Dashboard
        </Typography>
      </Box>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
        {/* Main Content */}
        <Box flex={2}>
          {/* Dashboard Overview */}
          <Box
            display="flex"
            gap={1}
            mb={2}
            flexWrap="wrap"
            sx={{
              '& > *': {
                flex: '1 1 calc(25% - 8px)',
                minWidth: '200px',
              },
            }}
          >
            {[
              { title: "Total Lecturers", value: "120", color: "#1976d2" },
              { title: "Upcoming Lectures", value: "15", color: "#2e7d32" },
              { title: "Pending Approvals", value: "5", color: "#ed6c02" },
              { title: "Notifications", value: "3", color: "#9c27b0" },
            ].map((item, index) => (
              <Box
                key={index}
                p={2}
                bgcolor={item.color}
                color="white"
                borderRadius={2}
                boxShadow={3}
                flex="1"
                minWidth="200px"
                textAlign="center"
                sx={{
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Typography variant="subtitle1" fontWeight="medium">{item.title}</Typography>
                <Typography variant="h4" fontWeight="bold" mt={1}>{item.value}</Typography>
              </Box>
            ))}
          </Box>

          {/* Time Table & Schedule */}
          <Card sx={{ mb: 4, p: 3, boxShadow: 4, borderRadius: 2, bgcolor: '#f9f9f9' }}>
            <Typography
              variant="h5"
              mb={2}
              sx={{ fontWeight: 'bold', color: '#1976d2' }}
            >
              Time Table & Schedule
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 2,
                borderRadius: 1,
                bgcolor: 'white',
                boxShadow: 2,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  Monday
                </Typography>
                <Typography variant="body1" sx={{ color: '#1976d2' }}>
                  10:00 AM - 12:00 PM: AI Class
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  Wednesday
                </Typography>
                <Typography variant="body1" sx={{ color: '#1976d2' }}>
                  2:00 PM - 4:00 PM: Data Science
                </Typography>
              </Box>
            </Box>
          </Card>

          {/* Line Chart Section */}
          <Box p={2} bgcolor="white" boxShadow={2} borderRadius={2} mb={3}>
            <Typography variant="h5"
              mb={2}
              sx={{ fontWeight: 'bold', color: '#1976d2' }}>Daily Lecturer Registration Summary</Typography>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={lectureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="lectures" stroke="#1976d2" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          {/* Upcoming Lectures */}
          <Box p={3} bgcolor="white" boxShadow={2} borderRadius={2} mb={4}>
            <Typography variant="h5"
              mb={2}
              sx={{ fontWeight: 'bold', color: '#1976d2' }}>Upcoming Lectures</Typography>
            <Typography>Friday - 9:00 AM - 11:00 AM: Machine Learning</Typography>
          </Box>

          {/* Recent Activity */}
          <Box p={3} bgcolor="white" boxShadow={2} borderRadius={2} mb={4}>
            <Typography variant="h5"
              mb={2}
              sx={{ fontWeight: 'bold', color: '#1976d2' }}>Recent Activity</Typography>
            <ul>
              <li>Updated lecture notes for AI Class</li>
              <li>Reviewed student assignments</li>
            </ul>
          </Box>
        </Box>

        {/* Right Side Section */}
        <Box flex={1}>
          {/* View Lecturers */}
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
              alignItems: 'center',
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                Explore the full list of lecturers already in the system.
              </Typography>
              <Box display="flex" justifyContent="center" mt={2}>
                <Link to="/LecturerTable" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" sx={{ backgroundColor: 'white', color: '#1976d2', '&:hover': { backgroundColor: '#f0f0f0' } }}>
                    Lecturer Directory
                  </Button>
                </Link>
              </Box>
            </CardContent>
          </Card>

          {/* Add Lecturers */}
          <Box p={3} bgcolor="white" boxShadow={2} borderRadius={2} textAlign="center">
            <Typography variant="h5" mb={2} fontWeight="bold">Register New Lecturers</Typography>
            <Typography>Complete the Form to Register a Lecturer</Typography>
            <Box display="flex" justifyContent="center" mt={2}>
              <Link to="/Lecturer" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" color="inherit">Click Here</Button>
              </Link>
            </Box>
          </Box>

          {/* Announcements */}
          <Box p={3} bgcolor="white" boxShadow={2} borderRadius={2} mt={2}>
            <Typography variant="h5" mb={2}>Announcements</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Scheduled Maintenance"
                  secondary="The site will be unavailable Monday from 8:00 AM to 12:00 PM."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Lecturer Workshop"
                  secondary='"AI Tools in Education" on May 15th.'
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="New Feature"
                  secondary="New lecturers can now register directly from the dashboard."
                />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LecturerHomepage;
