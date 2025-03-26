import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  LinearProgress
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import SchoolIcon from "@mui/icons-material/School";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const primaryColor = "#1E3A8A";
const secondaryColor = "#F59E0B";
const backgroundColor = "#F3F4F6";
const cardBackground = "#FFFFFF";

const pieData = [
  { name: "Scheduled Classes", value: 50, color: "#0284C7" },
  { name: "Exams Scheduled", value: 20, color: "#E11D48" },
  { name: "Assignments Due", value: 30, color: "#22C55E" }
];

const barData = [
  { name: "Math", students: 200 },
  { name: "Science", students: 180 },
  { name: "History", students: 150 },
  { name: "English", students: 170 }
];

const DashboardContainer = styled(Box)({
  backgroundColor,
  minHeight: "100vh",
  padding: "2rem"
});

const Home = () => {
  return (
    <DashboardContainer>
      <Grid container spacing={3}>
        {/* KPI Stats */}
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: cardBackground, p: 2 }}>
            <CardContent>
              <PeopleIcon sx={{ fontSize: 40, color: secondaryColor }} />
              <Typography variant="h6" color="textSecondary">Total Students</Typography>
              <Typography variant="h4" fontWeight="bold">500</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: cardBackground, p: 2 }}>
            <CardContent>
              <EventIcon sx={{ fontSize: 40, color: secondaryColor }} />
              <Typography variant="h6" color="textSecondary">Upcoming Exams</Typography>
              <Typography variant="h4" fontWeight="bold">10</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: cardBackground, p: 2 }}>
            <CardContent>
              <SchoolIcon sx={{ fontSize: 40, color: secondaryColor }} />
              <Typography variant="h6" color="textSecondary">Total Courses</Typography>
              <Typography variant="h4" fontWeight="bold">25</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: cardBackground, p: 2 }}>
            <CardContent>
              <NotificationsActiveIcon sx={{ fontSize: 40, color: secondaryColor }} />
              <Typography variant="h6" color="textSecondary">New Notifications</Typography>
              <Typography variant="h4" fontWeight="bold">5</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />

      {/* Charts Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: cardBackground, p: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color={primaryColor} gutterBottom>
                Enrollment Overview
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: cardBackground, p: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color={primaryColor} gutterBottom>
                Schedule Breakdown
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />

      {/* Announcements & Events */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: cardBackground, p: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color={primaryColor} gutterBottom>
                Latest Announcements
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar><AnnouncementIcon color="primary" /></ListItemAvatar>
                  <ListItemText primary="Exam Schedule Released" secondary="March 25, 2025" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar><AssignmentIcon color="primary" /></ListItemAvatar>
                  <ListItemText primary="New Assignment Uploaded" secondary="Due April 10, 2025" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Event Calendar */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: cardBackground, p: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color={primaryColor} gutterBottom>
                Academic Calendar
              </Typography>
              <Calendar />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Additional Widgets */}
      <Grid container spacing={3}>
        {/* Task Progress */}
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: cardBackground, p: 2 }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Assignments Progress</Typography>
              <LinearProgress variant="determinate" value={60} />
              <Typography variant="body2" color="textSecondary">60% of assignments completed</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Deadlines */}
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: cardBackground, p: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color={primaryColor} gutterBottom>
                Upcoming Deadlines
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Assignment 1 Due" secondary="April 1, 2025" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Exam Registration Deadline" secondary="April 5, 2025" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: cardBackground, p: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color={primaryColor} gutterBottom>
                Recent Activities
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar><AssignmentIcon color="primary" /></ListItemAvatar>
                  <ListItemText primary="Math Exam Scheduled" secondary="March 20, 2025" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar><PeopleIcon color="primary" /></ListItemAvatar>
                  <ListItemText primary="New Student Registered" secondary="March 22, 2025" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: cardBackground, p: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color={primaryColor} gutterBottom>
                Notifications
              </Typography>
              <List>
                <ListItem>
                  <Chip label="Exam Schedule Released" color="primary" />
                </ListItem>
                <ListItem>
                  <Chip label="New Assignment Due" color="secondary" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default Home;
