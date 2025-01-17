import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ClusterPopupContent = ({ properties }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + properties.length) % properties.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % properties.length);
  };

  const product = properties[currentIndex];

  return (
    <div style={{ maxWidth: '300px', padding: '10px', fontSize: '12px', lineHeight: '1.4', position: 'relative' }}>
      <img
        src={product.images?.[0] || '/path/to/default-image.jpg'}
        alt={product.title}
        style={{
          width: '100%',
          height: '120px',
          objectFit: 'cover',
          borderRadius: '5px',
          marginBottom: '5px',
        }}
      />
      <div>
        <h6 style={{ fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>
          {product.price?.toLocaleString()} $
        </h6>
        <h6 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>{product.title}</h6>
        <p style={{ fontSize: '11px', color: '#666', marginBottom: '8px' }}>
          {product.address}, {product.city}
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span style={{ fontSize: '12px', color: '#333', display: 'flex', alignItems: 'center' }}>
            <i className="fa fa-bed" style={{ marginRight: '3px;' }} />
            {product.features?.bedrooms || 0}
          </span>
          <span style={{ fontSize: '12px', color: '#333', display: 'flex', alignItems: 'center' }}>
            <i className="fa fa-bath" style={{ marginRight: '3px;' }} />
            {product.features?.bathrooms || 0}
          </span>
        </div>
      </div>
      {/* Boutons de navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        {/* Bouton précédent */}
        <button
          onClick={handlePrev}
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: '14px', color: '#333' }} />
        </button>
        {/* Compteur */}
        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
          {currentIndex + 1} / {properties.length}
        </span>
        {/* Bouton suivant */}
        <button
          onClick={handleNext}
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '14px', color: '#333' }} />
        </button>
      </div>
    </div>
  );
};

export default ClusterPopupContent;
