import React from "react";
import "./heroSection.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBuilding } from '@fortawesome/free-solid-svg-icons';

const HeroSection = () => {
	let publicUrl = process.env.PUBLIC_URL+'/'
	let imagealt = 'image'
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

  const tabsContainerStyle = {
    display: 'flex',
    gap: '16px',
  };
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
            <select className="filter">
              <option>À vendre</option>
              <option>À louer</option>
            </select>
            <select className="filter">
              <option>Prix</option>
              <option>Moins de 100 000 $</option>
            </select>
            <button className="filter-button">Filtres</button>
            <button className="search-button">🔍</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
