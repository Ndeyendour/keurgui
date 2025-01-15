import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserList.css"; // Style CSS

const UserList = () => {
  const [users, setUsers] = useState([]); // État pour stocker la liste des utilisateurs
  const [loading, setLoading] = useState(true); // État pour indiquer le chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs

  // Fonction pour récupérer les utilisateurs depuis l'API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users"); // Appel à l'API
        setUsers(response.data); // Mise à jour de l'état avec les utilisateurs
        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération des utilisateurs.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Affichage pendant le chargement ou en cas d'erreur
  if (loading) return <div>Chargement des utilisateurs...</div>;
  if (error) return <div>{error}</div>;

  // Rendu principal
  return (
    <div className="user-list-container">
      <h2>Liste des utilisateurs</h2>
      {users.length === 0 ? (
        <p>Aucun utilisateur trouvé.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
