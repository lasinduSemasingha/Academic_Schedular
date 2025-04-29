import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, IconButton } from '@mui/material';
import { AccountCircle, Email, Lock, School } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    course: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Paper elevation={3} style={{ padding: '20px', width: '400px', borderRadius: '10px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Student Registration
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <IconButton position="start">
                      <FontAwesomeIcon icon={faUser} />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <IconButton position="start">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <IconButton position="start">
                      <FontAwesomeIcon icon={faLock} />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Course"
                name="course"
                variant="outlined"
                value={formData.course}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <IconButton position="start">
                      <FontAwesomeIcon icon={faGraduationCap} />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <Button fullWidth variant="contained" color="primary" type="submit" startIcon={<School />}>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default StudentRegistration;
