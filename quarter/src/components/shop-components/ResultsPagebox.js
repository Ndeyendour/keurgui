import React, { Component} from 'react';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faCamera, faImages, faMapMarkedAlt, faListAlt} from '@fortawesome/free-solid-svg-icons'; // Importation des icônes

import axios from 'axios';
import './shop-grid.css';
import './PropertyList.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";


import { useMemo } from "react";


const ResultsPagebox = () => {
	const [products, setProducts] = useState([]);
	const navigate = useNavigate(); // Hook pour naviguer
	const handleProductClick = (productId) => navigate(`/product-details/${productId}`);
	const handleImageClick = (productId) => navigate(`/property-images/${productId}`);

	const propertiesPerPage = 12;
	const [currentPage, setCurrentPage] = useState(1);
	const [totalProperties, setTotalProperties] = useState(60992);
	const [activeTab, setActiveTab] = useState('galerie');
	const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const location = useLocation();
  const filterss = location.state || {};
  const [properties, setProperties] = useState([]);


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
	const { searchTerm } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products', {
          params: { search: searchTerm },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des résultats', error);
      }
    };

    fetchResults();
  }, [searchTerm]);


	// Filtrer les produits pour afficher uniquement ceux à vendre
	const filteredProducts = products.filter(
		(product) => product.transactionType === 'sale'
	);
	const handlePageChange = (page) => {
        setCurrentPage(page);
    };
        let publicUrl = process.env.PUBLIC_URL+'/'

		const handleCardClick = async (item) => {
			try {
			  navigate(`/results/${encodeURIComponent(item)}`); // Redirection avec l'élément sélectionné
			} catch (error) {
			  console.error("Erreur lors de la redirection :", error);
			}
		  };

      // useEffect(() => {
      //   const fetchFilteredProducts = async () => {
      //     try {
      //       console.log("Filtres envoyés :", filters);
      //       const response = await axios.get("http://localhost:5000/api/apprt", {
      //         params: { productType: filters.productType || "" },
      //       });
      
      //       setProperties(response.data);
      //     } catch (error) {
      //       console.error("Erreur lors de la récupération des produits filtrés :", error);
      //     }
      //   };
      
      //   fetchFilteredProducts();
      // }, [filters]);
      
  const [results, setResults] = useState([]);
  console.log("🔍 Paramètre reçu dans ResultsPagebox :", searchTerm);
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/checkbox?productType=${searchTerm}`); // Filtre par productType
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Erreur lors du chargement des résultats :", error);
      }
    };

    fetchResults();
  }, [searchTerm]);
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
      useEffect(() => {
        const fetchProperties = async () => {
          try {
            const response = await axios.get("http://localhost:5000/api/products", {
              params: { transactionType: "À vendre" },
            });
            setProperties(response.data);
          } catch (error) {
            console.error("Erreur lors de la récupération des propriétés :", error);
          }
        };
      
        fetchProperties();
      }, []);
// ----------------------------------------------------------------------------------------------------F----------------------      
const [selectedProductType, setSelectedProductType] = useState(""); // Uniquement pour productType

  const handleFilterChange = (e) => {
    setSelectedProductType(e.target.value); // Met à jour la sélection
  };

  const handleSearch = () => {
    if (selectedProductType) {
      console.log("🔎 Redirection vers :", `/results/${selectedProductType}`);
      navigate(`/results/${selectedProductType}`);
    } else {
      console.log("⚠️ Aucun type sélectionné !");
    }
  };

  const [searchParams] = useSearchParams();
const decodedSearchTerm = searchTerm ? decodeURIComponent(searchTerm) : ""; // Évite une erreur si `searchTerm` est `undefined`

  const [selectedStructureTypes, setSelectedStructureTypes] = useState([]); // 🔥 Déclaration ici

  const filters = {};
  if (searchTerm && searchTerm !== "all") {
    decodeURIComponent(searchTerm).split("&").forEach(param => {
      const [key, value] = param.split("=");
      if (key && value) {
        filters[key] = value.split(","); // Convertit "types=appartement,villa_maison" en { types: ["appartement", "villa_maison"] }
      }
    });
  }

  console.log("✅ Filtres extraits :", filters); // Vérification

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const queryParams = new URLSearchParams();

        if (filters.types) {
          queryParams.append("types", filters.types.join(","));
        }
        if (filters.structureTypes) {
          queryParams.append("structureTypes", filters.structureTypes.join(","));
        }

        console.log("📡 Envoi requête API :", `http://localhost:5000/api/results?${queryParams.toString()}`);

        const response = await fetch(`http://localhost:5000/api/results?${queryParams.toString()}`);
        const data = await response.json();

        console.log("✅ Résultats reçus :", data); // Voir si les résultats sont bien reçus
        setResults(data);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des résultats :", error);
      }
    };

    fetchResults();
  }, [searchTerm]);


