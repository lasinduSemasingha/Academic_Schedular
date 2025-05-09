import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  CircularProgress,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  CssBaseline,
  ThemeProvider,
  createTheme,
  alpha,
  styled,
  Avatar
} from "@mui/material";
import {
  Upload as UploadIcon,
  CloudUpload as CloudUploadIcon,
  AddCircle as AddIcon,
  RemoveCircle as RemoveIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Grading as GradingIcon,
  Description as DescriptionIcon,
  Folder as FolderIcon,
  School as SchoolIcon
} from "@mui/icons-material";

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2c387e',
    },
    secondary: {
      main: '#11cb5f',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '"Inter"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h5: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 30px 0 rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
  },
});

// Styled Components
const SectionCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  border: `1px solid ${theme.palette.divider}`,
}));

const FileInputButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5, 3),
}));

const StatusBadge = styled(Box)(({ theme, status }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0.5, 1.5),
  borderRadius: '12px',
  fontWeight: 500,
  fontSize: '0.75rem',
  backgroundColor: status === 'success' 
    ? alpha(theme.palette.success.main, 0.1) 
    : alpha(theme.palette.error.main, 0.1),
  color: status === 'success' 
    ? theme.palette.success.dark 
    : theme.palette.error.dark,
}));

const AnswerItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px',
  backgroundColor: theme.palette.background.paper,
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));

// Upload Answer Sheet Component
function UploadAnswerSheet() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponse(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post(
        "https://localhost:7006/api/answers/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResponse(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionCard>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <DescriptionIcon />
          </Avatar>
        }
        title="Upload Answer Sheet"
        subheader="Upload individual student answer sheets for processing"
        titleTypographyProps={{ variant: 'h6' }}
      />
      
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FileInputButton
              component="label"
              variant="contained"
              color="primary"
              startIcon={<UploadIcon />}
            >
              Select Answer Sheet
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </FileInputButton>
            
            {file && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                mb: 2,
                p: 1.5,
                backgroundColor: 'action.hover',
                borderRadius: '8px'
              }}>
                <DescriptionIcon color="action" />
                <Typography variant="body2">
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </Typography>
              </Box>
            )}
            
            <Button
              onClick={handleUpload}
              disabled={loading || !file}
              variant="contained"
              color="primary"
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <CloudUploadIcon />
                )
              }
              fullWidth
              sx={{ height: '48px' }}
            >
              {loading ? "Processing..." : "Upload Answer Sheet"}
            </Button>
          </Grid>
          
          <Grid item xs={12}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {response && (
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    mb: 1,
                    p: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      borderRadius: '4px'
                    }
                  }}
                  onClick={() => setExpanded(!expanded)}
                >
                  <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                    Upload Results
                  </Typography>
                  {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Box>
                
                <Collapse in={expanded}>
                  <Paper elevation={0} sx={{ 
                    p: 2, 
                    backgroundColor: 'background.default',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '8px'
                  }}>
                    <pre style={{ 
                      margin: 0, 
                      fontSize: '0.875rem',
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word'
                    }}>
                      {JSON.stringify(response, null, 2)}
                    </pre>
                  </Paper>
                </Collapse>
              </Box>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </SectionCard>
  );
}

