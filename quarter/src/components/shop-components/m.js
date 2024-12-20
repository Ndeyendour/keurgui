import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCamera } from '@fortawesome/free-solid-svg-icons';
import './productsliderV1.css';

const LastPropertyDetails = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    axios
      .get('/api/products?sort=-createdAt&limit=1') // Assurez-vous que cette URL est correcte pour récupérer la dernière propriété
      .then((response) => {
        setProperty(response.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur: {error}</p>;
  }

  if (!property) {
    return <p>Aucune propriété trouvée.</p>;
  }

  const displayImages = property.images.slice(0, 5); // Affiche jusqu'à 5 images
  const lastImageIndex = Math.min(property.images.length, 5) - 1;

  return (
    <div className="product-details-page">
      {/* En-tête avec titre et détails */}
      <div className="product-header">
        <div className="product-header-content">
          <div className="product-info-left">
            <h1>{property.title}</h1>
            <p className="address">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {property.address}
            </p>
          </div>
          <div className="product-info-center">
            <span className="price">{property.price.toLocaleString()} $</span>
          </div>
          <div className="product-info-right">
            <button className="contact-agent-btn">Contacter le courtier immobilier</button>
          </div>
        </div>
      </div>

      {/* Galerie d'images */}
      <div className="product-gallery">
        {/* Grande image à gauche */}
        {property.images.length > 0 && (
          <a href={property.images[0]} data-rel="lightcase:myCollection" className="large-image">
            <img src={property.images[0]} alt="Large Product" />
          </a>
        )}

        {/* Petites images à droite */}
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
                      history.push(`/property-images/${property._id}`);
                    }} // Redirection vers les images
                  >
                    <FontAwesomeIcon icon={faCamera} className="photo-icon" />
                    <span className="photo-count">{property.images.length}</span>
                  </div>
                )}
              </a>
            );
          })}
        </div>
      </div>

      {/* Détails supplémentaires */}
      <div className="product-info">
        <h2>Informations sur le produit</h2>
        <ul>
          <li>Type de produit : {property.productType}</li>
          <li>Ville : {property.city}</li>
          <li>Courtier : {property.agentName}</li>
          <li>Description : {property.description}</li>
          <li>Taille du lot : {property.lotSize} m²</li>
          <li>Visite virtuelle disponible : {property.isVirtualTourAvailable ? 'Oui' : 'Non'}</li>
          <li>Journée portes ouvertes : {property.isOpenHouse ? 'Oui' : 'Non'}</li>
          <li>Date d'emménagement : {new Date(property.moveInDate).toLocaleDateString()}</li>
        </ul>
      </div>
    </div>
  );
};

export default LastPropertyDetails;