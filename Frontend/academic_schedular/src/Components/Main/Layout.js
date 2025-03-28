import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Home, AccountCircle, Schedule, Settings, Assignment } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";


const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    // Check if the user is logged in from sessionStorage on page load
    const userLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (userLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    
    navigate("/home"); // Example: Navigate to home page after login
  };

  const handleLogout = () => {
    // Remove the login status from sessionStorage on logout
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false); // Update state to show the login button
    navigate("/login"); // Navigate to the login page after logout
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundImage: 'url(/Main/background.png)' }}>
      {/* AppBar */}
      <AppBar sx={{ backgroundColor: "#002e5f" }} position="static">
        <Toolbar>
        <Typography 
          variant="h5" 
          fontWeight="bold" 
          sx={{
            cursor: 'pointer',
            flexGrow: 1,
            fontSize: '30px',
            fontWeight: 900,
            textDecoration: 'none',
            letterSpacing: '3px',
            display: 'inline-block',
            position: 'relative',
            transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out', // Apply transition to transform and color
            '&:hover span': {
              transform: 'scale(1.1)', // Apply scale to spans directly
              color: '#00d4ff', // Change color on hover
              transitionDelay: '0.2s', // Delay the transformation and color change
            },
          }}
        >
          <span style={{ color: 'white', display: 'inline-block' }}>Academic</span>&nbsp;
          <span style={{ color: '#ffcc00', display: 'inline-block' }}>Scheduler</span>
        </Typography>

          <Button sx={{ color: "white", mx: 1 }} component={Link} to="/">
            Home
          </Button>
          <Button sx={{ color: "white", mx: 1 }} component={Link} to="/examHome">
            Exam
          </Button>
          <Button sx={{ color: "white", mx: 1 }} component={Link} to="/profile">
            Profile
          </Button>
          <Button sx={{ color: "white", mx: 1 }} component={Link} to="/resource">
            Resource
          <Button color="inherit" component={Link} to="/studenthome">
            Student
          </Button>
          </Button>
          {!isLoggedIn ? (
            <Button onClick={handleLogin} component={Link} to="/login" sx={{ color: "white", mx: 1 }}>
              Login
            </Button>
          ) : (
            <Button onClick={handleLogout} sx={{ color: "white", mx: 1 }}>
              Logout
            </Button>
          )}
          <Button color="inherit" component={Link} to="/lecturerhome">
            Lecturer
          </Button>
          {!isLoggedIn ? (
            <Button onClick={handleLogin} component={Link} to="/login" sx={{ color: "white", mx: 1 }}>
              Login
            </Button>
          ) : (
            <>
              <Button sx={{ color: "white", mx: 1 }} component={Link} to="/examHome">
                Exam Home
              </Button>
              <Button sx={{ color: "white", mx: 1 }} component={Link} to="/profile">
                Profile
              </Button>
              <Button sx={{ color: "white", mx: 1 }} component={Link} to="/resource">
                Resources
              </Button>
              <Button sx={{ color: "white", mx: 1 }} component={Link} to="/timetable">
                Time Tables
              </Button>
              <Button onClick={handleLogout}  sx={{ color: "white", mx: 1 }}>
                Logout
              </Button>
              <Button sx={{ color: "white", mx: 1 }}>
                <NotificationsActiveIcon sx={{ fontSize: 30, color: 'white' }} />
              </Button>
            </>
          )}
          <Button color="inherit" onClick={toggleDrawer} sx={{ color: "white" }}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar (Drawer) */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 260,
            backgroundColor: "#091057",
            color: "white",
          },
        }}
      >
        <List>
          <ListItem button component={Link} to="/" onClick={closeDrawer} sx={{ color: "white" }}>
            <Home sx={{ marginRight: 1 }} />
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/examHome" onClick={closeDrawer} sx={{ color: "white" }}>
            <Assignment sx={{ marginRight: 1 }} />
            <ListItemText primary="Exam" />
          </ListItem>
          <ListItem button component={Link} to="/schedule" onClick={closeDrawer} sx={{ color: "white" }}>
            <Schedule sx={{ marginRight: 1 }} />
            <ListItemText primary="Schedule" />
          </ListItem>
          <ListItem button component={Link} to="/profile" onClick={closeDrawer} sx={{ color: "white" }}>
            <AccountCircle sx={{ marginRight: 1 }} />
            <ListItemText primary="Profile" />
          </ListItem>
          <Divider sx={{ backgroundColor: "white" }} />
          <ListItem button component={Link} to="/settings" onClick={closeDrawer} sx={{ color: "white" }}>
            <Settings sx={{ marginRight: 1 }} />
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>

      <Box sx={{ minHeight: "100vh", display: 'flex', flexDirection: 'column' }}>
  {/* Main content */}
  <Box sx={{ flex: 1 }}>
    {/* Your page content goes here */}
    {children}
  </Box>

  {/* Footer */}
  <Box
    component="footer"
    sx={{
      py: 2,
      textAlign: "center",
      bgcolor: "#002e5f",
      color: "white",
      width: "100%",
      zIndex: 1000,
      position: "relative", // Change from fixed to relative
    }}
  >
    <Typography variant="body2">
      © 2025 Academic Scheduler. All rights reserved.
    </Typography>
  </Box>
</Box>
</Box>
  );
};

export default Layout;