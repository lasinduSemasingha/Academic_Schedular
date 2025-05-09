import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Paper,
  Avatar,
  Link
} from "@mui/material";
import { PersonAdd as PersonAddIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://localhost:7001/user", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        username: formData.username,
        password: formData.password
      });

      if (response.data.message) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000); // Redirect to login after success
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          marginTop: 4,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PersonAddIcon />
        </Avatar>
        
        <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
          Create Academic Scheduler Account
        </Typography>
        
        {success ? (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="success.main">
              Registration successful!
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Redirecting to login page...
            </Typography>
            <CircularProgress color="success" sx={{ mt: 3 }} />
          </Box>
        ) : (
          <>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
              Fill in your details to create an account
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
              {error && (
                <Typography 
                  variant="body2" 
                  color="error" 
                  align="center"
                  sx={{ 
                    mb: 2,
                    padding: 1,
                    backgroundColor: 'error.light',
                    borderRadius: 1
                  }}
                >
                  {error}
                </Typography>
              )}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleChange}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    helperText="Use a strong password with letters, numbers and symbols"
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                      }
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ 
                  mt: 3, 
                  mb: 2,
                  py: 1.5,
                  borderRadius: 1,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2" underline="hover">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default RegisterPage;