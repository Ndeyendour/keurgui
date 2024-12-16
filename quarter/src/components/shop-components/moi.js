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
        const response = await axios.get('http://localhost:5000/api/products', {
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
    <div className="results-container">
      <h2>Résultats pour : {searchTerm}</h2>
      {products.length === 0 ? (
        <p>Aucun résultat trouvé.</p>
      ) : (
        <div className="results-list">
          {products.map((product) => (
            <div key={product._id} className="result-card">
              
              <h5>{product.title}</h5>
              <p>{product.address}, {product.city}</p>
              <p>Prix : {product.price?.toLocaleString()} $</p>
              <div className="features">
                <span>
                  <FontAwesomeIcon icon={faBed} /> {product.features?.bedrooms || 0} chambres
                </span>
                <span>
                  <FontAwesomeIcon icon={faBath} /> {product.features?.bathrooms || 0} salles de bain
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
