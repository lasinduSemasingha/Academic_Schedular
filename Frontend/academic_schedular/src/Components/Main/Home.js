import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import {
  Schedule as ScheduleIcon,
  Class as ClassIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon,
  School as SchoolIcon,
  Notifications as NotificationsIcon,
  Today as TodayIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  CalendarToday as CalendarTodayIcon
} from "@mui/icons-material";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';

const locales = {
  'en-US': require('date-fns/locale/en-US')
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const primaryColor = "#3f51b5";
const secondaryColor = "#ff9800";
const backgroundColor = "#f5f5f5";

const DashboardContainer = styled(Box)({
  backgroundColor,
  minHeight: "100vh",
  padding: "2rem"
});

const events = [
  {
    title: 'Math 101 Lecture',
    start: new Date(2025, 2, 25, 9, 0),
    end: new Date(2025, 2, 25, 10, 30),
    resource: 'Room 201'
  },
  {
    title: 'Physics Lab',
    start: new Date(2025, 2, 25, 14, 0),
    end: new Date(2025, 2, 25, 16, 0),
    resource: 'Lab B'
  },
  {
    title: 'Faculty Meeting',
    start: new Date(2025, 2, 26, 10, 0),
    end: new Date(2025, 2, 26, 11, 30),
    resource: 'Conference Room'
  }
];

const Home = () => {
  return (
    <DashboardContainer>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: primaryColor }}>
        Academic Scheduler Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Quick Access Cards */}
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <ScheduleIcon sx={{ fontSize: 50, color: primaryColor }} />
              <Typography variant="h6" sx={{ mt: 1 }}>Resource Manager</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ mt: 2 }}
                component={Link}
                to="/resource"
              >
                Resource Manager
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <EventIcon sx={{ fontSize: 50, color: secondaryColor }} />
              <Typography variant="h6" sx={{ mt: 1 }}>Exam Management</Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                sx={{ mt: 2 }}
                component={Link}
                to="/examHome"
              >
                Exam Management
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <PersonIcon sx={{ fontSize: 50, color: primaryColor }} />
              <Typography variant="h6" sx={{ mt: 1 }}>Student Management</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ mt: 2 }}
                component={Link}
                to="/studenthome"
              >
                Student Management
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <GroupIcon sx={{ fontSize: 50, color: secondaryColor }} />
              <Typography variant="h6" sx={{ mt: 1 }}>Lecturer Management</Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                sx={{ mt: 2 }}
                component={Link}
                to="/lecturerhome"
              >
                Lecturer Management
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 4 }} />
      
      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Calendar View */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: primaryColor }}>
                Academic Calendar
              </Typography>
              <div style={{ height: 500 }}>
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: '100%' }}
                  defaultView="week"
                  views={['month', 'week', 'day', 'agenda']}
                  toolbar={true}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Upcoming Schedule */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: primaryColor }}>
                Today's Schedule
              </Typography>
              <List>
                <ListItem sx={{ borderLeft: `4px solid ${primaryColor}`, mb: 1 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: primaryColor }}>
                      <ClassIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Math 101 Lecture" 
                    secondary="9:00 AM - 10:30 AM | Room 201" 
                  />
                </ListItem>
                <ListItem sx={{ borderLeft: `4px solid ${secondaryColor}`, mb: 1 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: secondaryColor }}>
                      <SchoolIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Physics Lab" 
                    secondary="2:00 PM - 4:00 PM | Lab B" 
                  />
                </ListItem>
                <ListItem sx={{ borderLeft: `4px solid ${primaryColor}` }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: primaryColor }}>
                      <EventIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Department Meeting" 
                    secondary="4:30 PM - 5:30 PM | Conference Room" 
                  />
                </ListItem>
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: primaryColor }}>
                Upcoming Events
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <TodayIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Midterm Exams" 
                    secondary="Starts next Monday" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <CalendarTodayIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Faculty Development Workshop" 
                    secondary="Next Friday, 9:00 AM" 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 4 }} />
      
      {/* Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: primaryColor }}>
                Recent Schedule Changes
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#ff5722' }}>
                      <NotificationsIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Room change for History 202" 
                    secondary="Changed from Room 105 to Room 203" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#4caf50' }}>
                      <AssignmentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="New class added" 
                    secondary="CS 301 - Advanced Programming, Wednesdays 1:00 PM" 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: primaryColor }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth 
                    startIcon={<ClassIcon />}
                    component={Link}
                    to="/add-class"
                  >
                    Add Class
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    fullWidth 
                    startIcon={<EventIcon />}
                    component={Link}
                    to="/add-event"
                  >
                    Add Event
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth 
                    startIcon={<PersonIcon />}
                    component={Link}
                    to="/add-faculty"
                  >
                    Add Faculty
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    fullWidth 
                    startIcon={<GroupIcon />}
                    component={Link}
                    to="/add-student-group"
                  >
                    Add Student Group
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default Home;