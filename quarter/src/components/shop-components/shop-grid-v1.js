import React, { Component} from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faCamera, faImages, faMapMarkedAlt, faListAlt} from '@fortawesome/free-solid-svg-icons'; // Importation des icônes

import axios from 'axios';
import './shop-grid.css';
import './PropertyList.css';
import { useHistory } from 'react-router-dom';



const  ShopGridV1= () => {
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
			//   history.push(`/results/${encodeURIComponent(item)}`); 
			  history.push(`/results?location=${encodeURIComponent(item)}`);
			} catch (error) {
			  console.error("Erreur lors de la redirection :", error);
			}
		  };

		//   ---------------------------nouv--------------
		const handleNavigation = (type) => {
			console.log('Navigation vers :', type);
		
			if (type === 'À vendre') {
			  history.push('/vendre');
			} else if (type === 'À louer') {
			  history.push('/louer');
			}
		  };
		  const handleTransactionChange = (e) => {
			const selectedType = e.target.value;
			setTransactionType(selectedType);
		
			console.log("Option sélectionnée :", selectedType); // Debug
		
			if (selectedType === "À vendre") {
			  console.log("Redirection vers /proprietes-a-vendre");
			  history.push("/vendre");
			} else if (selectedType === "À louer") {
			  console.log("Redirection vers /louer");
			  history.push("/louer");
			}
		  }
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
										placeholder="Chercher par ville, quartier, région, adresse ou N° Centris"
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
																src={product.images[0] || '/path/to/default-image.jpg'}
																alt={product.title}
																className="property-image"
																onClick={() => history.push(`/product/${product._id}`)}
															/>

															{/* Icône avec le nombre de photos */}
															<div
																className="icon-wrapper"
																onClick={() => history.push(`/property-images/${product._id}`)} // Redirection vers les images
															>
																<FontAwesomeIcon
																icon={faCamera}
																className="photo-icon"
																/>
																<span className="photo-count">{product.images ? product.images.length : 0}</span>

															</div>
																
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