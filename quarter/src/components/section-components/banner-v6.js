import React  from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBuilding } from '@fortawesome/free-solid-svg-icons';
import  { useState,useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './heroSection.css';

const HeroSection = () => {
	let publicUrl = process.env.PUBLIC_URL+'/'
	let imagealt = 'image'
  const [products, setProducts] = useState([]);
		const history = useHistory(); // Hook pour naviguer
	
	const propertiesPerPage = 250;
		const [currentPage, setCurrentPage] = useState(1);
		const [totalProperties, setTotalProperties] = useState(60992);
		const [activeTab, setActiveTab] = useState('galerie');
		const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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

	// Filtrer les produits pour afficher uniquement ceux à louer
const filteredProducts = products.filter(
    (product) => product.transactionType === 'rent'
);

  
const handlePageChange = (page) => {
	setCurrentPage(page);
};

const handleCardClick = async (item) => {
	try {
	  history.push(`/results/${encodeURIComponent(item)}`); // Redirection avec l'élément sélectionné
	} catch (error) {
	  console.error("Erreur lors de la redirection :", error);
	}
  };
  
  
  return (
	<div
	className="hero-section"
	style={{
	  backgroundImage: `url(${publicUrl}assets/img/gallery/7.jpg)`, // Chemin vers l'image
	  backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						minHeight: '50vh', // Assure une hauteur minimum de 100% de la hauteur de l'écran
	}}
  >
      <div className="overlay">
        <h1 style={{ color: "white" }}>Invitez-vous dans <br/> 142 propriétés  <br/> au Senegal</h1>
        <div className="tabs">
      <a href="/home-v4" className="tab active">
        <FontAwesomeIcon icon={faHome} />
        Résidentiel
      </a>
      <a href="/home-v5" className="tab">
        <FontAwesomeIcon icon={faBuilding} />
        Commercial
      </a>
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
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option>À vendre</option>
          <option>À louer</option>
        </select>
        <select
          className="filter"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option value="">Prix</option>
          <option value="100000">Moins de 100 000 $</option>
        </select>
        
        <button className="filter-button">Filtres</button>
            <button className="search-button" >🔍</button>

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
