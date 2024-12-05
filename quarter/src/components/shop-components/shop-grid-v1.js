import React, { Component} from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath } from '@fortawesome/free-solid-svg-icons'; // Importation des icônes

import axios from 'axios';
import './shop-grid.css';
import './PropertyList.css';
import { useHistory } from 'react-router-dom';



const ShopGridV1 = () => {
	const [products, setProducts] = useState([]);
	const history = useHistory(); // Hook pour naviguer


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

        let publicUrl = process.env.PUBLIC_URL+'/'
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
			)

        
}

export default ShopGridV1