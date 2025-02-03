import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AgentsList.css";
import { useNavigate } from "react-router-dom";


const AgentsList = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Charger la liste des agents depuis l'API
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/agents");
        setAgents(response.data);
        setLoading(false);
      } catch (error) {
        setError("Erreur lors de la récupération des agents.");
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

   // Supprimer un agent
   const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet agent ?")) {
      try {
        await axios.delete(`http://localhost:5000/agents/${id}`);
        setAgents((prevAgents) => prevAgents.filter((agent) => agent._id !== id));
        alert("Agent supprimé avec succès.");
      } catch (error) {
        console.error("Erreur lors de la suppression de l'agent :", error);
        alert("Échec de la suppression de l'agent.");
      }
    }
  };

  if (loading) return <div>Chargement des agents...</div>;
  if (error) return <div>{error}</div>;

  const handleEdit = (id) => {
    navigate(`/edit-agent/${id}`);
  };
  return (
    <div className="agents-list-container">
      <h2>Liste des agents</h2>
      {agents.length === 0 ? (
        <p>Aucun agent trouvé.</p>
      ) : (
        <table className="agents-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Numéro de téléphone</th>
              <th>Agence</th>
              <th>Territoire</th>
              <th>Langue</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent._id}>
                <td>{agent.agentName}</td>
                <td>{agent.email}</td>
                <td>{agent.phoneNumber || "N/A"}</td>
                <td>{agent.nonAgence}</td>
                <td>{agent.territoire}</td>
                <td>{agent.langue}</td>
                <td>
                <button className="edit-btn" onClick={() => handleEdit(agent._id)}>
      Modifier
    </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(agent._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AgentsList;
