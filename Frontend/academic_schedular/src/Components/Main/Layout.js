import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { Home, AccountCircle, Schedule, Settings, Assignment } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
  }, []);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const closeDrawer = () => setDrawerOpen(false);

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundImage: 'url(/Main/background.png)' }}>
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
              transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out',
              '&:hover span': {
                transform: 'scale(1.1)',
                color: '#00d4ff',
                transitionDelay: '0.2s',
              },
            }}
          >
            <span style={{ color: 'white' }}>Academic</span>&nbsp;
            <span style={{ color: '#ffcc00' }}>Scheduler</span>
          </Typography>

          <Button sx={{ color: "white", mx: 1 }} component={Link} to="/">Home</Button>
          {isLoggedIn && (
            <>
              <Button sx={{ color: "white", mx: 1 }} component={Link} to="/examHome">Exam</Button>
              <Button sx={{ color: "white", mx: 1 }} component={Link} to="/profile">Profile</Button>
              <Button sx={{ color: "white", mx: 1 }} component={Link} to="/resource">Resources</Button>
              <Button sx={{ color: "white", mx: 1 }} component={Link} to="/studenthome">Student</Button>
              <Button sx={{ color: "white", mx: 1 }} component={Link} to="/lecturerhome">Lecturer</Button>
              <Button sx={{ color: "white", mx: 1 }} component={Link} to="/timetable">Time Tables</Button>
              <Button sx={{ color: "white", mx: 1 }}>
                <NotificationsActiveIcon sx={{ fontSize: 30, color: 'white' }} />
              </Button>
            </>
          )}
          {isLoggedIn ? (
            <Button onClick={handleLogout} sx={{ color: "white", mx: 1 }}>Logout</Button>
          ) : (
            <Button component={Link} to="/login" sx={{ color: "white", mx: 1 }}>Login</Button>
          )}
          
          <Button sx={{ color: "white" }} onClick={toggleDrawer}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{ "& .MuiDrawer-paper": { width: 260, backgroundColor: "#091057", color: "white" } }}
      >
        <List>
          <ListItem button component={Link} to="/" onClick={closeDrawer} sx={{ color: "white" }}>
            <Home sx={{ marginRight: 1 }} />
            <ListItemText primary="Home" />
          </ListItem>
          {isLoggedIn && (
            <>
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
            </>
          )}
          <Divider sx={{ backgroundColor: "white" }} />
          <ListItem button component={Link} to="/settings" onClick={closeDrawer} sx={{ color: "white" }}>
            <Settings sx={{ marginRight: 1 }} />
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>

      <Box sx={{ minHeight: "100vh", display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1 }}>{children}</Box>
        <Box
          component="footer"
          sx={{
            py: 2,
            textAlign: "center",
            bgcolor: "#002e5f",
            color: "white",
            width: "100%",
            position: "relative",
          }}
        >
          <Typography variant="body2">© 2025 Academic Scheduler. All rights reserved.</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;