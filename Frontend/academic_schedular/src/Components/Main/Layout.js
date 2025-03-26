import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
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

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F4F7FC" }}>
      {/* AppBar */}
      <AppBar sx={{ backgroundColor: "#024CAA" }} position="static">
        <Toolbar>
          <Typography variant="h5" fontWeight="bold" sx={{ flexGrow: 1, color: "white" }}>
            Academic Scheduler
          </Typography>
          <Button sx={{ color: "white", mx: 1 }} component={Link} to="/">
            Home
          </Button>
          <Button sx={{ color: "white", mx: 1 }} component={Link} to="/examHome">
            Exam Home
          </Button>
          <Button sx={{ color: "white", mx: 1 }} component={Link} to="/profile">
            Profile
          </Button>
          <Button sx={{ color: "white", mx: 1 }} component={Link} to="/resource">
            Resources
          </Button>
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

      {/* Main Content */}
      <Box>
        <Container sx={{ px: 2, py: 3 }}>{children}</Container>
      </Box>

      {/* Footer */}
      <Box
  component="footer"
  sx={{
    py: 2,
    textAlign: "center",
    bgcolor: "#024CAA",
    color: "white",
    mt: "auto",
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
  );
};

export default Layout;