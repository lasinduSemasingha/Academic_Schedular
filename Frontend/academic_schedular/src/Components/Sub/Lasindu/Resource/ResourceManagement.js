import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Button,
  Input,
  Grid,
  Typography,
  Box,
  Paper,
  Chip,
  Divider,
  IconButton
} from "@mui/material";
import {
  LibraryBooks,
  Science,
  Computer,
  MeetingRoom,
  Person,
  School,
  CalendarToday,
  BarChart,
  AddCircleOutline,
  EditOutlined,
  DeleteOutline,
  ArchiveOutlined,
  BookmarkBorder,
  LocalLibrary,
  DevicesOther,
  Business
} from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import { styled } from "@mui/system";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Academic color palette
const primaryColor = "#2C3E50"; // Dark blue-gray
const secondaryColor = "#3498DB"; // Calm blue
const accentColor = "#E74C3C"; // Contrast color
const lightBackground = "#F9F9F9";
const cardBackground = "#FFFFFF";
const borderColor = "#E0E0E0";

const resourceData = [
  { name: "Books", value: 45, color: "#2980B9" },
  { name: "Equipment", value: 30, color: "#E74C3C" },
  { name: "Labs", value: 25, color: "#27AE60" },
];

const AcademicCard = styled(Card)(({ theme }) => ({
  backgroundColor: cardBackground,
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  border: `1px solid ${borderColor}`,
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  }
}));

const WidgetContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: cardBackground,
  padding: theme.spacing(2),
  borderRadius: "8px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "140px",
  borderLeft: `4px solid ${secondaryColor}`,
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.02)"
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 500,
  borderRadius: "4px",
  padding: theme.spacing(0.5, 1.5),
  margin: theme.spacing(0, 0.5),
  fontSize: "0.8rem"
}));

