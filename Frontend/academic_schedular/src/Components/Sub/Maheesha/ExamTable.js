import React, { useEffect, useState } from "react";
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Button, Tooltip, IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ExamTable() {
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const storedExams = JSON.parse(localStorage.getItem("exams")) || [];
        setExams(storedExams);
    }, []);

    const handleDelete = (index) => {
        const updatedExams = exams.filter((_, i) => i !== index);
        setExams(updatedExams);
        localStorage.setItem("exams", JSON.stringify(updatedExams));
    };

    const handleEdit = (index) => {
        const examToEdit = exams[index];
        localStorage.setItem("editExam", JSON.stringify({ ...examToEdit, index }));
        navigate("/exam/edit");
    };

    return (
        <Box sx={{ textAlign: "center", py: 6 }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Exam Records
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Exam ID</b></TableCell>
                                <TableCell><b>Exam Type</b></TableCell>
                                <TableCell><b>Subject</b></TableCell>
                                <TableCell><b>Date & Time</b></TableCell>
                                <TableCell><b>Duration (hours)</b></TableCell>
                                <TableCell><b>Exam Hall</b></TableCell>
                                <TableCell><b>Invigilator</b></TableCell>
                                <TableCell><b>Total Marks</b></TableCell>
                                <TableCell><b>Status</b></TableCell>
                                <TableCell><b>Actions</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exams.map((exam, index) => (
                                <TableRow key={index}>
                                    <TableCell>{exam.examId}</TableCell>
                                    <TableCell>{exam.examType}</TableCell>
                                    <TableCell>{exam.subject}</TableCell>
                                    <TableCell>{exam.examDate}</TableCell>
                                    <TableCell>{exam.duration}</TableCell>
                                    <TableCell>{exam.examHall}</TableCell>
                                    <TableCell>{exam.invigilator}</TableCell>
                                    <TableCell>{exam.totalMarks}</TableCell>
                                    <TableCell>{exam.status || "Scheduled"}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Edit">
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleEdit(index)}
                                                sx={{ mr: 1 }}
                                                >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(index)}
                                                >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate("/exam")}> 
                    View Form
                </Button>
            </Paper>
        </Box>
    );
}

export default ExamTable;
