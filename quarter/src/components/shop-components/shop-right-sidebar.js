import React, { Component} from 'react';
import { useState, useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faCamera, faImages, faMapMarkedAlt, faListAlt,faHeart} from '@fortawesome/free-solid-svg-icons'; // Importation des icônes
import { useFavorites } from '../global-components/FavoritesContext';

import axios from 'axios';
import './shop-grid.css';
import './PropertyList.css';
import { useNavigate } from 'react-router-dom';


import Slider from "rc-slider";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import '../section-components/filterprix.css';
import { useLocation } from "react-router-dom";



const  ShopGridV2= () => {
  
  const [sortMethod, setSortMethod] = useState("relevance"); // Valeur par défaut
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 10000]); // Valeur par défaut
  const location = useLocation();
  const filters = location.state || {}; // Récupérer les filtres
  const [properties, setProperties] = useState([]);
    const [products, setProducts] = useState([]);
	const navigate = useNavigate(); // Hook pour naviguer
	const propertiesPerPage = 250;
	const [currentPage, setCurrentPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);
  const [priceRange, setPriceRange] = useState(location.state?.priceRange || [0, 10000]); // Récupère ou initialise la plage de prix

	// const [totalProperties, setTotalProperties] = useState(60992);
	const [activeTab, setActiveTab] = useState('galerie');
	const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");
	const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false); // État pour ouvrir/fermer la carte
	const [loading, setLoading] = useState(false);
  const [tempPriceRange, setTempPriceRange] = useState([0, 10000]); // Plage temporaire
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // État du dropdown
  const [minLotSize, setMinLotSize] = useState("");
  const [maxLotSize, setMaxLotSize] = useState("");
  const [minDate, setMinDate] = useState("");
    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  


  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]); // Ne pas faire de requêtes si l'entrée est trop courte
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get('https://keurgui.onrender.com/api/search-predictive', {
          params: { query },
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des suggestions', error);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

	// Effet pour récupérer les produits depuis le backend
	useEffect(() => {
	  // Fonction pour récupérer les produits
	  const fetchProducts = async () => {
		try {
		  const response = await axios.get('https://keurgui.onrender.com/api/products');  // URL de votre backend
		  setProducts(response.data);  // Met à jour l'état avec les produits récupérés
		} catch (error) {
		  console.error('Erreur lors de la récupération des produits:', error);
		}
	  };
  
	  fetchProducts();  // Appel de la fonction pour récupérer les produits
	}, []);  // Le tableau vide [] indique que l'effet s'exécute une seule fois lors du montage du composant
  
	const [category, setCategory] = useState("Résidentiel");
	const [transactionType, setTransactionType] = useState("À vendre");
	const [price, setPrice] = useState("");
	const [lifestyleFilters, setLifestyleFilters] = useState(1);
  
	// Filtrer les produits pour afficher uniquement ceux à vendre

	const handlePageChange = (page) => {
        setCurrentPage(page);
    };
        let publicUrl = process.env.PUBLIC_URL+'/'

        const handleCardClick = async (item) => {
          try {
            navigate(`/results/${encodeURIComponent(item)}`);
          } catch (error) {
            console.error("Erreur lors de la redirection :", error);
          }
        };

		//   ---------------------------nouv--------------
    
    const handleApplyFilter = async () => {
      try {
        setPriceRange(tempPriceRange); // Applique tempPriceRange à priceRange
        const response = await axios.get('https://keurgui.onrender.com/api/products', {
          params: {
            minPrice: tempPriceRange[0], // Utilise tempPriceRange pour la requête
            maxPrice: tempPriceRange[1],
          },
        });
        setProducts(response.data); // Met à jour les produits avec ceux filtrés depuis l'API
        setIsPriceFilterOpen(false); // Ferme la carte de filtre
      } catch (error) {
        console.error('Erreur lors du filtrage par prix :', error);
        alert('Une erreur est survenue lors du filtrage.');
      }
    };
      
      
		//   --------------favoris------------------------------
		const { favorites, addFavorite, removeFavorite } = useFavorites();

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      removeFavorite(productId);
    } else {
      addFavorite(productId);
    }
  };
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  const handleFavoriteClick = (product) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    toggleFavorite(product._id);
  };
  

  useEffect(() => {
    const token = localStorage.getItem('token'); // Remplacez par votre logique réelle
    setIsLoggedIn(!!token); // Si le token existe, l'utilisateur est connecté
  }, []);
  
  const [activeProductId, setActiveProductId] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer le total des produits
    const fetchTotalProducts = async () => {
      try {
        const response = await axios.get('https://keurgui.onrender.com/api/products/count'); // Utilisez le bon chemin
        setTotalProperties(response.data.total); // Met à jour l'état avec le total récupéré
      } catch (error) {
        console.error('Erreur lors de la récupération du total des produits :', error);
      }
    };
  
    fetchTotalProducts(); // Appel de la fonction pour récupérer le total
  }, []); // Exécuté uniquement au montage
  
  
  
  
  
  
  

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        console.log("Filtres envoyés :", filters); // DEBUG
        const params = {
          transactionType: "rent", // ✅ Toujours récupérer uniquement les locations
          address: filters.address?.trim() !== "" ? filters.address : undefined, // Filtrer par adresse si elle est sélectionnée
          minPrice: filters.priceRange ? filters.priceRange[0] : undefined,
          maxPrice: filters.priceRange ? filters.priceRange[1] : undefined,
        };
  
        const response = await axios.get("https://keurgui.onrender.com/api/filtre", { params });
        console.log("Réponse reçue :", response.data); // DEBUG
        setProperties(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des propriétés :", error);
      }
    };
  
    fetchProperties(); // Exécuter la requête API
  }, [filters]); // 🔥 Se rafraîchit uniquement quand les filtres changent
  


  
  
  
    

  




  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await axios.get("https://keurgui.onrender.com/api/products/prix", {
          params: {
            minPrice: priceRange ? priceRange[0] : 0,
            maxPrice: priceRange ? priceRange[1] : 10000,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    if (priceRange) {
      fetchFilteredProducts();
    }
  }, [priceRange]);
  const handleTransactionChange = (event) => {
    const selectedValue = event.target.value;

    // Naviguer vers la route correspondante
    if (selectedValue === "sale") {
      navigate("/vendre");
    } else if (selectedValue === "rent") {
      navigate("/louer");
    }
  };
  const [isOpen, setIsOpen] = useState(false); // État pour ouvrir/fermer le dropdown
  const dropdownRef = useRef(null); // Référence au menu déroulant

  const handleOptionClick = (route) => {
    setIsOpen(false); // Ferme le dropdown après le clic
    navigate(route); // Redirige vers la page correspondante
  };

  // const handleClickOutside = (event) => {
  //   // Vérifie si le clic est en dehors du menu déroulant
  //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //     setIsOpen(false); // Ferme le menu
  //   }
  // };

  useEffect(() => {
    // Ajoute un écouteur d'événements global pour détecter les clics
    document.addEventListener("mousedown", handleClickOutside);

    // Nettoie l'écouteur d'événements lors du démontage
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClickk = (route) => {
    setIsOpen(false); // Ferme le dropdown après le clic
    navigate(route); // Redirige vers la page correspondante
  };

  const [isResidentialOpen, setIsResidentialOpen] = useState(false); // État pour le dropdown Résidentiel
const [isRentOpen, setIsRentOpen] = useState(false); // État pour le dropdown Louer

const residentialDropdownRef = useRef(null);
const rentDropdownRef = useRef(null);

const handleResidentialClick = () => {
  setIsResidentialOpen(!isResidentialOpen);
  setIsRentOpen(false); // Fermer le dropdown Louer si ouvert
};

const handleRentClick = () => {
  setIsRentOpen(!isRentOpen);
  setIsResidentialOpen(false); // Fermer le dropdown Résidentiel si ouvert
};

const handleClickOutside = (event) => {
  if (
    residentialDropdownRef.current &&
    !residentialDropdownRef.current.contains(event.target)
  ) {
    setIsResidentialOpen(false);
  }
  if (
    rentDropdownRef.current &&
    !rentDropdownRef.current.contains(event.target)
  ) {
    setIsRentOpen(false);
  }
};

useEffect(() => {
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


// -------------------------trie--------------------




const fetchSortedProducts = async () => {
  setLoading(true);
  try {
    const response = await axios.get('https://keurgui.onrender.com/api/sorts', {
      params: { sort: sortMethod },
    });
    setProducts(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits triés :", error);
  } finally {
    setLoading(false);
  }
};

// Appel de l'API à chaque changement de méthode de tri
useEffect(() => {
  fetchSortedProducts();
}, [sortMethod]);

// Gestion des clics en dehors du dropdown
useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

// Gestion du changement de méthode de tri
const handleSortChange = (method) => {
  setSortMethod(method);
  setIsDropdownOpen(false); // Fermer le dropdown après sélection
};
// ----------------------------filtre-------------------------

const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  
  const handleToggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };
const [isPropertyTypeOpen, setIsPropertyTypeOpen] = useState(false); // État pour afficher les cases à cocher

  const handleTogglePropertyType = () => {
    setIsPropertyTypeOpen(!isPropertyTypeOpen);
  };
  const [isCharacteristicsOpen, setIsCharacteristicsOpen] = useState(false); // État pour afficher les caractéristiques

  const handleToggleCharacteristics = () => {
    setIsCharacteristicsOpen(!isCharacteristicsOpen);
  };

  const [isBuildingOpen, setIsBuildingOpen] = useState(false); // État pour afficher les détails du bâtiment
  
    const handleToggleBuilding = () => {
      setIsBuildingOpen(!isBuildingOpen);
    };

     const [isOtherCriteriaOpen, setIsOtherCriteriaOpen] = useState(false); // État pour afficher les autres critères

      const handleToggleOtherCriteria = () => {
        setIsOtherCriteriaOpen(!isOtherCriteriaOpen);
      };

      const handleFilterChange = (type) => {
          setSelectedPropertyTypes((prevTypes) =>
            prevTypes.includes(type)
              ? prevTypes.filter((t) => t !== type) // Retire le type si déjà sélectionné
              : [...prevTypes, type] // Ajoute le type s'il n'est pas déjà sélectionné
          );
        };
        
      
       
        const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);
        
        
        const handleCharacteristicsChange = (event) => {
          const value = event.target.value;
          setSelectedCharacteristics((prev) =>
            prev.includes(value)
              ? prev.filter((item) => item !== value)
              : [...prev, value]
          );
        };
        const [selectedStructureTypes, setSelectedStructureTypes] = useState([]); // 🔥 Déclaration ici
      
        const handlePropertyTypeChange = (type) => {
          setSelectedPropertyTypes((prevTypes) =>
            prevTypes.includes(type)
              ? prevTypes.filter((t) => t !== type)
              : [...prevTypes, type]
          );
        };
        const handleStructureTypeChange = (event) => {
          const value = event.target.value;
          setSelectedStructureTypes((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
          );
        };
      
        const handleSearch = () => {
          let searchTerms = [];
        
          if (selectedPropertyTypes.length > 0) {
            searchTerms.push(`types=${selectedPropertyTypes.join(",")}`);
          }
        
          if (selectedStructureTypes.length > 0) {
            searchTerms.push(`structureTypes=${selectedStructureTypes.join(",")}`);
          }
        
          // Si aucun filtre n'est appliqué, passer "all"
          const searchQuery = searchTerms.length > 0 ? searchTerms.join("&") : "all";
        
          // Encoder pour éviter les erreurs d'URL
          const targetUrl = `/resultss/${encodeURIComponent(searchQuery)}`;
        
          console.log("🔍 Naviguer vers :", targetUrl);
          navigate(targetUrl);
        };
        
        const handleSearch1 = () => {
          let searchTerms = [];
        
          // 🔹 Superficie du terrain
          if (minLotSize) {
            searchTerms.push(`minLotSize=${minLotSize}`);
          }
          if (maxLotSize) {
            searchTerms.push(`maxLotSize=${maxLotSize}`);
          }
        
          // 🔹 Date d'ajout
          if (minDate) {
            searchTerms.push(`minDate=${minDate}`);
          }
        
          // 🔥 Si aucun critère avancé n'est sélectionné, passer "all"
          const searchQuery = searchTerms.length > 0 ? searchTerms.join("&") : "all";
        
          // 🔹 Encoder l'URL et naviguer vers `ResultsPage`
          const targetUrl = `/results/${encodeURIComponent(searchQuery)}`;
        
          console.log("🔍 URL générée :", targetUrl);
          navigate(targetUrl);
        };
        
        const handleResetFilters = () => {
          setSelectedPropertyTypes([]); // Réinitialiser les types d'habitat sélectionnés
          setSelectedStructureTypes([]); // Réinitialiser les caractéristiques
          setMinLotSize(""); // Réinitialiser la superficie minimale
          setMaxLotSize(""); // Réinitialiser la superficie maximale
          setMinDate(""); // Réinitialiser la date minimale
        };
       

        const filteredProducts = products.filter((product) => {
          // 🔥 Toujours afficher uniquement les propriétés à louer
          const isTransactionTypeValid = product.transactionType === "rent";
        
          // 🔥 Vérifie si une adresse est sélectionnée
          const isAddressValid =
            filters.address && filters.address.trim() !== ""
              ? product.address.toLowerCase().includes(filters.address.toLowerCase())
              : true; // ✅ Affiche tout si aucune adresse sélectionnée
        
          // 🔥 Vérifie si le prix est dans la plage sélectionnée
          const isPriceValid =
            filters.priceRange
              ? product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
              : true; // ✅ Affiche tout si aucun filtre de prix
        
          return isTransactionTypeValid && isAddressValid && isPriceValid;
        });
        
        // Trier ensuite les produits filtrés
        const filteredAndSortedProducts = [...filteredProducts].sort((a, b) => {
          if (sortMethod === "price_asc") {
            return a.price - b.price;
          } else if (sortMethod === "price_desc") {
            return b.price - a.price;
          } else {
            return new Date(b.publicationDate) - new Date(a.publicationDate); // Par défaut : tri par date récente
          }
        });
        

        

 	return(
		
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
										placeholder="Chercher par ville, quartier, région, adresse ou N° Keurgui"
										value={query}
										onChange={(e) => setQuery(e.target.value)}
										className="input-style"
										
										/>
										 {/* Résultats de la recherche prédictive sous forme de cartes */}
 				

										{/* Catégorie */}
                    {/* Dropdown Résidentiel */}
<div ref={residentialDropdownRef} style={{ position: "relative", display: "inline-block" }}>
  <button
    onClick={handleResidentialClick}
    style={{
      padding: "10px 20px",
      backgroundColor: "white",
      color: "black",
      border: "none",
      borderRadius: "30px", // Ajout d'une bordure arrondie
      cursor: "pointer",
      display: "flex",
      border: "1px solid #ddd",
      alignItems: "center",
      gap: "10px", // Espace entre le texte et l'icône
    }}
  >
    Résidentiel
    <span
  style={{
    transform: isResidentialOpen ? "rotate(180deg)" : "rotate(0deg)",
    fontWeight: "300", // Plus léger
    fontSize: "12px", // Plus petit
    lineHeight: "1", // Ajuster la hauteur de ligne
  }}
>
  ▼
</span>
    </button>
  {isResidentialOpen && (
    <ul
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        backgroundColor: "white",
        padding: "10px",
        border: "1px solid #ddd",
        zIndex: 1000,
        listStyleType: "none", // Supprime les points
      }}
    >
      <li onClick={() => handleOptionClick("/residential")}>Résidentiel</li>
      <li onClick={() => handleOptionClick("/commercial")}>Commercial</li>
    </ul>
  )}
</div>
										{/* Type de transaction */}
                    <div ref={rentDropdownRef} style={{ position: "relative", display: "inline-block" }}>
  <button
    onClick={handleRentClick}
    style={{
      padding: "10px 20px",
      backgroundColor: "white",
      color: "black",
      border: "none",
      borderRadius: "30px", // Ajout d'une bordure arrondie
      cursor: "pointer",
      display: "flex",
      border: "1px solid #ddd",
      alignItems: "center",
      gap: "10px", // Espace entre le texte et l'icône
    }}
  >
    Louer
    <span
  style={{
    transform: isResidentialOpen ? "rotate(180deg)" : "rotate(0deg)",
    fontWeight: "300", // Plus léger
    fontSize: "12px", // Plus petit
    lineHeight: "1", // Ajuster la hauteur de ligne
  }}
>
  ▼
</span>
  </button>
  {isRentOpen && (
    <ul
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        backgroundColor: "white",
        padding: "10px",
        border: "1px solid #ddd",
        zIndex: 1000,
        listStyleType: "none", // Supprime les points
      }}
    >
      <li onClick={() => handleOptionClick("/louer")}>À louer</li>
      <li onClick={() => handleOptionClick("/vendre")}>À vendre</li>
    </ul>
  )}
</div>

																			{/* Prix */}
										{/* Prix */}
                    <button
  className="filter"
  style={{
    borderRadius: '20px',
    width: '120px',
    height: '43px',
    border: '1px solid gray', // Bordure grise ajoutée
  }}
  onClick={() => setIsPriceFilterOpen(!isPriceFilterOpen)}
>
  Prix
  {/* : {priceRange[0]} $ - {priceRange[1]} $ */}
</button>



            {isPriceFilterOpen && (
              <div className="price-filter-card" style={{ marginTop: "15px", marginRight: "-10px" }} >
                <h4>Prix</h4>
                <Slider
                  range
                  value={priceRange}
                  min={0}
                  max={10000}
                  step={100}
                  onChange={(value) => setPriceRange(value)}
                />
                <div className="price-inputs">
                  <div className="price-input">
                    <span>{priceRange[0].toLocaleString()} FCFA</span>
                  </div>
                  <div className="price-input">
                    <span>{priceRange[1].toLocaleString()} FCFA+</span>
                  </div>
                </div>
                <div className="filter-buttons">
                  <button
                    className="close-button"
                    onClick={() => setIsPriceFilterOpen(false)}
                  >
                    Fermer
                  </button>
                  <button
  className="apply-button"
  onClick={handleApplyFilter} // Assurez-vous que la fonction est correcte
>
  Appliquer
</button>

                </div>
              </div>
            )}



										{/* Filtres */}
                    <button
  className="button-style" style={{
    color: 'black', // Texte en noir
  }}
  
  onClick={handleToggleFilterModal}
>
  Filtres
</button>


      {/* Modal pour les filtres */}
      {isFilterModalOpen && (
        <div className="filter-modal" style={{ marginTop: '-260px', marginLeft: '200px' }}>
          {/* <h4 className="filter-modal-title">Filtres</h4> */}
          <div className="filter-options">
          <div className="filter-item">
            <div className="filter-item-header">
              <span className="filter-item-title">Type d'habitat</span>
              <button
                className="expand-button"
                onClick={handleTogglePropertyType}
              >
                {isPropertyTypeOpen ? "-" : "+"}
              </button>
            </div>
            {isPropertyTypeOpen && (
              <div className="checkbox-group">
                <div>
                <label>
    <input
      type="checkbox"
      value="appartement"
      onChange={() => handlePropertyTypeChange("appartement")}
      checked={selectedPropertyTypes.includes("appartement")}
    />
    Appartement
  </label>
                          <label>
                            <input
                              type="checkbox"
                              onChange={() => handleFilterChange("bureau_commerce")}
                              checked={selectedPropertyTypes.includes("bureau_commerce")}
                            />
                            Bureau / Commerce
                          </label>

                          <label>
                            <input
                              type="checkbox"
                              onChange={() => handleFilterChange("hotel_restaurant")}
                              checked={selectedPropertyTypes.includes("hotel_restaurant")}
                            />
                            Hotel / Restaurant
                          </label>
                  
                </div>
                <div>
                <label>
                            <input
                              type="checkbox"
                              onChange={() => handleFilterChange("studio_chambre")}
                              checked={selectedPropertyTypes.includes("studio_chambre")}
                            />
                            Studio / Chambre
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              onChange={() => handleFilterChange("villa_maison")}
                              checked={selectedPropertyTypes.includes("villa_maison")}
                            />
                            Villa / Maison
                          </label>
                  <label>
                            <input
                              type="checkbox"
                              onChange={() => handleFilterChange("terrain")}
                              checked={selectedPropertyTypes.includes("terrain")}
                            />
                            Terrain
                          </label>

                  
                </div>
              </div>
            )}
          </div>
          <div className="filter-item">
            <div className="filter-item-header">
              <span className="filter-item-title">Caractéristiques</span>
              <button
                className="expand-button"
                onClick={handleToggleCharacteristics}
              >
                {isCharacteristicsOpen ? "-" : "+"}
              </button>
            </div>
            {isCharacteristicsOpen && (
              <div className="characteristics-content">
                {/* Menus déroulants */}
               

                {/* Cases à cocher */}
                {isCharacteristicsOpen && (
            <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                value="Bord de l'eau"
                checked={selectedStructureTypes.includes("Bord de l'eau")}
                onChange={handleStructureTypeChange}
              />
              Bord de l'eau
            </label>
            <label>
              <input
                type="checkbox"
                value="Accès à l'eau"
                checked={selectedStructureTypes.includes("Accès à l'eau")}
                onChange={handleStructureTypeChange}
              />
              Accès à l'eau
            </label>
            <label>
              <input
                type="checkbox"
                value="Plan d'eau navigable"
                checked={selectedStructureTypes.includes("Plan d'eau navigable")}
                onChange={handleStructureTypeChange}
              />
              Plan d'eau navigable
            </label>
            <label>
              <input
                type="checkbox"
                value="Villégiature"
                checked={selectedStructureTypes.includes("Villégiature")}
                onChange={handleStructureTypeChange}
              />
              Villégiature
            </label>
          </div>
          
          )}

              </div>
            )}
          </div>
        
          <div className="filter-item">
  <div className="filter-item-header">
    <span className="filter-item-title">Autres Critères</span>
    <button
      className="expand-button"
      onClick={handleToggleOtherCriteria}
    >
      {isOtherCriteriaOpen ? "-" : "+"}
    </button>
  </div>

  {isOtherCriteriaOpen && (
    <div className="other-criteria-content">
      {/* Superficie du terrain */}
      <div className="criteria-inputs">
        <label>
          Superficie du terrain (m²)
          <div className="input-group">
            <input
              type="number"
              placeholder="Min (m²)"
              value={minLotSize}
              onChange={(e) => setMinLotSize(e.target.value)}
              className="input-box"
            />
            <span>à</span>
            <input
              type="number"
              placeholder="Max (m²)"
              value={maxLotSize}
              onChange={(e) => setMaxLotSize(e.target.value)}
              className="input-box"
            />
          </div>
        </label>
      </div>

      {/* Date d'ajout */}
      <div className="criteria-dates">
        <label>
          Nouveau depuis
          <div className="input-group">
            <input
              type="date"
              value={minDate}
              onChange={(e) => setMinDate(e.target.value)}
              className="input-box"
            />
            <span className="calendar-icon">📅</span>
          </div>
        </label>
      </div>
    </div>
  )}
</div>

          </div>
          <div className="filter-actions">
          <button 
            className="filter-button-common reset-button"
            onClick={handleResetFilters} // Ajout de l'événement onClick
          >
            Réinitialiser
          </button>
            <button className="filter-button-common close-button" onClick={handleToggleFilterModal}>
              Fermer
            </button>
          </div>
          <br/>
          <button
  className="search-btton"
  onClick={() => {
    if (selectedPropertyTypes.length > 0 || selectedStructureTypes.length > 0) {
      handleSearch(); // 🔹 Exécuter seulement si des types d'habitat ou caractéristiques sont sélectionnés
    }

    if (minLotSize || maxLotSize || minDate) {
      handleSearch1(); // 🔹 Exécuter seulement si des critères avancés sont sélectionnés
    }
  }}
  style={{
    backgroundColor: "blue",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  Rechercher
</button>



        </div>
      )}



										{/* Style de vie */}
										{/* <button
										className="button-style"
										onClick={() => alert("Ouvrir les options de style de vie")}
										>
										Style de vie ({lifestyleFilters})
										</button> */}
									</div>
									</div>
									
									{query.length >= 3 && (
  <>
    {suggestions.length > 0 ? (
      <div className="search-results-container">
        {suggestions.map((item, index) => (
          <div
            key={index}
            className="result-card"
            onClick={() => handleCardClick(item)} // Action sur clic
          >
            <div className="result-card-content">
              <h5>{item}</h5>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="search-results-container">
        <div className="result-card">
          <div className="result-card-content">
            <h5 style={{ color: "red" }}>Aucun Résultat</h5>
          </div>
        </div>
      </div>
    )}
  </>
)}

									 {/* Barre des onglets */}
									 <div className="tabs-container">
										<div className="tabs">
				<Link to="/galerie" className={`tab-button ${activeTab === 'galerie' ? 'active' : ''}`} onClick={() => handleTabClick('galerie')}>
					<FontAwesomeIcon icon={faImages} /> Galerie
				</Link>
				<Link to="/carte" className={`tab-button ${activeTab === 'carte' ? 'active' : ''}`} onClick={() => handleTabClick('carte')}>
					<FontAwesomeIcon icon={faMapMarkedAlt} /> Carte
				</Link>
				<Link to="/louer" className={`tab-button ${activeTab === 'sommaire' ? 'active' : ''}`} onClick={() => handleTabClick('sommaire')}>
                  <FontAwesomeIcon icon={faListAlt} /> Sommaire
                </Link>
				<div className="tab-indicator" style={{ left: `${getIndicatorPosition(activeTab)}%` }}></div>
				</div>

                {/* Nombre de propriétés trouvées */}
                <span className="properties-found">
  {totalProperties.toLocaleString()} produits trouvés
</span>

                {/* Trier par */}
                <div style={{ position: "relative", display: "inline-block" }}>
  <button
    onClick={() => setIsOpen(!isOpen)}
    style={{
      padding: "10px 20px",
      backgroundColor: "white",
      color: "black",
      border: "1px solid #ddd",
      borderRadius: "20px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "200px", // Largeur fixe
    }}
  >
    {sortMethod === "recent"
      ? "Publication récente"
      : sortMethod === "price_asc"
      ? "Prix croissant"
      : "Prix décroissant"}
    <span
      style={{
        marginLeft: "10px",
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        fontWeight: "300",
        fontSize: "12px",
      }}
    >
      ▼
    </span>
  </button>
  {isOpen && (
    <ul
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        backgroundColor: "white",
        listStyleType: "none",
        padding: "10px",
        margin: 0,
        border: "1px solid #ddd",
        zIndex: 1000,
        borderRadius: "10px",
        width: "200px",
      }}
    >
      <li
        style={{
          padding: "10px",
          cursor: "pointer",
          borderBottom: "1px solid #ddd",
        }}
        onClick={() => {
          setSortMethod("recent");
          setIsOpen(false);
        }}
      >
        Publication récente
      </li>
      <li
        style={{
          padding: "10px",
          cursor: "pointer",
          borderBottom: "1px solid #ddd",
        }}
        onClick={() => {
          setSortMethod("price_asc");
          setIsOpen(false);
        }}
      >
        Prix croissant
      </li>
      <li
        style={{
          padding: "10px",
          cursor: "pointer",
        }}
        onClick={() => {
          setSortMethod("price_desc");
          setIsOpen(false);
        }}
      >
        Prix décroissant
      </li>
    </ul>
  )}
</div>


            </div>

            {/* Pagination */}
            <div className="pagination-container">
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                >
                    «
                </button>
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    ‹
                </button>
                <span className="pagination-info">
                    {currentPage} / {Math.ceil(totalProperties / propertiesPerPage)}
                </span>
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(totalProperties / propertiesPerPage)}
                >
                    ›
                </button>
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(Math.ceil(totalProperties / propertiesPerPage))}
                    disabled={currentPage === Math.ceil(totalProperties / propertiesPerPage)}
                >
                    »
                </button>
            </div>
            <div className="row">
  {filteredAndSortedProducts.length > 0 ? (
    filteredAndSortedProducts.map((product) => (
      <div key={product._id} className="col-lg-3 col-sm-6 col-12">
              <img
                src={product.images[0] || "/path/to/default-image.jpg"}
                alt={product.title}
                className="property-image"
                onClick={() => navigate(`/product/${product._id}`)}
              />
              {/* Superposition "Vendu" si le statut est "sold" */}
              {product.status === "rented" && <div className="status-overlay">Loue</div>}
        
              {/* Icône avec le nombre de photos */}
              <div
                className="icon-wrapper"
                onClick={() => navigate(`/property-images/${product._id}`)} // Redirection vers les images
              >
                <FontAwesomeIcon icon={faCamera} className="photo-icon" />
                <span className="photo-count">
                  {product.images ? product.images.length : 0}
                </span>
              </div>
        
              {/* Icône cœur */}
              <div
        className="heart-icon-wrapper"
        onClick={() => handleFavoriteClick(product)}
      >
        <FontAwesomeIcon
          icon={faHeart}
          style={{
            color: favorites.includes(product._id) ? "red" : "#ccc",
          }}
        />
        {activeProductId === product._id && (
          <div className="login-card">
            <p>Connectez-vous pour ajouter aux favoris</p>
            <button onClick={() => navigate('/login')}>Se connecter</button>
          </div>
        )}
      </div>
      
      
        
              {/* Détails de la propriété */}
              <div className="property-details">
                <h6>{product.price?.toLocaleString()} FCfa</h6>
                <h6>{product.title}</h6>
                <p>
                  {product.address}, {product.city}
                </p>
                <div className="property-features">
                  <span>
                    <FontAwesomeIcon icon={faBed} className="fa-bed" />{" "}
                    {product.features?.bedrooms || 0}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faBath} className="fa-bath" />{" "}
                    {product.features?.bathrooms || 0}
                  </span>
                </div>
              </div>
            </div>
    ))
  ) : (
    <p style={{ textAlign: "center", color: "red", fontSize: "18px", marginTop: "20px" }}>
      ❌ Aucune propriété disponible à la location.
    </p>
  )}
</div>


									{/* ltn__product-item */}
									




								
									</div>
								</div>
								</div>
								
							</div>
							
							</div>
						</div>
				</div>
			</div>
						
			


			</div>
			)
			function getIndicatorPosition(tab) {
				switch (tab) {
				  case 'galerie':
					return 0;
				  case 'carte':
					return 33.33;
				  case 'sommaire':
					return 66.66;
				  default:
					return 0;
				}
			  }
        
}

export default ShopGridV2