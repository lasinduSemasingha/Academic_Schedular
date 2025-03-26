import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Grid, TextField, MenuItem, Button } from "@mui/material";

function EditInvigilator() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        invigilatorId: "",
        invigilatorName: "",
        location: "",
    });
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("editInvigilator")) || [];
        if (storedData) {
            setFormData({
                invigilatorId: storedData.invigilatorId,
                invigilatorName: storedData.invigilatorName,
                location: storedData.location,
            });
            setEditIndex(storedData.index);
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let invigilatorList = JSON.parse(localStorage.getItem("invigilators")) || [];
        if (editIndex !== null) {
            invigilatorList[editIndex] = formData;
        }
        localStorage.setItem("invigilators", JSON.stringify(invigilatorList));
        navigate("/invigilator/InvigilatorTable");
    };

    return (
        <Box sx={{ textAlign: "center", py: 6 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Edit Invigilator
                </Typography>
                <form className="invigilator-form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Invigilator ID" name="invigilatorId" variant="outlined" required value={formData.invigilatorId}  />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Invigilator Name" name="invigilatorName" variant="outlined" required value={formData.invigilatorName} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField select fullWidth label="Location" name="location" variant="outlined" required value={formData.location} onChange={handleChange}>
                                <MenuItem value="Main Building">Main Building</MenuItem>
                                <MenuItem value="New Building">New Building</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}

export default EditInvigilator;
