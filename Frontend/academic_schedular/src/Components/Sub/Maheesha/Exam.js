import React, { useState } from "react";
import { Box, Typography, Paper, Grid, TextField, MenuItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Exam() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        examId: "",
        examType: "",
        location: "",
        examDate: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Retrieve the existing exams from localStorage or initialize it as an empty array
        let examList = JSON.parse(localStorage.getItem("exams")) || [];
        // Add the new exam to the examList
        examList.push(formData);
        // Save the updated list back to localStorage
        localStorage.setItem("exams", JSON.stringify(examList));
        // Redirect to the exam records table
        navigate("/exam/ExamTable");
    };

    return (
        <Box sx={{ textAlign: "center", py: 6 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Exam Management
                </Typography>
                <form className="examform" onSubmit={handleSubmit}>
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
                                fullWidth
                                label="Location"
                                name="location"
                                variant="outlined"
                                required
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Exam Date"
                                name="examDate"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                required
                                onChange={handleChange}
                            />
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
