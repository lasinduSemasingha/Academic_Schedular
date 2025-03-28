import React, { useState } from 'react';
import { Container, Typography, Box, Button, TextField } from '@mui/material';

const Lecturer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'name') {
      if (!/^[a-zA-Z ]*$/.test(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, name: 'Only letters are allowed.' }));
        return;
      }
    }

    if (name === 'phone') {
      if (!/^[0-9]*$/.test(value) || value.length > 10) {
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
      isValid = false;
    } else if (!/^[a-zA-Z ]+$/.test(formData.name)) {
      newErrors.name = 'Only letters are allowed.';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
      isValid = false;
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required.';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted successfully', formData);
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 6,
          px: 6,
          border: '2px solid #ccc',
          borderRadius: '8px',
          boxShadow: 3,
          backgroundColor: 'white',
          maxWidth: '800px',
          margin: 'auto',
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Register a New Lecturer
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Effortlessly expand your faculty by adding new lecturers to the system. Our intuitive registration process ensures accurate data collection, enabling smooth integration into the university's academic structure. Simply complete the form below, and the new lecturer will gain access to their dashboard and resources.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3, backgroundColor: 'primary.main', color: 'white', fontWeight: 'bold' }}
        >
          Complete the Form to Add a Lecturer
        </Button>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Keep track of all lecturers with ease.
        </Typography>
      </Box>

      {/* Add Lecturer Form Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
          {/* Form Section */}
          <Box flex={2}>
            <Box
              sx={{
                p: 4,
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: 2,
                backgroundColor: 'white',
              }}
            >
              <Typography variant="h4" gutterBottom>
                Register Lecturer Now
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Please fill out the form below to register a new lecturer in the system.
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField fullWidth label="Lecturer Name" name="name" margin="normal" required value={formData.name} onChange={handleInputChange} error={!!errors.name} helperText={errors.name} />
                <TextField fullWidth label="Email Address" type="email" name="email" margin="normal" required value={formData.email} onChange={handleInputChange} error={!!errors.email} helperText={errors.email} />
                <TextField fullWidth label="Phone Number" name="phone" margin="normal" required value={formData.phone} onChange={handleInputChange} error={!!errors.phone} helperText={errors.phone} />
                <TextField fullWidth label="Department" name="department" margin="normal" required value={formData.department} onChange={handleInputChange} error={!!errors.department} helperText={errors.department} />
                <TextField fullWidth label="Description" name="description" multiline rows={4} margin="normal" required value={formData.description} onChange={handleInputChange} error={!!errors.description} helperText={errors.description} />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Information Section */}
          <Box flex={1}>
            <Box sx={{ mt: 3, p: 3, border: '1px solid #ccc', borderRadius: '8px', boxShadow: 2 }}>
              <Typography variant="h6" fontWeight="bold">Admin Office</Typography>
              <Typography>123 University Road, Faculty Building, Room 105</Typography>
            </Box>
            <Box sx={{ mt: 2, p: 3, border: '1px solid #ccc', borderRadius: '8px', boxShadow: 2 }}>
              <Typography variant="h6" fontWeight="bold">Support</Typography>
              <Typography>For any issues, contact the system administrator.</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Lecturer;