import React from "react";
import {
  Card,
  CardContent,
  Button,
  Input,
  Grid,
  Typography,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Archive,
  MenuBook,
  Category,
  Inventory,
  TrendingUp,
  ShoppingCart,
  NewReleases,
} from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import { styled } from "@mui/system";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const primaryColor = "#1E3A8A";
const secondaryColor = "#F59E0B";
const backgroundColor = "#F3F4F6";
const cardBackground = "#FFFFFF";

const resourceData = [
  { name: "Books", value: 45, color: "#0284C7" },
  { name: "Equipment", value: 30, color: "#E11D48" },
  { name: "Labs", value: 25, color: "#22C55E" },
];

const WidgetContainer = styled(Grid)(() => ({
  backgroundColor: cardBackground,
  padding: "1.5rem",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "120px",
}));

const ResourceManagement = () => {
  return (
    <div style={{ backgroundColor, minHeight: "100vh", padding: "2rem" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography variant="h4" fontWeight="bold" color={primaryColor}>
            Resource Management Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <WidgetContainer>
            <Category fontSize="large" color="primary" />
            <Typography variant="h6" fontWeight="bold">Total Resources</Typography>
            <Typography variant="h4" fontWeight="bold">200</Typography>
          </WidgetContainer>
        </Grid>
        <Grid item xs={12} md={3}>
          <WidgetContainer>
            <MenuBook fontSize="large" color="primary" />
            <Typography variant="h6" fontWeight="bold">Books Available</Typography>
            <Typography variant="h4" fontWeight="bold">120</Typography>
          </WidgetContainer>
        </Grid>
        <Grid item xs={12} md={3}>
          <WidgetContainer>
            <Inventory fontSize="large" color="primary" />
            <Typography variant="h6" fontWeight="bold">Equipment Available</Typography>
            <Typography variant="h4" fontWeight="bold">50</Typography>
          </WidgetContainer>
        </Grid>
        <Grid item xs={12} md={3}>
          <WidgetContainer>
            <TrendingUp fontSize="large" color="primary" />
            <Typography variant="h6" fontWeight="bold">Labs in Use</Typography>
            <Typography variant="h4" fontWeight="bold">10</Typography>
          </WidgetContainer>
        </Grid>
      </Grid>
        < br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: cardBackground, p: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color={primaryColor}>
                Resource Breakdown
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={resourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {resourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
  <Card sx={{ backgroundColor: cardBackground, p: 2 }}>
    <CardContent>
      <Typography variant="h6" fontWeight="bold" color={primaryColor} gutterBottom>
        Resource List
      </Typography>
      <TableContainer sx={{ maxHeight: 300, overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Resource</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { name: "Data Structures Textbook", category: "Books", quantity: 12 },
              { name: "Programming Lab Kits", category: "Equipment", quantity: 5 },
              { name: "Advanced AI Guide", category: "Books", quantity: 8 },
            ].map((resource, index) => (
              <TableRow key={index}>
                <TableCell>
                  <MenuBook /> {resource.name}
                </TableCell>
                <TableCell>{resource.category}</TableCell>
                <TableCell>{resource.quantity}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small"><Edit /></Button>
                  <Button variant="outlined" size="small"><Archive /></Button>
                  <Button variant="contained" color="error" size="small"><Delete /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
</Grid>

      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <WidgetContainer>
            <NewReleases fontSize="large" color="primary" />
            <Typography variant="h6" fontWeight="bold">New Resources</Typography>
            <Typography variant="h6" fontWeight="bold">5 Items</Typography>
          </WidgetContainer>
        </Grid>
        <Grid item xs={12} md={3}>
          <WidgetContainer>
            <ShoppingCart fontSize="large" color="primary" />
            <Typography variant="h6" fontWeight="bold">Upcoming Orders</Typography>
            <Typography variant="h6" fontWeight="bold">3 Orders</Typography>
          </WidgetContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default ResourceManagement;