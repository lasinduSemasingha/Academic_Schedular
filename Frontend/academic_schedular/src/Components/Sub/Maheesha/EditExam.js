import React, { useState, useEffect } from "react";
import {
    Box, Typography, Paper, Grid, TextField, MenuItem, Button
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

function EditExam() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        examtype: "",
        subject: "",
        datetime: "",
        duration: "",
        examhall: "",
        invigilator: "",
        marks: "",
        status: "Scheduled",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [allExams, setAllExams] = useState([]);

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const res = await fetch(`https://localhost:7003/exam/${id}`);
                if (!res.ok) throw new Error("Failed to fetch exam data");
                const data = await res.json();
                console.log("Data: ",data);
                setFormData({
                    examtype: data.data.examtype || "",
                    subject: data.data.subject || "",
                    datetime: data.data.datetime || "",
                    duration: data.data.duration,
                    examhall: data.data.examhall || "",
                    invigilator: data.data.invigilator || "",
                    marks: data.data.marks || "",
                    status: data.data.status || "Scheduled",
                });
            } catch (err) {
                console.error(err);
                alert("Error fetching exam data.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchExam();
    }, [id]);
    

    const validateForm = () => {
        const newErrors = {};
        const startTime = new Date(formData.datetime);
        const duration = parseFloat(formData.duration);
        const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);

        if (!formData.examtype) newErrors.examtype = "Exam Type is required";
        if (!formData.subject) newErrors.subject = "Subject is required";
        if (!formData.datetime) newErrors.datetime = "Date & Time is required";
        if (!formData.duration || isNaN(duration) || duration <= 0)
            newErrors.duration = "Valid Duration is required";
        if (!formData.examhall) newErrors.examhall = "Exam Hall is required";
        if (!formData.invigilator.trim()) newErrors.invigilator = "Invigilator is required";
        if (!formData.marks || isNaN(formData.marks) || formData.marks <= 0)
            newErrors.marks = "Valid Total Marks is required";

        // Conflict check
        const overlapping = allExams.find(exam => {
            const examStart = new Date(exam.datetime);
            const examEnd = new Date(examStart.getTime() + exam.duration * 60 * 60 * 1000);

            const overlaps = startTime < examEnd && endTime > examStart;

            return (
                (exam.examhall === formData.examhall && overlaps) ||
                (exam.invigilator === formData.invigilator && overlaps)
            );
        });

        if (overlapping) {
            if (overlapping.examhall === formData.examhall) {
                newErrors.examhall = `Conflict: ${formData.examhall} is already booked.`;
            }
            if (overlapping.invigilator === formData.invigilator) {
                newErrors.invigilator = `Conflict: ${formData.invigilator} is already assigned.`;
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const res = await fetch(`https://localhost:7003/exam/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to update exam");

            navigate("/exam/ExamTable");
        } catch (err) {
            console.error(err);
            alert("Error updating exam.");
        }
    };

    if (loading) return <Typography variant="h6" textAlign="center">Loading...</Typography>;

    return (
        <Box sx={{ textAlign: "center", py: 6, px: 3, maxWidth: 1000, margin: "0 auto" }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Edit Exam
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                select fullWidth label="Exam Type" name="examtype"
                                value={formData.examtype} onChange={handleChange}
                                error={!!errors.examtype} helperText={errors.examtype}
                            >
                                <MenuItem value="Midterm">Midterm</MenuItem>
                                <MenuItem value="Final">Final</MenuItem>
                                <MenuItem value="Quiz">Quiz</MenuItem>
                                <MenuItem value="Assignment">Assignment</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select fullWidth label="Subject" name="subject"
                                value={formData.subject} onChange={handleChange}
                                error={!!errors.subject} helperText={errors.subject}
                            >
                                <MenuItem value="Arts">Arts</MenuItem>
                                <MenuItem value="English">English</MenuItem>
                                <MenuItem value="Engineering">Engineering</MenuItem>
                                <MenuItem value="IT">IT</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth type="datetime-local" label="Exam Date & Time" name="datetime"
                                value={formData.datetime} onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.datetime} helperText={errors.datetime}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth type="number" label="Duration (hours)" name="duration"
                                value={formData.duration} onChange={handleChange}
                                error={!!errors.duration} helperText={errors.duration}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Exam Hall"
                                name="examHall"
                                variant="outlined"
                                required
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth label="Invigilator" name="invigilator"
                                value={formData.invigilator} onChange={handleChange}
                                error={!!errors.invigilator} helperText={errors.invigilator}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth type="number" label="Total Marks" name="marks"
                                value={formData.marks} onChange={handleChange}
                                error={!!errors.marks} helperText={errors.marks}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select fullWidth label="Status" name="status"
                                value={formData.status} onChange={handleChange}
                            >
                                <MenuItem value="Scheduled">Scheduled</MenuItem>
                                <MenuItem value="Canceled">Canceled</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
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
