import React, { useState } from "react";
import { Box, Typography, Paper, Grid, TextField, MenuItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Hall() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        hallId: "",
        hallName: "",
        hallLocation: "",
        hallDate: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Retrieve existing halls from localStorage or initialize an empty array
        let hallList = JSON.parse(localStorage.getItem("halls")) || [];
        // Add the new hall data
        hallList.push(formData);
        // Save the updated list back to localStorage
        localStorage.setItem("halls", JSON.stringify(hallList));
        // Redirect to the hall records table
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
                                <MenuItem value="A012">A012</MenuItem>
                                <MenuItem value="A013">A013</MenuItem>
                                <MenuItem value="A014">A014</MenuItem>
                                <MenuItem value="A015">A015</MenuItem>
                                <MenuItem value="A016">A016</MenuItem>
                                <MenuItem value="A017">A017</MenuItem>
                                <MenuItem value="A018">A018</MenuItem>
                                <MenuItem value="A019">A019</MenuItem>
                                <MenuItem value="A020">A020</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Hall Location"
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
                                label="Hall Date"
                                name="hallDate"
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

export default Hall;
