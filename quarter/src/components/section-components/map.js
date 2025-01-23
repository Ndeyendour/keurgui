import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "rc-slider";
import "./filter.css";

const Commercial = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(""); // Saisie utilisateur
  const [suggestions, setSuggestions] = useState([]); // Résultats des suggestions
  const [selectedAddress, setSelectedAddress] = useState(""); // Adresse sélectionnée
  const [priceRange, setPriceRange] = useState([0, 10000]); // Plage de prix actuelle
  const [appliedPriceRange, setAppliedPriceRange] = useState(null); // Plage de prix appliquée
  const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false); // État du filtre des prix

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]); // Ne pas chercher si la saisie est trop courte
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/search-predictive", {
          params: { query },
        });
        setSuggestions(response.data); // Mise à jour des suggestions
      } catch (error) {
        console.error("Erreur lors de la récupération des suggestions :", error);
      }
    };

    fetchSuggestions();
  }, [query]);

  // Appliquer la plage de prix
  const handleApplyFilter = () => {
    setAppliedPriceRange(priceRange); // Appliquer la plage de prix
    setIsPriceFilterOpen(false); // Fermer la fenêtre de filtre
  };

  // Gestion du clic sur une suggestion
  const handleSuggestionClick = (suggestion) => {
    setSelectedAddress(suggestion); // Enregistrer la suggestion sélectionnée
    setQuery(suggestion); // Mettre à jour le champ de recherche
    setSuggestions([]); // Fermer les suggestions
  };

  // Gestion de la recherche combinée
  const handleSearchClick = () => {
    const filters = {
      address: selectedAddress || null,
      priceRange: appliedPriceRange || null,
    };

    navigate("/louer", { state: filters });
  };

  return (
    <div className="search-container">
      <h1>Rechercher des propriétés</h1>

      {/* Champ de recherche */}
      <input
        type="text"
        className="search-input"
        placeholder="Chercher par ville, quartier, région, adresse ou N° keurgui"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Suggestions dynamiques */}
      {query.length >= 2 && suggestions.length > 0 && (
        <div className="suggestions-container">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}

      {/* Filtre de prix */}
      <button onClick={() => setIsPriceFilterOpen(!isPriceFilterOpen)}>Filtrer par prix</button>
      {isPriceFilterOpen && (
        <div className="price-filter-container">
          <h4>Prix</h4>
          <Slider
            range
            min={0}
            max={10000}
            step={100}
            value={priceRange}
            onChange={(value) => setPriceRange(value)}
          />
          <div className="price-values">
            <span>{priceRange[0]} FCFA</span> - <span>{priceRange[1]} FCFA</span>
          </div>
          <button onClick={handleApplyFilter}>Appliquer</button>
        </div>
      )}

      {/* Filtres appliqués */}
      <div className="applied-filters">
        {selectedAddress && (
          <div className="filter-item">
            <span>Adresse : {selectedAddress}</span>
            <button onClick={() => setSelectedAddress("")}>✕</button>
          </div>
        )}
        {appliedPriceRange && (
          <div className="filter-item">
            <span>
              Prix : {appliedPriceRange[0]} - {appliedPriceRange[1]} FCFA
            </span>
            <button onClick={() => setAppliedPriceRange(null)}>✕</button>
          </div>
        )}
      </div>

      {/* Bouton Rechercher */}
      <button onClick={handleSearchClick}>Rechercher</button>
    </div>
  );
};

export default Commercial;
