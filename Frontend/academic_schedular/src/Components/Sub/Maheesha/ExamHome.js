import React, { useState } from "react";
import { 
    Container, Typography, Box, Button, Grid, Drawer, List, ListItem, 
    ListItemButton, ListItemText, IconButton, CssBaseline
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ScheduleIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import RoomIcon from "@mui/icons-material/MeetingRoom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const drawerWidth = 240;
const localizer = momentLocalizer(moment);

const getCompletedExamsCount = (examData) => {
    const today = new Date().toISOString().split("T")[0];
    return examData.filter((exam) => exam.date < today).length;
};

const getToBeCompletedExamsCount = (examData) => {
    const today = new Date().toISOString().split("T")[0];
    return examData.filter((exam) => exam.date >= today).length;
};

const examData = [
    { subject: "Information Management", date: "2025-03-25", time: "9:00 AM - 12:00 PM" },
    { subject: "Cyber Security", date: "2025-03-26", time: "1:00 PM - 4:00 PM" },
    { subject: "Network Management", date: "2025-03-27", time: "1:00 PM - 4:00 PM" },
];

const completedExamsCount = getCompletedExamsCount(examData);
const toBeCompletedExamsCount = getToBeCompletedExamsCount(examData);

const chartData = [
    { name: "Completed", count: completedExamsCount },
    { name: "Upcoming", count: toBeCompletedExamsCount },
];

// Convert examData to calendar events
const events = examData.map((exam) => ({
    title: exam.subject,
    start: new Date(exam.date),
    end: new Date(exam.date),
    allDay: true,
}));

const ExamCoordinator = () => {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerContent = (
        <Box sx={{ width: drawerWidth, bgcolor: "#2A2E3B", height: "100vh", color: "#fff", p: 2 }}>
            <Typography variant="h6" gutterBottom textAlign="center">Exam Dashboard</Typography>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/dashboard")}>
                        <DashboardIcon sx={{ mr: 2 }} />
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/exam/ExamTable")}>
                        <ScheduleIcon sx={{ mr: 2 }} />
                        <ListItemText primary="Exam Schedules" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/invigilator/InvigilatorTable")}>
                        <GroupIcon sx={{ mr: 2 }} />
                        <ListItemText primary="Invigilators" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/hall/HallTable")}>
                        <RoomIcon sx={{ mr: 2 }} />
                        <ListItemText primary="Hall Allocations" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            
            {/* Persistent Sidebar */}
            <Drawer 
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": { width: drawerWidth, bgcolor: "#2A2E3B", color: "#fff" }
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Mobile Sidebar */}
            <Drawer 
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{ display: { xs: "block", sm: "none" } }}
            >
                {drawerContent}
            </Drawer>

            {/* Menu Button for Mobile */}
            <IconButton 
                onClick={handleDrawerToggle} 
                sx={{ position: "absolute", top: 20, left: 20, display: { sm: "none" } }}
            >
                <MenuIcon sx={{ color: "#fff" }} />
            </IconButton>

            {/* Main Content */}
            <Container sx={{ flexGrow: 1, p: 3, ml: { sm: `${drawerWidth}px` } }}>
                <Typography variant="h4" gutterBottom>Welcome Back, Exam Coordinator!</Typography>

                {/* Home Page Image */}
                <Box sx={{ mt: 3, mb: 3, display: "flex", justifyContent: "center" }}>
                    <img src="/Maheesha/design.png" alt="Exam Hall" style={{ width: "80%", borderRadius: "15px" }} />
                </Box>

                {/* Exam Timetable Details */}
                <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper", textAlign: "center" }}>
                    <Typography variant="h5" gutterBottom>Exam Timetable Details</Typography>
                    <Grid container spacing={2} justifyContent="center">
                        {examData.map((exam, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Box sx={{ bgcolor: "lightgray", p: 2, borderRadius: 2, boxShadow: 2, textAlign: "center" }}>
                                    <Typography variant="h6">{exam.subject}</Typography>
                                    <Typography variant="body1">Date: {exam.date}</Typography>
                                    <Typography variant="body1">Time: {exam.time}</Typography>
                                    <Button variant="outlined" color="primary" sx={{ mt: 2 }} onClick={() => {
        if (exam.subject === "Information Management") {
            navigate("/ExamInfo");
        } else if (exam.subject === "Cyber Security") {
            navigate("/CyberExamInfo");
        } else if (exam.subject === "Network Management") {
            navigate("/NetworkExamInfo");
        }
    }}>View Details</Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Exam Completion Status Chart */}
                <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper", textAlign: "center" }}>
                    <Typography variant="h5" gutterBottom>Exam Completion Status</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#1976d2" />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>

                {/* Calendar View for Exam Dates */}
                <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
                    <Typography variant="h5" gutterBottom textAlign="center">Exam Schedule Calendar</Typography>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default ExamCoordinator;
