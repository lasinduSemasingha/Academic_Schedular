import React from "react";
import { Container, Typography, Box, Paper, Button, Divider, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EngineeringExamInfo = () => {
    const navigate = useNavigate();

    const examDetails = {
        subject: "Engineering",
        date: "2025-03-25",
        time: "9:00 AM - 12:00 PM",
        duration: "3 Hours",
        hall: "Room 101, Main Building",
        invigilators: ["Dr. John Doe", "Prof. Alice Smith"],
        instructions: [
            "Arrive 30 minutes before the exam.",
            "Bring your student ID and necessary stationery.",
            "No electronic devices allowed inside the exam hall.",
            "Follow invigilator instructions carefully."
        ]
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom color="primary" textAlign="center">
                    Engineering Exam Details
                </Typography>

                
                <Divider sx={{ mb: 2 }} />

                <Typography variant="body1" textAlign="center"><strong>Date:</strong> {examDetails.date}</Typography>
                <Typography variant="body1" textAlign="center"><strong>Time:</strong> {examDetails.time}</Typography>
                <Typography variant="body1" textAlign="center"><strong>Duration:</strong> {examDetails.duration}</Typography>
                <Typography variant="body1" textAlign="center"><strong>Hall:</strong> {examDetails.hall}</Typography>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Invigilators</Typography>
                    <ul>
                        {examDetails.invigilators.map((invigilator, index) => (
                            <li key={index}><Typography variant="body1">{invigilator}</Typography></li>
                        ))}
                    </ul>
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Instructions</Typography>
                    <ul>
                        {examDetails.instructions.map((instruction, index) => (
                            <li key={index}><Typography variant="body1">{instruction}</Typography></li>
                        ))}
                    </ul>
                </Box>

                <Box sx={{ textAlign: "center", mt: 4 }}>
                    <Button variant="contained" color="primary" onClick={() => navigate("/examHome")}>
                        Back to Dashboard
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default EngineeringExamInfo;
