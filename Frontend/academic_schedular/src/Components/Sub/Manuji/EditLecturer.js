// src/pages/EditLecturer.jsx
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Button, TextField,
} from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const EditLecturer = () => {
  const { lId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [lecturer, setLecturer] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    department: '',
    description: '',
  });

  useEffect(() => {
    if (location.state?.lecturer) {
      // Use data passed from table
      const l = location.state.lecturer;
      setLecturer({
        name: l.name || '',
        email: l.email || '',
        phoneNumber: l.phonenumber || l.phoneNumber || '', 
        department: l.department || '',
        description: l.description || '',
      });
    } else {
      // Fallback: fetch data from backend if not passed via state
      const fetchLecturer = async () => {
        try {
          const response = await axios.get(`https://localhost:7004/Lecturer/${lId}`);
          const l = response.data;
          setLecturer({
            name: l.name || '',
            email: l.email || '',
            phoneNumber: l.phonenumber || '',
            department: l.department || '',
            description: l.description || '',
          });
        } catch (error) {
          console.error('Failed to fetch lecturer data:', error);
        }
      };
      fetchLecturer();
    }
  }, [lId, location.state]);

  const handleChange = (e) => {
    setLecturer({ ...lecturer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7004/Lecturer/${lId}`, lecturer);
      alert('Lecturer updated successfully!');
      navigate('/LecturerTable');
    } catch (error) {
      console.error('Error updating lecturer:', error);
      alert('Failed to update lecturer.');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f9f9fb', minHeight: '100vh', py: 4 }}>
      <Box sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', py: 5, px: 4,
        borderRadius: 2, boxShadow: 4, backgroundColor: '#ffffff',
        maxWidth: '800px', margin: 'auto', borderTop: '6px solid #1976d2',
      }}>
        <Typography variant="h3" fontWeight="bold" color="primary">
          Update Lecturer Details
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
          <Box flex={2}>
            <Box sx={{ p: 4, borderRadius: 3, boxShadow: 4, backgroundColor: '#ffffff' }}>
              <Typography variant="h4" gutterBottom color="primary">
                Update Lecturer Credentials
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: '#555' }}>
                Please fill out the form below to update lecturer details.
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField fullWidth label="Lecturer Name" name="name" value={lecturer.name}
                  onChange={handleChange} margin="normal" required variant="outlined" />
                <TextField fullWidth label="Email Address" name="email" type="email"
                  value={lecturer.email} onChange={handleChange}
                  margin="normal" required variant="outlined" />
                <TextField fullWidth label="Phone Number" name="phoneNumber"
                  value={lecturer.phoneNumber} onChange={handleChange}
                  margin="normal" required variant="outlined" />
                <TextField fullWidth label="Department" name="department"
                  value={lecturer.department} onChange={handleChange}
                  margin="normal" required variant="outlined" />
                <TextField fullWidth label="Description" name="description"
                  value={lecturer.description} onChange={handleChange}
                  multiline rows={4} margin="normal" required variant="outlined" />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, px: 4 }}>
                  Update
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Info Boxes */}
          <Box flex={1} display="flex" flexDirection="column" gap={3}>
            <Box sx={{ p: 3, borderRadius: 2, boxShadow: 3, backgroundColor: '#ffffff', borderLeft: '4px solid #1976d2' }}>
              <Typography variant="h6" fontWeight="bold" color="primary">Admin Office</Typography>
              <Typography sx={{ mt: 1, color: '#555' }}>
                123 University Road,<br /> Faculty Building,<br /> Room 105
              </Typography>
            </Box>
            <Box sx={{ p: 3, borderRadius: 2, boxShadow: 3, backgroundColor: '#ffffff', borderLeft: '4px solid #ed6c02' }}>
              <Typography variant="h6" fontWeight="bold" color="secondary">Support</Typography>
              <Typography sx={{ mt: 1, color: '#555' }}>
                For any issues, contact the system administrator.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default EditLecturer;
