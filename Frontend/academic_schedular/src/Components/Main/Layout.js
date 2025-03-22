import React from "react";
import { AppBar, Toolbar, Typography, Container, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Academic Scheduler
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/exam">
            Exam
          </Button>
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
          <Button color="inherit" component={Link} to="/lecturer">
            Lecturer
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ flexGrow: 1, py: 4 }}>{children}</Container>

      <Box component="footer" sx={{ py: 2, textAlign: "center", bgcolor: "primary.main", color: "white" }}>
        <Typography variant="body2">© 2025 Academic Scheduler. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Layout;
