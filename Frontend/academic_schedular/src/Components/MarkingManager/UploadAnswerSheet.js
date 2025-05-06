// src/App.js
import React, { useState } from "react";
import axios from "axios";
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
  InputAdornment
} from "@mui/material";
import {
  Upload as UploadIcon,
  CloudUpload as CloudUploadIcon,
  AddCircle as AddIcon,
  RemoveCircle as RemoveIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from "@mui/icons-material";

// Styled Components
const SectionCard = ({ title, children, ...props }) => (
  <Card variant="outlined" sx={{ mb: 4 }} {...props}>
    <CardHeader
      title={
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
      }
      sx={{ bgcolor: "primary.main", color: "white" }}
    />
    <CardContent>{children}</CardContent>
  </Card>
);

const FileInputButton = ({ onChange, multiple, label, icon: Icon }) => (
  <Button
    component="label"
    variant="contained"
    startIcon={<Icon />}
    sx={{ mb: 2 }}
  >
    {label}
    <input
      type="file"
      hidden
      onChange={onChange}
      multiple={multiple}
      accept=".pdf,.jpg,.jpeg,.png"
    />
  </Button>
);

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
      setError("Please select a file");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post(
        "https://localhost:7005/api/answers/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResponse(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionCard title="Upload Answer Sheet">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FileInputButton
            onChange={handleFileChange}
            label="Select Answer Sheet"
            icon={UploadIcon}
          />
          {file && (
            <Typography variant="body2" sx={{ mb: 2 }}>
              Selected: {file.name}
            </Typography>
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
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  mb: 1,
                }}
                onClick={() => setExpanded(!expanded)}
              >
                <Typography variant="subtitle1">
                  Upload Results {expanded ? "▲" : "▼"}
                </Typography>
              </Box>
              <Collapse in={expanded}>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <pre style={{ overflowX: "auto" }}>
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </Paper>
              </Collapse>
            </Box>
          )}
        </Grid>
      </Grid>
    </SectionCard>
  );
}

// Upload Bulk Answer Sheets Component
// Updated UploadBulkAnswerSheet component
function UploadBulkAnswerSheet() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
  
    const handleFileChange = (e) => {
      setFiles(e.target.files);
      setResponse(null);
      setError(null);
    };
  
    const handleBulkUpload = async () => {
      if (files.length === 0) {
        setError("Please select files");
        return;
      }
  
      setLoading(true);
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append("files", file));
  
      try {
        const { data } = await axios.post(
          "https://localhost:7005/api/answers/upload-bulk",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        
        // Transform the response to properly reflect success status
        const transformedResponse = Array.isArray(data) 
          ? data.map(item => ({
              fileName: item.fileName || "Unknown",
              success: item.success !== false, // Convert to boolean, default to true
              message: item.message || "Successfully processed"
            }))
          : [];
        
        setResponse(transformedResponse);
        setError(null);
      } catch (err) {
        console.error("Bulk upload error:", err);
        setError(err.response?.data?.message || "Error uploading files");
        setResponse(null);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <SectionCard title="Bulk Upload Answer Sheets">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FileInputButton
              onChange={handleFileChange}
              multiple
              label="Select Multiple Answer Sheets"
              icon={UploadIcon}
            />
            {files.length > 0 && (
              <List dense sx={{ maxHeight: 150, overflow: "auto", mb: 2 }}>
                {Array.from(files).map((file, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={file.name}
                      secondary={`${(file.size / 1024).toFixed(2)} KB`}
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
            >
              {loading ? "Processing..." : "Upload All Answer Sheets"}
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
                <Typography variant="subtitle1" gutterBottom>
                  Bulk Upload Summary
                </Typography>
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>File Name</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell>Message</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {response.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.fileName}</TableCell>
                          <TableCell align="right">
                            {item.success ? (
                              <Typography color="success.main">Success</Typography>
                            ) : (
                              <Typography color="error.main">Failed</Typography>
                            )}
                          </TableCell>
                          <TableCell>{item.message}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Grid>
        </Grid>
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
    if (!studentId || !fileName || answers.some(a => !a.question || !a.answer || a.mark === "")) {
      setError("Please fill all required fields");
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
        "https://localhost:7005/api/answers/submit-marks",
        data
      );
      setResponse(responseData);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error submitting marks");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionCard title="Manual Marks Submission">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Answer Details
          </Typography>
          
          {answers.map((answer, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, border: "1px solid #eee", borderRadius: 1 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={11}>
                  <Grid container spacing={2}>
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
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Mark"
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
                  </Grid>
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    onClick={() => handleRemoveAnswer(index)}
                    color="error"
                    disabled={answers.length <= 1}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))}
          
          <Button
            onClick={handleAddAnswer}
            startIcon={<AddIcon />}
            variant="outlined"
            sx={{ mb: 2 }}
          >
            Add Another Answer
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
              Marks submitted successfully!
              <pre style={{ marginTop: 8, marginBottom: 0 }}>
                {JSON.stringify(response, null, 2)}
              </pre>
            </Alert>
          )}
        </Grid>
      </Grid>
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
      const { data } = await axios.get("https://localhost:7005/api/answers");
      setAnswers(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching answers");
      setAnswers(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionCard title="Extracted Answers Database">
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
        {loading ? "Loading..." : "Fetch All Extracted Answers"}
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
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              mb: 1,
            }}
            onClick={() => setExpanded(!expanded)}
          >
            <Typography variant="subtitle1">
              {expanded ? "Hide" : "Show"} Extracted Answers ({answers.length})
            </Typography>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>
          <Collapse in={expanded}>
            <Paper elevation={2} sx={{ p: 2, maxHeight: 400, overflow: "auto" }}>
              <pre style={{ margin: 0 }}>
                {JSON.stringify(answers, null, 2)}
              </pre>
            </Paper>
          </Collapse>
        </Box>
      )}
    </SectionCard>
  );
}

// Main App Component
export default function App() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Answer Sheet Grading System
      </Typography>
      
      <UploadAnswerSheet />
      <UploadBulkAnswerSheet />
      <SubmitMarks />
      <ExtractedAnswers />
      
      <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #eee' }}>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Grading System - All rights reserved
        </Typography>
      </Box>
    </Container>
  );
}