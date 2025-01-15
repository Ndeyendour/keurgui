import React, { useState } from "react";
import {
  
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Card,
  Checkbox,
  CardContent,
  Avatar,
  Badge,
} from "@mui/material";
import {
  BarChart,
  Bar,
} from "recharts";

import {
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  Dashboard as DashboardIcon,
  Widgets as WidgetsIcon,
  TableChart as TableChartIcon,
  Apps as AppsIcon,
  Map as MapIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import "./admin.css";

const Dashboard = () => {
  const data = [
    { name: "Jan", Dataset1: 40, Dataset2: 24, Dataset3: 20 },
    { name: "Feb", Dataset1: 30, Dataset2: 13, Dataset3: 22 },
    { name: "Mar", Dataset1: 20, Dataset2: 98, Dataset3: 30 },
    { name: "Apr", Dataset1: 27, Dataset2: 39, Dataset3: 50 },
    { name: "May", Dataset1: 18, Dataset2: 48, Dataset3: 35 },
    { name: "Jun", Dataset1: 23, Dataset2: 38, Dataset3: 25 },
  ];

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Widgets", icon: <WidgetsIcon /> },
    { text: "Elements", icon: <TableChartIcon /> },
    { text: "Tables", icon: <TableChartIcon /> },
    { text: "Apps", icon: <AppsIcon /> },
    { text: "Pricing Tables", icon: <TableChartIcon /> },
    { text: "Contact", icon: <MailIcon /> },
    { text: "Map", icon: <MapIcon /> },
    { text: "Charts", icon: <TableChartIcon /> },
    { text: "Settings", icon: <SettingsIcon /> },
  ];
  const [tasks, setTasks] = useState([
    { id: 1, title: "Review new property listings", completed: false },
    { id: 2, title: "Call potential clients", completed: false },
    { id: 3, title: "Prepare monthly report", completed: false },
    { id: 4, title: "Follow up on agent inquiries", completed: false },
  ]);

  const handleTaskToggle = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          "& .MuiDrawer-paper": {
            width: 240,
            backgroundColor: "#2C3E50",
            color: "#FFF",
          },
        }}
      >
        <Box sx={{ textAlign: "center", padding: 2 }}>
          <Avatar src="https://via.placeholder.com/80" sx={{ width: 80, height: 80, margin: "0 auto" }} />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            John David
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Online
          </Typography>
        </Box>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon sx={{ color: "#FFF" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, bgcolor: "#003366" }}>
        {/* Header */}
        <AppBar position="static" sx={{ bgcolor: "#007BFF" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={2} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <Avatar sx={{ bgcolor: "#FFA726", marginLeft: 2 }}>JD</Avatar>
          </Toolbar>
        </AppBar>

        {/* Cards */}
        <Grid container spacing={3} sx={{ padding: 3 }}>
          {[
            { icon: "🙋‍♂️", value: 2500, label: "Welcome" },
            { icon: "⏱️", value: "123.50", label: "Average Time" },
            { icon: "📂", value: 1805, label: "Collections" },
            { icon: "💬", value: 54, label: "Comments" },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ textAlign: "center", padding: 2 }}>
                <Typography variant="h4">{item.icon}</Typography>
                <Typography variant="h5" sx={{ margin: 1 }}>
                  {item.value}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Social Cards */}
        <Grid container spacing={3} sx={{ padding: 3 }}>
          {[
            { platform: "Facebook", friends: "35k", feeds: "128 Feeds" },
            { platform: "Twitter", followers: "584k", tweets: "978 Tweets" },
            { platform: "LinkedIn", contacts: "758+", feeds: "365 Feeds" },
            { platform: "Google+", followers: "450", circles: "57 Circles" },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ textAlign: "center", padding: 2 }}>
                <Typography variant="h5">{item.platform}</Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  {item.friends || item.followers || item.contacts}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.feeds || item.tweets || item.circles}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Chart */}
        <Card sx={{ margin: 3, padding: 2 }}>
  <Typography variant="h6" sx={{ marginBottom: 2 }}>
    Sales Performance
  </Typography>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="Dataset1" fill="#8884d8" radius={[10, 10, 0, 0]} />
      <Bar dataKey="Dataset2" fill="#82ca9d" radius={[10, 10, 0, 0]} />
      <Bar dataKey="Dataset3" fill="#ffc658" radius={[10, 10, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</Card>

        {/* Tasks Section */}
{/* Tasks Section */}
<Card className="task-card">
  <Typography variant="h6" sx={{ marginBottom: 2 }}>
    Tasks
  </Typography>
  <Grid container spacing={3}>
    {tasks.map((task) => (
      <Grid item xs={12} sm={6} md={4} key={task.id}>
        <Card
          className={`task-item ${task.completed ? "completed" : ""}`}
          sx={{
            padding: 2,
            borderLeft: task.completed ? "5px solid #28a745" : "5px solid #007bff",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={task.completed}
              onChange={() => handleTaskToggle(task.id)}
              className="custom-checkbox"
              sx={{ color: "#007bff" }}
            />
            <Typography
              className={`task-text ${task.completed ? "completed" : ""}`}
              sx={{
                marginLeft: 2,
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </Typography>
          </Box>
        </Card>
      </Grid>
    ))}
  </Grid>
</Card>


      </Box>
    </Box>
  );
};

export default Dashboard;
