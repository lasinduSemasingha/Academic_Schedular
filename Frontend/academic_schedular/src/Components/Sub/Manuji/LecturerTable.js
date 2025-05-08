import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const initialLecturers = [
  {
    id: 'L001',
    name: 'John Doe',
    address: '123 Main St',
    phone: '123-456-7890',
    description: 'Expert in AI',
    email: 'johndoe@example.com',
  },
  {
    id: 'L002',
    name: 'Dr. Jane Smith',
    address: '456 Oak St',
    phone: '987-654-3210',
    description: 'Cybersecurity Specialist',
    email: 'janesmith@example.com',
  },
  {
    id: 'L003',
    name: 'Emily Clark',
    address: '789 Pine St',
    phone: '321-654-9870',
    description: 'Data Science and Machine Learning Expert',
    email: 'emilyclark@example.com',
  },
  {
    id: 'L004',
    name: 'Dr. Michael Brown',
    address: '101 Maple Ave',
    phone: '654-987-3210',
    description: 'Cloud Computing and Big Data Specialist',
    email: 'michaelbrown@example.com',
  },
  {
    id: 'L005',
    name: 'Sarah White',
    address: '202 Birch Blvd',
    phone: '789-123-4560',
    description: 'Blockchain and Cryptography Expert',
    email: 'sarahwhite@example.com',
  },
];

const LecturerDetailsTable = () => {
  const [lecturers, setLecturers] = useState(initialLecturers);
  const [open, setOpen] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState(null);

  const handleDeleteClick = (lecturer) => {
    setSelectedLecturer(lecturer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLecturer(null);
  };

  const confirmDelete = () => {
    setLecturers(lecturers.filter((l) => l.id !== selectedLecturer.id));
    handleClose();
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mt: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Lecturer Details
        </Typography>

        <TableContainer component={Paper} sx={{ boxShadow: 4, borderRadius: 2 }}>
          <Table sx={{ width: '100%' }}>
            <TableHead sx={{ backgroundColor: '#1976d2' }}>
              <TableRow>
                <TableCell sx={headerStyle}>ID</TableCell>
                <TableCell sx={headerStyle}>Name</TableCell>
                <TableCell sx={headerStyle}>Address</TableCell>
                <TableCell sx={headerStyle}>Phone</TableCell>
                <TableCell sx={headerStyle}>Description</TableCell>
                <TableCell sx={headerStyle}>Email</TableCell>
                <TableCell sx={headerStyle}>Edit</TableCell>
                <TableCell sx={headerStyle}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lecturers.map((lecturer) => (
                <TableRow
                  key={lecturer.id}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: '#f9f9f9',
                    },
                    '&:hover': {
                      backgroundColor: '#e3f2fd',
                      transition: 'background-color 0.3s',
                    },
                  }}
                >
                  <TableCell align="center">{lecturer.id}</TableCell>
                  <TableCell align="center">{lecturer.name}</TableCell>
                  <TableCell align="center">{lecturer.address}</TableCell>
                  <TableCell align="center">{lecturer.phone}</TableCell>
                  <TableCell align="center">{lecturer.description}</TableCell>
                  <TableCell align="center">{lecturer.email}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: '#0288d1',
                        color: 'white',
                        '&:hover': { bgcolor: '#0277bd' },
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleDeleteClick(lecturer)}
                      sx={{
                        color: '#d32f2f',
                        borderColor: '#d32f2f',
                        '&:hover': { bgcolor: '#ffebee' },
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Confirmation Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete{' '}
              <strong>{selectedLecturer?.name}</strong>? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

// Header cell styling reused across all header cells
const headerStyle = {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '0.95rem',
};

export default LecturerDetailsTable;
