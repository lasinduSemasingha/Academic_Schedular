import React, { useEffect, useState } from "react";
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Button, Tooltip, IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

function ExamTable() {
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);

    useEffect(() => {
        axios.get("https://localhost:7003/exam")
            .then(response => {
                if (response.data.isValid) {
                    setExams(response.data.data);
                }
            })
            .catch(error => {
                console.error("Error fetching exams:", error);
            });
    }, []);

    const handleDelete = async (id) => {
        // Ask the user for confirmation before proceeding with deletion
        const confirmDelete = window.confirm("Are you sure you want to delete this exam?");
        
        if (!confirmDelete) {
            // If the user cancels the delete action, exit the function
            return;
        }
    
        try {
            const response = await fetch(`https://localhost:7003/exam/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            window.location.reload();
    
            if (!response.ok) {
                throw new Error(`Failed to delete exam with ID ${id}`);
            }
    
            const result = await response.json();
            console.log('Exam deleted successfully:', result);
        } catch (error) {
            console.error('Error deleting exam:', error);
        }
    };
    

    const handleEdit = (id) => {
        navigate(`/exam/edit/${id}`);
    };

    return (
        <Box sx={{ textAlign: "center", py: 6, px: 3, maxWidth: 1000, margin: "0 auto" }}>
            <Paper elevation={6} sx={{ padding: 4, backgroundColor: "#f9f9f9", borderRadius: "12px" }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "#2D3A5A" }}>
                    Exam Records
                </Typography>
                <TableContainer sx={{ maxHeight: 600, overflowY: 'auto' }}>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#E3F2FD" }}>
                                <TableCell sx={{ padding: '8px 16px' }}><b>Exam ID</b></TableCell>
                                <TableCell sx={{ padding: '8px 16px' }}><b>Exam Type</b></TableCell>
                                <TableCell sx={{ padding: '8px 16px' }}><b>Subject</b></TableCell>
                                <TableCell sx={{ padding: '8px 16px' }}><b>Date & Time</b></TableCell>
                                <TableCell sx={{ padding: '8px 16px' }}><b>Duration (hours)</b></TableCell>
                                <TableCell sx={{ padding: '8px 16px' }}><b>Exam Hall</b></TableCell>
                                <TableCell sx={{ padding: '8px 16px' }}><b>Invigilator</b></TableCell>
                                <TableCell sx={{ padding: '8px 16px' }}><b>Total Marks</b></TableCell>
                                <TableCell sx={{ padding: '8px 16px' }}><b>Status</b></TableCell>
                                <TableCell sx={{ padding: '8px 16px' }}><b>Actions</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exams.map((exam, index) => (
                                <TableRow key={index} sx={{
                                    '&:hover': { backgroundColor: "#f1f1f1", cursor: 'pointer' },
                                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9'
                                }}>
                                    <TableCell sx={{ padding: '8px 16px' }}>{exam.eId}</TableCell>
                                    <TableCell sx={{ padding: '8px 16px' }}>{exam.examtype}</TableCell>
                                    <TableCell sx={{ padding: '8px 16px' }}>{exam.subject}</TableCell>
                                    <TableCell sx={{ padding: '8px 16px' }}>{new Date(exam.datetime).toLocaleString()}</TableCell>
                                    <TableCell sx={{ padding: '8px 16px' }}>{exam.duration}</TableCell>
                                    <TableCell sx={{ padding: '8px 16px' }}>{exam.examhall}</TableCell>
                                    <TableCell sx={{ padding: '8px 16px' }}>{exam.invigilator}</TableCell>
                                    <TableCell sx={{ padding: '8px 16px' }}>{exam.marks}</TableCell>
                                    <TableCell sx={{ padding: '8px 16px' }}>{exam.status || "Scheduled"}</TableCell>
                                    <TableCell sx={{ padding: '8px 16px' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleEdit(exam.eId)}
                                                    sx={{
                                                        mr: 1,
                                                        backgroundColor: "#E3F2FD",
                                                        borderRadius: "50%",
                                                        '&:hover': { backgroundColor: "#BBDEFB" }
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDelete(exam.eId)}
                                                    sx={{
                                                        backgroundColor: "#FFCDD2",
                                                        borderRadius: "50%",
                                                        '&:hover': { backgroundColor: "#FFEBEE" }
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        mt: 2,
                        borderRadius: "30px",
                        paddingX: 4,
                        '&:hover': { backgroundColor: "#1976D2" }
                    }}
                    onClick={() => navigate("/exam")}
                >
                    View Form
                </Button>
            </Paper>
        </Box>
    );
    
}

export default ExamTable;
