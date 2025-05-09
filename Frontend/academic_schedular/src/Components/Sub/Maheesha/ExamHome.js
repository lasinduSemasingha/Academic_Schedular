import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  CssBaseline,
  useTheme
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";
import {
  Calendar,
  momentLocalizer
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

const localizer = momentLocalizer(moment);

const customColors = {
  primary: "#3f51b5",
  secondary: "#f50057",
  background: "#f5f5f5",
  cardBg: "#ffffff",
  textPrimary: "#212121",
  textSecondary: "#757575"
};

const ExamCoordinator = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [examList, setExamList] = useState([]);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await axios.get("https://localhost:7003/exam");
        if (response.data.isValid) {
          setExamList(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch exam data:", error);
      }
    };

    fetchExamData();
  }, []);

  const completedExamsCount = examList.filter(
    (exam) => new Date(exam.datetime) < new Date()
  ).length;

  const upcomingExamsCount = examList.filter(
    (exam) => new Date(exam.datetime) >= new Date()
  ).length;

  const chartData = [
    { name: "Completed", count: completedExamsCount, fill: "#071739" },
    { name: "Upcoming", count: upcomingExamsCount, fill: "#4B6382" },
  ];

  const calendarEvents = examList.map((exam) => {
    const startDate = new Date(exam.datetime);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + exam.duration);

    return {
      title: `${exam.examtype} - ${exam.subject}`,
      start: startDate,
      end: endDate,
      allDay: false,
    };
  });

  return (
    <Box sx={{ display: "flex", minHeight: "80vh", bgcolor: customColors.background, flexDirection: "column" }}>
      <CssBaseline />
      
      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ p: 4, textAlign: "center" }}>
  <Grid item xs={3}>
    <Button fullWidth variant="contained" color="primary" onClick={() => navigate("/exam/ExamTable")}>
      Exam Schedules
    </Button>
  </Grid>
  <Grid item xs={3}>
    <Button fullWidth variant="contained" color="primary" onClick={() => navigate("/exam/ExamTable")}>
      Exam Time Tables
    </Button>
  </Grid>
</Grid>


      {/* Overview Text */}
      <Container maxWidth="md" sx={{ mt: 3, p: 3, bgcolor: customColors.cardBg, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: customColors.textPrimary, textAlign: "center", mb: 2 }}>
          Exam Coordinator
        </Typography>
        <Typography variant="body1" sx={{ color: customColors.textSecondary, textAlign: "Justify" }}>
          The role of an Exam Coordinator is pivotal in ensuring that academic examinations are scheduled, organized, and executed seamlessly. This involves responsibilities such as creating and modifying exam schedules, assigning invigilators, and allocating examination halls efficiently. The Academic Scheduling System is designed to facilitate this process, preventing conflicts in scheduling, optimizing faculty and room assignments, and ensuring that examinations proceed without disruptions.
        </Typography>
      </Container>

      {/* Chart & Calendar Section */}
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Grid container spacing={3} alignItems="stretch">
          {/* Bar Chart Section */}
          <Grid item xs={12}>
            <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, bgcolor: customColors.cardBg }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: customColors.textPrimary, mb: 3, textAlign: "center" }}>
                Exam Status Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Number of Exams" label={{ position: 'top' }}>
                    {chartData.map((entry, index) => (
                      <Bar key={`bar-${index}`} dataKey="count" fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Exam Cards */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, bgcolor: customColors.cardBg, height: "100%" }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: customColors.textPrimary, mb: 3 }}>
                Exam Timetable Details
              </Typography>
              <Grid container spacing={2}>
                {examList.map((exam, index) => {
                  const dateStr = new Date(exam.datetime).toLocaleDateString();
                  const timeStr = new Date(exam.datetime).toLocaleTimeString();

                  return (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ bgcolor: theme.palette.grey[100], p: 2, borderRadius: 2, boxShadow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: customColors.textPrimary, mb: 1 }}>
                          {exam.subject}
                        </Typography>
                        <Typography variant="body1" sx={{ color: customColors.textSecondary, mb: 0.5 }}>
                          <strong>Date:</strong> {dateStr}
                        </Typography>
                        <Typography variant="body1" sx={{ color: customColors.textSecondary }}>
                          <strong>Time:</strong> {timeStr}
                        </Typography>
                        {/*<Button
                          variant="contained"
                          color="primary"
                          sx={{ mt: 2 }}
                          onClick={() => navigate(`/ExamDetails/${exam.eId}`)}
                        >
                          View Details
                        </Button>*/}
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Grid>

          {/* Calendar */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, bgcolor: customColors.cardBg, height: "100%" }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: customColors.textPrimary, mb: 3, textAlign: "center" }}>
                Exam Schedule Calendar
              </Typography>
              <Calendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                date={currentDate}
                onNavigate={(newDate) => setCurrentDate(newDate)}
                defaultView="month"
                views={["month"]}
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
