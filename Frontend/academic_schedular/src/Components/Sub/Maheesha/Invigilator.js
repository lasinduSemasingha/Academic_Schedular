import React, { useState } from "react";
import { Box, Typography, Paper, Grid, TextField, MenuItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Invigilator() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        invigilatorId: "",
        invigilatorName: "",
        contactNumber: "",
        email: "",
        position: "",
        department: "",
        qualification: "",
        certifications: "",
        location: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        contactNumber: ""
    });
    const [touched, setTouched] = useState({
        email: false,
        contactNumber: false
    });

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhoneNumber = (phone) => {
        const re = /^[0-9]{10,15}$/;
        return re.test(phone);
    };
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
        validateField(name, formData[name]);
    };
    const validateField = (name, value) => {
        let error = "";
        
        if (name === "email") {
            if (!value) {
                error = "Email is required";
            } else if (!validateEmail(value)) {
                error = "Please enter a valid email address";
            }
        }

        if (name === "contactNumber") {
            if (!value) {
                error = "Contact number is required";
            } else if (!validatePhoneNumber(value)) {
                error = "Please enter 10-15 digits";
            }
        }

        setErrors({ ...errors, [name]: error });
        return !error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    
        // Validate fields as user types
        if (name === "email") {
            if (value === "") {
                setErrors({...errors, email: "Email is required"});
            } else if (!validateEmail(value)) {
                setErrors({...errors, email: "Please enter a valid email address"});
            } else {
                setErrors({...errors, email: ""});
            }
        }

        if (name === "contactNumber") {
            if (value === "") {
                setErrors({...errors, contactNumber: "Contact number is required"});
            } else if (!validatePhoneNumber(value)) {
                setErrors({...errors, contactNumber: "Please enter a valid phone number (10 digits)"});
            } else {
                setErrors({...errors, contactNumber: ""});
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Mark all fields as touched to show errors
        const newTouched = {
            email: true,
            contactNumber: true
        };
        setTouched(newTouched);

        // Validate all fields
        const isEmailValid = validateField("email", formData.email);
        const isPhoneValid = validateField("contactNumber", formData.contactNumber);

        if (isEmailValid && isPhoneValid) {
            let invigilatorList = JSON.parse(localStorage.getItem("invigilators")) || [];
            invigilatorList.push(formData);
            localStorage.setItem("invigilators", JSON.stringify(invigilatorList));
            navigate("/invigilator/InvigilatorTable");
        }
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
                            <TextField
                                fullWidth
                                label="Invigilator ID"
                                name="invigilatorId"
                                variant="outlined"
                                required
                                value={formData.invigilatorId}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Invigilator Name"
                                name="invigilatorName"
                                variant="outlined"
                                required
                                value={formData.invigilatorName}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Contact Number"
                                name="contactNumber"
                                variant="outlined"
                                required
                                value={formData.contactNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.contactNumber &&!!errors.contactNumber}
                                helperText={touched.contactNumber && errors.contactNumber}
                                inputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                    maxLength: 10
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                variant="outlined"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                            />
                            {touched.email && !errors.email && formData.email && (
                                <Typography variant="caption" color="success.main">
                                    ✓ Valid email format
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Position"
                                name="position"
                                variant="outlined"
                                required
                                value={formData.position}
                                onChange={handleChange}
                            >
                                <MenuItem value="Senior Invigilator">Senior Invigilator</MenuItem>
                                <MenuItem value="Junior Invigilator">Junior Invigilator</MenuItem>
                                <MenuItem value="Invigilation Coordinator">Invigilation Coordinator</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Department"
                                name="department"
                                variant="outlined"
                                required
                                value={formData.department}
                                onChange={handleChange}
                            >
                                <MenuItem value="Science Department">Science Department</MenuItem>
                                <MenuItem value="Arts Department">Arts Department</MenuItem>
                                <MenuItem value="Engineering Department">Engineering Department</MenuItem>
                                <MenuItem value="Mathematics Department">Mathematics Department</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Qualification"
                                name="qualification"
                                variant="outlined"
                                required
                                value={formData.qualification}
                                onChange={handleChange}
                            >
                                <MenuItem value="Bachelor's Degree">Bachelor's Degree</MenuItem>
                                <MenuItem value="Master's Degree">Master's Degree</MenuItem>
                                <MenuItem value="PhD">PhD</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Certifications (Optional)"
                                name="certifications"
                                variant="outlined"
                                value={formData.certifications}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Location"
                                name="location"
                                variant="outlined"
                                required
                                value={formData.location}
                                onChange={handleChange}
                            >
                                <MenuItem value="Main Building">Main Building</MenuItem>
                                <MenuItem value="New Building">New Building</MenuItem>
                                <MenuItem value="Library Building">Library Building</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ width: 'auto', padding: '10px 20px' }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}

export default Invigilator;