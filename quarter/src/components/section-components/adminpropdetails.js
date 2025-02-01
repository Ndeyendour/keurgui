import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

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
  CardMedia,
  Button,
  Divider,
  LinearProgress,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  Category as CategoryIcon,
  Person as PersonIcon,
  Map as MapIcon,
  Assessment as AssessmentIcon,
  Apps as AppsIcon,
} from "@mui/icons-material";

const Adminprop = () => {
  const handleLogout = () => {
    console.log("Déconnexion");
  };

  const handleNotifications = () => {
    console.log("Afficher les notifications");
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

  const { id } = useParams(); // Récupérer l'ID du produit depuis l'URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://keurgui.onrender.com/api/products/${id}`);
        console.log("Produit récupéré:", response.data); // Vérifie les données dans la console
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du produit', error);
        setLoading(false);
        setProduct(null);  // Si une erreur survient, on s'assure que `product` reste null
      }
    };
  
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <Box sx={{ textAlign: 'center', marginTop: 4 }}><Typography variant="h6">Chargement...</Typography></Box>;
  }

  if (!product) {
    return <Box sx={{ textAlign: 'center', marginTop: 4 }}><Typography variant="h6">Produit non trouvé</Typography></Box>;
  }

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
          {[/* Items du menu */].map((item, index) => (
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
              rechercher
            </Typography>
            <IconButton color="inherit" onClick={handleNotifications}>
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Contenu principal */}
        <Box sx={{ marginTop: 3 }}>
          <Grid container spacing={3}>
            {/* Image de la propriété */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={product.image || '/path/to/default-image.jpg'}
                  alt={product.title}
                />
              </Card>
            </Grid>

            {/* Détails de la propriété */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5">{product.title}</Typography>
                  <Typography variant="h6" sx={{ marginTop: 1 }}>
                    {product.price?.toLocaleString()} $
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ marginTop: 1 }}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {product.address}, {product.city}
                  </Typography>

                  {/* Caractéristiques de la propriété */}
                  <Divider sx={{ marginTop: 2 }} />
                  <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body2">
                      <FontAwesomeIcon icon={faBed} /> {product.features?.bedrooms || 0} chambres
                    </Typography>
                    <Typography variant="body2">
                      <FontAwesomeIcon icon={faBath} /> {product.features?.bathrooms || 0} salles de bain
                    </Typography>
                  </Box>

                  {/* Description */}
                  <Divider sx={{ marginTop: 2 }} />
                  <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body2">
                      <strong>Description:</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      {product.description || 'Aucune description disponible'}
                    </Typography>
                  </Box>

                  {/* Bouton de contact */}
                  <Divider sx={{ marginTop: 2 }} />
                  <Box sx={{ marginTop: 2 }}>
                    <Button variant="contained" fullWidth color="primary">Contacter l'agent</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Adminprop;
