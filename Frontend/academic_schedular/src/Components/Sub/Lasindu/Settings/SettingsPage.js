import React from "react";
import { Grid, Card, CardContent, Typography, Switch, Button, Slider, TextField, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import { Settings, Security, Notifications, Storage, Build, Cloud, Person } from "@mui/icons-material";

const primaryColor = "#1E3A8A";
const cardBackground = "#FFFFFF";

const WidgetContainer = styled(Card)(() => ({
  backgroundColor: cardBackground,
  padding: "1.5rem",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "180px",
}));

const SettingsPage = () => {
  return (
    <div style={{ backgroundColor: "#F3F4F6", minHeight: "100vh", padding: "2rem" }}>
      <Typography variant="h4" fontWeight="bold" color={primaryColor} gutterBottom>
        System Settings Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <WidgetContainer>
            <Settings fontSize="large" color="primary" />
            <Typography variant="h6" fontWeight="bold">General Settings</Typography>
            <Switch defaultChecked /> Enable Dark Mode
          </WidgetContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <WidgetContainer>
            <Security fontSize="large" color="error" />
            <Typography variant="h6" fontWeight="bold">Security</Typography>
            <Switch defaultChecked /> Two-Factor Authentication
          </WidgetContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <WidgetContainer>
            <Notifications fontSize="large" color="secondary" />
            <Typography variant="h6" fontWeight="bold">Notifications</Typography>
            <Switch defaultChecked /> Email Alerts
          </WidgetContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <WidgetContainer>
            <Storage fontSize="large" color="primary" />
            <Typography variant="h6" fontWeight="bold">Storage Management</Typography>
            <Slider defaultValue={60} aria-label="Storage" valueLabelDisplay="auto" />
          </WidgetContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <WidgetContainer>
            <Build fontSize="large" color="success" />
            <Typography variant="h6" fontWeight="bold">System Maintenance</Typography>
            <Button variant="contained" color="warning">Run Diagnostics</Button>
          </WidgetContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <WidgetContainer>
            <Cloud fontSize="large" color="info" />
            <Typography variant="h6" fontWeight="bold">Cloud Sync</Typography>
            <Button variant="contained" color="primary">Sync Now</Button>
          </WidgetContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <WidgetContainer>
            <Person fontSize="large" color="secondary" />
            <Typography variant="h6" fontWeight="bold">User Management</Typography>
            <Select defaultValue="admin" fullWidth>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
              <MenuItem value="viewer">Viewer</MenuItem>
            </Select>
          </WidgetContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <WidgetContainer>
            <Typography variant="h6" fontWeight="bold">API Key</Typography>
            <TextField fullWidth label="Enter API Key" variant="outlined" />
          </WidgetContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default SettingsPage;