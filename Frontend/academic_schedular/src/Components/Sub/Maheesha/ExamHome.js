import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

const ExamCoordinator  = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper', textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom>
                    Exam Coordinator Dashboard
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Manage exam schedules, assign invigilators, and allocate rooms efficiently.
                </Typography>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button variant="contained" color="primary">View Exam Schedules</Button>
                    <Button variant="outlined" color="secondary">Add Exam Schedule</Button>
                </Box>
            </Box>
        </Container>
    );
}

export default ExamCoordinator;
