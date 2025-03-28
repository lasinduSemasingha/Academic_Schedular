import React, { useState } from "react";
import { Box, Typography, Paper, Grid, TextField, MenuItem, Button } from "@mui/material";

function Student() {
    // State to hold the form data
    const [formData, setFormData] = useState({
        name: "",
        studentId: "",
        email: "",
        contact: "",
        dob: "",
        address: "",
        faculty: "",
        year: "",
        semester: ""
    });

    // State to hold errors
    const [errors, setErrors] = useState({
        name: "",
        studentId: "",
        contact: "",
        email: ""
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "name") {
            // Validate name (no numbers allowed)
            if (/\d/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    name: "Name cannot contain numbers."
                }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
            }
        }
    
        if (name === "contact") {
            // Allow only numeric values and limit to 10 digits
            if (!/^[0-9]*$/.test(value) || value.length > 10) {
                return;
            }
        }
    
        if (name === "studentId") {
            // Block input if studentId exceeds 10 characters
            if (value.length > 10) {
                return;
            }
        }
    
        setFormData({
            ...formData,
            [name]: value
        });
    
        // Clear errors on input change
        setErrors({
            ...errors,
            [name]: ""
        });
    };

    // Validate form before submission
    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        // Validate student name (no numbers)
        if (/\d/.test(formData.name)) {
            newErrors.name = "Name cannot contain numbers.";
            isValid = false;
        }

        // Validate student ID (must be exactly 10 characters)
        if (formData.studentId.length !== 10) {
            newErrors.studentId = "Student ID must be exactly 10 characters.";
            isValid = false;
        }

        // Validate contact number (must be exactly 10 digits)
        if (formData.contact.length !== 10) {
            newErrors.contact = "Contact number must be exactly 10 digits.";
            isValid = false;
        }

        // Validate email (must contain "@")
        if (!formData.email.includes("@")) {
            newErrors.email = "Please enter a valid email with '@'.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(formData);
        }
    };

    return (
        <Box 
            sx={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                height: "100vh", 
                width: "100%", 
                py: 6
            }}
        >
            
            <Paper elevation={3} sx={{ padding: 4, textAlign: "center", width: "100%", maxWidth: "600px" }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Student Management
                </Typography>
                
                <form className="studentform" onSubmit={handleSubmit}>
                    <Grid container spacing={1.5}>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Student Name"
                                name="name"
                                variant="outlined"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Student ID"
                                name="studentId"
                                variant="outlined"
                                required
                                value={formData.studentId}
                                onChange={handleInputChange}
                                error={!!errors.studentId}
                                helperText={errors.studentId}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                variant="outlined"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Contact Number"
                                name="contact"
                                variant="outlined"
                                required
                                value={formData.contact}
                                onChange={handleInputChange}
                                error={!!errors.contact}
                                helperText={errors.contact}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Date of Birth"
                                name="dob"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                required
                                value={formData.dob}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                variant="outlined"
                                required
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ textAlign: "left" }}>
                            <TextField 
                                select 
                                fullWidth 
                                label="Faculty/Department" 
                                name="faculty" 
                                variant="outlined" 
                                required 
                                value={formData.faculty} 
                                onChange={handleInputChange} 
                            >
                                <MenuItem value="Faculty of Computing">Faculty of Computing</MenuItem>
                                <MenuItem value="Faculty of Engineering">Faculty of Engineering</MenuItem>
                                <MenuItem value="Faculty of Humanities and Sciences">Faculty of Humanities and Sciences</MenuItem>
                                <MenuItem value="School of Architecture">School of Architecture</MenuItem>
                                <MenuItem value="Faculty of Business">Faculty of Business</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sx={{ textAlign: "left" }}>
                            <TextField 
                                select 
                                fullWidth 
                                label="Academic Year" 
                                name="year" 
                                variant="outlined" 
                                required 
                                value={formData.year} 
                                onChange={handleInputChange} 
                            >
                                <MenuItem value="Year 1">Year 1</MenuItem>
                                <MenuItem value="Year 2">Year 2</MenuItem>
                                <MenuItem value="Year 3">Year 3</MenuItem>
                                <MenuItem value="Year 4">Year 4</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sx={{ textAlign: "left" }}>
                            <TextField 
                                select 
                                fullWidth 
                                label="Semester" 
                                name="semester" 
                                variant="outlined" 
                                required 
                                value={formData.semester} 
                                onChange={handleInputChange} 
                            >
                                <MenuItem value="Semester 1">Semester 1</MenuItem>
                                <MenuItem value="Semester 2">Semester 2</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" sx={{ width: "25%" }}>
                                Update
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}

export default Student;
