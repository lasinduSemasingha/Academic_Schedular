import React from 'react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const students = [
    { 
        id: 'S001', 
        name: 'Alice Johnson', 
        email: 'alice@example.com', 
        contact: '0712345678', 
        dob: '2000-05-14', 
        faculty: 'Engineering', 
        year: '2nd Year', 
        semester: 'Semester 1' 
    },
    { 
        id: 'S002', 
        name: 'Bob Smith', 
        email: 'bob@example.com', 
        contact: '0778765432', 
        dob: '2001-09-22', 
        faculty: 'Science', 
        year: '1st Year', 
        semester: 'Semester 2' 
    }
];

const Studenttable = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
                <Typography variant="h4" gutterBottom align="center">
                    Student Details
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Student ID</TableCell>
                                <TableCell>Student Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Contact Number</TableCell>
                                <TableCell>Date of Birth</TableCell>
                                <TableCell>Faculty</TableCell>
                                <TableCell>Year</TableCell>
                                <TableCell>Semester</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.id}</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.contact}</TableCell>
                                    <TableCell>{student.dob}</TableCell>
                                    <TableCell>{student.faculty}</TableCell>
                                    <TableCell>{student.year}</TableCell>
                                    <TableCell>{student.semester}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }}>Edit</Button>
            
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

export default Studenttable;
