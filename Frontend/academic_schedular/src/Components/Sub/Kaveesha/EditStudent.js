import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  MenuItem, 
  Button,
  InputAdornment,
  CircularProgress,
  Alert,
  Snackbar
} from "@mui/material";
import { 
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  Home as HomeIcon,
  School as SchoolIcon,
  Book as BookIcon,
  Numbers as NumbersIcon
} from "@mui/icons-material";
import { useTheme } from '@mui/material/styles';

function StudentRegistration() {
  const theme = useTheme();
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
  
  const [errors, setErrors] = useState({
    name: "",
    studentId: "",
    email: "",
    contact: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const faculties = [
    "Faculty of Computing",
    "Faculty of Engineering",
    "Faculty of Humanities and Sciences",
    "School of Architecture",
    "Faculty of Business"
  ];

  const years = ["Year 1", "Year 2", "Year 3", "Year 4"];
  const semesters = ["Semester 1", "Semester 2"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate name (no numbers allowed)
    if (name === "name") {
      if (/\d/.test(value)) {
        setErrors(prev => ({ ...prev, name: "Name cannot contain numbers" }));
        return;
      }
    }

    if (name === "contact") {
      if (!/^[0-9]*$/.test(value) || value.length > 10) return;
    }

    if (name === "studentId" && value.length > 10) return;

    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (/\d/.test(formData.name)) {
      newErrors.name = "Name cannot contain numbers";
      isValid = false;
    }

    if (formData.studentId.length !== 10) {
      newErrors.studentId = "Student ID must be 10 characters";
      isValid = false;
    }

    if (formData.contact.length !== 10) {
      newErrors.contact = "Contact must be 10 digits";
      isValid = false;
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSnackbar({
        open: true,
        message: "Student information updated successfully!",
        severity: "success"
      });
      // Reset form after successful submission
      setFormData({
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
    } catch (error) {
      console.error("Update error:", error);
      setSnackbar({
        open: true,
        message: "Error updating student information",
        severity: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box 
      sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh",
        py: 4,
        backgroundColor: theme.palette.grey[50]
      }}
    >
      <Paper 
        elevation={4} 
        sx={{ 
          padding: 4, 
          width: "100%", 
          maxWidth: "800px",
          borderRadius: 3
        }}
      >
        <Typography 
          variant="h4" 
          component="h1"
          sx={{ 
            fontWeight: 700,
            color: theme.palette.primary.main,
            mb: 2,
            textAlign: "center"
          }}
        >
          Update Student Registration
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ mb: 4, textAlign: "center" }}
        >
          Please update the student information below
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Personal Information Section */}
            <Grid item xs={12}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  mb: 1,
                  color: theme.palette.text.secondary,
                  fontWeight: 600
                }}
              >
                Personal Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Student ID"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                error={!!errors.studentId}
                helperText={errors.studentId}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NumbersIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Number"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                error={!!errors.contact}
                helperText={errors.contact}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dob"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.dob}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Academic Information Section */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  mb: 1,
                  color: theme.palette.text.secondary,
                  fontWeight: 600
                }}
              >
                Academic Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Faculty/Department"
                name="faculty"
                value={formData.faculty}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              >
                {faculties.map((faculty) => (
                  <MenuItem key={faculty} value={faculty}>
                    {faculty}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                select
                fullWidth
                label="Academic Year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BookIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                select
                fullWidth
                label="Semester"
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
              >
                {semesters.map((semester) => (
                  <MenuItem key={semester} value={semester}>
                    {semester}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} sx={{ mt: 2, textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1rem',
                  minWidth: '200px'
                }}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress size={24} color="inherit" sx={{ mr: 2 }} />
                    Updating...
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default StudentRegistration;