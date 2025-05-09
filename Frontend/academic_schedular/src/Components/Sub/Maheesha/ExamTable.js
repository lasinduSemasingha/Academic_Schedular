import React, { useEffect, useState } from "react";
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Button, Tooltip, IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

    const [searchType, setSearchType] = useState("");
    const [searchSubject, setSearchSubject] = useState("");

    const filteredExams = exams.filter(exam =>
        exam.examtype.toLowerCase().includes(searchType.toLowerCase()) &&
        exam.subject.toLowerCase().includes(searchSubject.toLowerCase())
    );
    
const handlePrintRow = async (exam) => {
    const content = document.createElement('div');
    content.style.width = "900px";
    content.style.margin = "0 auto";
    content.style.padding = "40px";
    content.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    content.style.fontSize = "20px";
    content.style.color = "#333";

    content.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            <img src="LOGO_URL_HERE" alt="Logo" style="height: 80px; margin-bottom: 10px;" />
            <h2 style="margin: 5px 0; font-size: 28px; color: #2D3A5A;">Academic Scheduler</h2>
            <h3 style="margin: 0; font-size: 22px;">Exam Details Report</h3>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 20px;">
            ${[
                ["Exam ID", exam.eId],
                ["Exam Type", exam.examtype],
                ["Subject", exam.subject],
                ["Date & Time", new Date(exam.datetime).toLocaleString()],
                ["Duration", `${exam.duration} hours`],
                ["Exam Hall", exam.examhall],
                ["Invigilator", exam.invigilator],
                ["Total Marks", exam.marks],
                ["Status", exam.status || "Scheduled"]
            ].map((row, i) => `
                <tr style="background: ${i % 2 === 0 ? '#f9f9f9' : '#fff'};">
                    <th style="text-align: left; padding: 12px; border: 1px solid #ccc; width: 35%; background: #f1f1f1;">${row[0]}</th>
                    <td style="padding: 12px; border: 1px solid #ccc;">${row[1]}</td>
                </tr>
            `).join('')}
        </table>

        <div style="margin-top: 50px; font-size: 16px; text-align: center; color: #888;">
            Generated on ${new Date().toLocaleDateString()}
        </div>
    `;

    document.body.appendChild(content); // Temporary append for rendering

    const canvas = await html2canvas(content, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
    pdf.save(`Exam_${exam.eId}.pdf`);

    document.body.removeChild(content); // Clean up
};



    return (
        <Box sx={{ textAlign: "center", py: 6, px: 3, maxWidth: 1000, margin: "0 auto" }}>
            <Paper elevation={6} sx={{ padding: 4, backgroundColor: "#f9f9f9", borderRadius: "12px" }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "#2D3A5A" }}>
                    Exam Records
                </Typography>
<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
    <input
        type="text"
        placeholder="Search by Exam Type"
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
    />
    <input
        type="text"
        placeholder="Search by Subject"
        value={searchSubject}
        onChange={(e) => setSearchSubject(e.target.value)}
        style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
    />
</Box>

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
                            {filteredExams.map((exam, index) => (
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
        <Tooltip title="Download PDF">
            <IconButton
                color="secondary"
                onClick={() => handlePrintRow(exam)}
                sx={{
                    backgroundColor: "#C8E6C9",
                    borderRadius: "50%",
                    '&:hover': { backgroundColor: "#A5D6A7" }
                }}
            >
                🖨️
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
