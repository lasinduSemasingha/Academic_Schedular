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
  IconButton,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const re = /^[0-9]{10,15}$/;
    return re.test(phone);
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
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Position</b></TableCell>
                <TableCell><b>Department</b></TableCell>
                <TableCell><b>Qualification</b></TableCell>
                <TableCell><b>Certifications</b></TableCell>
                <TableCell><b>Contact</b></TableCell>
                <TableCell><b>Location</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invigilators.map((inv, index) => (
                <TableRow key={index}>
                  <TableCell>{inv.invigilatorId}</TableCell>
                  <TableCell>{inv.invigilatorName}</TableCell>
                  <TableCell>{inv.position}</TableCell>
                  <TableCell>{inv.department}</TableCell>
                  <TableCell>{inv.qualification}</TableCell>
                  <TableCell>{inv.certifications || "-"}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <EmailIcon color={validateEmail(inv.email) ? "success" : "error"} fontSize="small" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {inv.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <PhoneIcon color={validatePhoneNumber(inv.contactNumber) ? "success" : "error"} fontSize="small" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {inv.contactNumber}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{inv.location}</TableCell>
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
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => navigate("/invigilator")}
        >
          Add New Invigilator
        </Button>
      </Paper>
    </Box>
  );
}

export default InvigilatorTable;