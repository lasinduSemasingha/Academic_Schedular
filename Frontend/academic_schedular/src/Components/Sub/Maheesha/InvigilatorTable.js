import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function InvigilatorTable() {
  const navigate = useNavigate();
  const [invigilators, setInvigilators] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("invigilators")) || [];
    setInvigilators(storedData);
  }, []);

  const handleDelete = (index) => {
    const updatedInvigilators = invigilators.filter((_, i) => i !== index);
    setInvigilators(updatedInvigilators);
    localStorage.setItem("invigilators", JSON.stringify(updatedInvigilators));
  };

  const handleEdit = (index) => {
    const invigilatorToEdit = invigilators[index];
    localStorage.setItem("editInvigilator", JSON.stringify({...invigilatorToEdit, index}));
    navigate("/invigilator/edit");
  };

  return (
    <Box sx={{ textAlign: "center", py: 6 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Invigilator Records
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Invigilator ID</b></TableCell>
                <TableCell><b>Invigilator Name</b></TableCell>
                <TableCell><b>Location</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invigilators.map((inv, index) => (
                <TableRow key={index}>
                  <TableCell>{inv.invigilatorId}</TableCell>
                  <TableCell>{inv.invigilatorName}</TableCell>
                  <TableCell>{inv.location}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(index)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => navigate("/invigilator")}
        >
          Back to Form
        </Button>
      </Paper>
    </Box>
  );
}

export default InvigilatorTable;
