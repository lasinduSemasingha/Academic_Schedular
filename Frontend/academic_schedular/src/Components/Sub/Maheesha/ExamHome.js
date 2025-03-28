//import React from "react";
import { 
    Container, Typography, Box, Button, Grid, CssBaseline, useTheme
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";


const localizer = momentLocalizer(moment);

const customColors = {
    primary: "#3f51b5",
    secondary: "#f50057",
    background: "#f5f5f5",
    cardBg: "#ffffff",
    textPrimary: "#212121",
    textSecondary: "#757575"
};

const getCompletedExamsCount = (examData) => {
    const today = new Date().toISOString().split("T")[0];
    return examData.filter((exam) => exam.date < today).length;
};

const getToBeCompletedExamsCount = (examData) => {
    const today = new Date().toISOString().split("T")[0];
    return examData.filter((exam) => exam.date >= today).length;
};

const examData = [
    { subject: "IT", date: "2025-04-25", time: "9:00 AM - 12:00 PM" },
    { subject: "English", date: "2025-04-26", time: "1:00 PM - 4:00 PM" },
    { subject: "Arts", date: "2025-03-31", time: "1:00 PM - 4:00 PM" },
    { subject: "Engineering", date: "2025-03-20", time: "12:00 PM - 4:00 PM" },
];

// Function to convert time string to 24-hour format
const parseTimeString = (timeStr) => {
    const [time, period] = timeStr.replace(/ /g, '').split(/(AM|PM)/);
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours, 10);
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, '0')}:${minutes || '00'}`;
};

// Prepare calendar events
const calendarEvents = examData.map(exam => {
    const startTime = parseTimeString(exam.time.split(" - ")[0]);
    const endTime = parseTimeString(exam.time.split(" - ")[1]);
    
    return {
        title: exam.subject,
        start: new Date(`${exam.date}T${startTime}:00`),
        end: new Date(`${exam.date}T${endTime}:00`),
        allDay: false,
    };
});

const completedExamsCount = getCompletedExamsCount(examData);
const toBeCompletedExamsCount = getToBeCompletedExamsCount(examData);
const chartData = [
    { name: "Completed", count: completedExamsCount, fill: "#071739" },
    { name: "Upcoming", count: toBeCompletedExamsCount, fill: "#4B6382" },
];

const ExamCoordinator = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [currentDate, setCurrentDate] = useState(new Date());

    return (
        <Box sx={{ display: "flex", minHeight: "80vh", bgcolor: customColors.background, flexDirection: "column" }}>
            <CssBaseline />
            
            {/* Navigation Buttons */}
            <Grid container spacing={2} sx={{ p: 2, textAlign: "center" }}>
                <Grid item xs={3}>
                    <Button fullWidth variant="contained" color="primary" onClick={() => navigate("/dashboard")}>Dashboard</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button fullWidth variant="contained" color="primary" onClick={() => navigate("/exam/ExamTable")}>Exam Schedules</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button fullWidth variant="contained" color="primary" onClick={() => navigate("/invigilator/InvigilatorTable")}>Invigilators</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button fullWidth variant="contained" color="primary" onClick={() => navigate("/hall/HallTable")}>Hall Allocations</Button>
                </Grid>
            </Grid>

            <Container maxWidth="md" sx={{ mt: 3, p: 3, bgcolor: customColors.cardBg, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: customColors.textPrimary, textAlign: "center", mb: 2 }}>
                    Exam Coordinator
                </Typography>
                <Typography variant="body1" sx={{ color: customColors.textSecondary, textAlign: "Justify" }}>
                The role of an Exam Coordinator is pivotal in ensuring that academic examinations are scheduled, organized, and executed seamlessly. This involves responsibilities such as creating and modifying exam schedules, assigning invigilators, and allocating examination halls efficiently. The Academic Scheduling System is designed to facilitate this process, preventing conflicts in scheduling, optimizing faculty and room assignments, and ensuring that examinations proceed without disruptions. Additionally, the system generates crucial reports, such as attendance records and final exam status, contributing to the overall efficiency of the academic administration. By automating various scheduling tasks, the Exam Coordinator can focus on overseeing the examination process and maintaining the integrity of the system.
                </Typography> 
            </Container>
            
            <Container maxWidth="x2" sx={{ mt: 3 }}>
                <Grid container spacing={3} alignItems="stretch">
                    {/* Bar Chart Section */}
                    <Grid item xs={12}>
                        <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, bgcolor: customColors.cardBg }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: customColors.textPrimary, mb: 3, textAlign: "center" }}>
                                Exam Status Overview
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={chartData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar 
                                        dataKey="count" 
                                        name="Number of Exams"
                                        fill={customColors.primary}
                                        label={{ position: 'top' }}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Bar 
                                                key={`bar-${index}`} 
                                                dataKey="count" 
                                                fill={entry.fill} 
                                                name={entry.name}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, bgcolor: customColors.cardBg, height: "100%" }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: customColors.textPrimary, mb: 3 }}>
                                Exam Timetable Details
                            </Typography>
                            <Grid container spacing={2}>
                                {examData.map((exam, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Box sx={{ bgcolor: theme.palette.grey[100], p: 2, borderRadius: 2, boxShadow: 1 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 600, color: customColors.textPrimary, mb: 1 }}>
                                                {exam.subject}
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: customColors.textSecondary, mb: 0.5 }}>
                                                <strong>Date:</strong> {exam.date}
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: customColors.textSecondary }}>
                                                <strong>Time:</strong> {exam.time}
                                            </Typography>
                                            <Button 
                                                variant="contained" 
                                                color="primary" 
                                                sx={{ 
                                                    mt: 2,
                                                    alignSelf: "flex-start"
                                                }} 
                                                onClick={() => {
                                                    if (exam.subject === "IT") {
                                                        navigate("/ExamInfo");
                                                    } else if (exam.subject === "English") {
                                                        navigate("/EnglishExamInfo");
                                                    } else if (exam.subject === "Arts") {
                                                        navigate("/ArtsExamInfo");
                                                    } else if (exam.subject === "Engineering") {
                                                        navigate("/EngineeringExamInfo");
                                                    }
                                                }}
                                            >
                                                View Details
                                            </Button>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, bgcolor: customColors.cardBg, height: "100%" }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: customColors.textPrimary, mb: 3, textAlign: "center" }}>
                                Exam Schedule Calendar
                            </Typography>
                            <Calendar
                                localizer={localizer}
                                events={examData.map(exam => ({
                                    title: exam.subject,
                                    start: new Date(exam.date),
                                    end: new Date(exam.date),
                                    allDay: true,
                                }))}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 500 }}
                                date={currentDate} // Ensure state updates the calendar
                                onNavigate={(newDate) => setCurrentDate(newDate)} // Allow navigation
                                defaultView="month"
                                views={['month']}
                                popup
                                toolbar
                                eventPropGetter={(event) => ({
                                    style: {
                                        backgroundColor: event.start < new Date() ? '#071739' : '#4B6382',
                                        borderRadius: '4px',
                                        opacity: 0.8,
                                        color: 'white',
                                        border: '0px',
                                        display: 'block'
                                    }
                                })}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ExamCoordinator;