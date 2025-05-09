import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Snackbar,
  Alert,
  Container,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  Home as HomeIcon,
  School as SchoolIcon,
  Book as BookIcon,
  Numbers as NumbersIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const faculties = ["Engineering", "Medicine", "Science", "Business", "Arts", "Law"];
const years = ["1", "2", "3", "4"];
const semesters = ["1", "2"];

export default function EditStudent() {
  const { sId } = useParams();
  const navigate = useNavigate();
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
    semester: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchStudent = async () => {
      try {
        const res = await fetch(`https://localhost:7005/student/${sId}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch student data");

        const json = await res.json();
        const data = json.data || json;

        setFormData({
          name: data.name || "",
          studentId: data.studentId || "",
          email: data.email || "",
          contact: data.contact || "",
          dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
          address: data.address || "",
          faculty: data.faculty || "",
          year: data.year || "",
          semester: data.semester || "",
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setSnackbar({
            open: true,
            message: "Failed to load student data",
            severity: "error",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();

    return () => controller.abort();
  }, [sId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const tempErrors = {
      name: formData.name ? "" : "Name is required",
      studentId: formData.studentId ? "" : "Student ID is required",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ? ""
        : "Invalid email",
      contact: /^[0-9]{10}$/.test(formData.contact)
        ? ""
        : "Contact must be 10 digits",
      dob: formData.dob ? "" : "Date of birth is required",
      address: formData.address ? "" : "Address is required",
      faculty: formData.faculty ? "" : "Faculty is required",
      year: formData.year ? "" : "Year is required",
      semester: formData.semester ? "" : "Semester is required",
    };

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`https://localhost:7005/student/${sId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Update failed");

      setSnackbar({
        open: true,
        message: "Student updated successfully!",
        severity: "success",
      });

      setTimeout(() => navigate("/Studenttable"), 1500);
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Error updating student",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <CircularProgress />
        <Typography mt={2}>Loading student details...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" fontWeight={700} color={theme.palette.primary.main}>
            Edit Student
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Update the necessary fields and submit the form
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ 
                mb: 1,
                color: theme.palette.text.secondary,
                fontWeight: 600
              }}>
                Personal Information
              </Typography>
            </Grid>
          <Grid container spacing={3}>
            {[
              { label: "Full Name", name: "name", icon: <PersonIcon /> },
              { label: "Student ID", name: "studentId", icon: <NumbersIcon /> },
              { label: "Email", name: "email", type: "email", icon: <EmailIcon /> },
              { label: "Contact Number", name: "contact", icon: <PhoneIcon /> },
              { label: "Date of Birth", name: "dob", type: "date", icon: <CalendarIcon /> },
              { label: "Address", name: "address", icon: <HomeIcon /> },
            ].map(({ label, name, type = "text", icon }) => (
              <Grid item xs={12} md={name === "address" ? 6 : 6} key={name}>
                <TextField
                  fullWidth
                  label={label}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  error={!!errors[name]}
                  helperText={errors[name]}
                  InputLabelProps={type === "date" ? { shrink: true } : {}}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
                  }}
                />
              </Grid>
            ))}

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
                value={formData.faculty}
                onChange={handleChange}
                error={!!errors.faculty}
                helperText={errors.faculty}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon />
                    </InputAdornment>
                  ),
                }}
              >
                {faculties.map((f) => (
                  <MenuItem key={f} value={f}>
                    {f}
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
                value={formData.year}
                onChange={handleChange}
                error={!!errors.year}
                helperText={errors.year}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BookIcon />
                    </InputAdornment>
                  ),
                }}
              >
                {years.map((y) => (
                  <MenuItem key={y} value={y}>
                    Year {y}
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
                onChange={handleChange}
                error={!!errors.semester}
                helperText={errors.semester}
              >
                {semesters.map((s) => (
                  <MenuItem key={s} value={s}>
                    Semester {s}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
                sx={{ px: 6, py: 1.5, borderRadius: 2, fontSize: "1rem" }}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress size={24} sx={{ mr: 2 }} />
                    Updating...
                  </>
                ) : (
                  "Update Student"
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
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
