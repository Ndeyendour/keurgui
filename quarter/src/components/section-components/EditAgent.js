import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditAgent.css";

const EditAgent = () => {
  const { id } = useParams(); // Récupère l'ID de l'agent depuis l'URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    agentName: "",
    phoneNumber: "",
    nonAgence: "",
    territoire: "",
    langue: "",
    photoProfil: "",
  });

  // Charger les données de l'agent existant
  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/agents/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'agent :", error);
        alert("Impossible de charger les données de l'agent.");
      }
    };

    fetchAgent();
  }, [id]);

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/agents/${id}`, formData);
      alert("Agent modifié avec succès !");
      navigate("/agnts"); // Redirection vers la liste des agents
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error.response || error);
      alert("Échec de la mise à jour de l'agent.");
    }
  };

  return (
    <div className="edit-agent-container">
      <h2>Modifier l'agent</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Numéro de téléphone :</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Agence :</label>
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
          <label>Photo de profil :</label>
          <input
            type="text"
            name="photoProfil"
            value={formData.photoProfil}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default EditAgent;
