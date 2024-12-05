import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AgentList.css';

const AgentList = () => {
  const [agents, setAgents] = useState([]); // Liste complète des agents
  const [filteredAgents, setFilteredAgents] = useState([]); // Liste filtrée
  const [isLoading, setIsLoading] = useState(true); // Indicateur de chargement

  // États pour les filtres
  const [searchName, setSearchName] = useState('');
  const [searchAgency, setSearchAgency] = useState('');
  const [searchTerritory, setSearchTerritory] = useState('');

  useEffect(() => {
    // Appel au backend pour récupérer les données des agents
    const fetchAgents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/agents');
        setAgents(response.data); // Mettre à jour la liste complète
        setFilteredAgents(response.data); // Initialiser la liste filtrée
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des agents :', error);
        setIsLoading(false);
      }
    };

    fetchAgents();
  }, []);

useEffect(() => {
  const filtered = agents.filter(agent =>
    (agent.agentName?.toLowerCase() || '').includes(searchName.toLowerCase()) &&
    (agent.nonAgence?.toLowerCase() || '').includes(searchAgency.toLowerCase()) &&
    (agent.territoire?.toLowerCase() || '').includes(searchTerritory.toLowerCase())
  );
  setFilteredAgents(filtered);
}, [searchName, searchAgency, searchTerritory, agents]);


  if (isLoading) {
    return <div className="loading">Chargement des agents...</div>;
  }

  return (
    <div className="agent-list">

      {/* Section des filtres */}
      <div className="filters">
        <input
          type="text"
          placeholder="Nom de l'agent"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nom de l'agence"
          value={searchAgency}
          onChange={(e) => setSearchAgency(e.target.value)}
        />
        <input
          type="text"
          placeholder="Territoire desservi"
          value={searchTerritory}
          onChange={(e) => setSearchTerritory(e.target.value)}
        />
		<input
          type="text"
          placeholder="Langue"
          value={searchTerritory}
          onChange={(e) => setSearchTerritory(e.target.value)}
        />
      </div>

      {/* Grille des agents */}
      <div className="agent-grid">
        {filteredAgents.length > 0 ? (
          filteredAgents.map((agent) => (
            <div key={agent._id} className="agent-card">
              <div className="card-header">
                <img src={agent.photoProfil} alt={agent.agentName} className="agent-photo" />
              </div>
              <div className="card-body">
                <h2>{agent.agentName}</h2>
                <p className="agency">{agent.nonAgence}</p>
                <p className="territory">Territoire : {agent.territoire}</p>
                <p className="language">Langue : {agent.langue}</p>
              </div>
              <div className="card-footer">
                <a href={`mailto:${agent.email}`} className="contact-link">
                  <i className="fas fa-envelope"></i> Email
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">Aucun agent trouvé avec ces critères.</div>
        )}
      </div>
    </div>
  );
};

export default AgentList;
