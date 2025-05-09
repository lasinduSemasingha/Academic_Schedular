import React, { useState } from "react";
import { 
  TextField, 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Grid,
  Avatar,
  Chip,
  Divider,
  Box
} from "@mui/material";
import { Search, FilterList, CalendarToday } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const schedules = [
  {
    batch: "CS-2023A",
    course: "Computer Science",
    semester: "Spring 2024",
    students: 45,
    timetable: [
      { day: "Monday", time: "9:00 AM - 12:00 PM", subject: "Data Structures", room: "CS-101", instructor: "Dr. Smith" },
      { day: "Tuesday", time: "10:00 AM - 1:00 PM", subject: "Algorithms", room: "CS-102", instructor: "Prof. Johnson" },
      { day: "Wednesday", time: "9:00 AM - 12:00 PM", subject: "Database Systems", room: "CS-103", instructor: "Dr. Lee" },
      { day: "Thursday", time: "1:00 PM - 4:00 PM", subject: "Operating Systems", room: "CS-104", instructor: "Prof. Brown" },
      { day: "Friday", time: "10:00 AM - 1:00 PM", subject: "Computer Networks", room: "CS-105", instructor: "Dr. Wilson" },
    ],
  },
  {
    batch: "ME-2023B",
    course: "Mechanical Engineering",
    semester: "Spring 2024",
    students: 38,
    timetable: [
      { day: "Monday", time: "9:00 AM - 12:00 PM", subject: "Thermodynamics", room: "ME-201", instructor: "Prof. Davis" },
      { day: "Tuesday", time: "1:00 PM - 4:00 PM", subject: "Fluid Mechanics", room: "ME-202", instructor: "Dr. Miller" },
      { day: "Wednesday", time: "10:00 AM - 1:00 PM", subject: "Materials Science", room: "ME-203", instructor: "Prof. Taylor" },
      { day: "Thursday", time: "9:00 AM - 12:00 PM", subject: "Dynamics", room: "ME-204", instructor: "Dr. Anderson" },
      { day: "Friday", time: "1:00 PM - 4:00 PM", subject: "Machine Design", room: "ME-205", instructor: "Prof. Thomas" },
    ],
  },
  {
    batch: "EE-2023C",
    course: "Electrical Engineering",
    semester: "Spring 2024",
    students: 42,
    timetable: [
      { day: "Monday", time: "8:00 AM - 11:00 AM", subject: "Circuit Theory", room: "EE-301", instructor: "Dr. White" },
      { day: "Tuesday", time: "11:00 AM - 2:00 PM", subject: "Electronics", room: "EE-302", instructor: "Prof. Harris" },
      { day: "Wednesday", time: "2:00 PM - 5:00 PM", subject: "Power Systems", room: "EE-303", instructor: "Dr. Martin" },
      { day: "Thursday", time: "8:00 AM - 11:00 AM", subject: "Control Systems", room: "EE-304", instructor: "Prof. Garcia" },
      { day: "Friday", time: "11:00 AM - 2:00 PM", subject: "Digital Signal Processing", room: "EE-305", instructor: "Dr. Martinez" },
    ],
  },
  {
    batch: "BIO-2023D",
    course: "Biotechnology",
    semester: "Spring 2024",
    students: 35,
    timetable: [
      { day: "Monday", time: "10:00 AM - 1:00 PM", subject: "Molecular Biology", room: "BIO-401", instructor: "Dr. Robinson" },
      { day: "Tuesday", time: "9:00 AM - 12:00 PM", subject: "Genetics", room: "BIO-402", instructor: "Prof. Clark" },
      { day: "Wednesday", time: "1:00 PM - 4:00 PM", subject: "Biochemistry", room: "BIO-403", instructor: "Dr. Rodriguez" },
      { day: "Thursday", time: "10:00 AM - 1:00 PM", subject: "Microbiology", room: "BIO-404", instructor: "Prof. Lewis" },
      { day: "Friday", time: "9:00 AM - 12:00 PM", subject: "Immunology", room: "BIO-405", instructor: "Dr. Walker" },
    ],
  },
];

const AcademicSchedule = () => {
  const [search, setSearch] = useState("");
  
  const filteredSchedules = schedules.filter(schedule =>
    schedule.batch.toLowerCase().includes(search.toLowerCase()) ||
    schedule.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "auto" }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
          <CalendarToday />
        </Avatar>
        <Typography variant="h4" component="h1">
          Academic Schedules
        </Typography>
      </Box>
      
      <Grid container spacing={2} alignItems="center" mb={3}>
        <Grid item xs={12} md={8}>
          <TextField
            label="Search by Batch or Course"
            variant="outlined"
            fullWidth
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <IconButton disabled>
                  <Search />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="flex-end">
            <Chip
              icon={<FilterList />}
              label="Filters"
              variant="outlined"
              clickable
              sx={{ mr: 1 }}
            />
            <Chip
              label={`${filteredSchedules.length} Schedules`}
              color="primary"
            />
          </Box>
        </Grid>
      </Grid>

      {filteredSchedules.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="h6" align="center" color="textSecondary">
              No schedules found matching your search criteria
            </Typography>
          </CardContent>
        </Card>
      ) : (
        filteredSchedules.map((schedule, index) => (
          <Card key={index} sx={{ mb: 3, boxShadow: 3 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <div>
                  <Typography variant="h6" component="h2">
                    {schedule.batch} - {schedule.course}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {schedule.semester} • {schedule.students} students
                  </Typography>
                </div>
                <Chip 
                  label="Active" 
                  color="success" 
                  size="small" 
                  variant="outlined"
                />
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <TableContainer component={Paper} elevation={0}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'action.hover' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Day</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Room</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Instructor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {schedule.timetable.map((entry, idx) => (
                      <TableRow 
                        key={idx}
                        sx={{ '&:nth-of-type(odd)': { bgcolor: 'background.default' } }}
                      >
                        <TableCell>{entry.day}</TableCell>
                        <TableCell>
                          <Chip 
                            label={entry.time} 
                            size="small" 
                            color="primary"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'medium' }}>{entry.subject}</TableCell>
                        <TableCell>{entry.room}</TableCell>
                        <TableCell>{entry.instructor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default AcademicSchedule;