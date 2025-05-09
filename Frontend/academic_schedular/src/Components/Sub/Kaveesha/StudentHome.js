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
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  styled,
  createTheme,
  ThemeProvider
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

// Create a custom theme with updated typography and colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',      // Changed primary color to indigo
      dark: '#303f9f',
      light: '#7986cb'
    },
    secondary: {
      main: '#ff4081',      // Changed secondary color to pink
      dark: '#c2185b',
      light: '#f50057'
    },
    success: {
      main: '#4caf50',      // Green for success
      dark: '#388e3c',
      light: '#81c784'
    },
    error: {
      main: '#f44336',      // Red for error
      dark: '#d32f2f',
      light: '#e57373'
    },
    info: {
      main: '#2196f3',      // Blue for info
      dark: '#1976d2',
      light: '#64b5f6'
    },
    warning: {
      main: '#ff9800',      // Orange for warning
      dark: '#f57c00',
      light: '#ffb74d'
    }
  },
  typography: {
    fontFamily: [
      '"Roboto"',
      '"Open Sans"',
      '"Segoe UI"',
      'sans-serif'
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem'
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem'
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem'
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem'
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem'
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem'
    },
    button: {
      textTransform: 'none',
      fontWeight: 600
    }
  }
});

// Styled Components with professional enhancements
const StyledHeroImage = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '400px',
  overflow: 'hidden',
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
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
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
  borderLeft: `4px solid ${theme.palette.primary.main}`,
}));

const EventCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
  borderTop: `3px solid ${theme.palette.secondary.main}`,
}));

const ActionCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
}));

const ProfessionalButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  letterSpacing: '0.5px',
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease',
}));

