import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  LinearProgress,
  Paper,
  Avatar,
  useTheme,
  useMediaQuery,
  styled
} from '@mui/material';
import { 
  People as PeopleIcon,
  School as SchoolIcon,
  Event as EventIcon,
  Add as AddIcon,
  List as ListIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  CalendarToday as CalendarIcon,
  Timeline as TimelineIcon,
  TableChart as GanttIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Styled Components
const StyledHeroImage = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '400px',
  overflow: 'hidden',
  marginBottom: theme.spacing(4),
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'left',
  width: '90%',
  maxWidth: '1200px',
  zIndex: 2,
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
  },
}));

const StatCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const EventCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const ActionCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const StudentHome = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  // Sample Data
  const studentStats = {
    total: 1248,
    active: 1024,
    inactive: 224,
    newThisMonth: 48,
    graduatingThisYear: 156
  };
  
  const upcomingEvents = [
    { 
      title: "Midterm Exams", 
      date: "2025-04-10", 
      description: "Examinations covering all subjects from the first half of the semester." 
    },
    { 
      title: "Research Symposium", 
      date: "2025-04-15", 
      description: "Annual student research presentation event with faculty judges." 
    },
    { 
      title: "Final Project Submission", 
      date: "2025-04-20", 
      description: "Deadline for all capstone and final project submissions." 
    },
    { 
      title: "End-Semester Exams", 
      date: "2025-05-05", 
      description: "Comprehensive final examinations for all courses." 
    },
    { 
      title: "Graduation Ceremony", 
      date: "2025-05-25", 
      description: "Annual commencement ceremony for graduating students." 
    },
    { 
      title: "Next Semester Registration", 
      date: "2025-06-01", 
      description: "Registration opens for the upcoming academic semester." 
    }
  ];

  // Calendar sample data
  const calendarView = [
    { time: '8:00 AM', monday: 'Math 101', tuesday: 'Physics 201', wednesday: 'Lab Session', thursday: 'History 101', friday: 'Seminar' },
    { time: '10:00 AM', monday: 'English', tuesday: 'Math 101', wednesday: 'Physics 201', thursday: 'Lab Session', friday: 'Elective' },
    { time: '12:00 PM', monday: 'Lunch', tuesday: 'Lunch', wednesday: 'Lunch', thursday: 'Lunch', friday: 'Lunch' },
    { time: '2:00 PM', monday: 'Elective', tuesday: 'English', wednesday: 'Math 101', thursday: 'Physics 201', friday: 'Lab Session' },
  ];

  // Gantt chart sample data
  const ganttData = [
    { task: 'Course Planning', start: '2025-01-01', end: '2025-01-15', progress: 100 },
    { task: 'Student Registration', start: '2025-01-16', end: '2025-02-01', progress: 80 },
    { task: 'Midterm Exams', start: '2025-03-10', end: '2025-03-15', progress: 30 },
    { task: 'Final Exams', start: '2025-05-01', end: '2025-05-10', progress: 0 },
  ];

  // Calculate percentages
  const activePercentage = Math.round((studentStats.active / studentStats.total) * 100);
  const inactivePercentage = Math.round((studentStats.inactive / studentStats.total) * 100);
  const newPercentage = Math.round((studentStats.newThisMonth / studentStats.total) * 100);

  const handleAddStudent = () => navigate('/student');
  const handleViewStudents = () => navigate('/studenttable');

  return (
    <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 4 }}>
      {/* Hero Section */}
      <StyledHeroImage>
        <img
          src="./kaveesha/student.jpg"
          alt="Student Management Dashboard"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        <HeroContent>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              color: 'white', 
              fontWeight: 700,
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              mb: 2
            }}
          >
            Student Management 
          </Typography>
          <Typography 
            variant="h5" 
            component="p" 
            sx={{ 
              color: 'rgba(255,255,255,0.9)', 
              fontWeight: 400,
              fontSize: isMobile ? '1.1rem' : '1.5rem',
              maxWidth: '70%',
              [theme.breakpoints.down('sm')]: {
                maxWidth: '100%',
              }
            }}
          >
            Comprehensive tools for managing student data, academic progress, and institutional reporting.
          </Typography>
        </HeroContent>
      </StyledHeroImage>

      {/* Introduction Section */}
      <Box sx={{ 
        textAlign: 'center', 
        mb: 6,
        px: isMobile ? 2 : 0
      }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontWeight: 600, 
            mb: 3,
            color: theme.palette.primary.dark
          }}
        >
          Streamline Student Administration
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            maxWidth: '800px', 
            mx: 'auto',
            fontSize: '1.1rem',
            lineHeight: 1.6,
            color: theme.palette.text.secondary
          }}
        >
          Our Student Management System provides a centralized platform to efficiently handle all aspects of student administration. 
          From enrollment to graduation, track academic journeys, manage records, and generate insightful reports with our 
          intuitive, data-driven interface designed for educational excellence.
        </Typography>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <ActionCard elevation={3}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2,
                color: theme.palette.primary.main
              }}>
                <AddIcon fontSize="large" sx={{ mr: 2 }} />
                <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                  Add New Student
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Register new students with comprehensive profiles including academic records, contact information, 
                and enrollment details. Supports bulk imports for efficient data entry.
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                startIcon={<AddIcon />}
                onClick={handleAddStudent}
                fullWidth
                sx={{ py: 1.5 }}
              >
                Add Student
              </Button>
            </CardContent>
          </ActionCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <ActionCard elevation={3}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2,
                color: theme.palette.primary.main
              }}>
                <ListIcon fontSize="large" sx={{ mr: 2 }} />
                <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                  Manage Student Records
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Access, update, and analyze student data with advanced filtering, sorting, and reporting capabilities. 
                Generate enrollment statistics and academic performance reports.
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                startIcon={<PeopleIcon />}
                onClick={handleViewStudents}
                fullWidth
                sx={{ py: 1.5 }}
              >
                View All Students
              </Button>
            </CardContent>
          </ActionCard>
        </Grid>
      </Grid>

      {/* Statistics Dashboard */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontWeight: 600, 
            mb: 4,
            textAlign: 'center',
            color: theme.palette.primary.dark
          }}
        >
          Institutional Student Overview
        </Typography>
        <Grid container spacing={3}>
          {/* Total Students */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard elevation={3}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: theme.palette.primary.light, 
                    color: theme.palette.primary.dark,
                    mr: 2
                  }}>
                    <PeopleIcon />
                  </Avatar>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                    Total Students
                  </Typography>
                </Box>
                <Typography variant="h3" component="p" sx={{ fontWeight: 700, mb: 1 }}>
                  {studentStats.total.toLocaleString()}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={100} 
                  sx={{ 
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: theme.palette.grey[200],
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: theme.palette.primary.main
                    }
                  }} 
                />
              </CardContent>
            </StatCard>
          </Grid>

          {/* Active Students */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard elevation={3}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: theme.palette.success.light, 
                    color: theme.palette.success.dark,
                    mr: 2
                  }}>
                    <ActiveIcon />
                  </Avatar>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                    Active Students
                  </Typography>
                </Box>
                <Typography variant="h3" component="p" sx={{ fontWeight: 700, mb: 1 }}>
                  {studentStats.active.toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={activePercentage} 
                    sx={{ 
                      flexGrow: 1,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.palette.grey[200],
                      mr: 1,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: theme.palette.success.main
                      }
                    }} 
                  />
                  <Typography variant="body2" color="text.secondary">
                    {activePercentage}%
                  </Typography>
                </Box>
              </CardContent>
            </StatCard>
          </Grid>

          {/* Inactive Students */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard elevation={3}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: theme.palette.error.light, 
                    color: theme.palette.error.dark,
                    mr: 2
                  }}>
                    <InactiveIcon />
                  </Avatar>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                    Inactive Students
                  </Typography>
                </Box>
                <Typography variant="h3" component="p" sx={{ fontWeight: 700, mb: 1 }}>
                  {studentStats.inactive.toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={inactivePercentage} 
                    sx={{ 
                      flexGrow: 1,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.palette.grey[200],
                      mr: 1,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: theme.palette.error.main
                      }
                    }} 
                  />
                  <Typography variant="body2" color="text.secondary">
                    {inactivePercentage}%
                  </Typography>
                </Box>
              </CardContent>
            </StatCard>
          </Grid>

          {/* New This Month */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard elevation={3}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: theme.palette.info.light, 
                    color: theme.palette.info.dark,
                    mr: 2
                  }}>
                    <SchoolIcon />
                  </Avatar>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                    New This Month
                  </Typography>
                </Box>
                <Typography variant="h3" component="p" sx={{ fontWeight: 700, mb: 1 }}>
                  {studentStats.newThisMonth}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={newPercentage} 
                    sx={{ 
                      flexGrow: 1,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.palette.grey[200],
                      mr: 1,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: theme.palette.info.main
                      }
                    }} 
                  />
                  <Typography variant="body2" color="text.secondary">
                    {newPercentage}%
                  </Typography>
                </Box>
              </CardContent>
            </StatCard>
          </Grid>
        </Grid>
      </Box>

      {/* Upcoming Events */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontWeight: 600, 
            mb: 4,
            textAlign: 'center',
            color: theme.palette.primary.dark
          }}
        >
          Academic Calendar Highlights
        </Typography>
        <Grid container spacing={3}>
          {upcomingEvents.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <EventCard elevation={3}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    color: theme.palette.secondary.main
                  }}>
                    <EventIcon fontSize="medium" sx={{ mr: 2 }} />
                    <Typography 
                      variant="subtitle1" 
                      component="h3" 
                      sx={{ 
                        fontWeight: 600,
                        color: theme.palette.text.primary
                      }}
                    >
                      {event.title}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 2,
                      color: theme.palette.text.secondary
                    }}
                  >
                    {event.description}
                  </Typography>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      display: 'inline-block',
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      bgcolor: theme.palette.grey[100],
                      color: theme.palette.text.secondary
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </Typography>
                  </Paper>
                </CardContent>
              </EventCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Calendar Visualization Section */}
      <Box sx={{ mb: 6, backgroundColor: theme.palette.grey[50], borderRadius: 2, p: 4 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontWeight: 600, 
            mb: 4,
            textAlign: 'center',
            color: theme.palette.primary.dark
          }}
        >
          Weekly Schedule Overview
        </Typography>
        <Paper elevation={2} sx={{ p: 2, overflowX: 'auto' }}>
          <Grid container spacing={1}>
            {/* Header Row */}
            <Grid item xs={12}>
              <Grid container spacing={1} sx={{ fontWeight: 600 }}>
                <Grid item xs={2}>
                  <Typography variant="subtitle1">Time</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle1">Monday</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle1">Tuesday</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle1">Wednesday</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle1">Thursday</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle1">Friday</Typography>
                </Grid>
              </Grid>
            </Grid>
            
            {/* Calendar Rows */}
            {calendarView.map((row, index) => (
              <Grid item xs={12} key={index}>
                <Grid container spacing={1}>
                  <Grid item xs={2}>
                    <Paper elevation={0} sx={{ p: 1, textAlign: 'center' }}>
                      <Typography variant="body2">{row.time}</Typography>
                    </Paper>
                  </Grid>
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
                    <Grid item xs={2} key={day}>
                      <Paper elevation={1} sx={{ 
                        p: 1, 
                        textAlign: 'center',
                        backgroundColor: row[day] === 'Lunch' 
                          ? theme.palette.warning.light 
                          : theme.palette.primary.light,
                        color: row[day] === 'Lunch' 
                          ? theme.palette.warning.dark 
                          : theme.palette.primary.dark
                      }}>
                        <Typography variant="body2">{row[day]}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>

      {/* Gantt Chart Visualization Section */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontWeight: 600, 
            mb: 4,
            textAlign: 'center',
            color: theme.palette.primary.dark
          }}
        >
          Academic Timeline
        </Typography>
        <Paper elevation={2} sx={{ p: 2, overflowX: 'auto' }}>
          {ganttData.map((item, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>{item.task}</Typography>
              <Box sx={{ 
                width: '100%', 
                height: 30, 
                backgroundColor: theme.palette.grey[200],
                borderRadius: 1,
                position: 'relative'
              }}>
                <Box sx={{
                  position: 'absolute',
                  left: 0,
                  width: `${item.progress}%`,
                  height: '100%',
                  backgroundColor: item.progress === 100 
                    ? theme.palette.success.main 
                    : theme.palette.primary.main,
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  pr: 1,
                  color: 'white'
                }}>
                  {item.progress > 0 && `${item.progress}%`}
                </Box>
                <Typography variant="caption" sx={{ 
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: theme.palette.text.secondary
                }}>
                  {item.start} to {item.end}
                </Typography>
              </Box>
            </Box>
          ))}
        </Paper>
      </Box>

      {/* Additional Features Section */}
      <Box sx={{ 
        backgroundColor: theme.palette.grey[50], 
        borderRadius: 2,
        p: 4,
        mb: 6
      }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontWeight: 600, 
            mb: 4,
            textAlign: 'center',
            color: theme.palette.primary.dark
          }}
        >

            
          Comprehensive Scheduling Features
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Avatar sx={{ 
                bgcolor: theme.palette.primary.light, 
                color: theme.palette.primary.dark,
                width: 60,
                height: 60,
                mb: 2,
                mx: 'auto'
              }}>
                <CalendarIcon fontSize="medium" />
              </Avatar>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                Calendar Management
              </Typography>
              <Typography variant="body2">
                Visualize and manage academic schedules with our interactive calendar interface.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Avatar sx={{ 
                bgcolor: theme.palette.success.light, 
                color: theme.palette.success.dark,
                width: 60,
                height: 60,
                mb: 2,
                mx: 'auto'
              }}>
                <TimelineIcon fontSize="medium" />
              </Avatar>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                Timeline Planning
              </Typography>
              <Typography variant="body2">
                Plan and track academic milestones with our visual timeline tools.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Avatar sx={{ 
                bgcolor: theme.palette.info.light, 
                color: theme.palette.info.dark,
                width: 60,
                height: 60,
                mb: 2,
                mx: 'auto'
              }}>
                <GanttIcon fontSize="medium" />
              </Avatar>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                Resource Allocation
              </Typography>
              <Typography variant="body2">
                Optimize room and faculty assignments with our Gantt chart visualizations.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default StudentHome;