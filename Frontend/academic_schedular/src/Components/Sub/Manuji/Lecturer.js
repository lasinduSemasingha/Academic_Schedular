import React from 'react';
import { Container, Typography, Box, Button, TextField } from '@mui/material';

const Lecturer = () => {
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
            <Typography variant="h4" gutterBottom>
              Register Lecturer Now
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Please fill out the form below to register a new lecturer in the system.
            </Typography>
            <Box component="form">
              <TextField fullWidth label="Lecturer Name" margin="normal" required />
              <TextField fullWidth label="Email Address" type="email" margin="normal" required />
              <TextField fullWidth label="Phone Number" margin="normal" required />
              <TextField fullWidth label="Department" margin="normal" required />
              <TextField fullWidth label="Description" multiline rows={4} margin="normal" required />
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Submit
              </Button>
            </Box>
          </Box>

          {/* Information Section */}
          <Box flex={1}>
            {/* Admin Office Section */}
            <Box sx={{ mt: 3, p: 3, border: '1px solid #ccc', borderRadius: '8px', boxShadow: 2 }}>
              <Typography variant="h6" fontWeight="bold">Admin Office</Typography>
              <Typography>123 University Road, Faculty Building, Room 105</Typography>
            </Box>

            {/* Support Section */}
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
