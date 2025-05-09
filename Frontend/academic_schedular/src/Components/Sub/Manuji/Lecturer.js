import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Alert,
} from '@mui/material';

const Lecturer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    department: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name' && !/^[a-zA-Z ]*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        name: 'Only letters and spaces are allowed.',
      }));
      return;
    }

    if (name === 'phonenumber' && (!/^[0-9]*$/.test(value) || value.length > 9)) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
      isValid = false;
    }

    if (!formData.phonenumber.trim()) {
      newErrors.phonenumber = 'Phone number is required.';
      isValid = false;
    } else if (!/^[0-9]{9}$/.test(formData.phonenumber)) {
      newErrors.phonenumber = 'Phone number must be exactly 9 digits.';
      isValid = false;
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required.';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required.';
      isValid = false;
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('https://localhost:7004/Lecturer', {
          ...formData,
          phonenumber: parseInt(formData.phonenumber, 10),
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Lecturer added:', response.data);
        setSuccessMessage('Lecturer registered successfully!');
        setErrorMessage('');
        setFormData({
          name: '',
          email: '',
          phonenumber: '',
          department: '',
          description: '',
        });
      } catch (error) {
        console.error('Submission error:', error);
        setErrorMessage('Failed to register lecturer. Please try again.');
        setSuccessMessage('');
      }
    }
  };

  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box display="flex" justifyContent="center">
          <Box
            sx={{
              p: 4,
              border: '1px solid #ddd',
              borderRadius: '12px',
              boxShadow: 4,
              backgroundColor: '#fafafa',
              maxWidth: '800px',
              width: '100%',
              '&:hover': {
                boxShadow: 8,
              },
            }}
          >
            <Typography variant="h4" align="center" sx={{ fontWeight: 600, color: '#1976d2', mb: 2 }}>
              Register Lecturer Now
            </Typography>

            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Lecturer Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleInputChange}
                error={!!errors.phonenumber}
                helperText={errors.phonenumber}
                inputProps={{ maxLength: 9 }}
                margin="normal"
              />
              <TextField
                fullWidth
                select
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                error={!!errors.department}
                helperText={errors.department}
                margin="normal"
              >
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                error={!!errors.description}
                helperText={errors.description}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  borderRadius: '12px',
                  fontSize: '1rem',
                  padding: '10px 20px',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Lecturer;
