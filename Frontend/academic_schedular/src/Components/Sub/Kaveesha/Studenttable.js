import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography,
  TextField, IconButton, Box, Tooltip,
  CircularProgress, Alert, Snackbar,
  Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Button
} from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  PictureAsPdf as PdfIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const API_URL = 'https://localhost:7005/student';
const TABLE_HEADERS = [
  'Student ID', 'Name', 'Email', 'Contact',
  'DOB', 'Address', 'Faculty', 'Year', 'Semester', 'Actions'
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius * 2,
  minHeight: '60vh',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  fontSize: theme.typography.body1.fontSize,
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0, 0.5),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: 'transparent',
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  position: 'sticky',
  top: 0,
  zIndex: 1,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const formatDateWithoutTime = (dateString) => {
  if (!dateString) return 'N/A';
  
  // If the date is already in YYYY-MM-DD format, return as-is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }
  
  try {
    // For ISO format dates (from server)
    const date = new Date(dateString);
    // Get local date parts to avoid timezone issues
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (e) {
    return dateString; // Return original if parsing fails
  }
};

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      const studentData = Array.isArray(response.data?.data) ? response.data.data : [];
      setStudents(studentData);
      setFilteredStudents(studentData);
    } catch (err) {
      setError('Failed to load student data. Please try again later.');
      setSnackbar({ open: true, message: 'Failed to load student data', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [location]);

  useEffect(() => {
    const filtered = students.filter((student) => {
      const sId = student.sId ? student.sId.toString() : '';
      return (
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const handleEdit = (student) => {
    navigate(`/student/edit/${student.sId}`);
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setConfirmDeleteOpen(true);
  };

  const generateStudentPDF = (student) => {
  const printWindow = window.open('', '_blank');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Student Enrollment Details - ${student.sId}</title>
      <style>
        body { font-family: 'Arial', sans-serif'; margin: 0; padding: 20px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2c3e50; padding-bottom: 20px; }
        .header h1 { color: #2c3e50; margin-bottom: 5px; }
        .header p { color: #7f8c8d; margin-top: 0; }
        .content { display: flex; margin-bottom: 30px; }
        .student-details { flex: 1; }
        .section { margin-bottom: 25px; }
        .section-title { background-color: #2c3e50; color: white; padding: 8px 15px; font-size: 16px; margin-bottom: 15px; border-radius: 4px; }
        .info-grid { display: grid; grid-template-columns: 150px 1fr; gap: 10px 20px; }
        .info-label { font-weight: bold; text-align: right; color: #555; }
        .info-value { padding-left: 10px; }
        .footer { margin-top: 40px; font-size: 12px; text-align: center; color: #7f8c8d; border-top: 1px solid #ddd; padding-top: 15px; }
        .signature-area { display: flex; justify-content: space-between; margin-top: 50px; }
        .signature-box { width: 200px; border-top: 1px solid #333; text-align: center; padding-top: 5px; font-size: 14px; }
        @media print { body { padding: 0; } .no-print { display: none; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>STUDENT ENROLLMENT RECORD</h1>
        <p>Official Enrollment Document - ${new Date().getFullYear()}</p>
      </div>

      <div class="content">
        <div class="student-details">
          <div class="section">
            <div class="section-title">PERSONAL INFORMATION</div>
            <div class="info-grid">
              <div class="info-label">Student ID:</div>
              <div class="info-value">${student.sId}</div>
              <div class="info-label">Full Name:</div>
              <div class="info-value">${student.name}</div>
              <div class="info-label">Date of Birth:</div>
              <div class="info-value">${formatDateWithoutTime(student.dob)}</div>
              <div class="info-label">Contact Number:</div>
              <div class="info-value">${student.contact || 'N/A'}</div>
              <div class="info-label">Email Address:</div>
              <div class="info-value">${student.email}</div>
              <div class="info-label">Permanent Address:</div>
              <div class="info-value">${student.address || 'N/A'}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">ACADEMIC INFORMATION</div>
            <div class="info-grid">
              <div class="info-label">Faculty:</div>
              <div class="info-value">${student.faculty}</div>
              <div class="info-label">Current Year:</div>
              <div class="info-value">${student.year}</div>
              <div class="info-label">Semester:</div>
              <div class="info-value">${student.semester}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">ENROLLMENT DETAILS</div>
        <div style="margin-bottom: 15px;">
          <strong>Status:</strong> Active Enrollment<br>
          <strong>Last Updated:</strong> ${new Date().toLocaleDateString()}
        </div>
        <div style="font-style: italic; color: #555;">
          This document serves as official proof of enrollment at LearnLink.
          For verification purposes, please contact the Registrar's Office.
        </div>
      </div>

      <div class="signature-area">
        <div class="signature-box">Student Signature</div>
        <div class="signature-box">Registrar's Signature</div>
      </div>

      <div class="footer">
        Document generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}<br>
        This is a system generated document - No signature required
      </div>

      <div class="no-print" style="margin-top: 20px; text-align: center;">
        <button onclick="window.print()" style="padding: 8px 20px; background: #2c3e50; color: white; border: none; border-radius: 4px; cursor: pointer;">Print/Save as PDF</button>
        <button onclick="window.close()" style="padding: 8px 20px; margin-left: 10px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer;">Close Window</button>
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
};


  const handleConfirmDelete = async () => {
    if (!studentToDelete) return;
    try {
      await axios.delete(`${API_URL}/${studentToDelete.sId}`);
      const updatedList = students.filter((s) => s.sId !== studentToDelete.sId);
      setStudents(updatedList);
      setFilteredStudents(updatedList);
      setSnackbar({
        open: true,
        message: `Student ${studentToDelete.sId} deleted successfully`,
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: `Failed to delete student ${studentToDelete.sId}`,
        severity: 'error',
      });
    } finally {
      setConfirmDeleteOpen(false);
      setStudentToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDeleteOpen(false);
    setStudentToDelete(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <StyledPaper elevation={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">Student Management</Typography>
        <Tooltip title="Refresh data">
          <IconButton onClick={fetchStudents} color="primary">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <TextField
        fullWidth
        label="Search students"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ maxWidth: 300, mb: 3 }}
        size="medium"
        InputProps={{
          startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
        }}
        placeholder="Search by name, ID or email..."
      />

      <TableContainer sx={{ flex: 1, overflow: 'auto' }}>
        <Table stickyHeader>
          <StyledTableHead>
            <TableRow>
              {TABLE_HEADERS.map((header) => (
                <StyledTableCell key={header} align={header === 'Actions' ? 'center' : 'left'}>
                  {header}
                </StyledTableCell>
              ))}
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={TABLE_HEADERS.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={TABLE_HEADERS.length} align="center">
                  <Alert severity="error">{error}</Alert>
                </TableCell>
              </TableRow>
            ) : filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={TABLE_HEADERS.length} align="center">
                  <Alert severity="info">No students found</Alert>
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.slice().reverse().map((student) => (
                <StyledTableRow key={student.sId} hover>
                  <TableCell>{student.sId}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.contact}</TableCell>
                  <TableCell>{formatDateWithoutTime(student.dob)}</TableCell>
                  <TableCell>{student.address || 'N/A'}</TableCell>
                  <TableCell>{student.faculty}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>{student.semester}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit student">
                      <ActionButton onClick={() => handleEdit(student)}>
                        <EditIcon color="primary" fontSize="small" />
                      </ActionButton>
                    </Tooltip>
                    <Tooltip title="Delete student">
                      <ActionButton onClick={() => handleDeleteClick(student)}>
                        <DeleteIcon color="error" fontSize="small" />
                      </ActionButton>
                    </Tooltip>
                    <Tooltip title="Generate PDF">
                      <ActionButton onClick={() => generateStudentPDF(student)}>
                        <PdfIcon color="secondary" fontSize="small" />
                      </ActionButton>
                    </Tooltip>
                  </TableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={confirmDeleteOpen}
        onClose={handleCancelDelete}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete student <strong>{studentToDelete?.sId}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </StyledPaper>
  );
};

export default StudentTable;