import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, TextField, Alert } from '@mui/material';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name' && !/^[a-zA-Z ]*$/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Only letters are allowed.' }));
      return;
    }

    if (name === 'phonenumber' && (!/^[0-9]*$/.test(value) || value.length > 10)) {
      return;
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
    } else if (!/^[0-9]{10}$/.test(formData.phonenumber)) {
      newErrors.phonenumber = 'Phone number must be exactly 10 digits.';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('https://localhost:7025/lecturer', formData, {
          headers: { 'Content-Type': 'application/json' },
        });
        console.log('Form submitted successfully:', response.data);
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
        console.error('Error submitting form:', error);
        setErrorMessage('Failed to register lecturer. Please try again.');
        setSuccessMessage('');
      }
    }
  };

  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
          <Box flex={2}>
            <Box sx={{ p: 4, border: '1px solid #ccc', borderRadius: '8px', boxShadow: 2, backgroundColor: 'white' }}>
              <Typography variant="h4" gutterBottom>Register Lecturer Now</Typography>
              {successMessage && <Alert severity="success">{successMessage}</Alert>}
              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
              <Box component="form" onSubmit={handleSubmit}>
                <TextField fullWidth label="Lecturer Name" name="name" margin="normal" required value={formData.name} onChange={handleInputChange} error={!!errors.name} helperText={errors.name} />
                <TextField fullWidth label="Email Address" type="email" name="email" margin="normal" required value={formData.email} onChange={handleInputChange} error={!!errors.email} helperText={errors.email} />
                <TextField fullWidth label="Phone Number" name="phonenumber" margin="normal" required value={formData.phonenumber} onChange={handleInputChange} error={!!errors.phonenumber} helperText={errors.phonenumber} />
                <TextField fullWidth label="Department" name="department" margin="normal" required value={formData.department} onChange={handleInputChange} error={!!errors.department} helperText={errors.department} />
                <TextField fullWidth label="Description" name="description" multiline rows={4} margin="normal" required value={formData.description} onChange={handleInputChange} error={!!errors.description} helperText={errors.description} />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Submit</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Lecturer;
