import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HallTable() {
    const navigate = useNavigate();
    const [halls, setHalls] = useState([]);

    useEffect(() => {
        const storedHalls = JSON.parse(localStorage.getItem("halls")) || [];
        setHalls(storedHalls);
    }, []);

    const handleDelete = (index) => {
        const updatedHalls = halls.filter((_, i) => i !== index);
        setHalls(updatedHalls);
        localStorage.setItem("halls", JSON.stringify(updatedHalls));
    };

    const handleEdit = (index) => {
        const hallToEdit = halls[index];
        localStorage.setItem("editHall", JSON.stringify({ ...hallToEdit, index }));
        navigate("/hall/edit");
    };

    return (
        <Box sx={{ textAlign: "center", py: 6 }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Hall Records
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Hall ID</b></TableCell>
                                <TableCell><b>Hall Name</b></TableCell>
                                <TableCell><b>Location</b></TableCell>
                                <TableCell><b>Hall Date</b></TableCell>
                                <TableCell><b>Actions</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {halls.map((hall, index) => (
                                <TableRow key={index}>
                                    <TableCell>{hall.hallId}</TableCell>
                                    <TableCell>{hall.hallName}</TableCell>
                                    <TableCell>{hall.hallLocation}</TableCell>
                                    <TableCell>{hall.hallDate}</TableCell>
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
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate("/hall")}>
                    View Form
                </Button>
            </Paper>
        </Box>
    );
}

export default HallTable;
