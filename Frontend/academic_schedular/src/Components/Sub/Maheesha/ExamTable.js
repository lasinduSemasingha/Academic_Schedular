import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
                                <TableCell><b>Location</b></TableCell>
                                <TableCell><b>Exam Date</b></TableCell>
                                <TableCell><b>Actions</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exams.map((exam, index) => (
                                <TableRow key={index}>
                                    <TableCell>{exam.examId}</TableCell>
                                    <TableCell>{exam.examType}</TableCell>
                                    <TableCell>{exam.location}</TableCell>
                                    <TableCell>{exam.examDate}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => handleEdit(index)} sx={{ mr: 1 }}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="error" onClick={() => handleDelete(index)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate("/exam")}> 
                    Back to Form
                </Button>
            </Paper>
        </Box>
    );
}

export default ExamTable;