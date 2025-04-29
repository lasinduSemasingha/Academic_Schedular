import { useState } from "react";
import { Container, TextField, Button, Typography, Grid, Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faCalendar, faHome, faUniversity, faBook } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Student() {
  const [student, setStudent] = useState({
    name: "",
    studentid: "",
    email: "",
    contact: "",
    dob: "",
    address: "",
    faculty: "",
    year: "",
    semester: ""
  });
  
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = student.name ? "" : "Name is required";
    tempErrors.studentid = student.studentid ? "" : "Student ID is required";
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
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post("https://localhost:7005/student", student);
        alert("Student added successfully!");
      } catch (error) {
        alert("Error adding student");
        console.error(error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h5" gutterBottom>
          Student Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Name" name="name" onChange={handleChange} required 
                InputProps={{ startAdornment: <FontAwesomeIcon icon={faUser} /> }} 
                error={!!errors.name} helperText={errors.name} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Student ID" name="studentid" onChange={handleChange} required 
                error={!!errors.studentid} helperText={errors.studentid} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" name="email" type="email" onChange={handleChange} required 
                InputProps={{ startAdornment: <FontAwesomeIcon icon={faEnvelope} /> }} 
                error={!!errors.email} helperText={errors.email} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Contact" name="contact" type="tel" onChange={handleChange} required 
                InputProps={{ startAdornment: <FontAwesomeIcon icon={faPhone} /> }} 
                error={!!errors.contact} helperText={errors.contact} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Date of Birth" name="dob" type="date" onChange={handleChange} required 
                InputProps={{ startAdornment: <FontAwesomeIcon icon={faCalendar} /> }} 
                error={!!errors.dob} helperText={errors.dob} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Address" name="address" onChange={handleChange} required 
                InputProps={{ startAdornment: <FontAwesomeIcon icon={faHome} /> }} 
                error={!!errors.address} helperText={errors.address} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Faculty" name="faculty" onChange={handleChange} required 
                InputProps={{ startAdornment: <FontAwesomeIcon icon={faUniversity} /> }} 
                error={!!errors.faculty} helperText={errors.faculty} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Year" name="year" onChange={handleChange} required 
                InputProps={{ startAdornment: <FontAwesomeIcon icon={faBook} /> }} 
                error={!!errors.year} helperText={errors.year} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Semester" name="semester" onChange={handleChange} required 
                error={!!errors.semester} helperText={errors.semester} />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
