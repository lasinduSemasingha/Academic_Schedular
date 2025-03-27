import React, { useState, useEffect } from "react";
import { 
    Box, Typography, Paper, Grid, TextField, MenuItem, Button 
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function EditExam() {
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
    const [editIndex, setEditIndex] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const storedExam = JSON.parse(localStorage.getItem("editExam"));
        if (storedExam) {
            setFormData({
                examId: storedExam.examId,
                examType: storedExam.examType,
                subject: storedExam.subject,
                examDate: storedExam.examDate,
                duration: storedExam.duration,
                examHall: storedExam.examHall,
                invigilator: storedExam.invigilator,
                totalMarks: storedExam.totalMarks,
                status: storedExam.status || "Scheduled",
            });
            setEditIndex(storedExam.index);
        }
    }, []);

    const validateForm = () => {
        let newErrors = {};
        if (!formData.examId.trim()) {
            newErrors.examId = "Exam ID is required";
        }
        if (!formData.examType) {
            newErrors.examType = "Exam Type is required";
        }
        if (!formData.subject) {
            newErrors.subject = "Subject is required";
        }
        if (!formData.examDate) {
            newErrors.examDate = "Exam Date & Time is required";
        }
        if (!formData.duration || isNaN(formData.duration) || formData.duration <= 0) {
            newErrors.duration = "Valid Duration is required";
        }
        if (!formData.examHall) {
            newErrors.examHall = "Exam Hall is required";
        }
        if (!formData.invigilator.trim()) {
            newErrors.invigilator = "Invigilator name is required";
        }
        if (!formData.totalMarks || isNaN(formData.totalMarks) || formData.totalMarks <= 0) {
            newErrors.totalMarks = "Valid Total Marks is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

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
                            <TextField 
                                fullWidth 
                                label="Exam ID" 
                                name="examId" 
                                variant="outlined" 
                                required 
                                value={formData.examId} 
                                onChange={handleChange}
                                error={!!errors.examId}
                                helperText={errors.examId}
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
                                value={formData.examType} 
                                onChange={handleChange}
                                error={!!errors.examType}
                                helperText={errors.examType}
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
                                value={formData.subject} 
                                onChange={handleChange}
                                error={!!errors.subject}
                                helperText={errors.subject}
                            >
                                <MenuItem value="Arts">Arts</MenuItem>
                                <MenuItem value="English">English</MenuItem>
                                <MenuItem value="Engineering">Engineering</MenuItem>
                                <MenuItem value="IT">IT</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth 
                                label="Exam Date & Time" 
                                name="examDate" 
                                type="datetime-local" 
                                InputLabelProps={{ shrink: true }} 
                                variant="outlined" 
                                required 
                                value={formData.examDate} 
                                onChange={handleChange}
                                error={!!errors.examDate}
                                helperText={errors.examDate}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth 
                                label="Duration (minutes)" 
                                name="duration" 
                                type="number" 
                                variant="outlined" 
                                required 
                                value={formData.duration} 
                                onChange={handleChange}
                                error={!!errors.duration}
                                helperText={errors.duration}
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
                                value={formData.examHall} 
                                onChange={handleChange}
                                error={!!errors.examHall}
                                helperText={errors.examHall}
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
                                value={formData.invigilator} 
                                onChange={handleChange}
                                error={!!errors.invigilator}
                                helperText={errors.invigilator}
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
                                value={formData.totalMarks} 
                                onChange={handleChange}
                                error={!!errors.totalMarks}
                                helperText={errors.totalMarks}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth 
                                label="Status (Optional)" 
                                name="status" 
                                variant="outlined" 
                                value={formData.status} 
                                onChange={handleChange}
                            >
                                <MenuItem value="Scheduled">Scheduled</MenuItem>
                                <MenuItem value="Canceled">Canceled</MenuItem>
                            </TextField>
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
