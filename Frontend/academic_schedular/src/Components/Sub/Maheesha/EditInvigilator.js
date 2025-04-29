import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Grid, TextField, MenuItem, Button } from "@mui/material";

function EditInvigilator() {
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
        invigilatorId: "",
        invigilatorName: "",
        contactNumber: "",
        email: "",
        position: "",
        department: "",
        qualification: "",
        location: ""
    });

    const [touched, setTouched] = useState({
        invigilatorId: false,
        invigilatorName: false,
        contactNumber: false,
        email: false,
        position: false,
        department: false,
        qualification: false,
        location: false
    });

    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("editInvigilator")) || {};
        if (storedData) {
            setFormData({
                invigilatorId: storedData.invigilatorId || "",
                invigilatorName: storedData.invigilatorName || "",
                contactNumber: storedData.contactNumber || "",
                email: storedData.email || "",
                position: storedData.position || "",
                department: storedData.department || "",
                qualification: storedData.qualification || "",
                certifications: storedData.certifications || "",
                location: storedData.location || ""
            });
            setEditIndex(storedData.index);
        }
    }, []);

    // Validation functions
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhoneNumber = (phone) => {
        const re = /^[0-9]{10,15}$/;
        return re.test(phone);
    };

    const validateRequired = (value) => {
        return value.trim() !== "";
    };

    // Handle field blur
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
        validateField(name, formData[name]);
    };

    // Validate individual field
    const validateField = (name, value) => {
        let error = "";
        
        if (name === "email") {
            if (!value) {
                error = "Email is required";
            } else if (!validateEmail(value)) {
                error = "Please enter a valid email address";
            }
        } 
        else if (name === "contactNumber") {
            if (!value) {
                error = "Contact number is required";
            } else if (!validatePhoneNumber(value)) {
                error = "Please enter 10-15 digits";
            }
        }
        else if (["invigilatorId", "invigilatorName", "position", "department", "qualification", "location"].includes(name)) {
            if (!validateRequired(value)) {
                error = "This field is required";
            }
        }

        setErrors({ ...errors, [name]: error });
        return !error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validate if field has been touched
        if (touched[name]) {
            validateField(name, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Mark all fields as touched
        const newTouched = {};
        Object.keys(touched).forEach(field => {
            newTouched[field] = true;
        });
        setTouched(newTouched);

        // Validate all fields
        let isValid = true;
        Object.keys(formData).forEach(field => {
            if (field !== "certifications") { // Certifications is optional
                const fieldValid = validateField(field, formData[field]);
                if (!fieldValid) isValid = false;
            }
        });

        if (isValid) {
            let invigilatorList = JSON.parse(localStorage.getItem("invigilators")) || [];
            if (editIndex !== null) {
                invigilatorList[editIndex] = formData;
            }
            localStorage.setItem("invigilators", JSON.stringify(invigilatorList));
            navigate("/invigilator/InvigilatorTable");
        }
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
                            <TextField
                                fullWidth
                                label="Invigilator ID"
                                name="invigilatorId"
                                variant="outlined"
                                required
                                value={formData.invigilatorId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.invigilatorId && !!errors.invigilatorId}
                                helperText={touched.invigilatorId && errors.invigilatorId}
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
                                onBlur={handleBlur}
                                error={touched.invigilatorName && !!errors.invigilatorName}
                                helperText={touched.invigilatorName && errors.invigilatorName}
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
                                error={touched.contactNumber && !!errors.contactNumber}
                                helperText={touched.contactNumber && errors.contactNumber}
                                inputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                    maxLength: 15
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
                                onBlur={handleBlur}
                                error={touched.position && !!errors.position}
                                helperText={touched.position && errors.position}
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
                                onBlur={handleBlur}
                                error={touched.department && !!errors.department}
                                helperText={touched.department && errors.department}
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
                                onBlur={handleBlur}
                                error={touched.qualification && !!errors.qualification}
                                helperText={touched.qualification && errors.qualification}
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
                                onBlur={handleBlur}
                                error={touched.location && !!errors.location}
                                helperText={touched.location && errors.location}
                            >
                                <MenuItem value="Main Building">Main Building</MenuItem>
                                <MenuItem value="New Building">New Building</MenuItem>
                                <MenuItem value="Library Building">Library Building</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary" 
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Update Invigilator
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}

export default EditInvigilator;