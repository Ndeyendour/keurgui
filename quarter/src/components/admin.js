import React,{ useState } from "react";

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Grid,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useHistory } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  Category as CategoryIcon,
  Person as PersonIcon,
  Map as MapIcon,
  Assessment as AssessmentIcon,
  Apps as AppsIcon,
} from "@mui/icons-material";

const Dashboard = () => {
  const handleLogout = () => {
    console.log("Déconnexion");
  };

  const handleNotifications = () => {
    console.log("Afficher les notifications");
  };

  const history = useHistory(); // Pour la navigation avec React Router v5
  const [openSublist, setOpenSublist] = useState(null);

  const handleSublistToggle = (index) => {
    setOpenSublist((prev) => (prev === index ? null : index)); // Toggle ouvrir/fermer sous-liste
  };

  const handleNavigation = (path) => {
    history.push(path); // Redirection vers une autre page
  };

  const fullName = localStorage.getItem("fullName") || "Utilisateur non connecté";
  const role = localStorage.getItem("role") || "Non défini";
  

  // Données du graphique
  const data = [
    { year: 2011, value1: 40, value2: 60 },
    { year: 2012, value1: 80, value2: 100 },
    { year: 2013, value1: 50, value2: 80 },
    { year: 2014, value1: 70, value2: 90 },
    { year: 2015, value1: 100, value2: 120 },
    { year: 2016, value1: 60, value2: 110 },
  ];

  return (

    <Box sx={{ display: "flex" }}>
      {/* Sidebar fixe */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            position: "fixed", // Fixe le sidebar
          },
        }}
      >
        <Box sx={{ padding: 2, textAlign: "center" }}>
          <Typography variant="h6">KEURGUI</Typography>
          <img
            src="https://via.placeholder.com/100"
            alt="User Avatar"
            style={{ borderRadius: "50%", marginTop: 16 }}
          />
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            {fullName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {role}
          </Typography>
        </Box>
        <List>
          {/* Liste principale avec icônes */}
          {[
            {
              label: "Tableau de bord",
              path: "/admin",
              icon: <HomeIcon />,
            },
            {
              label: "Propriété",
              subItems: [
                { label: "Propriétés a vendre", path: "/adminpv" },
                { label: "Propriétés a louer", path: "/adminpv" },
                { label: "Ajouter une proprite", path: "/ajoutp" },

              ],
              icon: <ApartmentIcon />,
            },
            {
              label: "Types",
              subItems: [
                { label: "Chalets", path: "/types/liste" },
                { label: "Maison", path: "/types/ajouter" },
                { label: "Condos", path: "/types/liste" },
                { label: "Plex", path: "/types/ajouter" },
              ],
              icon: <CategoryIcon />,
            },
            {
              label: "Agents",
              subItems: [
                { label: "Tous les agents", path: "/types/liste" },
                { label: "Ajouter un agent", path: "/types/ajouter" },
                { label: "Profil de l'agent", path: "/types/liste" },
                { label: "Facture de l'agent", path: "/types/ajouter" },
              ],
              icon: <PersonIcon />,
            },
            {
                label: "Utilisateurs",
                path: "/rapports",
                icon: <PersonIcon />,
              },
            
            {
              label: "Carte",
              path: "/carte",
              icon: <MapIcon />,
            },
            {
              label: "Rapports",
              path: "/rapports",
              icon: <AssessmentIcon />,
            },
            {
              label: "Application",
              path: "/application",
              icon: <AppsIcon />,
            },
          ].map((item, index) => (
            <React.Fragment key={item.label}>
              <ListItem button onClick={() => (item.subItems ? handleSublistToggle(index) : handleNavigation(item.path))}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
                {item.subItems ? (
                  openSublist === index ? <ExpandLess /> : <ExpandMore />
                ) : null}
              </ListItem>

              {/* Sous-listes */}
              {item.subItems && (
                <Collapse in={openSublist === index} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItem
                        button
                        sx={{ pl: 4 }}
                        key={subItem.label}
                        onClick={() => handleNavigation(subItem.path)}
                      >
                        <ListItemText primary={subItem.label} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, bgcolor: "#f5f5f5", padding: 3 }}>
        {/* Top Bar */}
        <AppBar
          position="static"
          color="primary"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Tableau de bord
            </Typography>
            <IconButton color="inherit" onClick={handleNotifications}>
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Dashboard Stats */}
        <Grid container spacing={3} sx={{ marginTop: 3 }}>
          {[
            { label: "Nouveau projet", value: 128, progress: 27 },
            { label: "Projet total", value: 758, progress: 9 },
            { label: "Propriétés à louer", value: 2521, progress: 17 },
            { label: "Bénéfices totaux (années)", value: "24 500 $", progress: 13 },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{stat.value}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {stat.label}
                  </Typography>
                  {/* Barre de progression */}
                  <Box sx={{ marginTop: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={stat.progress}
                      sx={{
                        height: 8,
                        borderRadius: 5,
                        backgroundColor: "#e0e0e0",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{ display: "block", marginTop: 1 }}
                  >
                    Changement de {stat.progress}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Graph Section */}
        <Card sx={{ marginTop: 3 }}>
          <CardContent>
            <Typography variant="h6">Rapport annuel sur la succession</Typography>
            <Box
              sx={{
                height: 300,
                backgroundColor: "#e3f2fd",
                marginTop: 2,
                borderRadius: 2,
                padding: 2,
              }}
            >
              {/* Graphique Recharts */}
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value1"
                    stackId="1"
                    stroke="#00C9FF"
                    fill="#00C9FF"
                  />
                  <Area
                    type="monotone"
                    dataKey="value2"
                    stackId="1"
                    stroke="#A390EE"
                    fill="#A390EE"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
