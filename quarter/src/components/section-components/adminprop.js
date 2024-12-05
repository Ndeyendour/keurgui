import React,{ useState , useEffect} from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath } from '@fortawesome/free-solid-svg-icons'; 

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

const Adminprop = () => {
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
  const [products, setProducts] = useState([]);


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
							<div className="col-lg-12">
							
							<div className="tab-content ">
								<div className="tab-pane fade active show" id="liton_product_grid">
								<div className="ltn__product-tab-content-inner ltn__product-grid-view">
									<div className="row">
									<div className="col-lg-12">
									{/* Search Widget */}
									<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
										{/* Barre de recherche */}
										<input
										type="text"
										placeholder="Chercher par ville, quartier, région, adresse ou N° Centris"
										value={query}
										onChange={(e) => setQuery(e.target.value)}
										className="input-style"
										/>

										{/* Catégorie */}
										<select
										value={category}
										onChange={(e) => setCategory(e.target.value)}
										className="select-style"
										>
										<option value="Résidentiel">Résidentiel</option>
										<option value="Commercial">Commercial</option>
										<option value="Terrain">Terrain</option>
										</select>

										{/* Type de transaction */}
										<select
										value={transactionType}
										onChange={(e) => setTransactionType(e.target.value)}
										className="select-style"
										>
										<option value="À vendre">À vendre</option>
										<option value="À louer">À louer</option>
										</select>

										{/* Prix */}
										{/* Prix */}
										<button
										className="button-style"
										onClick={() => alert("Ouvrir les filtres de prix")}
										>
										<span className="prix-text">Prix</span>
										<span className="prix-symbol"> $</span>
										</button>


										{/* Filtres */}
										<button
										className="button-style"
										onClick={() => alert("Ouvrir les filtres avancés")}
										>
										Filtres
										</button>

										{/* Style de vie */}
										{/* <button
										className="button-style"
										onClick={() => alert("Ouvrir les options de style de vie")}
										>
										Style de vie ({lifestyleFilters})
										</button> */}
									</div>
									</div>

									{/* ltn__product-item */}
									<div className="row">
									<div className="col-lg-12">
										<div className="tab-content ">
											<div className="tab-pane fade active show" id="liton_product_grid">
												<div className="ltn__product-tab-content-inner ltn__product-grid-view">
													<div className="row">
														{/* Liste des propriétés */}
														{filteredProducts.map((product) => (
															<div key={product._id} className="col-lg-3 col-sm-6 col-12">
																<img
																	src={product.image || '/path/to/default-image.jpg'}
																	alt={product.title}
																	className="property-image"
																	onClick={() => history.push(`/product-details/`)} // Redirection
																/>
																<div className="property-details">
																	<h6>{product.price?.toLocaleString()} $</h6>
																	<h6>{product.title}</h6>
																	<p>{product.address}, {product.city}</p>
																	<div className="property-features">
																		<span>
																			<FontAwesomeIcon icon={faBed} /> {product.features?.bedrooms || 0}
																		</span>
																		<span>
																			<FontAwesomeIcon icon={faBath} /> {product.features?.bathrooms || 0}
																		</span>
																	</div> 
																</div>
															</div>
														))}
													</div>
												</div>
											</div>
										</div>
									</div>
									</div>

								
									</div>
								</div>
								</div>
								
							</div>
							
							</div>
						</div>
				</div>
			</div>
						
			


			</div>
        
      </Box>
    </Box>
  );
};

export default Adminprop;
