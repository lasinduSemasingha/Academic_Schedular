import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Grid, Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faSave } from "@fortawesome/free-solid-svg-icons";

const AddResources = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    roomno: "",
    capacity: "",
    additionalfacilities: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Venue Name is required";
    if (!formData.location.trim()) tempErrors.location = "Location is required";
    if (!formData.roomno.trim()) tempErrors.roomno = "Room Number is required";
    if (!formData.capacity.trim()) tempErrors.capacity = "Seating Capacity is required";
    else if (isNaN(formData.capacity) || parseInt(formData.capacity) <= 0)
      tempErrors.capacity = "Seating Capacity must be a positive number";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      const response = await axios.post("https://localhost:7002/resource", formData, {
        headers: { "Content-Type": "application/json" }
      });
      alert(`Venue added successfully with ID: ${formData.name}`);
      setFormData({ name: "", location: "", roomno: "", capacity: "", additionalfacilities: "" });
      setErrors({});
    } catch (error) {
      console.error("Error adding venue:", error);
      alert("Failed to add venue");
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "40px" }}>
      <Paper elevation={3} style={{ padding: "30px", borderRadius: "12px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: "10px" }} />
          Add Venue
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField fullWidth label="Venue Name" name="name" variant="outlined" required value={formData.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Building / Location" name="location" variant="outlined" required value={formData.location} onChange={handleChange} error={!!errors.location} helperText={errors.location} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Room Number" name="roomno" variant="outlined" required value={formData.roomno} onChange={handleChange} error={!!errors.roomno} helperText={errors.roomno} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Seating Capacity" name="capacity" variant="outlined" type="number" required value={formData.capacity} onChange={handleChange} error={!!errors.capacity} helperText={errors.capacity} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Additional Facilities" name="additionalfacilities" variant="outlined" multiline rows={3} value={formData.additionalfacilities} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth startIcon={<FontAwesomeIcon icon={faSave} />}>
                Save Venue
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddResources;
