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
import Modal from 'react-modal';
import Slider from "rc-slider";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import '../section-components/filterprix.css';
import { useLocation } from "react-router-dom";
const  ShopGridV1= () => {
	const [products, setProducts] = useState([]);
  const [sortMethod, setSortMethod] = useState("relevance"); // Valeur par défaut
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const productsPerPage = 12; // Nombre de produits par page
	const navigate = useNavigate(); // Hook pour naviguer
  const [showLoginCard, setShowLoginCard] = useState(false);

  const [totalProperties, setTotalProperties] = useState(0);

	// const [totalProperties, setTotalProperties] = useState(60992);
	const [activeTab, setActiveTab] = useState('galerie');
	const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");
	const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false); // État pour ouvrir/fermer la carte
	const [loading, setLoading] = useState(false);
  
const [priceRange, setPriceRange] = useState([]); // Plage de prix appliquée (vide au début)
const [tempPriceRange, setTempPriceRange] = useState([0, 10000]); // Plage temporaire pour le slider



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


        let publicUrl = process.env.PUBLIC_URL+'/'

        const handleCardClick = async (item) => {
          try {
            // Utiliser navigate directement sans .push
            navigate(`/results?location=${encodeURIComponent(item)}`);
          } catch (error) {
            console.error("Erreur lors de la redirection :", error);
          }
        };
        

		//   ---------------------------nouv--------------
		
      
    const handleTransactionChange = (event) => {
      const selectedValue = event.target.value;
  
      // Naviguer vers la route correspondante
      if (selectedValue === "sale") {
        navigate("/vendre");
      } else if (selectedValue === "rent") {
        navigate("/louer");
      }
    };
    
		//   ----------------------------------------
		
    
    
      
      
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
      setActiveProductId(product._id); // Définit le produit actif
      setTimeout(() => setActiveProductId(null), 3000); // Cache la carte après 3 secondes
      return;
    }
    toggleFavorite(product._id); // Ajoute ou retire des favoris si connecté
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
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          params: {
            transactionType: "sale", // Filtre par type de transaction
            minPrice: priceRange[0], // Filtre par prix minimum
            maxPrice: priceRange[1], // Filtre par prix maximum
          },
        });
        setProducts(response.data); // Met à jour l'état avec les données reçues
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };
  
    fetchProducts();
  }, [priceRange, sortMethod]); // Recharger à chaque changement des filtres ou du tri
   // Rechargement à chaque changement de méthode de tri
   useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        let allProducts = [];
        let page = 1;
        let hasMore = true;
  
        while (hasMore) {
          const response = await axios.get("http://localhost:5000/api/products", {
            params: {
              page,
              limit: 10, // Limite par page définie dans le backend
              transactionType: "sale",
            },
          });
  
          allProducts = [...allProducts, ...response.data.products];
          hasMore = response.data.products.length > 0; // Vérifiez s'il reste des produits
          page += 1; // Passez à la page suivante
        }
  
        setProducts(allProducts);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };
  
    fetchAllProducts();
  }, []);

 

  // const filteredProducts = products.filter((product) => {
  //   return product.transactionType === "sale"; // Filtrer uniquement par type de transaction
  // });
  
  // Slider et boutons de la carte de filtre par prix


// Fonction pour appliquer le filtre
const handleApplyFilter = async () => {
  try {
    setPriceRange(tempPriceRange); // Applique tempPriceRange à priceRange
    const response = await axios.get('http://localhost:5000/api/products', {
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

const filteredProduct = products.filter((product) => {
  // Vérifie si le produit est à vendre
  const isTransactionTypeValid = product.transactionType === "sale";

  // Si priceRange est défini, appliquez le filtre de prix
  const isPriceValid =
    priceRange.length === 2 // Vérifie que priceRange contient deux valeurs
      ? product.price >= priceRange[0] && product.price <= priceRange[1]
      : true; // Si priceRange est vide, ne filtre pas par prix

  return isTransactionTypeValid && isPriceValid;
});


  
 
  
const handleSortChange = (e) => {
  setSortMethod(e.target.value); // Met à jour la méthode de tri
};


  // Produits affichés pour la page actuelle
  const currentProducts = filteredProduct.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const totalPages = Math.ceil(filteredProduct.length / productsPerPage);

  // Gestion du changement de page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
useEffect(() => {
  setTotalProperties(filteredProduct.length); // Met à jour le total des propriétés filtrées
}, [filteredProduct]);

  // ------------------------------------------------------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };
    fetchProducts();
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false);



  const closeModal = () => {
    setIsModalOpen(false);
  };
  const location = useLocation();
  const filters = location.state || {}; // Récupère les filtres transmis
  useEffect(() => {
    // Récupérer les données filtrées à partir du backend
    const fetchFilteredProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          params: {
            transactionType: "sale", // Fixe pour "À vendre"
            address: filters.address || undefined,
            minPrice: filters.priceRange ? filters.priceRange[0] : undefined,
            maxPrice: filters.priceRange ? filters.priceRange[1] : undefined,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    fetchFilteredProducts();
  }, [filters]); // Exécute cet effet à chaque mise à jour des filtres

  
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
										<select className="select-style" onChange={handleTransactionChange} >
                
                
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
  value={tempPriceRange} // Utiliser l'état temporaire
  min={0}
  max={10000}
  step={100}
  onChange={(value) => setTempPriceRange(value)} // Mettre à jour uniquement tempPriceRange
/>
<div className="price-inputs">
  <div className="price-input">
    <span>{tempPriceRange[0].toLocaleString()} FCFA</span> {/* Affiche la plage temporaire */}
  </div>
  <div className="price-input">
    <span>{tempPriceRange[1].toLocaleString()} FCFA+</span>
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
    onClick={handleApplyFilter} // Appliquer les filtres
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
          {currentPage} / {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ›
        </button>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>

									{/* ltn__product-item */}
                  <div className="row">
    {currentProducts.map((product) => (
      <div key={product._id} className="col-lg-3 col-sm-6 col-12">
        <img
          src={product.images[0] || "/path/to/default-image.jpg"}
          alt={product.title}
          className="property-image"
          onClick={() => navigate(`/product/${product._id}`)}
        />
        {/* Superposition "Vendu" si le statut est "sold" */}
        {product.status === "sold" && <div className="status-overlay">Vendu</div>}
  
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
			<Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Connexion requise"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Connexion requise</h2>
        <p>Vous devez être connecté pour ajouter des propriétés à vos favoris.</p>
        <button onClick={() => navigate('/login')}>Se connecter</button>
        <button onClick={closeModal}>Annuler</button>
      </Modal>	
			


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

export default ShopGridV1
