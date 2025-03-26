import React, { useState } from "react";
import { Box, Typography, Paper, Grid, TextField, MenuItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Invigilator() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        invigilatorId: "",
        invigilatorName: "",
        location: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let invigilatorList = JSON.parse(localStorage.getItem("invigilators")) || [];
        invigilatorList.push(formData);
        localStorage.setItem("invigilators", JSON.stringify(invigilatorList));
        navigate("/invigilator/InvigilatorTable");
    };

    return (
        <Box sx={{ textAlign: "center", py: 6 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Invigilator Management
                </Typography>
                <form className="invigilator-form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth 
                            label="Invigilator ID" 
                            name="invigilatorId" 
                            variant="outlined" 
                            required 
                            onChange={handleChange} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth 
                            label="Invigilator Name" 
                            name="invigilatorName" 
                            variant="outlined" 
                            required 
                            onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField select fullWidth 
                            label="Location" 
                            name="location" 
                            variant="outlined" 
                            required 
                            onChange={handleChange}
                            >
                                <MenuItem value="Main Building">Main Building</MenuItem>
                                <MenuItem value="New Building">New Building</MenuItem>
                            </TextField>
                        </Grid>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                        </Button>

                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}

export default Invigilator;
