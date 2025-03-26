import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const getCompletedExamsCount = (examData) => {
    const today = new Date().toISOString().split('T')[0];
    return examData.filter(exam => exam.date < today).length;
};

const getToBeCompletedExamsCount = (examData) => {
    const today = new Date().toISOString().split('T')[0];
    return examData.filter(exam => exam.date >= today).length;
};

const examData = [
    { subject: "Information Management", date: "2025-03-25", time: "9:00 AM - 12:00 PM" },
    { subject: "Cyber Security", date: "2025-03-26", time: "1:00 PM - 4:00 PM" },
    { subject: "Network Management", date: "2025-03-20", time: "1:00 PM - 4:00 PM" }
];

const completedExamsCount = getCompletedExamsCount(examData);
const toBeCompletedExamsCount = getToBeCompletedExamsCount(examData);

const ExamCoordinator = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            {/* Home Page Image */}
            <Box sx={{ mt: 3, mb: 3, display: 'flex', justifyContent: 'center' }}>
                <img src="/Maheesha/design.png" alt="Exam Hall" style={{ width: '80%', borderRadius: '15px' }} />
            </Box>

            {/* Dashboard Box */}
            <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper', textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom>Exam Coordinator Dashboard</Typography>
                <Typography variant="h6" gutterBottom>Manage exam schedules, invigilators, and hall allocations efficiently.</Typography>
                <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
                    <Button variant="contained" color="primary" onClick={() => navigate('/exam/ExamTable')}>View Exam Schedules</Button>
                    <Button variant="outlined" color="secondary" onClick={() => navigate('/exam')}>Add Exam Schedule</Button>
                    <Button variant="contained" color="primary" onClick={() => navigate('/invigilator/InvigilatorTable')}>View Invigilators</Button>
                    <Button variant="outlined" color="secondary" onClick={() => navigate('/invigilator')}>Add Invigilators</Button>
                    <Button variant="contained" color="primary" onClick={() => navigate('/hall/HallTable')}>View Hall Allocations</Button>
                    <Button variant="outlined" color="secondary" onClick={() => navigate('/hall')}>Add Hall Allocation</Button>
                </Box>
            </Box>

            {/* Exam Timetable Details */}
            <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper', textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>Exam Timetable Details</Typography>
                <Grid container spacing={2} justifyContent="center">
                    {examData.map((exam, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box sx={{ bgcolor: 'lightgray', p: 2, borderRadius: 2, boxShadow: 2, textAlign: 'center' }}>
                                <Typography variant="h6">{exam.subject}</Typography>
                                <Typography variant="body1">Date: {exam.date}</Typography>
                                <Typography variant="body1">Time: {exam.time}</Typography>
                                <Button variant="outlined" color="primary" sx={{ mt: 2 }}>View Details</Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Completed and To Be Completed Exams Count */}
            <Box sx={{ mt: 3, textAlign: 'center', p: 2, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6">Completed Exams Count: {completedExamsCount}</Typography>
                <Typography variant="h6">To Be Completed Exams Count: {toBeCompletedExamsCount}</Typography>
            </Box>
        </Container>
    );
};

export default ExamCoordinator;
