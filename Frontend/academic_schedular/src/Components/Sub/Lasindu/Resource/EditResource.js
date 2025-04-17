import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const EditResource = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    roomNo: "",
    capacity: "",
    additionalFacilities: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Venue Name is required";
    if (!formData.location.trim()) tempErrors.location = "Location is required";
    if (!formData.roomNo.trim()) tempErrors.roomno = "Room Number is required";
    if (!formData.capacity.toString().trim()) tempErrors.capacity = "Seating Capacity is required";
    else if (isNaN(formData.capacity) || parseInt(formData.capacity) <= 0)
      tempErrors.capacity = "Seating Capacity must be a positive number";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const fetchResource = async () => {
    try {
      const response = await axios.get(`https://localhost:7002/resource/${id}`);
      setFormData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch resource:", error);
      alert("Could not load resource.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.put(`https://localhost:7002/resource/${id}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Resource updated successfully!");
      navigate("/resource");
    } catch (error) {
      console.error("Error updating resource:", error);
      alert("Failed to update resource.");
    }
  };

  useEffect(() => {
    fetchResource();
  }, [id]);

  return (
    <Container maxWidth="md" style={{ marginTop: "40px" }}>
      <Paper elevation={3} style={{ padding: "30px", borderRadius: "12px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          <EditIcon style={{ verticalAlign: "middle", marginRight: "10px" }} />
          Edit Venue
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Venue Name" name="name"
                variant="outlined" required
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Building / Location" name="location"
                variant="outlined" required
                value={formData.location}
                onChange={handleChange}
                error={!!errors.location}
                helperText={errors.location}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Room Number" name="roomNo"
                variant="outlined" required
                value={formData.roomNo}
                onChange={handleChange}
                error={!!errors.roomno}
                helperText={errors.roomno}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Seating Capacity" name="capacity"
                variant="outlined" type="number" required
                value={formData.capacity}
                onChange={handleChange}
                error={!!errors.capacity}
                helperText={errors.capacity}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Additional Facilities" name="additionalFacilities"
                variant="outlined" multiline rows={3}
                value={formData.additionalFacilities}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<SaveIcon />}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditResource;