const ResourceManagement = () => {
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://localhost:7002/resource/")
      .then((res) => res.json())
      .then((data) => {
        if (data.isValid) {
          setResources(data.data);
        }
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, []);

  const handleDelete = async (rId) => {
    const confirm = window.confirm("Are you sure you want to delete this resource?");
    if (!confirm) return;
  
    try {
      const response = await fetch(`https://localhost:7002/resource/${rId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setResources(prev => prev.filter(resource => resource.rId !== rId));
      } else {
        alert("Failed to delete resource.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error occurred while deleting.");
    }
  };

  const handleEditClick = (rId) => {
    navigate(`/editresource/${rId}`);
  };

  return (
    <Box sx={{ backgroundColor: lightBackground, minHeight: "100vh", p: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h4" fontWeight="600" color={primaryColor}>
              <LibraryBooks sx={{ verticalAlign: "middle", mr: 1, color: secondaryColor }} />
              Resource Management
            </Typography>
            <Chip label="Academic Year 2023-24" variant="outlined" sx={{ borderColor: secondaryColor, color: primaryColor }} />
          </Box>
          <Divider sx={{ mb: 3, borderColor: borderColor }} />
        </Grid>

        {/* Summary Widgets */}
        <Grid item xs={12} md={3}>
          <WidgetContainer>
            <LocalLibrary sx={{ fontSize: 40, color: secondaryColor, mb: 1 }} />
            <Typography variant="subtitle1" fontWeight="500" color="textSecondary">
              Total Resources
            </Typography>
            <Typography variant="h4" fontWeight="600" color={primaryColor}>
              200
            </Typography>
          </WidgetContainer>
        </Grid>
        <Grid item xs={12} md={3}>
          <WidgetContainer>
            <LibraryBooks sx={{ fontSize: 40, color: "#2980B9", mb: 1 }} />
            <Typography variant="subtitle1" fontWeight="500" color="textSecondary">
              Books Available
            </Typography>
            <Typography variant="h4" fontWeight="600" color={primaryColor}>
              120
            </Typography>
          </WidgetContainer>
        </Grid>
        <Grid item xs={12} md={3}>
          <WidgetContainer>
            <DevicesOther sx={{ fontSize: 40, color: "#E74C3C", mb: 1 }} />
            <Typography variant="subtitle1" fontWeight="500" color="textSecondary">
              Equipment
            </Typography>
            <Typography variant="h4" fontWeight="600" color={primaryColor}>
              50
            </Typography>
          </WidgetContainer>
        </Grid>
        <Grid item xs={12} md={3}>
          <WidgetContainer>
            <Science sx={{ fontSize: 40, color: "#27AE60", mb: 1 }} />
            <Typography variant="subtitle1" fontWeight="500" color="textSecondary">
              Active Labs
            </Typography>
            <Typography variant="h4" fontWeight="600" color={primaryColor}>
              10
            </Typography>
          </WidgetContainer>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={6}>
          <AcademicCard>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <BarChart sx={{ mr: 1, color: secondaryColor }} />
                <Typography variant="h6" fontWeight="600">
                  Resource Distribution
                </Typography>
              </Box>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie 
                    data={resourceData} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={80} 
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {resourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [`${value} units`, name]}
                    contentStyle={{ 
                      borderRadius: "8px", 
                      border: `1px solid ${borderColor}`,
                      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </AcademicCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <AcademicCard>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Business sx={{ mr: 1, color: secondaryColor }} />
                  <Typography variant="h6" fontWeight="600">
                    Resource Inventory
                  </Typography>
                </Box>
                <ActionButton 
                  variant="contained" 
                  startIcon={<AddCircleOutline />}
                  sx={{ backgroundColor: secondaryColor, "&:hover": { backgroundColor: "#2980B9" } }}
                  component={Link} 
                  to="/addresource"
                >
                  Add Resource
                </ActionButton>
              </Box>
              
              <TableContainer sx={{ maxHeight: 300, border: `1px solid ${borderColor}`, borderRadius: "8px" }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "600" }}>Resource</TableCell>
                      <TableCell sx={{ fontWeight: "600" }}>Location</TableCell>
                      <TableCell sx={{ fontWeight: "600" }}>Capacity</TableCell>
                      <TableCell sx={{ fontWeight: "600" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {resources.map((resource) => (
                      <TableRow key={resource.rId} hover>
                        <TableCell>
                          <Typography fontWeight="500">{resource.name}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            {resource.roomNo}
                          </Typography>
                        </TableCell>
                        <TableCell>{resource.location}</TableCell>
                        <TableCell>{resource.capacity}</TableCell>
                        <TableCell>
                          <IconButton 
                            size="small" 
                            onClick={() => handleEditClick(resource.rId)}
                            sx={{ color: secondaryColor }}
                          >
                            <EditOutlined fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            sx={{ color: "#7F8C8D" }}
                          >
                            <ArchiveOutlined fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleDelete(resource.rId)}
                            sx={{ color: accentColor }}
                          >
                            <DeleteOutline fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </AcademicCard>
        </Grid>

        {/* Secondary Widgets */}
        <Grid item xs={12} md={6}>
          <AcademicCard>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CalendarToday sx={{ mr: 1, color: secondaryColor }} />
                <Typography variant="h6" fontWeight="600">
                  Upcoming Reservations
                </Typography>
              </Box>
              <Box sx={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                height: "120px",
                background: `linear-gradient(135deg, ${lightBackground} 0%, ${cardBackground} 100%)`,
                borderRadius: "8px",
                border: `1px dashed ${borderColor}`
              }}>
                <Typography color="textSecondary">No upcoming reservations</Typography>
              </Box>
            </CardContent>
          </AcademicCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <AcademicCard>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <School sx={{ mr: 1, color: secondaryColor }} />
                <Typography variant="h6" fontWeight="600">
                  Recent Additions
                </Typography>
              </Box>
              <Box sx={{ 
                display: "flex", 
                flexDirection: "column",
                gap: 1
              }}>
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "space-between",
                  p: 1,
                  borderRadius: "4px",
                  "&:hover": { backgroundColor: lightBackground }
                }}>
                  <Typography>Chemistry Lab Equipment</Typography>
                  <Typography variant="caption" color="textSecondary">2 days ago</Typography>
                </Box>
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "space-between",
                  p: 1,
                  borderRadius: "4px",
                  "&:hover": { backgroundColor: lightBackground }
                }}>
                  <Typography>Advanced Physics Textbooks</Typography>
                  <Typography variant="caption" color="textSecondary">1 week ago</Typography>
                </Box>
              </Box>
            </CardContent>
          </AcademicCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResourceManagement;