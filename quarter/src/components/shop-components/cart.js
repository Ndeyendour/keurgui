import React, { useState } from "react";
import "./filter.css";

const HeroSection = () => {
  const [isOtherCriteriaOpen, setIsOtherCriteriaOpen] = useState(false); // État pour afficher les autres critères

  const handleToggleOtherCriteria = () => {
    setIsOtherCriteriaOpen(!isOtherCriteriaOpen);
  };

  return (
    <div className="hero-section">
      <div className="filter-modal">
        <div className="filter-options">
          {/* Autres Critères */}
          <div className="filter-item">
            <div className="filter-item-header">
              <span className="filter-item-title">Autres Critères</span>
              <button
                className="expand-button"
                onClick={handleToggleOtherCriteria}
              >
                {isOtherCriteriaOpen ? "-" : "+"}
              </button>
            </div>
            {isOtherCriteriaOpen && (
              <div className="other-criteria-content">
                {/* Superficie du terrain */}
                <div className="criteria-inputs">
                  <label>
                    Superficie du terrain
                    <div className="input-group">
                      <input
                        type="number"
                        placeholder="Min"
                        className="input-box"
                      />
                      <span>à</span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="input-box"
                      />
                      <select className="dropdown">
                        <option value="pc">pc</option>
                        <option value="m2">m²</option>
                      </select>
                    </div>
                  </label>
                </div>

                {/* Dates */}
                <div className="criteria-dates">
                  <label>
                    Nouveau depuis
                    <div className="input-group">
                      <input
                        type="date"
                        placeholder="Choisir une date"
                        className="input-box"
                      />
                      <span className="calendar-icon">📅</span>
                    </div>
                  </label>
                  <label>
                    Date d’emménagement
                    <div className="input-group">
                      <input
                        type="date"
                        placeholder="Choisir une date"
                        className="input-box"
                      />
                      <span className="calendar-icon">📅</span>
                    </div>
                  </label>
                </div>

                {/* Cases à cocher */}
                <div className="checkbox-group">
                  <label>
                    <input type="checkbox" />
                    Visites libres
                  </label>
                  <label>
                    <input type="checkbox" />
                    Avec option d’achat
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
