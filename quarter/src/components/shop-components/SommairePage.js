// SommairePage.js
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCamera } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './shop-grid.css';
import './productsliderV1.css';

const SommairePage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur: {error}</p>;
  }

  if (!product) {
    return <p>Aucune propriété trouvée.</p>;
  }

  const displayImages = product.images.slice(0, 5);
  const lastImageIndex = Math.min(product.images.length, 5) - 1;

  return (
    <div className="product-details-page">
      <div className="product-header">
        <div className="product-header-content">
          <div className="product-info-left">
            <h1>{product.title}</h1>
            <p className="address">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {product.address}
            </p>
          </div>
          <div className="product-info-center">
            <span className="price">{product.price.toLocaleString()} $</span>
          </div>
          <div className="product-info-right">
            <button className="contact-agent-btn">Contacter le courtier immobilier</button>
          </div>
        </div>
      </div>

      <div className="product-gallery">
        {product.images.length > 0 && (
          <a href={product.images[0]} data-rel="lightcase:myCollection" className="large-image">
            <img src={product.images[0]} alt="Large Product" />
          </a>
        )}

        <div className="small-images">
          {displayImages.slice(1).map((image, index) => {
            const isLastImage = index === lastImageIndex - 1;
            return (
              <a href={image} data-rel="lightcase:myCollection" key={index} className="small-image">
                <img src={image} alt={`Small Product ${index + 1}`} />
                {isLastImage && (
                  <div
                    className="icon-wrapper"
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(`/product-images/${product._id}`);
                    }}
                  >
                    <FontAwesomeIcon icon={faCamera} className="photo-icon" />
                    <span className="photo-count">{product.images.length}</span>
                  </div>
                )}
              </a>
            );
          })}
        </div>
      </div>

      <div className="product-info">
        <h2>Informations sur le produit</h2>
        <ul>
          <li>Type de produit : {product.productType}</li>
          <li>Ville : {product.city}</li>
          <li>Courtier : {product.agentName}</li>
          <li>Description : {product.description}</li>
          <li>Taille du lot : {product.lotSize} m²</li>
          <li>Visite virtuelle disponible : {product.isVirtualTourAvailable ? 'Oui' : 'Non'}</li>
          <li>Journée portes ouvertes : {product.isOpenHouse ? 'Oui' : 'Non'}</li>
          <li>Date d'emménagement : {new Date(product.moveInDate).toLocaleDateString()}</li>
        </ul>
      </div>
    </div>
  );
};

export default SommairePage;