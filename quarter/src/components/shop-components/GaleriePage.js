import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../global-components/navbar-v2';
import MarkerClusterGroup from 'react-leaflet-cluster';
import ReactDOM from 'react-dom';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faCamera, faImages, faMapMarkedAlt, faListAlt,faHeart} from '@fortawesome/free-solid-svg-icons'; // Importation des icônes
import { useFavorites } from '../global-components/FavoritesContext';
import './shop-grid.css';
import './PropertyList.css';
import { useMapEvent } from 'react-leaflet';

import Slider from "rc-slider";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import '../section-components/filterprix.css';
import ClusterPopupContent from './ClusterPopupContent';
// Icône personnalisée pour les clusters et marqueurs individuels
const createCustomIcon = (text) => {
  let publicUrl = process.env.PUBLIC_URL+'/'

  return new L.DivIcon({
    html: `
      <div style="
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25px;
        height: 41px;
                background: url(${publicUrl}assets/img/gallery/marker-icon.png) no-repeat center center;

        background-size: contain;
        color: white;
        font-size: 14px;
        font-weight: bold;
        text-shadow: 1px 1px 2px black;
      ">
        ${text}
      </div>
    `,
    className: 'custom-marker-icon',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

// Icône personnalisée pour les clusters
const createClusterCustomIcon = (cluster) => {
  const count = cluster.getChildCount();
	let publicUrl = process.env.PUBLIC_URL+'/'

  return new L.DivIcon({
    html: `
      <div style="
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background: url(${publicUrl}assets/img/gallery/marker-icon.png) no-repeat center center;
        background-size: contain;
        font-size: 14px;
        font-weight: bold;
        color: white;
        text-shadow: 1px 1px 2px black;
      ">
        ${count}
      </div>
    `,
    className: 'custom-cluster-icon',
    iconSize: [40, 40],
  });
};

// Composant pour fermer les popups sur un clic dans la carte
const ClosePopupsOnClick = () => {
  const map = useMapEvent('click', () => {
    map.closePopup();
  });
  return null;
};

// Icône personnalisée pour les marqueurs individuels
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});




const CartePage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ city: '', minPrice: '', maxPrice: '' });
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [activePopup, setActivePopup] = useState(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      fetch(
        `http://localhost:5000/api/products?city=${filters.city}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur réseau ou API');
          }
          return response.json();
        })
        .then((data) => {
          if (data && Array.isArray(data.products)) {
            setProducts(data.products);
            localStorage.setItem('products', JSON.stringify(data.products)); // Enregistre les données
          } else {
            setProducts([]);
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données :', error);
          setProducts([]);
        });
    }
  }, [filters]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  const [sortMethod, setSortMethod] = useState("relevance"); // Valeur par défaut

	const navigate = useNavigate(); // Hook pour naviguer
	const propertiesPerPage = 1;
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
  const filteredProducts = products.filter((product) => {
    return (
      product.transactionType === transactionType && // Vérifie si le type de transaction correspond
      product.price >= priceRange[0] && // Vérifie la plage de prix minimale
      product.price <= priceRange[1] // Vérifie la plage de prix maximale
    );
  });
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
      
      // const handleTransactionChange = (event) => {
      //   const selectedType = event.target.value;
    
      //   if (selectedType === "sale") {
      //     navigate("/vendre");
      //   } else if (selectedType === "rent") {
      //     navigate("/louer");
      //   } else {
      //     console.error("Type de transaction inconnu :", selectedType);
      //   }
      // };
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

 

  // const filteredProducts = products.filter((product) => {
  //   return (
  //     product.transactionType === "sale" && // Filtrer par type de transaction
  //     product.price >= priceRange[0] && // Minimum de la plage de prix
  //     product.price <= priceRange[1] // Maximum de la plage de prix
  //   );
  // });
  
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

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      const validProducts = response.data.filter(
        (product) =>
          product.coordinates &&
          typeof product.coordinates.latitude === 'number' &&
          typeof product.coordinates.longitude === 'number'
      );
      setProducts(validProducts);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits :', error);
    }
  };
  fetchProducts();
}, []);

const onClusterMouseOver = (cluster) => {
  const markers = cluster.layer.getAllChildMarkers();
  const clusterProperties = markers.map((marker) => {
    const product = products.find(
      (p) =>
        Math.abs(p.coordinates.latitude - marker.getLatLng().lat) < 0.0001 &&
        Math.abs(p.coordinates.longitude - marker.getLatLng().lng) < 0.0001
    );
    return product;
  });

  if (clusterProperties.length > 0) {
    const popupContainer = document.createElement('div');

    ReactDOM.render(<ClusterPopupContent properties={clusterProperties} />, popupContainer);

    const popup = L.popup()
      .setLatLng(cluster.layer.getLatLng())
      .setContent(popupContainer);

    cluster.layer._map.openPopup(popup);
  }
};
const handleTransactionChange = (event) => {
  const selectedType = event.target.value;
  setTransactionType(selectedType); // Met à jour le type de transaction sélectionné
};

useEffect(() => {
  const fetchFilteredProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products", {
        params: {
          transactionType: transactionType, // Filtrer par type de transaction
          minPrice: priceRange[0], // Minimum de la plage de prix
          maxPrice: priceRange[1], // Maximum de la plage de prix
        },
      });
      setProducts(response.data); // Mettre à jour les produits filtrés
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  };

  fetchFilteredProducts();
}, [transactionType, priceRange]); // Exécuter à chaque changement de transactionType ou de priceRange


  return (
    <div>
      <Navbar />
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
                  <select className="select-style" value={transactionType} onChange={handleTransactionChange}>
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
            className="filter" style={{
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

                
                <div>
      {/* <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          name="city"
          placeholder="Ville"
          value={filters.city}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Prix Min"
          value={filters.minPrice}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Prix Max"
          value={filters.maxPrice}
          onChange={handleFilterChange}
        />
      </div> */}
      <div className="container-fluid">
      <div className="row">
        {/* Carte interactive */}
        <div className="col-12">
        <MapContainer
      center={[14.7167, -17.4677]} // Centre sur Dakar
      zoom={12}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <ClosePopupsOnClick />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon} // Utiliser l'icône personnalisée pour les clusters
        eventHandlers={{
          clustermouseover: onClusterMouseOver, // Afficher un popup au survol d'un cluster
        }}
      >
{filteredProducts.map((product, index) => {
  if (
    !product ||
    !product.coordinates ||
    typeof product.coordinates.latitude !== "number" ||
    typeof product.coordinates.longitude !== "number"
  ) {
    return null; // Ignore les produits invalides
  }

  return (
    <Marker
      key={index}
      position={[product.coordinates.latitude, product.coordinates.longitude]}
      icon={createCustomIcon("1")}
      eventHandlers={{
        mouseover: (e) => {
          e.target.openPopup();
        },
      }}
    >
      <Popup>
        <div style={{ maxWidth: "200px", padding: "10px" }}>
          <img
            src={product.images?.[0] || "/path/to/default-image.jpg"}
            alt={product.title}
            style={{
              width: "100%",
              height: "80px",
              objectFit: "cover",
              borderRadius: "5px",
              marginBottom: "5px",
            }}
          />
          <h6>{product.price?.toLocaleString()} FCFA</h6>
          <h6>{product.title}</h6>
          <p>
            {product.address}, {product.city}
          </p>
        </div>
      </Popup>
    </Marker>
  );
})}


      </MarkerClusterGroup>
    </MapContainer>
      
        </div>
      </div>

      {/* Détails du produit sur survol */}
    
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


export default CartePage;

