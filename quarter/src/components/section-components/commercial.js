import React  from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBuilding } from '@fortawesome/free-solid-svg-icons';
import  { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Slider from "rc-slider";
import './filter.css';
import { Link, NavLink } from "react-router-dom";
const HeroSection = () => {
	let publicUrl = process.env.PUBLIC_URL+'/'
	let imagealt = 'image'
  const [products, setProducts] = useState([]);
		const navigate = useNavigate(); // Hook pour naviguer
    const [priceRange, setPriceRange] = useState([0, 10000]); // Plage initiale
	const propertiesPerPage = 250;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

		const [currentPage, setCurrentPage] = useState(1);
		const [totalProperties, setTotalProperties] = useState(60992);
		const [activeTab, setActiveTab] = useState('galerie');
		const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false); // État pour ouvrir/fermer la carte
  const [loading, setLoading] = useState(false);

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
  
	




const handleCardClick = async (item) => {
  try {
    navigate(`/results/${encodeURIComponent(item)}`); // Utilisation correcte de navigate
  } catch (error) {
    console.error("Erreur lors de la redirection :", error);
  }
};

  
const [transactionType, setTransactionType] = useState(() => {
  const savedType = localStorage.getItem("transactionType") || "sale";
  console.log("Valeur initiale de transactionType :", savedType); // Log 1
  return savedType;
});

const handleTransactionChange = (e) => {
  const newValue = e.target.value;
  console.log("Nouvelle valeur sélectionnée :", newValue); // Log 2
  setTransactionType(newValue);
  localStorage.setItem("transactionType", newValue);
};

const handleSearchClick = () => {
  console.log("Test simple de redirection.");
  navigate("/louer"); // Redirige toujours vers /louer
};


useEffect(() => {
  const savedType = localStorage.getItem("transactionType");
  if (savedType) {
    setTransactionType(savedType);
  }
}, []);



  
  

  // --------------------------------------------------------------
 
 
  const handleApplyFilter = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/prix', {
        params: {
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
        },
      });
      setProducts(response.data); // Mettre à jour les produits filtrés
    } catch (error) {
      console.error('Erreur lors du filtrage par prix :', error);
    }
  };
  const handleCloseFilter = () => {
    setIsPriceFilterOpen(false); // Ferme la carte des prix
  };

  // --------------------------------------------------------filter-----------
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleTogglePriceFilter = () => {
    setIsPriceFilterOpen(!isPriceFilterOpen);
  };

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
     const [properties, setProperties] = useState([]);

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
      
      
      
  return (
	<div
	className="hero-section"
	style={{
	  backgroundImage: `url(${publicUrl}assets/img/gallery/Frontpage.jpg)`, // Chemin vers l'image
	  backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						minHeight: '50vh', // Assure une hauteur minimum de 100% de la hauteur de l'écran
	}}
  >
      <div className="overlay">
        <h1 style={{ color: "white" }}>Invitez-vous dans <br/> 14200 propriétés  <br/> au Senegal</h1>
        <div className="tabs">
      <NavLink to="/home-v4" className={({ isActive }) => (isActive ? "tab active" : "tab")}>
        <FontAwesomeIcon icon={faHome} />
        Résidentiel
      </NavLink>
      <NavLink to="/home-v5" className={({ isActive }) => (isActive ? "tab active" : "tab")}>
        <FontAwesomeIcon icon={faBuilding} />
        Commercial
      </NavLink>
    </div>
    <div className="search-container">
      <div className="search-fields">
        <input
          type="text"
          className="search-input"
          placeholder="Chercher par ville, quartier, région, adresse ou N° keurgui"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
<select
              className="filter"
              value={transactionType}
              onChange={handleTransactionChange}
            >
            <option value="rent" style={{ color: 'black' }}>À louer</option>

              <option value="sale" style={{ color: 'black' }}>À vendre</option>
            </select>




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
               <div className="price-filter-card">
               <h4>Prix</h4>
               <Slider
                 range
                 min={0}
                 max={10000}
                 step={100}
                 value={priceRange}
                 onChange={(value) => setPriceRange(value)} // Mettre à jour les deux extrémités normalement
                 onBeforeChange={(value) => {
                   // Bloquer temporairement une extrémité lors de la sélection (optionnel)
                 }}
                 onAfterChange={(value) => {
                   // Permet de finaliser le déplacement après relâchement
                 }}
                 allowCross={false} // Empêche les extrémités de croiser
               />
               <div className="price-inputs">
                 <div className="price-input">{priceRange[0].toLocaleString()} $</div>
                 <div className="price-input">{priceRange[1].toLocaleString()} $+</div>
               </div>
               <div className="filter-buttons">
                  <button
                    className="close-button"
                    onClick={handleCloseFilter}
                  >
                    Fermer
                  </button>
                  <button
                    className="apply-button"
                    onClick={handleApplyFilter}
                  >
                    Appliquer
                  </button>
                </div>
             </div>
            )}

          {/* Bouton pour ouvrir le modal des filtres */}
          <button
  className="filter-button"
  style={{ backgroundColor: '#d3d3d3', color: 'black' }}
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
                    <input type="checkbox" />
                    Maison unifamiliale
                  </label>
                  <label>
                    <input type="checkbox" />
                    Loft / Studio
                  </label>
                  <label>
                    <input type="checkbox" />
                    Maison mobile
                  </label>
                  <label>
                    <input type="checkbox" />
                    Chalet
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" />
                    Condo / Appartement
                  </label>
                  <label>
                    <input type="checkbox" />
                    Intergénération
                  </label>
                  <label>
                    <input type="checkbox" />
                    Fermette
                  </label>
                  <label>
                    <input type="checkbox" />
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
            <button className="search-btton">Rechercher (6 273 propriétés)</button>
          </div>
        </div>
      )}

<button
  className="search-button"
  style={{
    backgroundColor: 'black',
   
  }}
  onClick={handleSearchClick}
  disabled={!transactionType}
>
  🔍
</button>

        {loading && <progress className="progress-bar" />}
      {/* <div className="results">
        {products.map((product) => (
          <div key={product._id}>
            <p>{product.name}</p>
            <p>{product.price} $</p>
            <p>{product.transactionType}</p>
          </div>
        ))}
      </div> */}

      </div>
      
      {query.length >= 3 && (
  <>
    {suggestions.length > 0 ? (
     <div
     className="search-results-container"
     style={{
       marginTop: '-20px',
       border: '1px solid #333',
       borderRadius: '10px',
       marginLeft: '15px',
       backgroundColor: '#f4f4f4',
       padding: '5px',
       width: '53%', // Ajout de la largeur ici
     }}
   >
   
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
    </div>
      </div>
    </div>
  );
};

export default HeroSection;
