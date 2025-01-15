import React, { useState } from 'react';
import './RealEstateForm.css'; // Importer le fichier CSS

const RealEstateForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: 'Bonjour, je désire plus d’information concernant l’inscription située au 2F, Rue du Boisé (# 27846763).',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Ajoutez ici la logique pour envoyer les données du formulaire
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="real-estate-form">
        <h2>Demande d'info sur la propriété</h2>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">Prénom</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Prénom"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Nom</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Nom"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Courriel</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Courriel"
              required
            />
          </div>
          <div className="form-group" style={{ height: '10px' }}>
            <label htmlFor="phone">Téléphone </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Téléphone"
              required
            />
          </div>
        </div>

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
        ></textarea>

        <p className="form-disclaimer">
          En cliquant sur « Envoyer », vous consentez à ce que vos renseignements soient traités de la manière décrite dans
          la <a href="#" className="privacy-link">politique de confidentialité de Keurgui</a>.
        </p>

        <div className="form-buttons">
          <button type="button" className="cancel-btn">Annuler</button>
          <button type="submit" className="submit-btn">Envoyer</button>
        </div>
      </form>

      <div className="agent-info">
        <img
          src="profile-image-placeholder.jpg"
          alt="Jonathan Pelletier"
          className="agent-photo"
        />
        <div className="agent-details">
          <h3>Jonathan Pelletier</h3>
          <p className="agent-title">Courtier immobilier résidentiel et commercial</p>
          <p className="agency-name">IMMEUBLES G.L.M.C. INC.</p>
        </div>
      </div>
    </div>
  );
};

export default RealEstateForm;
