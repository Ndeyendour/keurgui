import React,{ useState , useEffect} from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath,faCar,faClock ,faEdit,faTrash} from '@fortawesome/free-solid-svg-icons'; 
import "./adminprop.css";

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
import { useNavigate } from "react-router-dom";
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

const Chalets = () => {
  const handleLogout = () => {
    console.log("Déconnexion");
  };

  const handleNotifications = () => {
    console.log("Afficher les notifications");
  };

  const [setFilteredProducts] = useState([]);

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
  const [products, setProducts] = useState([]);
  // Modification



  // Effet pour récupérer les produits depuis le backend
  useEffect(() => {
    // Fonction pour récupérer les produits
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');  // URL de votre backend
        setProducts(response.data);  // Met à jour l'état avec les produits récupérés
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    };

    fetchProducts();  // Appel de la fonction pour récupérer les produits
  }, []);  // Le tableau vide [] indique que l'effet s'exécute une seule fois lors du montage du composant

  const handleEdit = (id) => {
    console.log(`Modifier la propriété avec ID: ${id}`);
    navigate(`/edit-property/${id}`);
};

const handleDelete = async (id) => {
  if (window.confirm("Voulez-vous vraiment supprimer cette propriété ?")) {
    try {
      // Envoi de la requête DELETE à l'API
      const response = await axios.delete(`http://localhost:5000/api/products/${id}`);
      if (response.status === 200) {
        // Mise à jour de l'état des produits après suppression
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
        alert('Propriété supprimée avec succès');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la propriété:', error);
      alert('Échec de la suppression de la propriété');
    }
  }
};


  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Résidentiel");
  const [transactionType, setTransactionType] = useState("À vendre");
  const [price, setPrice] = useState("");
  const [lifestyleFilters, setLifestyleFilters] = useState(1);


  // Filtrer les produits pour afficher uniquement ceux à vendre
  const filteredProducts = products.filter(
      (product) => product.transactionType === 'sale'
  );


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
                { label: "Propriétés a louer", path: "/adminpa" },
                { label: "Ajouter une proprite", path: "/ajoutp" },

              ],
              icon: <ApartmentIcon />,
            },
            {
              label: "Types",
              subItems: [
                { label: "Chalets", path: "/chalet" },
                { label: "Maison", path: "/types/ajouter" },
                { label: "Condos", path: "/types/liste" },
                { label: "Plex", path: "/types/ajouter" },
                { label: "appartment", path: "/types/apt" },
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
        <div>
          <div className="ltn__product-area ltn__product-gutter mb-100">
            <div className="container">
              <div className="row">
                {products.map((product) => (
                  <div key={product._id} className="col-lg-4 mb-4">
                    <div className="card">
                      <img
                        src={product.images[0] || "/path/to/default-image.jpg"}
                        alt={product.title}
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.price.toLocaleString()} $</p>
                        <p>{product.city}</p>
                        <div>
                          <FontAwesomeIcon icon={faBed} /> {product.features?.bedrooms || 0} chambres
                          <FontAwesomeIcon icon={faBath} /> {product.features?.bathrooms || 0} salles de bain
                        </div>
                        <div className="mt-3">
                          <button onClick={() => handleEdit(product._id)} className="btn btn-warning me-2">
                            Modifier
                          </button>
                          <button onClick={() => handleDelete(product._id)} className="btn btn-danger">
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
      </Box>
    </Box>
  );
};

export default Chalets;
