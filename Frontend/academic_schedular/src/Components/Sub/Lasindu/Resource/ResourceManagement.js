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
  IconButton,
  LinearProgress,
  Avatar,
  Menu,
  MenuItem
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
  Business,
  Search,
  Print,
  FileDownload,
  MoreVert,
  EventAvailable,
  EventBusy,
  People,
  Inventory
} from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import { styled } from "@mui/system";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, Legend } from "recharts";
import jsPDF from "jspdf";
import "jspdf-autotable";
import dayjs from "dayjs";

// Professional color palette
const primaryColor = "#2C3E50"; // Dark blue-gray
const secondaryColor = "#3498DB"; // Calm blue
const accentColor = "#E74C3C"; // Contrast color
const successColor = "#27AE60"; // Green
const warningColor = "#F39C12"; // Orange
const lightBackground = "#F5F7FA";
const cardBackground = "#FFFFFF";
const borderColor = "#E0E0E0";
const textSecondary = "#7F8C8D";

// Styled components
const DashboardCard = styled(Card)(({ theme }) => ({
  backgroundColor: cardBackground,
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  border: "none",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
  }
}));

const StatWidget = styled(Paper)(({ theme }) => ({
  backgroundColor: cardBackground,
  padding: theme.spacing(3),
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  borderLeft: `5px solid ${secondaryColor}`,
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)"
  }
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  borderRadius: "8px",
  padding: theme.spacing(1, 3),
  fontSize: "0.875rem",
  boxShadow: "none",
  "&:hover": {
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  }
}));

