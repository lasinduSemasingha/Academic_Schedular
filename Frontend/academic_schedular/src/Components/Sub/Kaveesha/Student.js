import React from "react";
import { Box , Typography ,Paper,Grid ,TextField ,MenuItem ,Button } from "@mui/material";

function Student() {
    return (
        <Box sx={{ textAlign: "center", py: 6 }}>

        <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>   
        <Typography variant="h4" fontWeight="bold" gutterBottom>
        Student Management
        </Typography>
        
        <form className="studentform">
        <Grid container spacing={2}>

        <Grid item xs={12}>
            <TextField fullWidth label="Student Name" name="name" variant="outlined" required />
        </Grid>

        <Grid item xs={12}>
            <TextField fullWidth label="Student ID" name="studentId" variant="outlined" required />
        </Grid>

        <Grid item xs={12}>
            <TextField fullWidth label="Email" name="email" type="email" variant="outlined" required />
        </Grid>  

        <Grid item xs={12}>
            <TextField fullWidth label="Contact Number" name="contact" variant="outlined" required />
        </Grid>

        <Grid item xs={12}>
            <TextField fullWidth label="Date of Birth" name="dob" type="date" InputLabelProps={{ shrink: true }} variant="outlined" required />
        </Grid>

        <Grid item xs={12}>
                <TextField fullWidth label="Address" name="address" variant="outlined" required />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField select fullWidth label="Faculty/Department" name="faculty" variant="outlined" required>
                                    <MenuItem value="Faculty of Computing">Faculty of Computing</MenuItem>
                                    <MenuItem value="Faculty of Engineering">Faculty of Engineering</MenuItem>
                                    <MenuItem value="Faculty of Humanities and Sciences">Faculty of Humanities and Sciences</MenuItem>
                                    <MenuItem value="School of Architecture">School of Architecture</MenuItem>
                                    <MenuItem value="Faculty of Business">Faculty of Business</MenuItem>
                                </TextField>
                            </Grid>

            <Grid item xs={12}>
                                <TextField select fullWidth label="Academic Year" name="year" variant="outlined" required>
                                    <MenuItem value="Year 1">Year 1</MenuItem>
                                    <MenuItem value="Year 2">Year 2</MenuItem>
                                    <MenuItem value="Year 3">Year 3</MenuItem>
                                    <MenuItem value="Year 4">Year 4</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField select fullWidth label="Semester" name="semester" variant="outlined" required>
                                    <MenuItem value="Semester 1">Semester 1</MenuItem>
                                    <MenuItem value="Semester 2">Semester 2</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Submit
                                </Button>
                            </Grid>

            </Grid>
            </form>

        
        </Paper>
        </Box>
    );
}

export default Student;