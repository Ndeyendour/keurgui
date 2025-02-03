import React,{ useState,useEffect } from "react";
import axios from 'axios';

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
  Checkbox,
  Avatar,
  CardContent,
  IconButton,
  LinearProgress,
} from "@mui/material";
import {
  BarChart,
  Bar,
} from "recharts";

import {
  Mail as MailIcon,
  Dashboard as DashboardIcon,
  Widgets as WidgetsIcon,
  TableChart as TableChartIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";
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

 

  const navigate = useNavigate(); // Pour la navigation avec React Router v5
  const [openSublist, setOpenSublist] = useState(null);

  const handleSublistToggle = (index) => {
    setOpenSublist((prev) => (prev === index ? null : index)); // Toggle ouvrir/fermer sous-liste
  };

  const handleNavigation = (path) => {
    navigate(path); // Redirection vers une autre page
  };

  const fullName = localStorage.getItem("fullName") || "Utilisateur non connecté";
  const role = localStorage.getItem("role") || "Non défini";
  

  // Données du graphique
  const data = [
    { name: "Jan", Dataset1: 40, Dataset2: 24, Dataset3: 20 },
    { name: "Feb", Dataset1: 30, Dataset2: 13, Dataset3: 22 },
    { name: "Mar", Dataset1: 20, Dataset2: 98, Dataset3: 30 },
    { name: "Apr", Dataset1: 27, Dataset2: 39, Dataset3: 50 },
    { name: "May", Dataset1: 18, Dataset2: 48, Dataset3: 35 },
    { name: "Jun", Dataset1: 23, Dataset2: 38, Dataset3: 25 },
  ];
  const [newUsers, setNewUsers] = useState(0);

  useEffect(() => {
    // Fonction pour récupérer les nouveaux utilisateurs
    const fetchNewUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/register");
        setNewUsers(response.data.count); // Met à jour l'état avec le nombre
      } catch (error) {
        console.error("Erreur lors de la récupération des nouveaux utilisateurs :", error);
      }
    };

    fetchNewUsers();
  }, []);

  const handleNotifications = () => {
    alert("Vous avez " + newUsers + " nouvelles connexions !");
  };

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
            backgroundColor: "#003366", // Bleu foncé
            color: "white", // Texte en blanc pour un bon contraste
          },
        }}
      >
        <Box sx={{ padding: 2, textAlign: "center" }}>
        <Typography variant="h6" sx={{ color: "white" }}>
      KEURGUI
    </Typography>
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
        <h6 style={{ marginLeft: "16px" , color: "white"}}>General</h6>
<div
  style={{
    height: "1px", // Hauteur du trait (équivalent à l'épaisseur)
    backgroundColor: "red", // Couleur rouge
    marginLeft: "16px", // Alignement avec le texte
    marginRight: "16px", // Alignement avec le texte
    borderRadius: "2px", // Facultatif : arrondir les bords
  }}
></div>

          {/* Liste principale avec icônes */}
          {[
            {
              label: "Tableau de bord",
              path: "/admin",
              icon: <HomeIcon sx={{ color: "green" }}/>,
            },
            {
              label: "Propriété",
              subItems: [
                { label: "Propriétés a vendre", path: "/adminpv" },
                { label: "Propriétés a louer", path: "/adminpv" },
                { label: "Ajouter une proprite", path: "/ajoutp" },

              ],
              icon: <ApartmentIcon sx={{ color: "yellow" }}/>,
            },
            {
              label: "Types",
              subItems: [
                { label: "Chalets", path: "/chalet" },
                { label: "Maison", path: "/types/ajouter" },
                { label: "Condos", path: "/types/liste" },
                { label: "Plex", path: "/types/ajouter" },
              ],
              icon: <CategoryIcon sx={{ color: "red" }}/>,
            },
            {
              label: "Agents",
              subItems: [
                { label: "Tous les agents", path: "/agnts" },
                { label: "Ajouter un agent", path: "/add-agent" },
                // { label: "Profil de l'agent", path: "/tliste" },
                { label: "Facture de l'agent", path: "/types/ajouter" },
              ],
              icon: <PersonIcon sx={{ color: "teal" }}/>,
            },
            {
                label: "Utilisateurs",
                path: "/users",
                icon: <PersonIcon sx={{ color: "fuchsia" }}/>,
              },
            
            {
              label: "Carte",
              path: "/carte",
              icon: <MapIcon sx={{ color: "blue" }}/>,
            },
            {
              label: "Rapports",
              path: "/rapports",
              icon: <AssessmentIcon sx={{ color: "orange" }}/>,
            },
            {
              label: "Application",
              path: "/application",
              icon: <AppsIcon sx={{ color: "salmon" }}/>,
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
      <Box sx={{ flexGrow: 1, bgcolor: "#f5f5f5", padding: 3}}>
        {/* Top Bar */}
        <AppBar position="static" sx={{ bgcolor: "#003366" }}> {/* Bleu foncé */}
  <Toolbar>
    <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}> {/* Texte en blanc */}
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
    <Avatar sx={{ bgcolor: "#FFA726", marginLeft: 2 }}>JD</Avatar> {/* Avatar personnalisé */}
  </Toolbar>
  
</AppBar>


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
        {/* Dashboard Stats */}
        <Grid container spacing={1} sx={{ marginTop: 1, marginLeft: 0 }}>
  {[
    { label: "Nouveau projet", value: 128, progress: 60, color: "#3f51b5" }, // Bleu
    { label: "Projet total", value: 758, progress: 70, color: "#f50057" }, // Rose
    { label: "Propriétés à louer", value: 2521, progress: 80, color: "#4caf50" }, // Vert
    { label: "Bénéfices totaux (années)", value: "24 500", progress: 90, color: "#ff9800" }, // Orange
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
                backgroundColor: "#e0e0e0", // Couleur de fond de la barre
                "& .MuiLinearProgress-bar": {
                  backgroundColor: stat.color, // Couleur personnalisée
                },
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
