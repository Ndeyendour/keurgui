import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const HeroSection2 = () => {
	let publicUrl = process.env.PUBLIC_URL+'/';
	let imagealt = 'image';
  const tabStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '16px',
    transition: 'background-color 0.2s ease',
  };
  const navigate = useNavigate(); // Hook pour naviguer
  const tabsContainerStyle = {
    display: 'flex',
    gap: '16px',
  };
  const [transactionType, setTransactionType] = useState(() => {
    return localStorage.getItem("transactionType") || "sale"; // Valeur par défaut : "sale"
  });

  const handleTransactionChange = (e) => {
    const newValue = e.target.value;
    setTransactionType(newValue);
    localStorage.setItem("transactionType", newValue); // Sauvegarde dans localStorage
  };

  const handleSearchClick = () => {
    console.log("Transaction Type sélectionné :", transactionType);

    if (transactionType === "sale") {
      navigate("/vendre");
    } else if (transactionType === "rent") {
      navigate("/louer");
    } else {
      console.error("Type de transaction inconnu :", transactionType);
      alert("Veuillez sélectionner un type de transaction valide.");
    }
  };

  // Effet pour restaurer la valeur de transactionType depuis localStorage au montage
  useEffect(() => {
    const savedType = localStorage.getItem("transactionType");
    if (savedType) {
      setTransactionType(savedType);
    }
  }, []);
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
        <h1 style={{ color: "white" }}>Invitez-vous dans <br/> 63 142 propriétés  <br/> au Senegal</h1>
        <div className="tabs">
      <button className="tab active">
        <FontAwesomeIcon icon={faHome} />
        Résidentiel
      </button>
      <button className="tab">
        <FontAwesomeIcon icon={faBuilding} />
        Commercial
      </button>
    </div>
        <div className="search-container">
          <div className="search-fields">
            <input
              type="text"
              className="search-input"
              placeholder="Chercher par ville, quartier, région, adresse ou N° keurgui"
            />
           <select
              className="filter"
              value={transactionType}
              onChange={handleTransactionChange}
            >
              <option value="sale" style={{ color: 'black' }}>À vendre</option>
              <option value="rent" style={{ color: 'black' }}>À louer</option>
            </select>
            <select className="filter">
              <option>Prix</option>
              <option>Moins de 100 000 $</option>
            </select>
            <button className="filter-button">Filtres</button>
            <button className="search-button" onClick={handleSearchClick}>🔍</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection2;
