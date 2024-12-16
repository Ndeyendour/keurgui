import React from 'react';
import { Link } from 'react-router-dom';

const UserMenu = ({ isMenuOpen, toggleMenu, firstName, lastName }) => {
  return (
    <div>
      {/* Menu utilisateur */}
      {isMenuOpen && (
        <div className="dropdown-menu user-menu-card">
          <div className="user-info">
            {firstName} {lastName}
          </div>
          <ul className="menu-list">
            <li>
              <Link to="/mes-recherches">🔔 Mes recherches (0)</Link>
            </li>
            <li>
              <Link to="/mes-favoris">💖 Mes favoris</Link>
            </li>
            <li>
              <Link to="/proprietes-cachees">👁️ Propriétés cachées (1)</Link>
            </li>
            <li>
              <Link to="/mon-courtier">👥 Mon courtier</Link>
            </li>
            <li>
              <Link to="/profil-locataire">🏠 Mon profil locataire</Link>
            </li>
            <li>
              <Link to="/parametres">⚙️ Mes paramètres</Link>
            </li>
            <li className="logout-link">
              <Link to="/logout">Déconnexion</Link>
            </li>
            <li>
              <Link to="/acces-courtier">Accès courtier</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
