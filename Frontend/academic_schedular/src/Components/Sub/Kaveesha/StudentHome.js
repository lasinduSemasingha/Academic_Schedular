
import { Container, Typography, Box, Button, Grid, Card, CardContent, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const StudentHome = () => {
    
    // Sample Data
    const totalStudents = 250;
    const activeStudents = 200;
    const inactiveStudents = totalStudents - activeStudents;
    const upcomingEvents = [
        { title: "Midterm Exams", date: "2025-04-10", description: "Prepare for the exams covering all subjects." },
        { title: "Final Project Submission", date: "2025-04-20", description: "Submit final projects for evaluation." },
        { title: "End-Semester Exams", date: "2025-05-05", description: "Final exams for the semester begin." }
    ];

    // Calculate progress for active and inactive students
    const activeProgress = (activeStudents / totalStudents) * 100;
    const inactiveProgress = (inactiveStudents / totalStudents) * 100;
    const totalProgress = 100; // Total students enrolled is 100%

    // Use useNavigate hook to programmatically navigate to the student page
    const navigate = useNavigate();

    // Function to handle the Add Student button click
    const handleAddStudentClick = () => {
        navigate('/student'); // Navigates to the /student route
    };

    // Function to handle the View Students button click
    const handleViewStudentsClick = () => {
        navigate('/studenttable'); // Navigates to the /studenttable route
    };

    return (
        <Container maxWidth="lg">
            {/* Header Section */}
            <Box sx={{ width: '100%', height: '400px', overflow: 'hidden' }}>
                <img
                    src="./kaveesha/student.jpg"
                    alt="Student Management"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100vw', 
                        height: '450px', 
                        marginTop: '64px',
                        objectFit: 'cover',
                        objectPosition: 'left'
                    }}
                />
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', bgcolor: 'rgba(0, 0, 0, 0.5)', p: 1 }}>
                    <Typography variant="h4" sx={{ fontSize: '40px', color: 'white', fontWeight: 'bold' }}>
                        Your Learning Journey, Well Organized
                    </Typography>
                </Box>
            </Box>
            <br />
            <br/>
            {/* Student Management Section */}
            <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="h5" sx={{ fontSize: '35px', fontWeight: 'bold', mb: 1 }}>Streamlining Student Enrollment</Typography>
                <Typography variant="body1" sx={{ maxWidth: '800px', mx: 'auto' }}>
                    Streamline your educational operations with our powerful Student Management system. Effortlessly manage student records, track academic progress, and simplify administrative tasks—all in one easy-to-use platform. Add new students, access detailed profiles, and monitor learning journeys with just a few clicks. Empower your institution with an intuitive, centralized solution for effective student management.
                </Typography>
            </Box>
            <br/><br/>
            {/* Action Cards */}
            <Grid container spacing={2} justifyContent="center" sx={{ mx: 'auto', maxWidth: '900px' }}>
                <Grid item xs={12} md={6}>
                    <Card sx={{
                        boxShadow: 3,
                        p: 0,
                        m: 0,
                        '&:hover': {
                            boxShadow: 6,
                            transform: 'scale(1.05)', 
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease' 
                        }
                    }}>
                        <CardContent sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Explore and Manage Student Profiles with Ease</Typography>
                            <Typography variant="body2" sx={{ m: 0, p: 0 }}>The View Student section provides a centralized hub for accessing detailed student profiles. Easily search, filter, and review student information.</Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleViewStudentsClick}>View Students</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{
                        boxShadow: 3,
                        p: 0,
                        m: 0,
                        '&:hover': {
                            boxShadow: 6,
                            transform: 'scale(1.05)', 
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease' 
                        }
                    }}>
                        <CardContent sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Seamless Student Enrollment in Just a Few Clicks</Typography>
                            <Typography variant="body2" sx={{ m: 0, p: 0 }}>The Add Student feature simplifies the student registration process. Quickly input essential student details and assign courses.</Typography>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                sx={{ mt: 2 }} 
                                onClick={handleAddStudentClick} // Adding click event handler
                            >
                                Add Student
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <br/><br/>
            {/* Student Overview Dashboard */}
            <Box sx={{ textAlign: 'center', my: 2, mx: 'auto', maxWidth: '1000px' }}>
                <Typography variant="h5" sx={{ fontSize: '35px', fontWeight: 'bold', mb: 1 }}>Student Overview Dashboard</Typography>
                <br/>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <Card sx={{ boxShadow: 3, textAlign: 'center', p: 2 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Students Enrolled</Typography>
                                <Typography variant="h4" color="primary">{totalStudents}</Typography>
                                <LinearProgress variant="determinate" value={totalProgress} sx={{ mt: 2 }} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ boxShadow: 3, textAlign: 'center', p: 2 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Active Students</Typography>
                                <Typography variant="h4" color="success.main">{activeStudents}</Typography>
                                <LinearProgress variant="determinate" value={activeProgress} sx={{ mt: 2 }} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ boxShadow: 3, textAlign: 'center', p: 2 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Inactive Students</Typography>
                                <Typography variant="h4" color="error.main">{inactiveStudents}</Typography>
                                <LinearProgress variant="determinate" value={inactiveProgress} sx={{ mt: 2 }} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Upcoming Academic Events */}
            <br/>
            <Box sx={{ mt: 4, textAlign: 'center', maxWidth: '100vw', mx: 'auto' }}>
                <Typography variant="h5" sx={{ fontSize: '35px', fontWeight: 'bold', mb: 1 }}>Upcoming Academic Events</Typography>
                <Typography variant="body1">Stay updated with the latest academic events and deadlines.</Typography>
                <Grid container spacing={3} sx={{ mt: 3 }}>
                    {upcomingEvents.map((event, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ 
                                boxShadow: 3, 
                                textAlign: 'center', 
                                p: 2,
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    boxShadow: 6,
                                    transform: 'scale(1.05)'
                                }
                            }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{event.title}</Typography>
                                    <Typography variant="body2">{event.description}</Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{event.date}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <br/>
        </Container>
    );
};

export default StudentHome;
