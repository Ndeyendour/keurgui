import React, { Component} from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faCamera, faImages, faMapMarkedAlt,faMapMarkerAlt, faListAlt,faStreetView} from '@fortawesome/free-solid-svg-icons'; // Importation des icônes

import axios from 'axios';
import './shop-grid.css';
import './PropertyList.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './productsliderV1.css';



const  ProductDetails= () => {
	const [products, setProducts] = useState([]);
	const navigate = useNavigate(); // Hook pour naviguer
	const propertiesPerPage = 250;
	const [currentPage, setCurrentPage] = useState(1);
	const [totalProperties, setTotalProperties] = useState(60992);
	const [activeTab, setActiveTab] = useState('galerie');
	const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { id } = useParams(); // Utilisation du hook useParams pour obtenir l'id du produit
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("Résidentiel");
	const [transactionType, setTransactionType] = useState("À vendre");
	const [price, setPrice] = useState("");
	const [lifestyleFilters, setLifestyleFilters] = useState(1);
  const handleButtonClick = () => {
    navigate('/form'); // Redirige vers la route du formulaire
  };

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

      useEffect(() => {
        axios
          .get(`http://localhost:5000/api/products/${id}`) // Assurez-vous que cette URL est correcte
          .then((response) => {
            setProduct(response.data);
            setLoading(false);
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      }, [id]);
    
      if (loading) {
        return <p>Chargement...</p>;
      }
    
      if (error) {
        return <p>Erreur: {error}</p>;
      }
      const handleTransactionChange = (e) => {
        const selectedType = e.target.value;
        setTransactionType(selectedType);
    
        console.log("Option sélectionnée :", selectedType); // Debug
    
        if (selectedType === "À vendre") {
          console.log("Redirection vers /proprietes-a-vendre");
          navigate("/vendre");
        } else if (selectedType === "À louer") {
          console.log("Redirection vers /louer");
          navigate("/louer");
        }
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
										<select value={transactionType} onChange={handleTransactionChange} className="select-style">
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

									{/* ltn__product-item */}
                  <div className="product-details-page">
      {/* En-tête avec titre et détails */}
      <div className="product-header">
        <div className="product-header-content">
          <div className="product-info-left">
            <h6>{product.title}</h6>
        
            <h5 className="address">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {product.address}
            </h5>
          </div>
          <div className="product-info-center">
            <span className="price">{product.price} $</span>
          </div>

          <div className="product-info-right">
          <button className="contact-agent-btn" onClick={handleButtonClick}>
          Contacter le courtier immobilier
        </button>
          </div>
        </div>
      </div>
  <br/>
      {/* Galerie d'images */}
      
      <div className="product-gallery">
        {/* Grande image à gauche */}
        {product.images.length > 0 && (
          <a href={product.images[0]} data-rel="lightcase:myCollection" className="large-image">
            <img src={product.images[0]} alt="Large Product" />
          </a>
        )}

        {/* Petites images à droite */}
        <div className="small-images">
          {product.images.slice(1, 5).map((image, index) => (
            <a href={image} data-rel="lightcase:myCollection" key={index}>
              <img src={image} alt={`Small Product ${index + 1}`} />
              
            </a>
            
          ))}
          {/* Affichage de l'icône de la caméra */}
          {/* {product.images.length > 0 && (
            <div
              className="icon-wrapper"
              onClick={() => navigate(`/property-images/${product._id}`)} // Redirection vers les images
            >
              <FontAwesomeIcon icon={faCamera} className="photo-icon" />
              <span className="photo-count">{product.images.length}</span>
            </div>
          )} */}
        </div>
      </div>
      <br/>
      <div className="property-details">
      <h2>Caractéristiques</h2>
      <div className="features-grid">
        <div className="feature">
          <p><strong>Utilisation de la propriété :</strong> Commerciale</p>
        </div>
        <div className="feature">
          <p><strong>Superficie commerciale disponible :</strong> 975 pc</p>
        </div>
        <div className="feature">
          <p><strong>Superficie du bâtiment (au sol) :</strong> 10 000 pc</p>
        </div>
        <div className="feature">
          <p><strong>Nombre d’unités :</strong> Commercial (1)</p>
        </div>
      </div>

      <div className="walk-score">
        <p><strong>Walk Score :</strong> 61</p>
      </div>

      <h3>Description</h3>
      <p>
        Strip commercial à louer en excellente condition avec une situation géographique avantageuse.
        Idéal pour professionnel qui souhaite se partir à son compte. Massothérapeute, Chiropraticien,
        ou service connexe. Ayez votre commerce sur une rue commerciale reconnue, à proximité de
        la place Biermans et de la Plaza. Soyez prêt pour la reprise économique qui s'en vient.
      </p>

      <div className="broker-info">
        <h3>Courrier inscripteur</h3>
        <div className="broker-card">
          <div className="broker-details">
            <h4>Hugo Gaillardetz</h4>
            <p>Courtier immobilier résidentiel et commercial agréé DA</p>
            <div className="contact-icons">
              <span>📧</span> <span>📞</span>
            </div>
            <p><strong>Gaillardetz</strong></p>
            <p>Agence immobilière</p>
          </div>
          <img src="/path/to/photo.jpg" alt="Hugo Gaillardetz" className="broker-image" />
        </div>
      </div>
    </div>
      {/* Détails supplémentaires */}
    
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

export default ProductDetails