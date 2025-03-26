import React, { useState } from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardMedia, Paper } from '@mui/material';

const StudentHome = () => {
    // Set the initial date to the current month and year
    const [currentDate, setCurrentDate] = useState(new Date());

    const upcomingEvents = [
        { title: "AI & Data Science Workshop", date: "2025-04-05", description: "Dive deep into the latest trends in AI and machine learning.", image: "./kaveesha/AI.jpg" },
        { title: "Your Future Starts Here", date: "2025-04-10", description: "Explore career opportunities and internships at top companies.", image: "./kaveesha/internship.jpg" },
        { title: "Career Development Seminar", date: "2025-04-15", description: "Learn valuable career development tips for your professional journey.", image: "./kaveesha/career.jpg" },
        { title: "Celebrating Success", date: "2025-05-20", description: "Celebrate the achievements of our graduates.Let’s come together to applaud their success", image: "./kaveesha/graduation.jpg" },
        { title: "Tech Talk: Future of Blockchain", date: "2025-06-01", description: "Join industry leaders for a discussion on the future of blockchain technology.", image: "./kaveesha/techtalk.jpg" },
        { title: "Digital Marketing Workshop", date: "2025-06-10", description: "Enhance your skills in digital marketing and social media strategies.", image: "./kaveesha/digital.jpg" }
    
    ];

    const generateCalendar = (date) => {
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const calendarDays = [];
        for (let day = 1; day <= daysInMonth; day++) {
            calendarDays.push(day);
        }
        return calendarDays;
    };

    // Convert event dates to a set of day numbers for easier lookup
    const eventDays = new Set(upcomingEvents.map(event => new Date(event.date).getDate()));

    const calendarDays = generateCalendar(currentDate);

    // Format the month and year
    const formatMonthYear = (date) => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];
        return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    };

    // Move to the next month
    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    // Move to the previous month
    const goToPrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    return (
        <Container maxWidth="lg" disableGutters display>
            {/* Header Section */}
            <Box sx={{ 
                
                 width: '100%', // Full viewport width
                 height: '400px',
                 overflow: 'hidden',
                 }}>
                <img
                    src="./kaveesha/student.jpg"
                    alt="Student Management"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100vw', 
                        height: '450px', 
                        marginTop:'64px',
                        objectFit: 'cover',
                        objectPosition: 'left', 

                    }}
                />
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', bgcolor: 'rgba(0, 0, 0, 0.5)', p: 1 }}>
                    <Typography variant="h4" sx={{ fontSize:'40px' ,color: 'white', fontWeight: 'bold', m: 0, p: 0 }}>
                        Your Learning Journey, Well Organized
                    </Typography>
                </Box>
            </Box>
            <br />
            {/* Student Management Description */}
            <Box sx={{ textAlign: 'center', my: 2, mx: 'auto', maxWidth: '1000px' }}>
                <Typography variant="h5" sx={{ fontSize:'35px',fontWeight: 'bold', mb: 1 }}><br />Student Management <br /><br /></Typography>
                <Typography variant="body1" sx={{ m: 0, p: 0 }}>
                Streamline your educational operations with our powerful Student Management system. Effortlessly manage student records, track academic progress, and simplify administrative tasks—all in one easy-to-use platform. Add new students, access detailed profiles, and monitor learning journeys with just a few clicks. Empower your institution with an intuitive, centralized solution for effective student management.<br /><br />
                </Typography>
            </Box>

            {/* Action Cards */}
            <Grid container spacing={2} justifyContent="center" sx={{ mx: 'auto', maxWidth: '900px' }}>
                <Grid item xs={12} md={5}>
                    <Card sx={{ boxShadow: 3, p: 0, m: 0 }}>
                        <CardContent sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Explore and Manage Student Profiles with Ease</Typography>
                            <Typography variant="body2" sx={{ m: 0, p: 0 }}>The View Student section provides a centralized hub for accessing detailed student profiles. Easily search, filter, and review student information.</Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 2 }} >View Students</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Card sx={{ boxShadow: 3, p: 0, m: 0 }}>
                        <CardContent sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Seamless Student Enrollment in Just a Few Clicks</Typography>
                            <Typography variant="body2" sx={{ m: 0, p: 0 }}>The Add Student feature simplifies the student registration process. Quickly input essential student details and assign courses.</Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 2 }}>Add Student</Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Latest News & Upcoming Events with Photos */}
            <Box sx={{ mt: 4, textAlign: 'center', p: 2, maxWidth: '100vw', mx: 'auto' }}>
                <Typography variant="h5" sx={{ fontSize:'35px',fontWeight: 'bold', mb: 1 }}>Latest News and Updates</Typography>
                <Typography variant="body1" sx={{ m: 0, p: 0 }}>Stay updated with upcoming events and announcements.</Typography>
                
                <Grid container spacing={3} sx={{ mt: 3 }}>
                    {/* News Items */}
                    {upcomingEvents.map((event, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ boxShadow: 3 }}>
                            <CardMedia
                                    component="img"
                                    height="200"
                                    image={event.image}
                                    alt={event.title}
                                />
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        {event.title}
                                    </Typography>
                                    <Typography variant="body2">
                                        {event.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Calendar and Upcoming Events Section */}
            <Box sx={{ mt: 4, textAlign: 'center', maxWidth: '100vw', mx: 'auto' }}>
                <Typography variant="h5" sx={{fontSize:'35px', fontWeight: 'bold', mb: 1 }}>Upcoming Events</Typography>
                <Typography variant="body1" sx={{ m: 0, p: 0 }}>Check out the upcoming events on the calendar:<br/><br/></Typography>

                {/* Calendar Controls */}
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button onClick={goToPrevMonth} variant="contained" sx={{ mr: 2 }}>Previous</Button>
                    <Typography variant="h6">{formatMonthYear(currentDate)}</Typography>
                    <Button onClick={goToNextMonth} variant="contained" sx={{ ml: 2 }}>Next</Button>
                </Box>
                <br/>
                {/* Simple Calendar Layout */}
                <Grid container spacing={1} justifyContent="center" sx={{ mt: 3 }}>
                    {calendarDays.map((day, index) => (
                        <Grid item xs={1} key={index}>
                            <Paper
                                sx={{
                                    p: 1,
                                    textAlign: 'center',
                                    borderRadius: 2,
                                    backgroundColor: eventDays.has(day) ? '#f44336' : '#f4f4f4',
                                    color: eventDays.has(day) ? '#fff' : 'inherit',
                                    boxShadow: 1,
                                    cursor: 'pointer',
                                    '&:hover': { backgroundColor: eventDays.has(day) ? '#e53935' : '#ddd' }
                                }}
                            >
                                <Typography variant="body2">{day}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                <br/>
                {/* Event Details */}
                <Grid container spacing={3} sx={{ mt: 3 }}>
                    {upcomingEvents.map((event, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ boxShadow: 3 }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        {event.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 2 }}>
                                        {event.description}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                                        Date: {event.date}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <br/> <br/>
            </Box>

        </Container>
    );
};

export default StudentHome;
