import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, TextField, MenuItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function EditExam() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        examId: "",
        examType: "",
        location: "",
        examDate: "",
    });
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const storedExam = JSON.parse(localStorage.getItem("editExam"));
        if (storedExam) {
            setFormData({
                examId: storedExam.examId,
                examType: storedExam.examType,
                location: storedExam.location,
                examDate: storedExam.examDate,
            });
            setEditIndex(storedExam.index);
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let examList = JSON.parse(localStorage.getItem("exams")) || [];
        if (editIndex !== null) {
            examList[editIndex] = formData;
        }
        localStorage.setItem("exams", JSON.stringify(examList));
        navigate("/exam/ExamTable");
    };

    return (
        <Box sx={{ textAlign: "center", py: 6 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Edit Exam
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Exam ID" name="examId" variant="outlined" required value={formData.examId} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField select fullWidth label="Exam Type" name="examType" variant="outlined" required value={formData.examType} onChange={handleChange}>
                                <MenuItem value="Midterm">Midterm</MenuItem>
                                <MenuItem value="Final">Final</MenuItem>
                                <MenuItem value="Quiz">Quiz</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField select fullWidth label="Location" name="location" variant="outlined" required value={formData.location} onChange={handleChange}>
                                <MenuItem value="Main Hall">Main Hall</MenuItem>
                                <MenuItem value="Room 101">Room 101</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Exam Date" name="examDate" type="date" InputLabelProps={{ shrink: true }} variant="outlined" required value={formData.examDate} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Update Exam
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}

export default EditExam;