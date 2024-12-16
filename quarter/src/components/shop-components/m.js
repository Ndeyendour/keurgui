import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath } from '@fortawesome/free-solid-svg-icons'; // Importation des icônes
import axios from 'axios';
import './shop-grid.css';
import './PropertyList.css';

const ShopGridV1 = () => {
    const [products, setProducts] = useState([]);
    const history = useHistory(); // Hook pour naviguer
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("Résidentiel");
    const [transactionType, setTransactionType] = useState("À vendre");
    const [price, setPrice] = useState("");
    const [lifestyleFilters, setLifestyleFilters] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProperties, setTotalProperties] = useState(60992); // Nombre total de propriétés trouvées
    const propertiesPerPage = 250;

    // Effet pour récupérer les produits depuis le backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products'); // URL de votre backend
                setProducts(response.data); // Met à jour l'état avec les produits récupérés
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
            }
        };

        fetchProducts();
    }, []);

    // Filtrer les produits pour afficher uniquement ceux à vendre
    const filteredProducts = products.filter(
        (product) => product.transactionType === 'sale'
    );

    // Gestion de la pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            {/* Barre des onglets */}
            <div className="tabs-container">
                <button className="tab-button active">Galerie</button>
                <button className="tab-button">Carte</button>
                <button className="tab-button">Sommaire</button>

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

            <div className="ltn__product-area ltn__product-gutter mb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tab-content">
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
    );
};

export default ShopGridV1;
