import React, { useState } from "react";
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Grid, 
  CircularProgress,
  Paper,
  Avatar,
  Link
} from "@mui/material";
import { Lock as LockIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://localhost:7001/user/auth", {
        username,
        password,
      });

      if (response.data.message) {
        sessionStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", response.data.token);
        window.location.href = '/'; // Using react-router navigation instead of window.location
      }
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockIcon />
        </Avatar>
        
        <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
          Academic Scheduler
        </Typography>
        
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
          Sign in to manage your academic schedule
        </Typography>

        <Box component="form" onSubmit={handleLogin} sx={{ mt: 3, width: '100%' }}>
          {error && (
            <Typography 
              variant="body2" 
              color="error" 
              align="center"
              sx={{ 
                mb: 2,
                padding: 1,
                backgroundColor: 'error.light',
                borderRadius: 1
              }}
            >
              {error}
            </Typography>
          )}
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ 
              mt: 3, 
              mb: 2,
              py: 1.5,
              borderRadius: 1,
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
          </Button>
          
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/register" variant="body2" underline="hover">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;