import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, TextField, MenuItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function EditHall() {
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
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const storedHall = JSON.parse(localStorage.getItem("editHall"));
        if (storedHall) {
            setFormData(storedHall);
            setEditIndex(storedHall.index);
        }
    }, []);

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
        if (editIndex !== null) {
            hallList[editIndex] = formData;
        }
        localStorage.setItem("halls", JSON.stringify(hallList));
        navigate("/hall/HallTable");
    };

    return (
        <Box sx={{ textAlign: "center", py: 6 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Edit Hall
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
                                value={formData.hallId}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField select fullWidth label="Hall Name" name="hallName" variant="outlined" required value={formData.hallName} onChange={handleChange}>
                                {["A012", "A013", "A014", "A015", "A016", "A017", "A018", "A019", "A020"].map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField select fullWidth label="Capacity" name="capacity" variant="outlined" required value={formData.capacity} onChange={handleChange}>
                                {[30, 50, 100, 150, 200].map((cap) => (
                                    <MenuItem key={cap} value={cap}>
                                        {cap}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField select fullWidth label="Location" name="hallLocation" variant="outlined" required value={formData.hallLocation} onChange={handleChange}>
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
                                value={formData.facilities}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField select fullWidth label="Assigned Exam" name="assignedExam" variant="outlined" required value={formData.assignedExam} onChange={handleChange}>
                                {["IT Exam", "Arts Exam", "English Exam", "Engineering Exam"].map((exam) => (
                                    <MenuItem key={exam} value={exam}>
                                        {exam}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Invigilator" name="invigilator" variant="outlined" required value={formData.invigilator} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField select fullWidth label="Status" name="status" variant="outlined" required value={formData.status} onChange={handleChange}>
                                <MenuItem value="Available">Available</MenuItem>
                                <MenuItem value="Occupied">Occupied</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Update Hall
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}

export default EditHall;
