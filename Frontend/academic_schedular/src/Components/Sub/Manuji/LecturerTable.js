import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Stack,
} from '@mui/material';

const LecturerDetailsTable = () => {
  const [lecturers, setLecturers] = useState([]);
  const [filteredLecturers, setFilteredLecturers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLecturers();
  }, []);

  useEffect(() => {
    const filteredData = lecturers.filter((lecturer) =>
      (lecturer.lId && lecturer.lId.toString().includes(searchQuery)) ||
      (lecturer.name && lecturer.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredLecturers(filteredData);
  }, [searchQuery, lecturers]);

  const fetchLecturers = async () => {
    try {
      const response = await axios.get('https://localhost:7004/Lecturer');
      let data = response.data;
      if (!Array.isArray(data)) {
        data = Object.values(data).flat();
      }
      setLecturers(Array.isArray(data) ? data : []);
      setFilteredLecturers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching lecturers:', error);
      setLecturers([]);
      setFilteredLecturers([]);
    }
  };

  const handleDeleteClick = (lecturer) => {
    setSelectedLecturer(lecturer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLecturer(null);
  };

  const confirmDelete = async () => {
    if (!selectedLecturer?.lId) return;
    try {
      await axios.delete(`https://localhost:7004/Lecturer/${selectedLecturer.lId}`);
      fetchLecturers();
    } catch (error) {
      console.error('Error deleting lecturer:', error);
    } finally {
      handleClose();
    }
  };

  const handleEditClick = (lecturer) => {
    navigate(`/editlecturer/${lecturer.lId}`, { state: { lecturer } });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const generatePDFReport = (lecturer) => {
  const content = `
<html>
<head>
  <title>Academic Profile - ${lecturer.name} | ${lecturer.department}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&family=Playfair+Display:wght@400;600&display=swap');
    
    :root {
      --primary: #2c3e50;
      --secondary: #1976d2;
      --accent: #e74c3c;
      --light: #ecf0f1;
      --dark: #2c3e50;
      --gray: #95a5a6;
      --light-gray: #f8f9fa;
    }
    
    body { 
      font-family: 'Montserrat', sans-serif; 
      padding: 0;
      line-height: 1.8;
      color: var(--dark);
      max-width: 1000px;
      margin: 0 auto;
      background-color: var(--light-gray);
    }
    
    .paper {
      background: white;
      box-shadow: 0 5px 30px rgba(0,0,0,0.1);
      margin: 40px;
      padding: 50px;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
    }
    
    .paper:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 8px;
      background: linear-gradient(90deg, var(--secondary), var(--accent));
    }
    
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 30px;
      border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    
    h1 {
      font-family: 'Playfair Display', serif;
      color: var(--primary); 
      margin: 0;
      font-size: 2.5rem;
      font-weight: 600;
      letter-spacing: -0.5px;
    }
    
    .subtitle {
      color: var(--gray);
      font-weight: 300;
      margin-top: 10px;
      font-size: 1.2rem;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    
    .profile-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-bottom: 40px;
    }
    
    .profile-details {
      display: grid;
      grid-template-columns: 1fr;
      gap: 25px;
    }
    
    .detail-item {
      padding: 20px;
      background: var(--light-gray);
      border-radius: 6px;
      transition: all 0.3s ease;
      border-left: 4px solid var(--secondary);
    }
    
    .detail-item:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    }
    
    .detail-label {
      font-weight: 600;
      color: var(--secondary);
      display: block;
      margin-bottom: 8px;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .detail-value {
      font-size: 1.1rem;
      color: var(--dark);
    }
    
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .contact-info a {
      color: var(--secondary);
      text-decoration: none;
      transition: color 0.3s;
    }
    
    .contact-info a:hover {
      color: var(--accent);
    }
    
    .profile-image {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .profile-image-placeholder {
      width: 250px;
      height: 250px;
      background: linear-gradient(135deg, var(--light), var(--gray));
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 4rem;
      font-weight: bold;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    
    .professional-profile {
      grid-column: span 2;
      padding: 30px;
      background: white;
      border: 1px solid rgba(0,0,0,0.05);
      border-radius: 6px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.02);
    }
    
    .professional-profile .detail-label {
      margin-bottom: 15px;
    }
    
    .professional-profile .detail-value {
      line-height: 1.8;
      font-size: 1rem;
    }
    
    .university-branding {
      text-align: center;
      color: var(--gray);
      font-size: 0.9em;
      margin-top: 60px;
      padding-top: 20px;
      border-top: 1px solid rgba(0,0,0,0.1);
      font-style: italic;
    }
    
    .signature {
      margin-top: 40px;
      display: flex;
      justify-content: flex-end;
    }
    
    .signature-line {
      width: 200px;
      height: 1px;
      background: var(--gray);
      margin-top: 40px;
      position: relative;
    }
    
    .signature-line:after {
      content: "Dean of Faculty";
      position: absolute;
      top: -25px;
      left: 0;
      width: 100%;
      text-align: center;
      font-size: 0.8rem;
      color: var(--gray);
    }
    
    @media (max-width: 768px) {
      .paper {
        margin: 20px;
        padding: 30px;
      }
      
      .profile-section {
        grid-template-columns: 1fr;
      }
      
      .professional-profile {
        grid-column: span 1;
      }
    }
  </style>
</head>
<body>
  <div class="paper">
    <div class="header">
      <h1>Faculty Excellence Portfolio</h1>
      <h2 class="subtitle">Distinguished Academic Profile</h2>
    </div>

    <div class="profile-section">
      <div class="profile-details">
        <div class="detail-item">
          <span class="detail-label">Faculty ID</span>
          <div class="detail-value">${lecturer.lId}</div>
        </div>
        
        <div class="detail-item">
          <span class="detail-label">Full Name</span>
          <div class="detail-value">${lecturer.name}</div>
        </div>
        
        <div class="detail-item">
          <span class="detail-label">Department</span>
          <div class="detail-value">${lecturer.department}</div>
        </div>
        
        <div class="detail-item">
          <span class="detail-label">Contact Information</span>
          <div class="detail-value contact-info">
            <a href="mailto:${lecturer.email}">${lecturer.email}</a>
            <span>${lecturer.phoneNumber}</span>
          </div>
        </div>
      </div>
      </div>
      
      <div class="professional-profile">
        <span class="detail-label">Academic Profile</span>
        <div class="detail-value">
          <p>${lecturer.description}</p>
          <p>With a distinguished career spanning multiple areas of expertise, ${lecturer.name} has made significant contributions to the ${lecturer.department} department through innovative teaching methodologies and groundbreaking research.</p>
        </div>
      </div>
    </div>
    
    <div class="signature">
      <div class="signature-line"></div>
    </div>

    <div class="university-branding">
      Official Document | Generated by Office of Academic Affairs<br>
      ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
    </div>
  </div>
</body>
</html>
  `;

  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Lecturer_Report_${lecturer.lId}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};


  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h4" gutterBottom align="center">
          Lecturer Details
        </Typography>

        {/* Search & Report Bar */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <TextField
            label="Search by ID or Name"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
            sx={{ maxWidth: '500px' }}
          />
        </Stack>

        <TableContainer component={Paper} sx={{ boxShadow: 4, borderRadius: 2 }}>
          <Table sx={{ width: '100%' }}>
            <TableHead sx={{ backgroundColor: '#1976d2' }}>
              <TableRow>
                <TableCell sx={headerStyle}>ID</TableCell>
                <TableCell sx={headerStyle}>Name</TableCell>
                <TableCell sx={headerStyle}>Email</TableCell>
                <TableCell sx={headerStyle}>Phone</TableCell>
                <TableCell sx={headerStyle}>Department</TableCell>
                <TableCell sx={headerStyle}>Description</TableCell>
                <TableCell sx={headerStyle}>Edit</TableCell>
                <TableCell sx={headerStyle}>Delete</TableCell>
                <TableCell sx={headerStyle}>Report</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLecturers.map((lecturer) => (
                <TableRow
                  key={lecturer.lId}
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                    '&:hover': {
                      backgroundColor: '#e3f2fd',
                      transition: 'background-color 0.3s',
                    },
                  }}
                >
                  <TableCell align="center">{lecturer.lId}</TableCell>
                  <TableCell align="center">{lecturer.name}</TableCell>
                  <TableCell align="center">{lecturer.email}</TableCell>
                  <TableCell align="center">{lecturer.phonenumber}</TableCell>
                  <TableCell align="center">{lecturer.department}</TableCell>
                  <TableCell align="center">{lecturer.description}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleEditClick(lecturer)}
                      sx={{ bgcolor: '#0288d1', color: 'white', '&:hover': { bgcolor: '#0277bd' } }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleDeleteClick(lecturer)}
                      sx={{
                        color: '#d32f2f',
                        borderColor: '#d32f2f',
                        '&:hover': { bgcolor: '#ffebee' },
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => generatePDFReport(lecturer)}
                      sx={{
                        color: '#388e3c',
                        borderColor: '#388e3c',
                        '&:hover': { bgcolor: '#e8f5e9' },
                      }}
                    >
                    Report
                     </Button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete{' '}
              <strong>{selectedLecturer?.name}</strong>? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

const headerStyle = {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '0.95rem',
};

export default LecturerDetailsTable;