const StudentHome = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  // Sample Data (unchanged)
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

  const calendarView = [
    { time: '8:00 AM', monday: 'Math 101', tuesday: 'Physics 201', wednesday: 'Lab Session', thursday: 'History 101', friday: 'Seminar' },
    { time: '10:00 AM', monday: 'English', tuesday: 'Math 101', wednesday: 'Physics 201', thursday: 'Lab Session', friday: 'Elective' },
    { time: '12:00 PM', monday: 'Lunch', tuesday: 'Lunch', wednesday: 'Lunch', thursday: 'Lunch', friday: 'Lunch' },
    { time: '2:00 PM', monday: 'Elective', tuesday: 'English', wednesday: 'Math 101', thursday: 'Physics 201', friday: 'Lab Session' },
  ];

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
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 4 }}>
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
              fontWeight: 700, 
              mb: 3,
              color: theme.palette.primary.dark,
              letterSpacing: '-0.5px'
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
              lineHeight: 1.7,
              color: theme.palette.text.secondary
            }}
          >
            Our Student Management System provides a centralized platform to efficiently handle all aspects of student administration. 
            From enrollment to graduation, track academic journeys, manage records, and generate insightful reports with our 
            intuitive, data-driven interface designed for educational excellence.
          </Typography>
        </Box>

        {/* Quick Actions */}
        <Grid container justifyContent="center" spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} md={5} lg={4}>
            <ActionCard elevation={3}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2,
                  color: theme.palette.primary.main
                }}>
                  <AddIcon fontSize="large" sx={{ mr: 2 }} />
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 700 }}>
                    Add New Student
                  </Typography>
                </Box>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 3,
                    lineHeight: 1.6,
                    color: theme.palette.text.secondary
                  }}
                >
                  Register new students with comprehensive profiles including academic records, contact information, 
                  and enrollment details. Supports bulk imports for efficient data entry.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <ProfessionalButton
                    variant="contained" 
                    startIcon={<AddIcon />}
                    onClick={handleAddStudent}
                    sx={{ 
                      width: '200px',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      color: '#fff',
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                      }
                    }}
                  >
                    Add Student
                  </ProfessionalButton>
                </Box>
              </CardContent>
            </ActionCard>
          </Grid>
          
          <Grid item xs={12} md={5} lg={4}>
            <ActionCard elevation={3}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2,
                  color: theme.palette.primary.main
                }}>
                  <ListIcon fontSize="large" sx={{ mr: 2 }} />
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 700 }}>
                    Manage Student Records
                  </Typography>
                </Box>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 3,
                    lineHeight: 1.6,
                    color: theme.palette.text.secondary
                  }}
                >
                  Access, update, and analyze student data with advanced filtering, sorting, and reporting capabilities. 
                  Generate enrollment statistics and academic performance reports.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <ProfessionalButton
                    variant="contained" 
                    startIcon={<PeopleIcon />}
                    onClick={handleViewStudents}
                    sx={{ 
                      width: '250px',
                      background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                      color: '#fff',
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
                      }
                    }}
                  >
                    View All Students
                  </ProfessionalButton>
                </Box>
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
              fontWeight: 700, 
              mb: 4,
              textAlign: 'center',
              color: theme.palette.primary.dark,
              letterSpacing: '-0.5px'
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
                      mr: 2,
                      width: 48,
                      height: 48
                    }}>
                      <PeopleIcon />
                    </Avatar>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                      Total Students
                    </Typography>
                  </Box>
                  <Typography variant="h3" component="p" sx={{ fontWeight: 800, mb: 1 }}>
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
                        background: `linear-gradient(90deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
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
                      mr: 2,
                      width: 48,
                      height: 48
                    }}>
                      <ActiveIcon />
                    </Avatar>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                      Active Students
                    </Typography>
                  </Box>
                  <Typography variant="h3" component="p" sx={{ fontWeight: 800, mb: 1 }}>
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
                          background: `linear-gradient(90deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`,
                        }
                      }} 
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
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
                      mr: 2,
                      width: 48,
                      height: 48
                    }}>
                      <InactiveIcon />
                    </Avatar>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                      Inactive Students
                    </Typography>
                  </Box>
                  <Typography variant="h3" component="p" sx={{ fontWeight: 800, mb: 1 }}>
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
                          background: `linear-gradient(90deg, ${theme.palette.error.light} 0%, ${theme.palette.error.main} 100%)`,
                        }
                      }} 
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
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
                      mr: 2,
                      width: 48,
                      height: 48
                    }}>
                      <SchoolIcon />
                    </Avatar>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                      New This Month
                    </Typography>
                  </Box>
                  <Typography variant="h3" component="p" sx={{ fontWeight: 800, mb: 1 }}>
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
                          background: `linear-gradient(90deg, ${theme.palette.info.light} 0%, ${theme.palette.info.main} 100%)`,
                        }
                      }} 
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
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
              fontWeight: 700, 
              mb: 4,
              textAlign: 'center',
              color: theme.palette.primary.dark,
              letterSpacing: '-0.5px'
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
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6
                      }}
                    >
                      {event.description}
                    </Typography>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        px: 2,
                        py: 1,
                        borderRadius: 1,
                        bgcolor: theme.palette.grey[100],
                        color: theme.palette.text.secondary
                      }}
                    >
                      <CalendarIcon fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
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

        {/* Combined Schedule & Timeline Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Weekly Schedule */}
          <Grid item xs={12} lg={6}>
            <Card elevation={3} sx={{ height: '100%', borderRadius: theme.shape.borderRadius }}>
              <CardContent>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 700,
                    color: theme.palette.primary.main
                  }}
                >
                  <CalendarIcon sx={{ mr: 1.5, color: theme.palette.primary.main }} />
                  Weekly Schedule
                </Typography>
                <TableContainer 
                  component={Paper} 
                  elevation={0}
                  sx={{ 
                    borderRadius: theme.shape.borderRadius,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Table size="small" sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow sx={{ 
                        bgcolor: theme.palette.grey[100],
                        '& th': {
                          fontWeight: 700,
                          color: theme.palette.text.primary
                        }
                      }}>
                        <TableCell>Time</TableCell>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                          <TableCell key={day} align="center">
                            {day}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {calendarView.map((row, index) => (
                        <TableRow key={index} hover>
                          <TableCell sx={{ 
                            fontWeight: 600, 
                            bgcolor: theme.palette.grey[50],
                            borderRight: `1px solid ${theme.palette.divider}`
                          }}>
                            {row.time}
                          </TableCell>
                          {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map(day => (
                            <TableCell 
                              key={day}
                              align="center"
                              sx={{ 
                                whiteSpace: 'pre-line',
                                bgcolor: row[day].includes('Lunch') 
                                  ? theme.palette.warning.light 
                                  : theme.palette.secondary.light,
                                color: row[day].includes('Lunch') 
                                  ? theme.palette.warning.contrastText 
                                  : theme.palette.secondary.contrastText,
                                fontWeight: 500,
                                height: '80px',
                                borderRight: index !== calendarView.length - 1 ? `1px solid ${theme.palette.divider}` : 'none'
                              }}
                            >
                              {row[day]}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Academic Timeline */}
          <Grid item xs={12} lg={6}>
            <Card elevation={3} sx={{ height: '100%', borderRadius: theme.shape.borderRadius }}>
              <CardContent>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 700,
                    color: theme.palette.primary.main
                  }}
                >
                  <TimelineIcon sx={{ mr: 1.5, color: theme.palette.primary.main }} />
                  Academic Timeline
                </Typography>
                <Box sx={{ p: 2 }}>
                  {ganttData.map((item, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                          {item.task}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          color: theme.palette.text.secondary,
                          fontWeight: 500
                        }}>
                          {new Date(item.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(item.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </Typography>
                      </Box>
                      <Box sx={{ 
                        width: '100%', 
                        height: 24, 
                        bgcolor: theme.palette.grey[200],
                        borderRadius: 12,
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <Box sx={{
                          position: 'absolute',
                          left: 0,
                          width: `${item.progress}%`,
                          height: '100%',
                          bgcolor: item.progress === 100 
                            ? theme.palette.success.main 
                            : item.progress >= 50
                            ? theme.palette.primary.main
                            : theme.palette.warning.main,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          pr: 2,
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          background: item.progress === 100 
                            ? `linear-gradient(90deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`
                            : item.progress >= 50
                            ? `linear-gradient(90deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`
                            : `linear-gradient(90deg, ${theme.palette.warning.light} 0%, ${theme.palette.warning.main} 100%)`
                        }}>
                          {item.progress > 0 && `${item.progress}%`}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Additional Features Section */}
        <Box sx={{ 
          backgroundColor: theme.palette.grey[50], 
          borderRadius: theme.shape.borderRadius,
          p: 4,
          mb: 6,
          border: `1px solid ${theme.palette.divider}`
        }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 700, 
              mb: 4,
              textAlign: 'center',
              color: theme.palette.primary.dark,
              letterSpacing: '-0.5px'
            }}
          >
            Comprehensive Scheduling Features
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ 
                textAlign: 'center', 
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Avatar sx={{ 
                  bgcolor: theme.palette.primary.light, 
                  color: theme.palette.primary.dark,
                  width: 72,
                  height: 72,
                  mb: 3,
                  boxShadow: theme.shadows[4]
                }}>
                  <CalendarIcon fontSize="large" />
                </Avatar>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 1.5 }}>
                  Calendar Management
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                  Visualize and manage academic schedules with our interactive calendar interface.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ 
                textAlign: 'center', 
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Avatar sx={{ 
                  bgcolor: theme.palette.success.light, 
                  color: theme.palette.success.dark,
                  width: 72,
                  height: 72,
                  mb: 3,
                  boxShadow: theme.shadows[4]
                }}>
                  <TimelineIcon fontSize="large" />
                </Avatar>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 1.5 }}>
                  Timeline Planning
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                  Plan and track academic milestones with our visual timeline tools.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ 
                textAlign: 'center', 
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Avatar sx={{ 
                  bgcolor: theme.palette.info.light, 
                  color: theme.palette.info.dark,
                  width: 72,
                  height: 72,
                  mb: 3,
                  boxShadow: theme.shadows[4]
                }}>
                  <GanttIcon fontSize="large" />
                </Avatar>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 1.5 }}>
                  Resource Allocation
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                  Optimize room and faculty assignments with our Gantt chart visualizations.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default StudentHome;