import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './login.css';
import { useLocation } from "react-router-dom";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Réinitialise l'erreur avant chaque tentative de connexion

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "user" }),
      });

      // Si la réponse est une erreur, on affiche le message d'erreur
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Connexion échouée.");
        return;
      }

      // Si la connexion réussit, on enregistre le token et le rôle dans le localStorage
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "user");
      localStorage.setItem("firstname", data.firstname); // Ajoutez cette ligne

      // Redirection vers la page d'accueil
      navigate("/");

    } catch (error) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-tabbs">
          <Link
            to="/register"
            className={`tabb ${location.pathname === "/register" ? "active" : ""}`}
          >
            Créer mon compte
          </Link>
          <Link
            to="/login"
            className={`tabb ${location.pathname === "/login" ? "active" : ""}`}
          >
            Connexion
          </Link>
        </div>

        <div className="login-content">
          {/* Boutons tiers pour la connexion */}
          <div className="social-buttons">
            <button className="social-btn facebook">Connexion avec Facebook</button>
            <button className="social-btn apple">Connexion avec Apple</button>
          </div>

          <div className="divider">
            <span>ou</span>
          </div>

          {/* Formulaire de connexion */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Courriel"
                required
              />
              <span className="input-icon"></span>
            </div>

            <div className="input-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
              />
              <span className="input-icon"></span>
            </div>

            <button type="submit" className="submit-btn">
              Connexion avec mon courriel
            </button>

            {/* Affichage de l'erreur si elle existe */}
            {error && <p className="error-message">{error}</p>}
          </form>

          <div className="extra-links">
            <Link to="/forgot-password">Mot de passe oublié ?</Link>
            <Link to="/loginagent">Vous êtes un courtier immobilier ? Accès courtier</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