// Upload Bulk Answer Sheets Component
function UploadBulkAnswerSheet() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
    setResponse(null);
    setError(null);
  };

  const handleBulkUpload = async () => {
    if (files.length === 0) {
      setError("Please select at least one file to upload");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const { data } = await axios.post(
        "https://localhost:7006/api/answers/upload-bulk",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      
      const transformedResponse = Array.isArray(data) 
        ? data.map(item => ({
            fileName: item.fileName || "Unknown",
            success: item.success !== false,
            message: item.message || "Successfully processed"
          }))
        : [];
      
      setResponse(transformedResponse);
      setError(null);
    } catch (err) {
      console.error("Bulk upload error:", err);
      setError(err.response?.data?.message || "Error uploading files. Please try again.");
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionCard>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <FolderIcon />
          </Avatar>
        }
        title="Bulk Upload Answer Sheets"
        subheader="Upload multiple answer sheets at once for batch processing"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FileInputButton
              component="label"
              variant="contained"
              color="primary"
              startIcon={<UploadIcon />}
            >
              Select Multiple Files
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </FileInputButton>
            
            {files.length > 0 && (
              <List dense sx={{ 
                maxHeight: 200, 
                overflow: 'auto', 
                mb: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '8px',
                p: 1
              }}>
                {files.map((file, index) => (
                  <ListItem key={index} sx={{ px: 1 }}>
                    <ListItemText
                      primary={file.name}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondary={`${(file.size / 1024).toFixed(2)} KB`}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                ))}
              </List>
            )}
            
            <Button
              onClick={handleBulkUpload}
              disabled={loading || files.length === 0}
              variant="contained"
              color="primary"
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <CloudUploadIcon />
                )
              }
              fullWidth
              sx={{ height: '48px' }}
            >
              {loading ? "Processing..." : "Upload All Files"}
            </Button>
          </Grid>
          
          <Grid item xs={12}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {response && (
              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
                  Bulk Upload Summary
                </Typography>
                
                <TableContainer component={Paper} elevation={0} sx={{ 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '8px'
                }}>
                  <Table size="small">
                    <TableHead sx={{ 
                      backgroundColor: 'background.default' 
                    }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>File Name</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Details</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {response.map((item, index) => (
                        <TableRow 
                          key={index}
                          sx={{ 
                            '&:last-child td': { borderBottom: 0 },
                            '&:hover': { backgroundColor: 'action.hover' }
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <DescriptionIcon fontSize="small" color="action" />
                              <Typography variant="body2">
                                {item.fileName}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <StatusBadge status={item.success ? 'success' : 'error'}>
                              {item.success ? 'Success' : 'Failed'}
                            </StatusBadge>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {item.message}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  mt: 2,
                  p: 1.5,
                  backgroundColor: 'background.default',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '8px'
                }}>
                  <Typography variant="body2">
                    <strong>Total:</strong> {response.length} files
                  </Typography>
                  <Typography variant="body2">
                    <strong>Successful:</strong> {response.filter(r => r.success).length}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Failed:</strong> {response.filter(r => !r.success).length}
                  </Typography>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </SectionCard>
  );
}

// Submit Marks Component
function SubmitMarks() {
  const [studentId, setStudentId] = useState("");
  const [fileName, setFileName] = useState("");
  const [answers, setAnswers] = useState([{ question: "", answer: "", mark: "" }]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleAddAnswer = () => {
    setAnswers([...answers, { question: "", answer: "", mark: "" }]);
  };

  const handleRemoveAnswer = (index) => {
    if (answers.length > 1) {
      const newAnswers = [...answers];
      newAnswers.splice(index, 1);
      setAnswers(newAnswers);
    }
  };

  const handleSubmitMarks = async () => {
    const hasEmptyFields = answers.some(a => !a.question || !a.answer || a.mark === "");
    
    if (!studentId || !fileName || hasEmptyFields) {
      setError("Please fill all required fields before submitting");
      return;
    }

    setLoading(true);
    try {
      const data = {
        studentId,
        fileName,
        answers: answers.map(a => ({
          ...a,
          mark: parseInt(a.mark, 10)
        }))
      };
      
      const { data: responseData } = await axios.post(
        "https://localhost:7006/api/answers/submit-marks",
        data
      );
      
      setResponse(responseData);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error submitting marks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionCard>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <GradingIcon />
          </Avatar>
        }
        title="Manual Marks Submission"
        subheader="Enter marks for student answers manually"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SchoolIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Assessment File Name"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
              Answer Details
            </Typography>
            
            {answers.map((answer, index) => (
              <AnswerItem key={index}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label={`Question ${index + 1}`}
                      value={answer.question}
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        newAnswers[index].question = e.target.value;
                        setAnswers(newAnswers);
                      }}
                      fullWidth
                      required
                      size="small"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label={`Answer ${index + 1}`}
                      value={answer.answer}
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        newAnswers[index].answer = e.target.value;
                        setAnswers(newAnswers);
                      }}
                      fullWidth
                      required
                      size="small"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Marks Awarded"
                      type="number"
                      value={answer.mark}
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        newAnswers[index].mark = e.target.value;
                        setAnswers(newAnswers);
                      }}
                      fullWidth
                      required
                      size="small"
                      InputProps={{
                        inputProps: { min: 0, max: 100 },
                        endAdornment: <InputAdornment position="end">pts</InputAdornment>,
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={1}>
                    <IconButton
                      onClick={() => handleRemoveAnswer(index)}
                      color="error"
                      disabled={answers.length <= 1}
                      size="small"
                      sx={{ 
                        backgroundColor: 'error.light',
                        '&:hover': { backgroundColor: 'error.main', color: 'white' }
                      }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              </AnswerItem>
            ))}
            
            <Button
              onClick={handleAddAnswer}
              startIcon={<AddIcon />}
              variant="outlined"
              sx={{ mb: 3 }}
            >
              Add Answer Field
            </Button>
            
            <Button
              onClick={handleSubmitMarks}
              disabled={loading}
              variant="contained"
              color="primary"
              startIcon={
                loading ? <CircularProgress size={20} color="inherit" /> : null
              }
              fullWidth
              sx={{ height: '48px' }}
            >
              {loading ? "Submitting..." : "Submit Marks"}
            </Button>
          </Grid>
          
          <Grid item xs={12}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {response && (
              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Marks submitted successfully!
                </Typography>
                <Box sx={{ 
                  mt: 1, 
                  p: 1, 
                  backgroundColor: 'background.paper',
                  borderRadius: '4px'
                }}>
                  <pre style={{ 
                    margin: 0, 
                    fontSize: '0.75rem',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word'
                  }}>
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </Box>
              </Alert>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </SectionCard>
  );
}

// Display Extracted Answers Component
function ExtractedAnswers() {
  const [answers, setAnswers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const fetchAnswers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("https://localhost:7006/api/answers");
      setAnswers(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching answers. Please try again.");
      setAnswers(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionCard>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <SchoolIcon />
          </Avatar>
        }
        title="Extracted Answers Database"
        subheader="View all extracted answers from the system"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Button
          onClick={fetchAnswers}
          variant="contained"
          color="primary"
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : null
          }
          disabled={loading}
          sx={{ mb: 2 }}
        >
          {loading ? "Loading..." : "Fetch All Answers"}
        </Button>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {answers && (
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                mb: 1,
                p: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                  borderRadius: '4px'
                }
              }}
              onClick={() => setExpanded(!expanded)}
            >
              <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                {expanded ? "Hide" : "Show"} Extracted Answers ({answers.length})
              </Typography>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
            
            <Collapse in={expanded}>
              <Paper elevation={0} sx={{ 
                p: 2, 
                maxHeight: 400, 
                overflow: 'auto',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '8px'
              }}>
                <pre style={{ 
                  margin: 0,
                  fontSize: '0.75rem',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word'
                }}>
                  {JSON.stringify(answers, null, 2)}
                </pre>
              </Paper>
            </Collapse>
          </Box>
        )}
      </CardContent>
    </SectionCard>
  );
}

// Main App Component
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ 
          mb: 4,
          p: 3,
          backgroundColor: 'primary.main',
          color: 'white',
          borderRadius: '12px',
          boxShadow: 3
        }}>
          <Typography variant="h4" component="h1" sx={{ 
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            <GradingIcon fontSize="large" />
            Academic Grading System
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
            Professional answer sheet processing and grading platform
          </Typography><br />
          <Button sx={{ color: "primary.main", mx: 1, backgroundColor: "white" }} component={Link} to="/add-marks">Give Marks</Button>
        </Box>
        
        <UploadAnswerSheet />
        <UploadBulkAnswerSheet />
        <SubmitMarks />
        <ExtractedAnswers />
        
        <Box sx={{ 
          mt: 4, 
          pt: 3, 
          borderTop: '1px solid',
          borderColor: 'divider',
          textAlign: 'center'
        }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Academic Grading System | Version 1.0.0
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}