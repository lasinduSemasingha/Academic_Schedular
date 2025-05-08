import React from 'react';
import { Container, Typography, Box, Button, TextField } from '@mui/material';

const EditLecturer = () => {
  return (
    <Box sx={{ backgroundColor: '#f9f9fb', minHeight: '100vh', py: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 5,
          px: 4,
          borderRadius: 2,
          boxShadow: 4,
          backgroundColor: '#ffffff',
          maxWidth: '800px',
          margin: 'auto',
          borderTop: '6px solid #1976d2',
        }}
      >
        <Typography variant="h3" fontWeight="bold" color="primary">
          Update Lecturer Details
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
                borderRadius: 3,
                boxShadow: 4,
                backgroundColor: '#ffffff',
              }}
            >
              <Typography variant="h4" gutterBottom color="primary">
                Update Lecturer Credentials
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: '#555' }}>
                Please fill out the form below to update lecturer details.
              </Typography>
              <Box component="form">
                <TextField fullWidth label="Lecturer Name" margin="normal" required variant="outlined" />
                <TextField fullWidth label="Email Address" type="email" margin="normal" required variant="outlined" />
                <TextField fullWidth label="Phone Number" margin="normal" required variant="outlined" />
                <TextField fullWidth label="Department" margin="normal" required variant="outlined" />
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  margin="normal"
                  required
                  variant="outlined"
                />
                <Button variant="contained" color="primary" sx={{ mt: 2, px: 4 }}>
                  Update
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Information Section */}
          <Box flex={1} display="flex" flexDirection="column" gap={3}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: '#ffffff',
                borderLeft: '4px solid #1976d2',
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="primary">Admin Office</Typography>
              <Typography sx={{ mt: 1, color: '#555' }}>
                123 University Road,<br />
                Faculty Building,<br />
                Room 105
              </Typography>
            </Box>

            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: '#ffffff',
                borderLeft: '4px solid #ed6c02',
              }}
            >
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