const ResourceManagement = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch resources
        const resResponse = await fetch("https://localhost:7002/resource/");
        const resData = await resResponse.json();
        
        if (resData.isValid) {
          setResources(resData.data);
          setFilteredResources(resData.data);
        }
        
        // Fetch statistics
        const statsResponse = await fetch("https://localhost:7002/resource");
        const statsData = await statsResponse.json();
        console.log("no data");
        if (statsData.isValid) {
          setStats(statsData.data);
          console.log(statsData.data);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setLoading(false);
      }
    };
    
    fetchData();
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
        setFilteredResources(prev => prev.filter(resource => resource.rId !== rId));
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

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      setFilteredResources(
        resources.filter((resource) =>
          resource.name.toLowerCase().includes(query.toLowerCase()) ||
          resource.location.toLowerCase().includes(query.toLowerCase()) ||
          resource.roomNo.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredResources(resources);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    
    // Add title and date
    doc.setFontSize(18);
    doc.setTextColor(primaryColor);
    doc.setFont("helvetica", "bold");
    doc.text("Resource Management Report", 15, 20);
    
    doc.setFontSize(11);
    doc.setTextColor(textSecondary);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${dayjs().format("MMMM D, YYYY h:mm A")}`, 15, 28);
    
    // Add summary statistics
    doc.setFontSize(14);
    doc.setTextColor(primaryColor);
    doc.text("Summary Statistics", 15, 40);
    
    doc.setFontSize(10);
    doc.setTextColor(textSecondary);
    if (stats) {
      doc.text(`Total Resources: ${String(stats.totalResources)}`, 15, 50);
      doc.text(`Available Resources: ${String(stats.availableResources)}`, 15, 58);
      doc.text(`In Use Resources: ${String(stats.inUseResources)}`, 15, 66);
      doc.text(`Maintenance Required: ${String(stats.maintenanceRequired)}`, 15, 74);
    }
    
    // Add resources table
    doc.setFontSize(14);
    doc.setTextColor(primaryColor);
    doc.text("Resource Inventory", 15, 88);
    
    // Table header
    doc.setFontSize(10);
    doc.setTextColor(textSecondary);
    doc.text("Name", 15, 98);
    doc.text("Room No", 55, 98);
    doc.text("Location", 95, 98);
    doc.text("Capacity", 135, 98);
    doc.text("Status", 175, 98);
    
    // Draw table header line
    doc.setLineWidth(0.5);
    doc.line(15, 100, 200, 100); // Horizontal line below header
    
    // Table rows
    let rowY = 105;
    filteredResources.forEach(resource => {
      doc.text(String(resource.name), 15, rowY);
      doc.text(String(resource.roomNo), 55, rowY);
      doc.text(String(resource.location), 95, rowY);
      doc.text(String(resource.capacity), 135, rowY);
      doc.text(String(resource.status || "Available"), 175, rowY);
      
      // Draw line after each row
      doc.setLineWidth(0.5);
      doc.line(15, rowY + 2, 200, rowY + 2); // Horizontal line after row
      
      rowY += 8; // Increment Y for next row
    });
    
    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(textSecondary);
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);
    }
    
    doc.save(`Resource_Report_${dayjs().format("YYYYMMDD_HHmmss")}.pdf`);
};



  const resourceTypeData = [
    { name: "Classrooms", value: stats?.classrooms || 0, color: "#3498DB" },
    { name: "Labs", value: stats?.labs || 0, color: "#E74C3C" },
    { name: "Equipment", value: stats?.equipment || 0, color: "#27AE60" },
    { name: "Other", value: stats?.otherResources || 0, color: "#F39C12" },
  ];

  const statusData = [
    { name: "Available", value: stats?.availableResources || 0, color: "#27AE60" },
    { name: "In Use", value: stats?.inUseResources || 0, color: "#3498DB" },
    { name: "Maintenance", value: stats?.maintenanceRequired || 0, color: "#E74C3C" },
  ];

  const capacityData = resources
    .sort((a, b) => b.capacity - a.capacity)
    .slice(0, 5)
    .map(resource => ({
      name: resource.name,
      capacity: resource.capacity,
      location: resource.location
    }));

  return (
    <Box sx={{ backgroundColor: lightBackground, minHeight: "100vh", p: 3 }}>
      {loading && <LinearProgress color="primary" />}
      
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            mb: 3,
            backgroundColor: cardBackground,
            p: 3,
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
          }}>
            <Box>
              <Typography variant="h4" fontWeight="700" color={primaryColor}>
                <LibraryBooks sx={{ verticalAlign: "middle", mr: 2, color: secondaryColor, fontSize: 32 }} />
                Resource Management Dashboard
              </Typography>
              <Typography variant="body2" color={textSecondary} sx={{ mt: 1 }}>
                Monitor and manage all institutional resources
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Chip 
                label={`Academic Year ${dayjs().format("YYYY")}-${dayjs().add(1, 'year').format("YY")}`} 
                variant="outlined" 
                sx={{ 
                  borderColor: secondaryColor, 
                  color: primaryColor,
                  fontWeight: 600,
                  mr: 2
                }} 
              />
              <IconButton onClick={handleMenuOpen}>
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleGeneratePDF}>
                  <FileDownload sx={{ mr: 1 }} /> Export PDF
                </MenuItem>
                <MenuItem onClick={handleGeneratePDF}>
                  <Print sx={{ mr: 1 }} /> Print Report
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Grid>

        {/* Search Bar */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, borderRadius: "12px" }}>
            <Box sx={{ 
              display: "flex", 
              alignItems: "center",
              backgroundColor: cardBackground,
              borderRadius: "8px",
              p: 1,
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)"
            }}>
              <Search sx={{ color: textSecondary, mr: 1 }} />
              <Input
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search resources by name, location or room number..."
                disableUnderline
                sx={{
                  fontSize: "0.95rem",
                  "& input::placeholder": {
                    color: textSecondary,
                    opacity: 1
                  }
                }}
              />
              <Button 
                variant="contained" 
                startIcon={<AddCircleOutline />}
                sx={{ 
                  ml: 2,
                  backgroundColor: secondaryColor,
                  "&:hover": { backgroundColor: "#2980B9" }
                }}
                component={Link}
                to="/addresource"
              >
                Add Resource
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Statistics Widgets */}
        <Grid item xs={12} md={6} lg={3}>
          <StatWidget>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" color={textSecondary} fontWeight="600">
                Total Resources
              </Typography>
              <Avatar sx={{ backgroundColor: "#EBF5FB", width: 40, height: 40 }}>
                <Inventory sx={{ color: secondaryColor }} />
              </Avatar>
            </Box>
            <Typography variant="h4" fontWeight="700" sx={{ mt: 1 }}>
              {resources.length || 0}
            </Typography>
            <Typography variant="caption" color={textSecondary}>
              Across all locations
            </Typography>
          </StatWidget>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatWidget sx={{ borderLeftColor: successColor }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" color={textSecondary} fontWeight="600">
                Available Now
              </Typography>
              <Avatar sx={{ backgroundColor: "#EAFAF1", width: 40, height: 40 }}>
                <EventAvailable sx={{ color: successColor }} />
              </Avatar>
            </Box>
            <Typography variant="h4" fontWeight="700" sx={{ mt: 1 }}>
              {stats?.availableResources || 0}
            </Typography>
            <Typography variant="caption" color={textSecondary}>
              Ready for booking
            </Typography>
          </StatWidget>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatWidget sx={{ borderLeftColor: accentColor }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" color={textSecondary} fontWeight="600">
                In Maintenance
              </Typography>
              <Avatar sx={{ backgroundColor: "#FDEDEC", width: 40, height: 40 }}>
                <EventBusy sx={{ color: accentColor }} />
              </Avatar>
            </Box>
            <Typography variant="h4" fontWeight="700" sx={{ mt: 1 }}>
              {stats?.maintenanceRequired || 0}
            </Typography>
            <Typography variant="caption" color={textSecondary}>
              Require attention
            </Typography>
          </StatWidget>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatWidget sx={{ borderLeftColor: warningColor }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" color={textSecondary} fontWeight="600">
                Avg. Utilization
              </Typography>
              <Avatar sx={{ backgroundColor: "#FEF5E7", width: 40, height: 40 }}>
                <People sx={{ color: warningColor }} />
              </Avatar>
            </Box>
            <Typography variant="h4" fontWeight="700" sx={{ mt: 1 }}>
              {stats?.utilizationRate ? `${Math.round(stats.utilizationRate)}%` : "N/A"}
            </Typography>
            <Typography variant="caption" color={textSecondary}>
              Current capacity usage
            </Typography>
          </StatWidget>
        </Grid>

        {/* Resource Distribution Chart */}
        <Grid item xs={12} md={6}>
          <DashboardCard>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" fontWeight="600" color={primaryColor}>
                  Resource Type Distribution
                </Typography>
                <Chip label="This Month" size="small" sx={{ backgroundColor: "#EBF5FB", color: secondaryColor }} />
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={resourceTypeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {resourceTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} resources`, ""]}
                    contentStyle={{
                      borderRadius: "8px",
                      border: `1px solid ${borderColor}`,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      fontWeight: 500
                    }}
                  />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    wrapperStyle={{ paddingTop: "20px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Resource Status Chart */}
        <Grid item xs={12} md={6}>
          <DashboardCard>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" fontWeight="600" color={primaryColor}>
                  Resource Status Overview
                </Typography>
                <Chip label="Real-time" size="small" sx={{ backgroundColor: "#EAFAF1", color: successColor }} />
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart
                  data={statusData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      borderRadius: "8px",
                      border: `1px solid ${borderColor}`,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      fontWeight: 500
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Resources" 
                    radius={[4, 4, 0, 0]}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Top Capacity Resources */}
        <Grid item xs={12} md={6}>
          <DashboardCard>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" fontWeight="600" color={primaryColor}>
                  Highest Capacity Resources
                </Typography>
                <Chip label="Top 5" size="small" sx={{ backgroundColor: "#FEF5E7", color: warningColor }} />
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart
                  layout="vertical"
                  data={capacityData}
                  margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip 
                    formatter={(value, name, props) => [`Capacity: ${value}`, `Location: ${props.payload.location}`]}
                    contentStyle={{
                      borderRadius: "8px",
                      border: `1px solid ${borderColor}`,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      fontWeight: 500
                    }}
                  />
                  <Bar 
                    dataKey="capacity" 
                    name="Capacity" 
                    radius={[0, 4, 4, 0]}
                    fill={secondaryColor}
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <DashboardCard>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" fontWeight="600" color={primaryColor}>
                  Recent Resource Activities
                </Typography>
                <Chip label="Last 7 Days" size="small" sx={{ backgroundColor: "#FDEDEC", color: accentColor }} />
              </Box>
              <Box sx={{ height: 300, overflowY: "auto" }}>
                {stats?.recentActivities?.length > 0 ? (
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "600" }}>Resource</TableCell>
                          <TableCell sx={{ fontWeight: "600" }}>Activity</TableCell>
                          <TableCell sx={{ fontWeight: "600" }}>Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stats.recentActivities.map((activity, index) => (
                          <TableRow key={index} hover>
                            <TableCell>{activity.resourceName}</TableCell>
                            <TableCell>
                              <Chip 
                                label={activity.type} 
                                size="small" 
                                sx={{ 
                                  backgroundColor: activity.type === 'Booking' ? '#EBF5FB' : '#FDEDEC',
                                  color: activity.type === 'Booking' ? secondaryColor : accentColor
                                }} 
                              />
                            </TableCell>
                            <TableCell>{dayjs(activity.date).format("MMM D, h:mm A")}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Box sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    height: "100%",
                    color: textSecondary
                  }}>
                    <EventAvailable sx={{ fontSize: 40, mb: 1 }} />
                    <Typography>No recent activities found</Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Resource Inventory Table */}
        <Grid item xs={12}>
          <DashboardCard>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" fontWeight="600" color={primaryColor}>
                  Resource Inventory
                </Typography>
                <Box>
                  <PrimaryButton
                    variant="contained"
                    onClick={handleGeneratePDF}
                    sx={{ 
                      backgroundColor: primaryColor,
                      "&:hover": { backgroundColor: "#1A252F" },
                      mr: 2
                    }}
                    startIcon={<FileDownload />}
                  >
                    Export Report
                  </PrimaryButton>
                  <PrimaryButton
                    variant="outlined"
                    sx={{ 
                      borderColor: borderColor,
                      color: primaryColor,
                      "&:hover": { borderColor: primaryColor }
                    }}
                    startIcon={<Print />}
                  >
                    Print
                  </PrimaryButton>
                </Box>
              </Box>

              <TableContainer sx={{ borderRadius: "8px", border: `1px solid ${borderColor}` }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: lightBackground }}>
                      <TableCell sx={{ fontWeight: "700", width: "25%" }}>Resource Name</TableCell>
                      <TableCell sx={{ fontWeight: "700" }}>Room No</TableCell>
                      <TableCell sx={{ fontWeight: "700" }}>Location</TableCell>
                      <TableCell sx={{ fontWeight: "700" }}>Capacity</TableCell>
                      <TableCell sx={{ fontWeight: "700" }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: "700", textAlign: "right" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredResources.length > 0 ? (
                      filteredResources.map((resource) => (
                        <TableRow key={resource.rId} hover>
                          <TableCell sx={{ fontWeight: "500" }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              {resource.type === "Lab" ? (
                                <Science sx={{ color: accentColor, mr: 1 }} />
                              ) : resource.type === "Classroom" ? (
                                <MeetingRoom sx={{ color: secondaryColor, mr: 1 }} />
                              ) : resource.type === "Equipment" ? (
                                <DevicesOther sx={{ color: warningColor, mr: 1 }} />
                              ) : (
                                <Business sx={{ color: textSecondary, mr: 1 }} />
                              )}
                              {resource.name}
                            </Box>
                          </TableCell>
                          <TableCell>{resource.roomNo}</TableCell>
                          <TableCell>{resource.location}</TableCell>
                          <TableCell>{resource.capacity}</TableCell>
                          <TableCell>
                            <Chip 
                              label={resource.status || "Available"} 
                              size="small" 
                              sx={{ 
                                backgroundColor: resource.status === "Available" ? "#EAFAF1" : 
                                                resource.status === "In Use" ? "#EBF5FB" : "#FDEDEC",
                                color: resource.status === "Available" ? successColor : 
                                       resource.status === "In Use" ? secondaryColor : accentColor,
                                fontWeight: 500
                              }} 
                            />
                          </TableCell>
                          <TableCell sx={{ textAlign: "right" }}>
                            <IconButton
                              size="small"
                              onClick={() => handleEditClick(resource.rId)}
                              sx={{ color: secondaryColor, "&:hover": { backgroundColor: "#EBF5FB" } }}
                            >
                              <EditOutlined fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{ color: warningColor, "&:hover": { backgroundColor: "#FEF5E7" } }}
                            >
                              <ArchiveOutlined fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(resource.rId)}
                              sx={{ color: accentColor, "&:hover": { backgroundColor: "#FDEDEC" } }}
                            >
                              <DeleteOutline fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} sx={{ textAlign: "center", py: 4 }}>
                          <Typography color={textSecondary}>
                            {searchQuery ? "No matching resources found" : "No resources available"}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </DashboardCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResourceManagement;