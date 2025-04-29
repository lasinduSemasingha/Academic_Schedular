import React from 'react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const lecturers = [
    { id: 'L001', name: 'Dr. John Doe', address: '123 Main St', phone: '123-456-7890', description: 'Expert in AI', email: 'johndoe@example.com' },
    { id: 'L002', name: 'Dr. Jane Smith', address: '456 Oak St', phone: '987-654-3210', description: 'Cybersecurity Specialist', email: 'janesmith@example.com' }
];

const LecturerDetailsTable = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
                <Typography variant="h4" gutterBottom align="center">
                    Lecturer Details
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lecturers.map((lecturer) => (
                                <TableRow key={lecturer.id}>
                                    <TableCell>{lecturer.id}</TableCell>
                                    <TableCell>{lecturer.name}</TableCell>
                                    <TableCell>{lecturer.address}</TableCell>
                                    <TableCell>{lecturer.phone}</TableCell>
                                    <TableCell>{lecturer.description}</TableCell>
                                    <TableCell>{lecturer.email}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" size="small">Edit</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outlined" color="secondary" size="small">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}

export default LecturerDetailsTable;
