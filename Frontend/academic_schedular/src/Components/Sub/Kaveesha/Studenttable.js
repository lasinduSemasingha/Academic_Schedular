import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Grid } from '@mui/material';

const students = [
    { 
        id: 'IT22444489', 
        name: 'kaveesha nethmi', 
        email: 'kavee@gmail.com', 
        contact: '0712345678', 
        dob: '2000-05-14', 
        faculty: 'Engineering', 
        year: '2nd Year', 
        semester: 'Semester 1' 
    },
    { 
        id: 'IT25894489', 
        name: 'heshani fernando', 
        email: 'heshani@gmail.com', 
        contact: '0778765432', 
        dob: '2001-09-22', 
        faculty: 'Science', 
        year: '1st Year', 
        semester: 'Semester 2' 


        
    },

    {
        id: 'IT25895689', 
        name: 'chanudi himansala', 
        email: 'chanudi@example.com', 
        contact: '0778723432', 
        dob: '2000-09-22', 
        faculty: 'Science', 
        year: '1st Year', 
        semester: 'Semester 2' 
    },
    // Add more students as needed
];

const Studenttable = () => {
    const navigate = useNavigate();  // Use navigate hook

    const [searchQuery, setSearchQuery] = useState('');  // State for search query
    const [filteredStudents, setFilteredStudents] = useState(students);  // Filtered student list based on search query

    const handleEdit = (studentId) => {
        navigate("/editstudent", { state: { studentId } });  // Pass studentId to EditStudent
    };

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        
        // Filter students based on search query (can be by name or ID)
        const filtered = students.filter(
            (student) =>
                student.name.toLowerCase().includes(query.toLowerCase()) ||
                student.id.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredStudents(filtered);
    };

    const handleGenerateReport = () => {
        alert('Generating Student Enrollment Report...');
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
                <Typography variant="h4" gutterBottom align="center">
                    Student Details
                </Typography>

                {/* Search Bar and Generate Report Button in One Line */}
                <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }} justifyContent="space-between">
                    {/* Search bar on the left */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Search by Name or ID"
                            variant="outlined"
                            value={searchQuery}
                            onChange={handleSearch}
                            size="small"
                            fullWidth
                        />
                    </Grid>

                    {/* "Generate Enrollment Report" button on the right */}
                    <Grid item xs={12} sm={4} display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="secondary" onClick={handleGenerateReport}>
                            Student Enrollment Report
                        </Button>
                    </Grid>
                </Grid>

                {/* Table */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Student ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Student Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Contact Number</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Date Of Birth</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Faculty</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Year</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Semester</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Edit</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredStudents.map((student) => (
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
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            sx={{ mr: 1 }}
                                            onClick={() => handleEdit(student.id)}  // Pass student ID to handleEdit
                                        >
                                            Edit
                                        </Button>
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
};

export default Studenttable;
