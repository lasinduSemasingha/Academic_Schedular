import { useState } from "react";
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Grid, 
  Paper,
  Box,
  InputAdornment,
  MenuItem,
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
import axios from "axios";
import { useTheme } from '@mui/material/styles';

export default function StudentRegistration() {
  const theme = useTheme();
  const [student, setStudent] = useState({
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
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const faculties = [
    "Engineering",
    "Medicine",
    "Science",
    "Business",
    "Arts",
    "Law"
  ];

  const years = ["1", "2", "3", "4"];
  const semesters = ["1", "2"];

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = student.name ? "" : "Name is required";
    tempErrors.studentId = student.studentId ? "" : "Student ID is required";
    tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email) ? "" : "Invalid email format";
    tempErrors.contact = /^[0-9]{10}$/.test(student.contact) ? "" : "Contact must be 10 digits";
    tempErrors.dob = student.dob ? "" : "Date of Birth is required";
    tempErrors.address = student.address ? "" : "Address is required";
    tempErrors.faculty = student.faculty ? "" : "Faculty is required";
    tempErrors.year = student.year ? "" : "Year is required";
    tempErrors.semester = student.semester ? "" : "Semester is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      await axios.post("https://localhost:7005/student", student);
      setSnackbar({
        open: true,
        message: "Student registered successfully!",
        severity: "success"
      });
      // Reset form after successful submission
      setStudent({
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
      console.error("Registration error:", error);
      setSnackbar({
        open: true,
        message: "Error registering student. Please try again.",
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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={4} sx={{ 
        padding: 4, 
        borderRadius: 4,
        background: theme.palette.background.paper
      }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ 
            fontWeight: 700,
            color: theme.palette.primary.main,
            mb: 1
          }}>
            Student Registration
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please fill in all required fields to register a new student
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Personal Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ 
                mb: 1,
                color: theme.palette.text.secondary,
                fontWeight: 600
              }}>
                Personal Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={student.name}
                onChange={handleChange}
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
                value={student.studentId}
                onChange={handleChange}
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
                value={student.email}
                onChange={handleChange}
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
                value={student.contact}
                onChange={handleChange}
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
                value={student.dob}
                onChange={handleChange}
                error={!!errors.dob}
                helperText={errors.dob}
                InputLabelProps={{
                  shrink: true,
                }}
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
                value={student.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Academic Information */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={{ 
                mb: 1,
                color: theme.palette.text.secondary,
                fontWeight: 600
              }}>
                Academic Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Faculty"
                name="faculty"
                value={student.faculty}
                onChange={handleChange}
                error={!!errors.faculty}
                helperText={errors.faculty}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              >
                {faculties.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <TextField
                select
                fullWidth
                label="Year"
                name="year"
                value={student.year}
                onChange={handleChange}
                error={!!errors.year}
                helperText={errors.year}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BookIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              >
                {years.map((option) => (
                  <MenuItem key={option} value={option}>
                    Year {option}
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
                value={student.semester}
                onChange={handleChange}
                error={!!errors.semester}
                helperText={errors.semester}
              >
                {semesters.map((option) => (
                  <MenuItem key={option} value={option}>
                    Semester {option}
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
                    Registering...
                  </>
                ) : (
                  "Register Student"
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
    </Container>
  );
}