import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddAgent.css";

const AddAgent = () => {
  const navigate = useNavigate(); // Utilisé pour rediriger après ajout
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    agentName: "",
    phoneNumber: "",
    nonAgence: "",
    territoire: "",
    langue: "",
    photoProfil: "",
  });
  const [error, setError] = useState("");

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/agents", formData);
      alert("Agent ajouté avec succès !");
      navigate("/agnts"); // Redirection après ajout
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'agent :", error.response || error);
      setError("Échec de l'ajout de l'agent. Veuillez vérifier les informations fournies.");
    }
  };

  return (
    <div className="add-agent-container">
      <h2>Ajouter un nouvel agent</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom de l'agent :</label>
          <input
            type="text"
            name="agentName"
            value={formData.agentName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Numéro de téléphone :</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nom de l'agence :</label>
          <input
            type="text"
            name="nonAgence"
            value={formData.nonAgence}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Territoire :</label>
          <input
            type="text"
            name="territoire"
            value={formData.territoire}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Langue :</label>
          <input
            type="text"
            name="langue"
            value={formData.langue}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Photo de profil (URL) :</label>
          <input
            type="text"
            name="photoProfil"
            value={formData.photoProfil}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Ajouter l'agent</button>
      </form>
    </div>
  );
};

export default AddAgent;
