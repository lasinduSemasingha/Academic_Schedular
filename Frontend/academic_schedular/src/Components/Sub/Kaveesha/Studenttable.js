import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Grid,
  IconButton,
  Tooltip,
  Avatar,
  useTheme,
  TablePagination,
  InputAdornment,
  Divider,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PictureAsPdf as PdfIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

const StudentTable = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const initialStudents = [
    {
      id: 'IT22444489',
      name: 'Kaveesha Nethmi',
      email: 'kavee@gmail.com',
      contact: '0712345678',
      dob: '2000-05-14',
      address: '123 Main Street, Colombo 05, Sri Lanka',
      faculty: 'Engineering',
      year: '2nd Year',
      semester: 'Semester 1',
      avatar: '/avatars/1.jpg'
    },
    {
      id: 'IT25894489',
      name: 'Heshani Fernando',
      email: 'heshani@gmail.com',
      contact: '0778765432',
      dob: '2001-09-22',
      address: '456 Oak Avenue, Kandy, Sri Lanka',
      faculty: 'Science',
      year: '1st Year',
      semester: 'Semester 2',
      avatar: '/avatars/2.jpg'
    },
    {
      id: 'IT25895689',
      name: 'Chanudi Himansala',
      email: 'chanudi@example.com',
      contact: '0778723432',
      dob: '2000-09-22',
      address: '789 Pine Road, Galle, Sri Lanka',
      faculty: 'Science',
      year: '1st Year',
      semester: 'Semester 2',
      avatar: '/avatars/3.jpg'
    }
  ];

  const [students, setStudents] = useState(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(initialStudents);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const handleEdit = (studentId) => {
    navigate("/editstudent", { state: { studentId } });
  };

  const handleDeleteClick = (studentId) => {
    setSelectedStudentId(studentId);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = () => {
    const updated = students.filter((s) => s.id !== selectedStudentId);
    setStudents(updated);
    setFilteredStudents(updated);
    setOpenDialog(false);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = students.filter(
      (student) =>
        student.name.toLowerCase().includes(query.toLowerCase()) ||
        student.id.toLowerCase().includes(query.toLowerCase()) ||
        student.address.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStudents(filtered);
    setPage(0);
  };

  const handleGenerateReport = () => {
    alert('Generating Student Enrollment Report...');
  };

  const handleRefresh = () => {
    setSearchQuery('');
    setFilteredStudents(students);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredStudents.length) : 0;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 1 }}>
            Student Details
          </Typography>

          <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Search by Name, ID or Address"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearch}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={8} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Tooltip title="Refresh">
                <IconButton onClick={handleRefresh}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Filters">
                <IconButton>
                  <FilterIcon />
                </IconButton>
              </Tooltip>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<PdfIcon />}
                onClick={handleGenerateReport}
              >
                Student Enrollment Report
              </Button>
            </Grid>
          </Grid>
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: 2, mb: 4 }}>
          <Table>
            <TableHead sx={{ backgroundColor: theme.palette.grey[100] }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Student ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Student Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date of Birth</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Address</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Faculty</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Year</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Semester</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredStudents
              ).map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar src={student.avatar} sx={{ width: 32, height: 32 }}>
                        <PersonIcon />
                      </Avatar>
                      {student.name}
                    </Box>
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.contact}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarIcon fontSize="small" color="action" />
                      {student.dob}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'normal' }}>{student.address}</TableCell>
                  <TableCell>{student.faculty}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>{student.semester}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                      <Tooltip title="Edit">
                        <IconButton color="primary" onClick={() => handleEdit(student.id)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDeleteClick(student.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={10} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredStudents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Divider sx={{ my: 4 }} />
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: theme.palette.secondary.main }}>
              STUDENT ENROLLMENT REPORT
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Click the "Student Enrollment Report" button above to generate a comprehensive report of all student enrollments.
            </Typography>
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this student record?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              No
            </Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default StudentTable;
