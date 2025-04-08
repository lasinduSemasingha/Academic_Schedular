import React, { useState } from "react";
import { TextField, Card, CardContent, Typography, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Search } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const schedules = [
  {
    batch: "2023A",
    course: "Computer Science",
    timetable: [
      { day: "Monday", time: "9:00 AM - 12:00 PM", subject: "Data Structures", room: "101" },
      { day: "Tuesday", time: "10:00 AM - 1:00 PM", subject: "Algorithms", room: "102" },
      { day: "Wednesday", time: "9:00 AM - 12:00 PM", subject: "Database Systems", room: "103" },
      { day: "Thursday", time: "1:00 PM - 4:00 PM", subject: "Operating Systems", room: "104" },
      { day: "Friday", time: "10:00 AM - 1:00 PM", subject: "Computer Networks", room: "105" },
    ],
  },
  {
    batch: "2023B",
    course: "Mechanical Engineering",
    timetable: [
      { day: "Monday", time: "9:00 AM - 12:00 PM", subject: "Thermodynamics", room: "201" },
      { day: "Tuesday", time: "1:00 PM - 4:00 PM", subject: "Fluid Mechanics", room: "202" },
      { day: "Wednesday", time: "10:00 AM - 1:00 PM", subject: "Materials Science", room: "203" },
      { day: "Thursday", time: "9:00 AM - 12:00 PM", subject: "Dynamics", room: "204" },
      { day: "Friday", time: "1:00 PM - 4:00 PM", subject: "Machine Design", room: "205" },
    ],
  },
];

const AcademicSchedule = () => {
  const [search, setSearch] = useState("");
  
  const filteredSchedules = schedules.filter(schedule =>
    schedule.batch.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: "10px" }} />
        Academic Schedules
      </Typography>
      <TextField
        label="Search by Batch No"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton>
              <Search />
            </IconButton>
          ),
        }}
        style={{ marginBottom: "20px" }}
      />
      {filteredSchedules.map((schedule, index) => (
        <Card key={index} style={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h6">Batch: {schedule.batch} - {schedule.course}</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Room</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {schedule.timetable.map((entry, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{entry.day}</TableCell>
                      <TableCell>{entry.time}</TableCell>
                      <TableCell>{entry.subject}</TableCell>
                      <TableCell>{entry.room}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AcademicSchedule;
