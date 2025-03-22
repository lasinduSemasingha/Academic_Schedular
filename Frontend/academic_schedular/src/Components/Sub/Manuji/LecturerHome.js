import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

const LecturerHome = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper', textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom>
                    Welcome to Lecturer Management System
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Manage lecturer details, view profiles, and update information seamlessly.
                </Typography>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button variant="contained" color="primary">View Lecturers</Button>
                    <Button variant="outlined" color="secondary">Add Lecturer</Button>
                </Box>
            </Box>
        </Container>
    );
}

export default LecturerHome;
