import React, { Component} from 'react';
import { useState, useEffect } from 'react';
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

const  ShopGridV2= () => {
	const [products, setProducts] = useState([]);
  const [sortMethod, setSortMethod] = useState("relevance"); // Valeur par défaut

	const navigate = useNavigate(); // Hook pour naviguer
	const propertiesPerPage = 250;
	const [currentPage, setCurrentPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);

	// const [totalProperties, setTotalProperties] = useState(60992);
	const [activeTab, setActiveTab] = useState('galerie');
	const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");
	const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false); // État pour ouvrir/fermer la carte
	const [loading, setLoading] = useState(false);
  const [tempPriceRange, setTempPriceRange] = useState([0, 10000]); // Plage temporaire
const [priceRange, setPriceRange] = useState([0, 10000]); // Plage appliquée


  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]); // Ne pas faire de requêtes si l'entrée est trop courte
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/search-predictive', {
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
		  const response = await axios.get('http://localhost:5000/api/products');  // URL de votre backend
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
			//   navigate(`/results/${encodeURIComponent(item)}`); 
			  navigate(`/results?location=${encodeURIComponent(item)}`);
			} catch (error) {
			  console.error("Erreur lors de la redirection :", error);
			}
		  };

		//   ---------------------------nouv--------------
		const handleNavigation = (type) => {
			console.log('Navigation vers :', type);
		
			if (type === 'À vendre') {
			  navigate('/vendre');
			} else if (type === 'À louer') {
			  navigate('/louer');
			}
		  };
      const handleTransactionChange = (event) => {
        const selectedType = event.target.value;
        console.log("Transaction Type sélectionné :", selectedType);
    
        if (selectedType === "sale") {
          navigate("/vendre");
        } else if (selectedType === "rent") {
          navigate("/louer");
        } else if (selectedType === "buy") {
          navigate("/acheter");
        } else {
          console.error("Transaction type inconnu :", selectedType);
        }
      };

		//   ----------------------------------------
		const handleSliderChange = (value) => {
			setPriceRange(value); // Met à jour la plage sélectionnée
		  };
      const handleApplyFilter = async () => {
        try {
          setPriceRange(tempPriceRange); // Appliquer les valeurs temporaires
          const response = await axios.get('http://localhost:5000/api/products', {
            params: {
              minPrice: tempPriceRange[0], // Utiliser la plage temporaire
              maxPrice: tempPriceRange[1],
            },
          });
          setProducts(response.data); // Mettre à jour les produits filtrés
          console.log("Produits filtrés :", response.data); // Debug
          setIsPriceFilterOpen(false); // Fermer le filtre
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
        const response = await axios.get('http://localhost:5000/api/products/count'); // Utilisez le bon chemin
        setTotalProperties(response.data.total); // Met à jour l'état avec le total récupéré
      } catch (error) {
        console.error('Erreur lors de la récupération du total des produits :', error);
      }
    };
  
    fetchTotalProducts(); // Appel de la fonction pour récupérer le total
  }, []); // Exécuté uniquement au montage
  
  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          params: {
            sort: sortMethod, // Tri basé sur la méthode sélectionnée
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    fetchProducts();
  }, [sortMethod]); // Rechargement à chaque changement de méthode de tri

 

  const filteredProducts = products.filter((product) => {
    return (
      product.transactionType === "rent" && // Filtrer par type de transaction
      product.price >= priceRange[0] && // Minimum de la plage de prix
      product.price <= priceRange[1] // Maximum de la plage de prix
    );
  });
  
  const filteredAndSortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortMethod) {
      case "recent":
        return new Date(b.createdAt) - new Date(a.createdAt); // Trier par date décroissante
      case "price_asc":
        return a.price - b.price; // Trier par prix croissant
      case "price_desc":
        return b.price - a.price; // Trier par prix décroissant
      default:
        return 0; // Pas de tri
    }
  });
  
const handleSortChange = (e) => {
  setSortMethod(e.target.value); // Met à jour la méthode de tri
};

  
  
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
										<select
										value={category}
										onChange={(e) => setCategory(e.target.value)}
										className="select-style"
										>
										<option value="Résidentiel">Résidentiel</option>
										<option value="Commercial">Commercial</option>
										
										</select>

										{/* Type de transaction */}
										<select  onChange={handleTransactionChange} className="select-style">
                    <option value="sale" style={{ color: "black" }}>
        À vendre
      </option>
      <option value="rent" style={{ color: "black" }}>
        À louer
      </option>
      
										</select>
																			{/* Prix */}
										{/* Prix */}
										<button
              className="filter" style={{ borderRadius: '20px', width: '120px', height: '43px' }}
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
                    <span>{priceRange[0].toLocaleString()} $</span>
                  </div>
                  <div className="price-input">
                    <span>{priceRange[1].toLocaleString()} $+</span>
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
				<Link to="/sommaire" className={`tab-button ${activeTab === 'sommaire' ? 'active' : ''}`} onClick={() => handleTabClick('sommaire')}>
					<FontAwesomeIcon icon={faListAlt} /> Sommaire
				</Link>
				<div className="tab-indicator" style={{ left: `${getIndicatorPosition(activeTab)}%` }}></div>
				</div>

                {/* Nombre de propriétés trouvées */}
                <span className="properties-found">
  {totalProperties.toLocaleString()} produits trouvés
</span>

                {/* Trier par */}
                <select className="sort-dropdown" value={sortMethod} onChange={handleSortChange}>
  <option value="relevance">Trier par pertinence</option>
  <option value="recent">Publication récente</option>
  <option value="price_asc">Prix croissant</option>
  <option value="price_desc">Prix décroissant</option>
</select>

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

									{/* ltn__product-item */}
									<div className="row">
  {filteredAndSortedProducts.map((product) => (
    <div key={product._id} className="col-lg-3 col-sm-6 col-12">
      <img
        src={product.images[0] || "/path/to/default-image.jpg"}
        alt={product.title}
        className="property-image"
        onClick={() => navigate(`/product/${product._id}`)}
      />
      {/* Superposition "Vendu" si le statut est "sold" */}
      {product.status === "rented" && (
  <div
    className="status-overlay"
    style={{
      backgroundColor: "red",
      color: "white",
      padding: "5px 10px",
      borderRadius: "15px",
      fontWeight: "bold",
      position: "absolute",
      top: "10px",
      left: "10px",
      zIndex: "10",
    }}
  >
    Loue
  </div>
)}

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
        onClick={() => {
          if (!isLoggedIn) {
            setActiveProductId(product._id); // Définit le produit actif pour afficher la modal
          } else {
            toggleFavorite(product._id); // Ajoute ou retire des favoris si connecté
          }
        }}
      >
        <FontAwesomeIcon
          icon={faHeart}
          style={{
            color: favorites.includes(product._id) ? "red" : "#ccc",
          }}
        />
      </div>

      {/* Détails de la propriété */}
      <div className="property-details">
        <h6>{product.price?.toLocaleString()}  FCFA</h6>
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