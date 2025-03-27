import React, { useState } from "react";
import {
    Box, Typography, Paper, Grid, TextField, MenuItem, Button, Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Exam() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        examId: "",
        examType: "",
        subject: "",
        examDate: "",
        duration: "",
        examHall: "",
        invigilator: "",
        totalMarks: "",
        status: "Scheduled",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { examId, examType, subject, examDate, duration, examHall, invigilator, totalMarks } = formData;

        if (!examId.match(/^[a-zA-Z0-9]+$/)) return "Exam ID must be alphanumeric.";
        if (!examType) return "Exam Type is required.";
        if (!subject.trim()) return "Subject is required.";
        if (!examDate || new Date(examDate) < new Date()) return "Exam Date must be in the future.";
        if (!duration || isNaN(duration) || duration <= 0) return "Duration must be a positive number.";
        if (!examHall.trim()) return "Exam Hall is required.";
        if (!invigilator.trim()) return "Invigilator is required.";
        if (!totalMarks || isNaN(totalMarks) || totalMarks < 1 || totalMarks > 100) return "Total Marks must be between 1 and 100.";

        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        let examList = JSON.parse(localStorage.getItem("exams")) || [];
        examList.push(formData);
        localStorage.setItem("exams", JSON.stringify(examList));

        navigate("/exam/ExamTable");
    };

    return (
        <Box sx={{ textAlign: "center", py: 6 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Exam Management
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Exam ID"
                                name="examId"
                                variant="outlined"
                                required
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Exam Type"
                                name="examType"
                                variant="outlined"
                                required
                                onChange={handleChange}
                            >
                                <MenuItem value="Midterm">Midterm</MenuItem>
                                <MenuItem value="Final">Final</MenuItem>
                                <MenuItem value="Quiz">Quiz</MenuItem>
                                <MenuItem value="Assignment">Assignment</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Subject"
                                name="subject"
                                variant="outlined"
                                required
                                onChange={handleChange}
                            >
                                <MenuItem value="English">English</MenuItem>
                                <MenuItem value="Arts">Arts</MenuItem>
                                <MenuItem value="Engineering">Engineering</MenuItem>
                                <MenuItem value="IT">IT</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Date & Time"
                                name="examDate"
                                type="datetime-local"
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                required
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Duration (hours)"
                                name="duration"
                                type="number"
                                variant="outlined"
                                required
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Exam Hall"
                                name="examHall"
                                variant="outlined"
                                required
                                onChange={handleChange}
                            >
                                <MenuItem value="A12">A12</MenuItem>
                                <MenuItem value="A13">A13</MenuItem>
                                <MenuItem value="A14">A14</MenuItem>
                                <MenuItem value="A15">A15</MenuItem>
                                <MenuItem value="A16">A16</MenuItem>
                                <MenuItem value="A17">A17</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Invigilator"
                                name="invigilator"
                                variant="outlined"
                                required
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Total Marks"
                                name="totalMarks"
                                type="number"
                                variant="outlined"
                                required
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Status"
                                name="status"
                                variant="outlined"
                                onChange={handleChange}
                                value={formData.status}
                            >
                                <MenuItem value="Scheduled">Scheduled</MenuItem>
                                <MenuItem value="Canceled">Canceled</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}

export default Exam;
