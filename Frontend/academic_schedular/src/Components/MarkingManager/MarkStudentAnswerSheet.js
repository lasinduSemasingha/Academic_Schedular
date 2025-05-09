import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Divider,
  CircularProgress,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  Save as SaveIcon,
  CheckCircle as CheckCircleIcon,
  Grading as GradingIcon
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
  },
});

const MarkingManager = () => {
  const [studentId, setStudentId] = useState('');
  const [fileName, setFileName] = useState('');
  const [answerSheet, setAnswerSheet] = useState(null);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchAnswerSheet = async () => {
    if (!studentId || !fileName) {
      alert('Please enter both Student ID and File Name.');
      return;
    }

    setLoading(true);
    setSuccess(false);
    try {
      const response = await axios.get(
        `https://localhost:7006/api/answers/details/${fileName}?studentId=${studentId}`
      );
      const data = response.data;

      if (data.answers && Array.isArray(data.answers.$values)) {
        setAnswerSheet(data);
        // Initialize marks with existing values if available
        const initialMarks = {};
        data.answers.$values.forEach(a => {
          initialMarks[a.question] = a.mark || '';
        });
        setMarks(initialMarks);
      } else {
        alert('Invalid answer sheet data received.');
      }
    } catch (error) {
      console.error('Error fetching answer sheet:', error);
      alert('Failed to fetch answer sheet. Please check the details and try again.');
    }
    setLoading(false);
  };

  const handleMarkChange = (question, value) => {
    const numericValue = value === '' ? '' : Math.max(0, parseInt(value) || 0);
    setMarks(prev => ({
      ...prev,
      [question]: numericValue
    }));
  };

  const calculateTotalMarks = () => {
    return Object.values(marks).reduce((sum, mark) => sum + (parseInt(mark) || 0), 0);
  };

  const submitMarks = async () => {
    if (!answerSheet) {
      alert('No answer sheet available to submit marks.');
      return;
    }

    setSubmitting(true);
    const updatedMarks = Object.entries(marks).map(([question, mark]) => ({
      question,
      answer: answerSheet.answers.$values.find(a => a.question === question)?.answerText || '',
      mark: parseInt(mark)
    }));

    const payload = {
      studentId: answerSheet.studentId,
      fileName: answerSheet.fileName,
      answers: updatedMarks,
      totalMarks: calculateTotalMarks()
    };

    try {
      await axios.post('https://localhost:7006/api/answers/submit-marks', payload);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting marks:', error);
      alert('Failed to submit marks. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Card elevation={3}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <GradingIcon />
              </Avatar>
            }
            title={
              <Typography variant="h5" component="div">
                Academic Marking Manager
              </Typography>
            }
            subheader="Evaluate and grade student answer sheets"
          />
          
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Student ID"
                  variant="outlined"
                  fullWidth
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter student identifier"
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Assessment File"
                  variant="outlined"
                  fullWidth
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g., MATH101_Final_2023"
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Tooltip title="Retrieve answer sheet">
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={fetchAnswerSheet}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                    sx={{ height: '56px' }}
                  >
                    {loading ? 'Loading...' : 'Search'}
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>

            {answerSheet && (
              <Paper elevation={0} sx={{ p: 3, mt: 4, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box>
                    <Typography variant="h6" color="primary">
                      {answerSheet.fileName}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      Student: {answerSheet.studentId}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1">
                      Total: <strong>{calculateTotalMarks()}</strong> marks
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />

                <Grid container spacing={3}>
                  {Array.isArray(answerSheet.answers?.$values) && answerSheet.answers.$values.map((a, idx) => (
                    <Grid item xs={12} key={idx}>
                      <Box sx={{ p: 2, backgroundColor: idx % 2 === 0 ? '#f9f9f9' : 'white', borderRadius: 1 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} md={8}>
                            <Typography fontWeight="bold" gutterBottom>
                              Question {idx + 1}: {a.question}
                            </Typography>
                            <Box sx={{ 
                              p: 1.5, 
                              backgroundColor: '#f5f5f5', 
                              borderRadius: 1,
                              borderLeft: '3px solid #3f51b5'
                            }}>
                              <Typography variant="body1" component="div">
                                <Box component="span" fontWeight="500" color="text.secondary">Answer:</Box> {a.answerText}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              type="number"
                              label="Allocated Marks"
                              variant="outlined"
                              fullWidth
                              InputProps={{
                                inputProps: { 
                                  min: 0,
                                  style: { textAlign: 'center' }
                                }
                              }}
                              value={marks[a.question] ?? ''}
                              onChange={(e) => handleMarkChange(a.question, e.target.value)}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Box mt={4} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={submitMarks}
                    disabled={submitting || success}
                    startIcon={
                      submitting ? <CircularProgress size={20} /> : 
                      success ? <CheckCircleIcon /> : <SaveIcon />
                    }
                    sx={{ minWidth: 150 }}
                  >
                    {submitting ? 'Submitting...' : 
                     success ? 'Submitted!' : 'Save Assessment'}
                  </Button>
                </Box>
              </Paper>
            )}
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default MarkingManager;