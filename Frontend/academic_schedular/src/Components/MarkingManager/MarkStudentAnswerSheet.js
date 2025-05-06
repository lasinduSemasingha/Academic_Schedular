import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Divider
} from '@mui/material';

const MarkStudentAnswerSheet = () => {
  const [studentId, setStudentId] = useState('');
  const [answerSheets, setAnswerSheets] = useState([]);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchAnswers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://localhost:7005/api/answers/view-all');
      const filtered = response.data.filter(sheet => sheet.studentId === studentId);
      setAnswerSheets(filtered);
    } catch (error) {
      console.error('Error fetching answers:', error);
    }
    setLoading(false);
  };

  const handleMarkChange = (fileName, question, value) => {
    setMarks(prev => ({
      ...prev,
      [fileName]: {
        ...prev[fileName],
        [question]: value
      }
    }));
  };

  const submitMarks = async (sheet) => {
    const updatedMarks = Object.entries(marks[sheet.fileName] || {}).map(([question, mark]) => {
      const original = sheet.answers.find(a => a.question === question);
      return {
        question,
        answer: original?.answer || '',
        mark: parseInt(mark)
      };
    });

    const payload = {
      studentId: sheet.studentId,
      fileName: sheet.fileName,
      answers: updatedMarks
    };

    try {
      await axios.post('https://localhost:7005/api/answers/submit-marks', payload);
      alert(`Marks submitted for ${sheet.fileName}`);
    } catch (error) {
      console.error('Error submitting marks:', error);
      alert('Failed to submit marks.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Mark Student Answer Sheet
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Student ID"
          variant="outlined"
          fullWidth
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <Button variant="contained" onClick={fetchAnswers} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch'}
        </Button>
      </Box>

      {answerSheets.map((sheet, index) => (
        <Paper key={index} elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6">File: {sheet.fileName}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Student ID: {sheet.studentId}
          </Typography>
          <Divider sx={{ my: 2 }} />

          {sheet.answers.map((a, idx) => (
            <Box key={idx} mb={2}>
              <Typography fontWeight="bold">Q{idx + 1}: {a.question}</Typography>
              <Typography variant="body2" mb={1} ml={2}>A: {a.answer}</Typography>
              <TextField
                type="number"
                label="Mark"
                variant="outlined"
                size="small"
                sx={{ width: 100 }}
                defaultValue={a.mark || ''}
                onChange={(e) =>
                  handleMarkChange(sheet.fileName, a.question, e.target.value)
                }
              />
            </Box>
          ))}

          <Box mt={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => submitMarks(sheet)}
            >
              Submit Marks
            </Button>
          </Box>
        </Paper>
      ))}
    </Container>
  );
};

export default MarkStudentAnswerSheet;
