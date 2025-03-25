import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Container, Box, Button, Drawer, List, ListItem, ListItemText, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { Home, AccountCircle, Schedule, Settings, Assignment } from "@mui/icons-material";
 import { faBars } from '@fortawesome/free-solid-svg-icons';
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Academic Scheduler
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/examHome">
            Exam_Home
          </Button>
          <Button color="inherit" component={Link} to="/profile">
            Profile
            </Button>
          <Button color="inherit" onClick={toggleDrawer}>
            <FontAwesomeIcon icon="fa-solid fa-bars" />
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar (Drawer) */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          <ListItem button component={Link} to="/" onClick={closeDrawer}>
            <Home />
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/exam" onClick={closeDrawer}>
            <Assignment />
            <ListItemText primary="Exam" />
          </ListItem>
          <ListItem button component={Link} to="/schedule" onClick={closeDrawer}>
            <Schedule />
            <ListItemText primary="Schedule" />
          </ListItem>
          <ListItem button component={Link} to="/profile" onClick={closeDrawer}>
            <AccountCircle />
            <ListItemText primary="Profile" />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/settings" onClick={closeDrawer}>
            <Settings />
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box>
        <Container sx={{ px: 0 }}>
          {children}
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: "center",
          bgcolor: "primary.main",
          color: "white",
          mt: "auto", // This ensures the footer stays at the bottom
          position: "fixed",
          bottom: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <Typography variant="body2">© 2025 Academic Scheduler. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Layout;