const searchFilters = useMemo(() => {
  const filters = {};
  if (searchTerm && searchTerm !== "all") {
    decodeURIComponent(searchTerm).split("&").forEach(param => {
      const [key, value] = param.split("=");
      if (key && value) {
        filters[key] = value;
      }
    });
  }
  return filters;
}, [searchTerm]);

  
  console.log("✅ Filtres extraits :", searchFilters);
  
  useEffect(() => {
    if (!searchTerm || searchTerm === "all") {
      console.log("🚫 Aucun filtre appliqué, requête API annulée.");
      return; // 🔥 Ne fait pas d'appel API si aucun filtre
    }
  
    console.log("🔄 useEffect exécuté avec searchTerm :", searchTerm);
  
    const fetchResults = async () => {
      try {
        const queryParams = new URLSearchParams();
  
        if (searchFilters.minLotSize) {
          queryParams.append("minLotSize", searchFilters.minLotSize);
        }
        if (searchFilters.maxLotSize) {
          queryParams.append("maxLotSize", searchFilters.maxLotSize);
        }
        if (searchFilters.minDate) {
          queryParams.append("minDate", searchFilters.minDate);
        }
  
        const apiUrl = `http://localhost:5000/api/ters?${queryParams.toString()}`;
        console.log("📡 Envoi requête API :", apiUrl);
  
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        console.log("✅ Résultats reçus :", data);
        setResults(data);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des résultats :", error);
      }
    };
  
    fetchResults();
  }, [searchTerm]);
  
  
  
  


 
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
										<button className="button-style" style={{
    color: 'black', // Texte en noir
  }}
  
										
										onClick={() => alert("Ouvrir les filtres de prix")}
										>
										<span className="prix-text">Prix</span>
										<span className="prix-symbol"> FCFA</span>
										</button>


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
        <div className="filter-modal">
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
                      type="radio"
                      value="appartement"
                      checked={selectedProductType === "appartement"}
                      onChange={handleFilterChange}
                    />
                    Appartement
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="bureau_commerce"
                      checked={selectedProductType === "bureau_commerce"}
                      onChange={handleFilterChange}
                    />
                    Bureau / Commerce
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="hotel_restaurant"
                      checked={selectedProductType === "hotel_restaurant"}
                      onChange={handleFilterChange}
                    />
                    Hôtel / Restaurant
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="villa_maison"
                      checked={selectedProductType === "villa_maison"}
                      onChange={handleFilterChange}
                    />
                    Villa / Maison
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="studio_chambre"
                      checked={selectedProductType === "studio_chambre"}
                      onChange={handleFilterChange}
                    />
                    Studio / Chambre
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="terrain"
                      checked={selectedProductType === "terrain"}
                      onChange={handleFilterChange}
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
                <div className="dropdowns">
                  <select className="dropdown">
                    <option>Nombre de chambres</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3+</option>
                  </select>
                  <select className="dropdown">
                    <option>Nombre de salles de bain/d'eau</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3+</option>
                  </select>
                  <select className="dropdown">
                    <option>Nombre de stationnements</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3+</option>
                  </select>
                  <select className="dropdown">
                    <option>Nombre de garages</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3+</option>
                  </select>
                </div>

                {/* Cases à cocher */}
                <div className="checkbox-group">
                  <div>
                    <label>
                      <input type="checkbox" />
                      Piscine
                    </label>
                    <label>
                      <input type="checkbox" />
                      Ascenseur
                    </label>
                    <label>
                      <input type="checkbox" />
                      Bord de l'eau
                    </label>
                    <label>
                      <input type="checkbox" />
                      Plan d'eau navigable
                    </label>
                    <label>
                      <input type="checkbox" />
                      Animaux acceptés
                    </label>
                    <label>
                      <input type="checkbox" />
                      Meublé
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="checkbox" />
                      Cour privée
                    </label>
                    <label>
                      <input type="checkbox" />
                      Adapté pour mobilité réduite
                    </label>
                    <label>
                      <input type="checkbox" />
                      Accès à l'eau
                    </label>
                    <label>
                      <input type="checkbox" />
                      Villégiature
                    </label>
                    <label>
                      <input type="checkbox" />
                      Fumeurs acceptés
                    </label>
                    <label>
                      <input type="checkbox" />
                      Semi-meublé
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="filter-item">
            <div className="filter-item-header">
              <span className="filter-item-title">Bâtiment</span>
              <button
                className="expand-button"
                onClick={handleToggleBuilding}
              >
                {isBuildingOpen ? "-" : "+"}
              </button>
            </div>
            {isBuildingOpen && (
              <div className="building-content">
                {/* Superficie habitable */}
                {/* <div className="building-inputs">
                  <label>
                    Superficie habitable
                    <div className="input-group">
                      <input
                        type="number"
                        placeholder="Min"
                        className="input-box"
                      />
                      <span>à</span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="input-box"
                      />
                      <select className="dropdown">
                        <option value="pc">pc</option>
                        <option value="m2">m²</option>
                      </select>
                    </div>
                  </label>
                </div> */}

                {/* Année de construction */}
                {/* <div className="building-inputs">
                  <label>
                    Année de construction
                    <div className="input-group">
                      <input
                        type="number"
                        placeholder="Min"
                        className="input-box"
                      />
                      <span>à</span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="input-box"
                      />
                    </div>
                  </label>
                </div> */}

                {/* Cases à cocher */}
                <div className="checkbox-group">
                  <div>
                    <label>
                      <input type="checkbox" />
                      Nouvelle construction
                    </label>
                    <label>
                      <input type="checkbox" />
                      Plain-pied
                    </label>
                    <label>
                      <input type="checkbox" />
                      Paliers multiples
                    </label>
                    <label>
                      <input type="checkbox" />
                      Jumelé
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="checkbox" />
                      Centenaire/Historique
                    </label>
                    <label>
                      <input type="checkbox" />
                      À étages
                    </label>
                    <label>
                      <input type="checkbox" />
                      Détaché
                    </label>
                    <label>
                      <input type="checkbox" />
                      En rangée
                    </label>
                  </div>
                </div>
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
                    Superficie du terrain
                    <div className="input-group">
                      <input
                        type="number"
                        placeholder="Min"
                        className="input-box"
                      />
                      <span>à</span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="input-box"
                      />
                      <select className="dropdown">
                        <option value="pc">pc</option>
                        <option value="m2">m²</option>
                      </select>
                    </div>
                  </label>
                </div>

                {/* Dates */}
                <div className="criteria-dates">
                  <label>
                    Nouveau depuis
                    <div className="input-group">
                      <input
                        type="date"
                        placeholder="Choisir une date"
                        className="input-box"
                      />
                      <span className="calendar-icon">📅</span>
                    </div>
                  </label>
                  <label>
                    Date d’emménagement
                    <div className="input-group">
                      <input
                        type="date"
                        placeholder="Choisir une date"
                        className="input-box"
                      />
                      <span className="calendar-icon">📅</span>
                    </div>
                  </label>
                </div>

                {/* Cases à cocher */}
                <div className="checkbox-group">
                  <label>
                    <input type="checkbox" />
                    Visites libres
                  </label>
                  <label>
                    <input type="checkbox" />
                    Avec option d’achat
                  </label>
                </div>
              </div>
            )}
          </div>
          </div>
          <div className="filter-actions">
          <button className="filter-button-common reset-button">Réinitialiser</button>
            <button className="filter-button-common close-button" onClick={handleToggleFilterModal}>
              Fermer
            </button>
          </div>
          <br/>
          <div className="searchcontainer">
      <button className="search-btton" onClick={handleSearch}>
        Rechercher
      </button>
    </div>
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
				<Link to="/sommaire" className={`tab-button ${activeTab === 'sommaire' ? 'active' : ''}`} onClick={() => handleTabClick('sommaire')}>
					<FontAwesomeIcon icon={faListAlt} /> Sommaire
				</Link>
				<div className="tab-indicator" style={{ left: `${getIndicatorPosition(activeTab)}%` }}></div>
				</div>

                {/* Nombre de propriétés trouvées */}
                <span className="properties-found">{totalProperties.toLocaleString()} propriétés trouvées</span>

                {/* Trier par */}
                <select className="sort-dropdown">
                    <option value="relevance">Trier par pertinence</option>
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
	<br/>
	<br/>
	<br/>
									{/* ltn__product-item */}
                  <div className="row">
  <div className="col-lg-12">
    <div className="tab-content">
      <div className="tab-pane fade active show" id="liton_product_grid">
        <div className="ltn__product-tab-content-inner ltn__product-grid-view">
          <div className="row">
            {/* Vérification et affichage des produits */}
            {results.length > 0 ? (
              results.map((product) => (
                <div key={product._id} className="col-lg-3 col-sm-6 col-12">
                  <div className="result-card">
                    {/* Image principale avec redirection */}
                    <div
                      className="image-container"
                      onClick={() => handleProductClick(product._id)}
                    >
                      <img
                        src={product.images?.[0] || '/path/to/default-image.jpg'}
                        alt={product.title || "Image indisponible"}
                        className="property-image"
                      />
                      {/* Icône avec compteur de photos */}
                      <div
                        className="icon-wrapper"
                        onClick={(e) => {
                          e.stopPropagation(); // Évite la redirection lors du clic sur l'icône
                          handleImageClick(product._id);
                        }}
                      >
                        <FontAwesomeIcon icon={faCamera} className="photo-icon" />
                        <span className="photo-count">
                          {product.images?.length || 0}
                        </span>
                      </div>
                    </div>

                    {/* Détails du produit */}
                    <div className="property-details">
                    <h3>{product.title || "Titre indisponible"}</h3>
      <p>{product.address || "Adresse inconnue"}, {product.city || "Ville inconnue"}</p>
      <p>Prix : {product.price ? `${product.price} FCFA` : "Non spécifié"}</p>
                      <div className="features">
                        <span>
                          <FontAwesomeIcon icon={faBed} />{" "}
                          {product.features?.bedrooms || 0} 
                        </span>
                        <span>
                          <FontAwesomeIcon icon={faBath} />{" "}
                          {product.features?.bathrooms || 0} 
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-results">Aucun résultat trouvé.</p>
            )}
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

export default ResultsPagebox