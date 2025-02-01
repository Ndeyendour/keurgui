import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath } from '@fortawesome/free-solid-svg-icons';

const ResultsPage = () => {
  const { searchTerm } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('https://keurgui.onrender.com/api/products', {
          params: { search: searchTerm },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des résultats', error);
      }
    };

    fetchResults();
  }, [searchTerm]);

  return (
    <div className="row">
          <div className="col-lg-12">
            <div className="tab-content">
              <div className="tab-pane fade active show" id="liton_product_grid">
                <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                  <div className="row">
                    {/* Liste des propriétés */}
                    {products.length > 0 ? (
                      products.map((product) => (
                        <div key={product._id} className="col-lg-3 col-sm-6 col-12">
                          <div className="property-card">
                            {/* Image principale */}
                            <img
                              src={product.images?.[0] || '/path/to/default-image.jpg'}
                              alt={product.title}
                              className="property-image"
                              onClick={() => handleProductClick(product._id)}
                            />
                            
                            {/* Icône avec le nombre de photos */}
                            <div
                              className="icon-wrapper"
                              onClick={() => handleImageClick(product._id)}
                            >
                              <FontAwesomeIcon
                                icon={faCamera}
                                className="photo-icon"
                              />
                              <span className="photo-count">
                                {product.images?.length || 0}
                              </span>
                            </div>
                            
                            {/* Détails de la propriété */}
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
                        </div>
                      ))
                    ) : (
                      <p>Aucun résultat trouvé.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default ResultsPage;
