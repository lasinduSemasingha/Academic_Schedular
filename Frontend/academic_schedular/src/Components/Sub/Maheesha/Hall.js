import React, { useState } from "react";
import { Box, Typography, Paper, Grid, TextField, MenuItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Hall() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        hallId: "",
        hallName: "",
        capacity: "",
        hallLocation: "",
        facilities: "",
        assignedExam: "",
        invigilator: "",
        status: "",
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        if (!formData.facilities) tempErrors.facilities = "Facilities are required!";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        let hallList = JSON.parse(localStorage.getItem("halls")) || [];
        hallList.push(formData);
        localStorage.setItem("halls", JSON.stringify(hallList));
        navigate("/hall/HallTable");
    };

    return (
        <Box sx={{ textAlign: "center", py: 6 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Hall Management
                </Typography>
                <form className="hallform" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Hall ID"
                                name="hallId"
                                variant="outlined"
                                required
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Hall Name"
                                name="hallName"
                                variant="outlined"
                                required
                                onChange={handleChange}
                            >
                                {["A012", "A013", "A014", "A015", "A016", "A017", "A018", "A019", "A020"].map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Capacity"
                                name="capacity"
                                variant="outlined"
                                required
                                onChange={handleChange}
                            >
                                {[30, 50, 100, 150, 200].map((cap) => (
                                    <MenuItem key={cap} value={cap}>
                                        {cap}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Location"
                                name="hallLocation"
                                variant="outlined"
                                required
                                onChange={handleChange}
                            >
                                <MenuItem value="Main Building">Main Building</MenuItem>
                                <MenuItem value="New Building">New Building</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Facilities"
                                name="facilities"
                                variant="outlined"
                                required
                                error={!!errors.facilities}
                                helperText={errors.facilities}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Assigned Exam"
                                name="assignedExam"
                                variant="outlined"
                                required
                                onChange={handleChange}
                            >
                                {["IT Exam", "English Exam", "Engineering Exam", "Arts Exam"].map((exam) => (
                                    <MenuItem key={exam} value={exam}>
                                        {exam}
                                    </MenuItem>
                                ))}
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
                                select
                                fullWidth
                                label="Status"
                                name="status"
                                variant="outlined"
                                required
                                onChange={handleChange}
                            >
                                <MenuItem value="Available">Available</MenuItem>
                                <MenuItem value="Occupied">Occupied</MenuItem>
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

export default Hall;
